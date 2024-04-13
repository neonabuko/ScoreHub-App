<template>
  <main class="container">
    <div class="app-header">
      <h1>Song Manager App</h1>
    </div>

    <div class="upload-form">
      <form @submit.prevent="uploadSongAsync" method="post" enctype="multipart/form-data">
        <input type="file" name="file" accept=".mp3" ref="fileInput">
        <input type="submit" value="Upload">
        <h3 v-if="uploading">Uploading...</h3>
      </form>
    </div>

    <div class="audio-grid">
      <div class="audio-player shadow" v-for="song in songs">
        <h5>{{ song.name }}</h5>
        <audio controls>
          <source :src="song.url" type="audio/mpeg">
        </audio>
      </div>
    </div>
  </main>

</template>

<script>
import { API_URL } from './scripts/variables';
import axios from 'axios'
import Navbar from './components/Navbar.vue';

export default {
  data() {
    return {
      songs: [],
      uploading: false
    }
  },
  components: {
      Navbar: Navbar
    },
  methods: {
    async uploadSongAsync() {
      this.uploading = true
      let fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append('file', fileInput.files[0]);
        await axios.post(API_URL + '/upload', formData).then(async () => await this.fetchAllSongsAsync())
        this.uploading = false
      }
    },
    async fetchAllSongsAsync() {
      await axios.get(API_URL + '/songs').then(async (response) => {
        this.songs = await response.data
        console.log('ok');
      } 
      )}
  },
  mounted() {
    this.fetchAllSongsAsync()
  }
}
</script>
