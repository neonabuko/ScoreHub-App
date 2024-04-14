<template>
  <navbar></navbar>
  <main class="container">
    <Upload></Upload>
    <AudioRow></AudioRow>

  </main>

</template>

<script>
import Navbar from './components/Navbar.vue'
import AudioRow from './components/AudioRow.vue'
import handleSongs from './scripts/handleSongs.js'
import Upload from './components/Upload.vue'

export default {
  data() {
    return {
      uploading: false
    }
  },
  components: {
    Navbar: Navbar,
    AudioRow: AudioRow,
    Upload: Upload
  },
  methods: {
    ...handleSongs.methods
  }
}
</script>
