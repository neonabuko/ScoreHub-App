import { API_URL } from "./variables"
import axios from "axios"
import general from './general'
import CHUNK_SIZE from './constants'
import dtos from "./dtos"

export default {
  methods: {
    ...general.methods,
    ...dtos.methods,

    async uploadAsync(file, dto) {
      this.uploading = true
      this.setProgressHeader('', '')

      try {
        let response = await this.uploadToRepositoryAsync(dto);
        let musicId = response.data
        await this.uploadChunksAsync(file, musicId);
      } catch (error) {
        const errorMessage = error.response.data.errors.Title;
        this.setProgressHeader(`${errorMessage}`, 'red');
        this.uploading = false;
        return;
      }

      this.uploading = false
      this.uploadSuccess = true
      this.setProgressHeader('Success', 'green')
    },

    async postChunkAsync(chunkDto, startByte, fileSize) {
      return await axios.post(API_URL + `${this.baseRoute}/chunks`, chunkDto, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          this.uploadProgress = Math.round((startByte + progressEvent.loaded) * 100 / fileSize)
        }
      })
    },

    async uploadChunksAsync(file, musicId) {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let chunkId = 1
      let startByte = 0

      while (startByte < file.size) {
        const chunkData = file.slice(startByte, startByte + CHUNK_SIZE)
        let chunkDto = this.createChunkDto(chunkId, musicId, file.name, chunkData, totalChunks)
        let postChunkRespose = await this.postChunkAsync(chunkDto, startByte, file.size)

        if (postChunkRespose.status === 200) {
          chunkId++
          startByte += CHUNK_SIZE
          this.updateProgressHeader(startByte, file.size)
        } else {
          return postChunkRespose
        }
      }
    },

    async uploadToRepositoryAsync(dto) {
      return await axios.post(API_URL + `${this.baseRoute}/data`, dto)
    },

    async deleteAsync(name) {
      let confirmDelete = confirm('Delete permanently?')
      if (confirmDelete) {
        axios.delete(API_URL + `${this.baseRoute}/${name}`).then(() => {
          this.goBack()
        })
      }
    },

    async updateAsync(dto) {
      let confirmUpdate = confirm('Confirm update?')
      if (confirmUpdate) {
        axios.patch(API_URL + `${this.baseRoute}/data`, dto).then(async () => {
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

    async getAuthorAsync(name) {
      let response = await axios.get(API_URL + `${this.baseRoute}/${name}/data`)
      this.title = response.data.title
      this.author = response.data.author
    },

    updateProgressHeader(startByte, fileSize) {
      let progressCount = Math.round((startByte / fileSize) * 100)
      this.setProgressHeader(`Progress: ${progressCount}%`, 'white')
      if (progressCount >= 100) {
        this.setProgressHeader('Saving song metadata...', 'white')
      }
    },

    setProgressHeader(text, color) {
      this.progressHeader.innerText = text
      this.progressHeader.style.color = color
    },

    resetPlayer(currentSongName) {
      this.$store.commit('resetPlayer')
      this.updateAudioRowColor(currentSongName)
    },
  }
}
