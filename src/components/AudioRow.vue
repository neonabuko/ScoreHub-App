<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-player shadow" v-for="(song, index) in songs" :key="index" :id="song.name">
      <div class="audio-inner-grid">
        <div class="song-title">
          <button @click="setCurrentSongUrl(song.url)" class="card-title">{{ song.name }}</button>
        </div>
        <div class="song-edit text-center">
          <router-link :to="{ name: 'Edit', params: { name: song.name } }" class="text-decoration-none text-white">
            <i class="fas fa-edit small"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="player-div fixed-bottom" v-if="songSelected">
    <audio controls id="player" :src="currentSongUrl">
    </audio>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import handleSongs from '../scripts/handleSongs.js'

export default {
  data() {
    return {
      currentSongUrl: '',
      songSelected: false
    }
  },
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
    },
    setCurrentSongUrl(url) {
      this.currentSongUrl = url
      this.songSelected = true
    }
  },
  created() {
    this.getSongsAsync()
  },
};
</script>
