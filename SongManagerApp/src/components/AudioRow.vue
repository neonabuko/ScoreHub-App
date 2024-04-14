<template>
  <div class="audio-grid">
    <div class="audio-player shadow" v-for="song in songs">
      <h5>{{ song.name }}</h5>
      <audio controls>
        <source :src="song.url" type="audio/mpeg" />
      </audio>
    </div>
  </div>
</template>

<script>
import handleSongs from '../scripts/handleSongs.js'


export default {
  data() {
    return {
      songs: [],
    };
  },
  methods: {
    ...handleSongs.methods
  },
  mounted() {
    this.fetchAllSongsAsync();
  },
};
</script>
