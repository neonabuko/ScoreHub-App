<template>
  <div class="upload-header">
    <h1 class="form-label" id="edit-h1">Upload a song</h1>
  </div>
  <div class="upload-form-div">
    <form class="upload-form" @submit.prevent="prepareUploadAsync" method="post" enctype="multipart/form-data">
      <input type="file" class="form-control" name="file" id="upload-file" ref="fileInput"
        aria-describedby="fileHelpId" />
      <input type="text" class="title form-control" placeholder="Title" ref="title">
      <input type="text" class="author form-control" placeholder="Author" ref="author">
      <div class="upload-button-div">
        <button class="btn btn-primary" id="submit-button" type="submit" value="Upload" :disabled="uploading">
          {{ upload.at(uploading) }}
        </button>
        <div class="progress-header-div">
          <h2 id="progress-header" class="upload-progress"></h2>
        </div>
      </div>
    </form>
  </div>
  <div id="fileHelpId" class="form-text">Supported formats: mp3, wav.</div>
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
      progressHeader: ''
    };
  },
  methods: {
    ...handleSongs.methods,
    ...general.methods,

    async prepareUploadAsync() {
      const fileInput = this.$refs.fileInput
      const file = fileInput.files[0]
      const name = file.name
      const title = this.$refs.title.value
      const author = this.$refs.author.value
      const duration = await this.getAudioDuration(file);
      const timeSpan = this.convertSecondsToTimeSpan(duration)

      const songDto = this.createSongDto(name, title, author, timeSpan)
      this.uploadAsync('/songs', file, songDto)
    }
  },
  mounted() {
    this.progressHeader = document.getElementById('progress-header')
  },
};
</script>