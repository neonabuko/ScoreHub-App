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
        const uploadToRepositoryResponse = await this.uploadMetadataAsync(dto)
        const musicId = uploadToRepositoryResponse.data
        await this.uploadFileAsync(file, musicId)
      } catch (error) {
        const message = error.response.data.errors.Title
        this.setProgressHeader(`${message}`, 'red')
        this.uploading = false
        return
      }

      this.uploading = false
      this.uploadSuccess = true
      this.setProgressHeader('Success', 'green')
    },

    async uploadFileChunkAsync(chunkDto) {
      return await axios.post(API_URL + `${this.baseRoute}/chunks`, chunkDto, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
    },

    async uploadFileAsync(file, musicId) {
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let chunkId = 1
      let startByte = 0

      while (startByte < file.size) {
        const chunkData = file.slice(startByte, startByte + CHUNK_SIZE)
        const chunkDto = this.createChunkDto(chunkId, musicId, file.name, chunkData, totalChunks)
        const postChunkRespose = await this.uploadFileChunkAsync(chunkDto)
        
        if (postChunkRespose.status !== 200) return postChunkRespose
        chunkId++
        startByte += CHUNK_SIZE
        this.updateProgressHeader(startByte, file.size)
      }
    },

    async uploadMetadataAsync(dto) {
      return await axios.post(API_URL + `${this.baseRoute}/data`, dto)
    },

    async deleteAsync() {
      let confirmDelete = confirm('Delete permanently?')
      if (confirmDelete) {
        axios.delete(API_URL + `${this.baseRoute}/${this.id}`).then(() => {
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

    async getAllSongDataAsync() {
      this.$store.state.isLoadingSongs = true
      const songs = await this.fetchAllDataAsync("/songs/data")
      this.$store.commit('setSongs', songs)
      this.$store.commit('filterSongs', songs)
      this.$store.state.isLoadingSongs = false
    },

    async getCurrentSongAsync(currentSongName, id) {
      this.updateAudioRowColor(currentSongName)

      const currentSongUrl = API_URL + '/songs/' + id
      this.$store.commit('startPlayer', {
        currentSongUrl: currentSongUrl,
        currentSongName: currentSongName
      })
    },

    async getMetadata() {
      let songResponse = await axios.get(API_URL + `${this.baseRoute}/${this.id}/data`)
      let song = songResponse.data
      this.name = song.name
      this.title = song.title
      this.author = song.author
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
    }
  }
}
