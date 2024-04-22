import { API_URL } from "./variables"
import axios from "axios"
import general from '../scripts/general'

export default {
  methods: {
    ...general.methods,

    async uploadSongAsync() {
      let fileInput = this.$refs.fileInput
      let author = this.$refs.author.value
      if (fileInput.files.length === 0) {
        console.log('no file');
        return
      }

      this.uploading = true
      let formData = new FormData()
      let file = fileInput.files[0]
      formData.append("file", file)
      formData.append("author", author)

      let response = await axios.post(API_URL + "/upload", formData)

      if (response.status === 200) this.uploadSuccess = true

      this.uploading = false
    },

    async deleteSongAsync(name) {
      alert('Delete permanently?')
      await axios.delete(API_URL + `/delete/${name}`)
      this.goBack()
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
    },
    updateAudioRowColor(newSongName) {
      let previousSongName = this.currentSongName
      let previousAudioRow = document.getElementById(previousSongName)
      if (previousAudioRow) {
        previousAudioRow.style.backgroundColor = "#101010"
      }
      let currentAudioRow = document.getElementById(newSongName)
      if (currentAudioRow) currentAudioRow.style.backgroundColor = '#9b7abf22'
    },
    formatDuration(timeSpan) {
      let parts = timeSpan.split(':');
      let minutes = parseInt(parts[1]);
      let seconds = Math.round(parseFloat(parts[2]));
      return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }
  }
}
