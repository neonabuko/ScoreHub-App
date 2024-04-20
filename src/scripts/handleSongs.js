import { API_URL } from "./variables"
import axios from "axios"
import general from '../scripts/general'

export default {
  methods: {
    ...general.methods,
    async uploadSongAsync() {
      this.uploading = true
      let fileInput = this.$refs.fileInput
      let author = this.$refs.author.value
      if (fileInput.files.length > 0) {
        let formData = new FormData()
        let file = fileInput.files[0]
        formData.append("file", file)
        formData.append("author", author)
        let response = await axios.post(API_URL + "/upload", formData)
        if (response.status === 200) {
          this.uploadSuccess = true
        }
        this.uploading = false
      }
    },
    async deleteSongAsync(name) {
      alert('Delete permanently?')
      await axios.delete(API_URL + `/delete/${name}`)
      this.goBack()
    },
    async getAllSongsAsync() {
      this.$store.state.loading = true
      const songs = await this.fetchAllSongsAsync()
      this.$store.commit('setSongs', songs)
      this.$store.state.loading = false
    },
    async getCurrentSongUrlAsync(songName) {
      const currentSongUrl = await this.fetchCurrentSongUrl(songName)
      this.$store.commit('setCurrentSongUrl', currentSongUrl)
      this.songSelected = true
      this.updateAudioRowColor(songName)
      this.currentSongName = songName
    },
    closePlayer() {
      this.songSelected = false
      this.updateAudioRowColor('')
    },
    updateAudioRowColor(newSongName) {
      let previousSongName = this.currentSongName
      if (previousSongName) {
        let previousAudioRow = document.getElementById(previousSongName)
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
