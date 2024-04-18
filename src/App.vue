<template>
  <navbar></navbar>
  <router-view></router-view>
  <!-- <footer class="app-footer">&copy; Song Manager, 2024</footer> -->
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data() {
    return {
      uploading: false
    }
  },
  components: {
    navbar: Navbar
  }
}
</script>
