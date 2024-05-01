import { API_URL } from "./variables"
import axios from "axios"
import general from './general'
import CHUNK_SIZE from './constants'

export default {
  methods: {
    ...general.methods,

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

    createChunkDto(currentChunk, fileName, chunk, totalChunks) {
      const chunkData = new FormData()
      chunkData.append("id", currentChunk)
      chunkData.append("name", fileName)
      chunkData.append("data", chunk)
      chunkData.append("totalChunks", totalChunks)
      return chunkData
    },

    createSongDto(songName, title, author, timeSpan) {
      const songData = new FormData()
      songData.append("name", songName)
      songData.append("title", title)
      songData.append("author", author)
      songData.append("duration", timeSpan)
      return songData
    },

    createScoreDto(scoreName, title, author) {
      const scoreDto = new FormData()
      scoreDto.append("name", scoreName)
      scoreDto.append("title", title)
      scoreDto.append("author", author)
      return scoreDto
    },

    createSongEditDto(title, author) {
      const songEditData = new FormData()
      songEditData.append("title", title)
      songEditData.append("author", author)
      return songEditData
    },

    async postChunkAsync(baseRoute, chunkData, startByte, fileSize) {
      return axios.post(API_URL + `${baseRoute}/chunks`, chunkData, {
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

        let response = await this.postChunkAsync(baseRoute, chunkDto, startByte, file.size)

        if (response.status === 202) {
          chunkId++
          startByte += CHUNK_SIZE
          let progressCount = Math.round((startByte / file.size) * 100)
          this.setProgressHeader(`Progress: ${progressCount}%`, 'white')
          if (progressCount >= 100) this.setProgressHeader('Saving song metadata...', 'white')
        } else if (response.status === 200) {
          return response
        }
      }
    },

    async uploadToRepositoryAsync(baseRoute, dto) {
      try {
        axios.post(API_URL + `${baseRoute}/data`, dto)
        this.uploadSuccess = true
      } catch (error) {
        console.error(error.message)
        this.setProgressHeader('Repository save error', 'red')
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

    async updateSongAsync() {
      let confirmUpdate = confirm('Confirm update?')
      if (confirmUpdate) {
        var name = this.$refs.name.value
        var title = this.$refs.title.value
        var author = this.$refs.author.value

        let songEditData = this.createSongEditDto(title, author)
        axios.patch(API_URL + `/songs?name=${name}`, songEditData).then(async () => {
          this.goBack()
          await this.getAllDataAsync()
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
