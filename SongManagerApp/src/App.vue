<template>
  <navbar></navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue'
import handleSongs from './scripts/handleSongs.js'

export default {
  data() {
    return {
      uploading: false
    }
  },
  components: {
    Navbar: Navbar
  },
  methods: {
    ...handleSongs.methods
  }
}
</script>
