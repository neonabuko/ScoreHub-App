<template>
  <div class="upload-form">
    <form
      @submit.prevent="uploadSongAsync"
      method="post"
      enctype="multipart/form-data"
    >
      <label for="#upload" class="form-label">Upload a song</label>
      <input
        type="file"
        class="form-control"
        name="file"
        id="#upload"
        ref="fileInput"
        placeholder=""
        aria-describedby="fileHelpId"
      />
      <button class="btn btn-primary" type="submit" value="Upload">Upload</button>
      <h3 v-if="uploading">Uploading...</h3>
      <div id="fileHelpId" class="form-text">Help text</div>
    </form>
  </div>
</template>

<script>
import handleSongs from '../scripts/handleSongs.js'

export default {
  data() {
    return {
      uploading: false
    }
  }, methods: {
    ...handleSongs.methods
  }
}
</script>
