<template>
  <navbar></navbar>
  <router-view></router-view>
  <div class="footer-div">
    <footer class="app-footer">{{songs.length}} songs</footer>
  </div>
</template>

<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import Navbar from './components/Navbar.vue'

export default {
  data() {
    return {
      uploading: false,
    }
  },
  computed: {
    ...mapState(['songs'])
  },
  components: {
    navbar: Navbar
  }
}
</script>
