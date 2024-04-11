<template>
  <div class="upload-form">
    <form @submit.prevent="uploadSongAsync" method="post" enctype="multipart/form-data">
      <input type="file" name="file" accept=".mp3" ref="fileInput">
      <input type="submit" value="Upload">
    </form>
  </div>
  <div class="song-player">
    <audio controls>
      <source src="" type="audio/mpeg"
    </audio>
  </div>
</template>

<script>
import { API_URL } from './scripts/variables';
import axios from 'axios'

export default {
  data() {
    return {
      song: ''
    }
  },
  methods: {
    async uploadSongAsync() {
      let fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append('file', fileInput.files[0]);

        try {
          await axios.post(API_URL + '/upload', formData);
          console.log('Upload successful');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      } else {
        console.log('No file selected.');
      }
    },
    async getHome() {
      await axios.get(API_URL).then((response) => {
        console.log("Status:", response.status);
      })
    }
  }, mounted() {
    this.getHome()
  }
}
</script>
