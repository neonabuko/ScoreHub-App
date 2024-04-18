import { API_URL } from "./variables";
import axios from "axios";

export default {
  methods: {
    async uploadSongAsync() {
      this.uploading = true;
      let fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append("file", fileInput.files[0]);
        await axios
          .post(API_URL + "/upload", formData)
        this.uploading = false;
      }
    },
    async getSongsAsync() {
      this.$store.state.loading = true
      const songs = await this.fetchAllSongsAsync()
      this.$store.commit('setSongs', songs)
      this.$store.state.loading = false
    },
    setCurrentSongUrl(url) {
      this.updateAudioRowColor(url)
      this.currentSongUrl = url
      this.songSelected = !!url
    },
    closePlayer() {
      this.songSelected = false
      this.updateAudioRowColor(null)
    },
    updateAudioRowColor(newUrl) {
      let previousUrl = this.currentSongUrl
      if (previousUrl) {
        let previousAudioRow = document.getElementById(previousUrl)
        previousAudioRow.style.backgroundColor = "#101010"
      }
      let currentAudioRow = document.getElementById(newUrl)
      if (currentAudioRow) currentAudioRow.style.backgroundColor = '#9b7abf22'
    }
  }
}
