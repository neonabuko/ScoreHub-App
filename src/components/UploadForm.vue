<template>
  <div class="upload-header">
    <button class="btn btn-sm" @click="goBack()">
      <i class="fas fa-arrow-left"></i>
    </button>
    <h3 class="form-label">Upload a song</h3>
  </div>
  <div class="upload-form">
    <form @submit.prevent="uploadSongAsync" method="post" enctype="multipart/form-data">
      <input type="file" class="form-control" name="file" id="#upload" ref="fileInput" aria-describedby="fileHelpId" />
      <div class="upload-button-div mt-2">
        <button class="btn btn-primary" type="submit" value="Upload">
          {{ upload.at(uploading) }}
        </button>
      </div>
    </form>
  </div>
  <div id="fileHelpId" class="form-text">Supported formats: mp3, wav, mpeg.</div>
</template>

<script>
import handleSongs from "../scripts/handleSongs.js";
import general from "../scripts/general.js";

export default {
  data() {
    return {
      uploading: false,
      upload: ['Upload', 'Uploading...']
    };
  },
  methods: {
    ...handleSongs.methods,
    ...general.methods
  },
};
</script>
