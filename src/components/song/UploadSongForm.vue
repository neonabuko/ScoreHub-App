<template>
  <div class="upload-header">
    <i class="fas fa-music fa-2x music-icon"></i>
    <h1 class="form-label" id="edit-h1">Upload a song</h1>
  </div>
  <div class="upload-form-div">
    <form class="upload-form" @submit.prevent="prepareUploadAsync" method="post" enctype="multipart/form-data">
      <label for="title-input" class="edit-form-label">Title</label>
      <input type="text" id="title-input" class="title form-control" ref="title">
      <label for="author-input" class="edit-form-label">Author</label>
      <input type="text" id="author-input" class="author form-control" ref="author">

      <div class="file-input-wrapper">
        <input type="file" accept=".mp3" id="file-input" class="file-input-hidden" ref="scoreFile"
          aria-describedby="fileHelpId" @change="onFileSelected">
        <button class="btn btn-outline-secondary text-white w-100" id="select-file-button" @click="selectFile"
          type="button">
          <i class="fas fa-file" v-if="selectedFileName !== 'Choose file'"></i>
          {{ selectedFileName }}
        </button>
      </div>

      <div class="upload-button-div">
        <button class="btn btn-primary w-100" id="submit-button" type="submit" value="Upload" :disabled="uploading">
          {{ upload.at(uploading) }}
        </button>
        <div class="progress-header-div">
          <h2 id="progress-header" class="upload-progress"></h2>
        </div>
      </div>
    </form>
  </div>
  <div id="fileHelpId" class="form-text text-center">Supported formats: mp3.</div>
</template>

<script>
import handleSongs from "../../scripts/handleSongs.js";
import general from "../../scripts/general.js";

export default {
  data() {
    return {
      uploading: false,
      upload: ['Upload', 'Uploading...'],
      uploadSuccess: false,
      uploadProgress: '0%',
      progressHeader: '',
      selectedFile: '',
      selectedFileName: 'Choose file',
      baseRoute: '/songs'
    };
  },
  methods: {
    ...handleSongs.methods,
    ...general.methods,

    async prepareUploadAsync() {
      const file = this.selectedFile
      if (!file) {
        this.setProgressHeader("Must provide file", 'red')
        return
      }
      const name = file.name
      const title = this.$refs.title.value
      const author = this.$refs.author.value
      const duration = await this.getAudioDurationAsync(file)
      const durationAsTimeSpan = this.convertSecondsToTimeSpan(duration)
      const publishedAt = new Date()

      const songDto = this.createSongDto(name, title, author, durationAsTimeSpan, publishedAt.toISOString())
      this.uploadAsync(file, songDto)
    }
  },
  mounted() {
    this.progressHeader = document.getElementById('progress-header')
  },
};
</script>