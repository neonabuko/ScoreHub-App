<template>
  <div class="app-container">
    <Navbar />
    <router-view class="view"/>
    <Player/>
  </div>
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
    Navbar,
    Player
  }
}
</script>

<style>

.view {
  min-height: 100vh;
}

</style>