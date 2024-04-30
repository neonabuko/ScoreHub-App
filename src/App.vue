<template>
  <navbar></navbar>
  <router-view></router-view>
  <Player></Player>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Player from './components/song/Player.vue';

export default {
  data() {
    return {
      uploading: false,
    }
  },
  components: {
    navbar: Navbar,
    Player: Player
  }
}
</script>
