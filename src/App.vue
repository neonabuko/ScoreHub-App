<template>
  <navbar></navbar>
  <router-view></router-view>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  data() {
    return {
      uploading: false,
    }
  },
  components: {
    navbar: Navbar
  }
}
</script>
