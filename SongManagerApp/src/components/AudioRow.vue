<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-player shadow" v-for="song in songs">
      <div class="audio-inner-grid">
        <div class="gap-2 song-title">
          <h5>{{ song.name.replace(/\.mp3$/, '') }}</h5>
        </div>
        <div class="song-edit text-center">
          <router-link :to="{ name: 'Edit', params: { name: song.name } }" class="text-decoration-none">
            <i class="fas fa-edit text-info"></i>
          </router-link>
        </div>
      </div>
      <div id="audio-container">
        <audio controls class="custom-audio">
          <source :src="song.url" type="audio/mpeg" />
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import handleSongs from '../scripts/handleSongs.js'

export default {
  data() {
    return {
      songs: [],
      loading: false
    };
  },
  methods: {
    ...handleSongs.methods,
  },
  mounted() {
    this.fetchAllSongsAsync();
  },
};
</script>
