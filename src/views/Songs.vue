<template>
    <SongRow></SongRow>
    <div class="footer-div">
      <footer class="app-footer">{{ songs.length }} songs</footer>
    </div>
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