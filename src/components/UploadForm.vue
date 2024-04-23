<template>
  <div class="upload-header">
    <h1 class="form-label" id="edit-h1">Upload a song</h1>
  </div>
  <div class="upload-form-div">
    <form class="upload-form" @submit.prevent="uploadSongAsync" method="post" enctype="multipart/form-data">
      <input type="file" class="form-control" name="file" id="#upload" ref="fileInput" aria-describedby="fileHelpId"/>
      <input type="text" class="author form-control" placeholder="Author" ref="author">
      <div class="upload-button-div">
        <button class="btn btn-primary" id="submitButton" type="submit" value="Upload">
          {{ upload.at(uploading) }}
        </button>
        <div class="progress-header-div">
          <h2 id="progress-header" class="upload-progress p-3 text-center position-absolute" v-if="uploading">Progress: {{ uploadProgress }}</h2>
        </div>
        <!-- <i class="fas fa-check shining-green-check mx-3"></i> -->
      </div>
    </form>
  </div>
  <div id="fileHelpId" class="form-text">Supported formats: mp3, wav, mpeg, ogg, m4a.</div>
</template>

<script>
import handleSongs from "../scripts/handleSongs.js";
import general from "../scripts/general.js";

export default {
  data() {
    return {
      uploading: false,
      upload: ['Upload', 'Uploading...'],
      uploadSuccess: false,
      uploadProgress: '0%'
    };
  },
  methods: {
    ...handleSongs.methods,
    ...general.methods
  },
};
</script>

<style>
.shining-green-check {
  color: green;
  scale: 1.4;
  opacity: 0;
  transform: scale(0.5);
  animation: shine-in 0.5s ease forwards, shine 0.5s infinite alternate;
}

@keyframes shine-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes shine {
  from {
    filter: brightness(1);
  }

  to {
    filter: brightness(1.5);
  }
}
</style>