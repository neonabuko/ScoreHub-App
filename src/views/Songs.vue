<template>
  <main class="mt-4">
    <SongRow></SongRow>
    <div class="footer-div">
      <footer class="app-footer">{{ songs.length }} songs</footer>
    </div>
  </main>
</template>

<script>
import SongRow from '../components/song/SongRow.vue'
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default {
  computed: {
    ...mapState(['songs'])
  },
  components: {
    SongRow: SongRow
  }
}
</script>