<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-player shadow" v-for="song in songs">
      <div class="audio-inner-grid">
        <div class="gap-2 song-title">
          <h5>{{ song.name }}</h5>
        </div>
        <div class="song-edit text-center">
          <router-link :to="{ name: 'Edit', params: { name: song.name } }" class="text-decoration-none">
            <i class="fas fa-edit text-info"></i>
          </router-link>
        </div>
      </div>
      <div id="audio-container">
        <audio controls :key="song.name">
          <source :src="song.url" type="audio/mpeg"/>
        </audio>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import handleSongs from '../scripts/handleSongs.js'


export default {
  computed: {
    ...mapState(['songs', 'loading'])
  },
  methods: {
    ...handleSongs.methods,
    ...mapActions(['fetchAllSongsAsync']),
    async getSongsAsync() {
      this.$store.state.loading = true
      const songs = await this.fetchAllSongsAsync()
      this.$store.commit('setSongs', songs)
      this.$store.state.loading = false
    }
  },
  created() {
    this.getSongsAsync()
  },
};
</script>
