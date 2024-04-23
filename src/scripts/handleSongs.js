import { API_URL } from "./variables"
import axios from "axios"
import general from '../scripts/general'

export default {
  methods: {
    ...general.methods,

    async uploadSongAsync() {
      let progressHeader = document.getElementById('progress-header')
      progressHeader.style.color = 'white'
      let fileInput = this.$refs.fileInput
      if (fileInput.files.length === 0) {
        console.log('no file input');
        return
      }

      this.uploading = true
      let file = fileInput.files[0]
      let author = this.$refs.author.value

      const CHUNK_SIZE = 1024 * 1024; // 1 MB
      let currentChunk = 0
      let totalChunks = Math.ceil(file.size / CHUNK_SIZE)
      let startByte = 0
      

      while (startByte < file.size) {
        progressHeader.innerText = 'Progress: ' + this.uploadProgress
        currentChunk++
        let chunk = file.slice(startByte, startByte + CHUNK_SIZE)
        let chunkData = new FormData()
        chunkData.append("id", currentChunk)
        chunkData.append("name", file.name)
        chunkData.append("data", chunk)
        chunkData.append("totalChunks", totalChunks)

        let response = await axios.post(API_URL + "/uploadChunk", chunkData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            this.uploadProgress = Math.round((startByte + progressEvent.loaded) * 100 / file.size) + '%'
          }
        }).catch((error) => {
          console.log('Error uploading chunks:', error);
          progressHeader.innerText = 'Error'
          progressHeader.style.color = 'red'
          this.uploadSuccess = false
          this.uploading = false
        })

        if (response.status === 200) {
          console.log(currentChunk, 'uploaded successfully.');
          startByte += CHUNK_SIZE;
        }
      }

      let songData = new FormData()
      songData.append("name", file.name)
      songData.append("author", author)

      await axios.post(API_URL + "/upload", songData).then(async (response) => {
        console.log('Repository upload success:', response.status);
        progressHeader.innerText = 'Success'
        progressHeader.style.color = 'green'
        this.uploadSuccess = true
      }).catch(async (error) => {
        console.log('Error posting to repository:', error);
      })

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
      let hours = parseInt(parts[0]);
      let minutes = parseInt(parts[1]);
      let seconds = Math.round(parseFloat(parts[2]));

      if (hours > 0) {
        return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      } else {
        return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      }
    }

  }
}
