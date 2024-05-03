<template>
  <div class="app-container">
    <Navbar />
    <router-view class="view"></router-view>
    <Player></Player>
    <FooterSection/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Player from './components/song/Player.vue';
import FooterSection from './components/home/FooterSection.vue';

export default {
  data() {
    return {
      uploading: false,
    }
  },
  components: {
    Navbar,
    Player,
    FooterSection
  }
}
</script>

<style>

.view {
  min-height: 100vh;
}

</style>