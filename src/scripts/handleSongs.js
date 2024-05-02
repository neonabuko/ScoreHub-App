import { API_URL } from "./variables"
import axios from "axios"
import general from './general'
import CHUNK_SIZE from './constants'
import dtos from "./dtos"

export default {
  methods: {
    ...general.methods,
    ...dtos.methods,

    async uploadAsync(baseRoute, file, dto) {
      this.uploading = true
      this.setProgressHeader('', '')

      try {
        await this.uploadChunksAsync(file, baseRoute)
      } catch (error) {
        console.log(error);
        this.setProgressHeader('Error uploading. Status ' + error.response.status, 'red')
        this.uploading = false
        return
      }

      await this.uploadToRepositoryAsync(baseRoute, dto)

      this.uploading = false
      this.setProgressHeader('Success', 'green')
    },

    async postChunkAsync(baseRoute, chunkData, startByte, fileSize) {
      return await axios.post(API_URL + `${baseRoute}/chunks`, chunkData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          this.uploadProgress = Math.round((startByte + progressEvent.loaded) * 100 / fileSize)
        }
      })
    },

    async uploadChunksAsync(file, baseRoute) {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let chunkId = 1
      let startByte = 0

      while (startByte < file.size) {
        const chunkData = file.slice(startByte, startByte + CHUNK_SIZE)
        let chunkDto = this.createChunkDto(chunkId, file.name, chunkData, totalChunks)
        let postChunkRespose = await this.postChunkAsync(baseRoute, chunkDto, startByte, file.size)

        if (postChunkRespose.status === 202) {
          chunkId++
          startByte += CHUNK_SIZE
          this.updateProgressHeader(startByte, file.size)
        } else {
          return postChunkRespose
        }
      }
    },

    updateProgressHeader(startByte, fileSize) {
      let progressCount = Math.round((startByte / fileSize) * 100)
      this.setProgressHeader(`Progress: ${progressCount}%`, 'white')
      if (progressCount >= 100) {
        this.setProgressHeader('Saving song metadata...', 'white')
      }
    },

    async uploadToRepositoryAsync(baseRoute, dto) {
      try {
        axios.post(API_URL + `${baseRoute}/data`, dto)
        this.uploadSuccess = true
      } catch (error) {
        this.setProgressHeader('Repository save error ' + error.response, 'red')
      }
    },

    setProgressHeader(text, color) {
      this.progressHeader.innerText = text
      this.progressHeader.style.color = color
    },

    async deleteAsync(name, baseRoute) {
      let confirmDelete = confirm('Delete permanently?')
      if (confirmDelete) {
        axios.delete(API_URL + `${baseRoute}/${name}`).then(() => {
          this.goBack()
        })
      }
    },

    async updateAsync(baseRoute, dto) {
      let confirmUpdate = confirm('Confirm update?')
      if (confirmUpdate) {
        axios.patch(API_URL + `${baseRoute}/data`, dto).then(async () => {
          this.goBack()
        })
      }
    },

    async getAllDataAsync() {
      this.$store.state.loading = true
      const songs = await this.fetchAllSongDataAsync()
      this.$store.commit('setSongs', songs)
      this.$store.commit('filterSongs', songs)
      this.$store.state.loading = false
    },

    async getCurrentSongAsync(currentSongName) {
      this.updateAudioRowColor(currentSongName)

      const currentSongUrl = API_URL + '/songs/' + currentSongName
      this.$store.commit('startPlayer', {
        currentSongUrl: currentSongUrl,
        currentSongName: currentSongName
      })
    },

    resetPlayer(currentSongName) {
      this.$store.commit('resetPlayer')
      this.updateAudioRowColor(currentSongName)
    },
  }
}
