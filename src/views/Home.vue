<template>
  <main class="mt-4">
    <AudioRow></AudioRow>
    <div class="footer-div">
      <footer class="app-footer">{{ songs.length }} songs</footer>
    </div>
  </main>
</template>

<script>
import AudioRow from '../components/AudioRow.vue'
import { mapState } from 'vuex/dist/vuex.cjs.js';

export default {
  computed: {
    ...mapState(['songs'])
  },
  components: {
    AudioRow: AudioRow
  }
}
</script>