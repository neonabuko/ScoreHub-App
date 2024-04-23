import { API_URL } from "./variables"
import axios from "axios"
import general from '../scripts/general'

export default {
  methods: {
    ...general.methods,

    async uploadSongAsync() {
      this.uploading = true
      this.setProgressHeader('', 'white')

      const fileInput = this.$refs.fileInput
      const file = fileInput.files[0]

      await this.uploadChunksAsync(file)
      await this.uploadToRepositoryAsync(file)

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

    createSongDto(songName, author) {
      const songData = new FormData()
      songData.append("name", songName)
      songData.append("author", author)
      return songData
    },

    async uploadToRepositoryAsync(file) {
      const author = this.$refs.author.value
      const songData = this.createSongDto(file.name, author)

      try {
        const response = await axios.post(API_URL + "/upload", songData)
        console.log('Save to repository:', response.status)
        this.uploadSuccess = true
      } catch (error) {
        console.error(error.message)
        this.setProgressHeader('Repository save error', 'red')
      }
    },

    async postChunkAsync(chunkData, startByte, fileSize) {
      try {
        const response = await axios.post(API_URL + "/uploadChunk", chunkData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            this.uploadProgress = Math.round((startByte + progressEvent.loaded) * 100 / fileSize)
          }
        })
        return response
      } catch (error) {
        console.error(error.message)
      }
    },

    async uploadChunksAsync(file) {
      const CHUNK_SIZE = 1024 * 1024 // 1 MB
      let currentChunk = 1
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let startByte = 0
      let chunkData

      while (startByte < file.size) {
        const chunk = file.slice(startByte, startByte + CHUNK_SIZE)
        chunkData = this.createChunkDto(currentChunk, file.name, chunk, totalChunks)

        try {
          const response = await this.postChunkAsync(chunkData, startByte, file.size)
          if (response.status === 200) {
            currentChunk++
            startByte += CHUNK_SIZE
            this.setProgressHeader(`Progress: ${Math.round((startByte / file.size) * 100)}%`, 'white')
          }
        } catch (error) {
          console.error(`Error uploading chunk ${currentChunk}: ${error.message}`);
          break
        }
      }
    },

    setProgressHeader(text, color) {
      this.progressHeader.innerText = text
      this.progressHeader.style.color = color
    },


    async deleteSongAsync(name) {
      let confirmDelete = confirm('Delete permanently?')
      if (confirmDelete) {
        await axios.delete(API_URL + `/delete/${name}`)
        this.goBack()
      }
    },
    async getAllSongDataAsync() {
      this.$store.state.loading = true
      const songs = await this.fetchAllSongDataAsync()
      this.$store.commit('setSongs', songs)
      this.$store.state.loading = false
    },
    async getCurrentSongAsync(songName) {
      this.$store.commit('setCurrentSong', '')
      this.songSelected = true
      this.updateAudioRowColor(songName)
      this.currentSongName = songName
      const currentSong = await this.fetchCurrentSongAsync(songName)
      this.$store.commit('setCurrentSong', currentSong)
    },
    closePlayer() {
      this.songSelected = false
      this.updateAudioRowColor('')
    }
  }
}
