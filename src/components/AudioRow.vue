<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-grid" @click="setCurrentSongUrl(song.url)" v-for="(song, index) in songs" :key="index"
      :id="song.url">
      <div class="audio-inner-grid">
        <div class="song-title">
          <i class="fas fa-music fa-2x music-icon"></i>
          <div class="song-title-inner">
            <button class="song-title-button">{{ song.name.replace(/\.mp3$/, '') }}</button>
            <div class="song-details">
              {{ song.author }} ·
              {{ formatDuration(song.duration) }}
            </div>
          </div>
        </div>
        <div class="song-edit">
          <router-link :to="{ name: 'Edit', params: { name: song.name } }" class="btn btn-outline-light">
            <i class="fas fa-ellipsis-v"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="player-div fixed-bottom" v-if="songSelected">
    <audio controls autoplay id="player" :src="currentSongUrl"></audio>
    <button class="border-0 bg-transparent" @click="closePlayer()">
      <i class="fas fa-close"></i>
    </button>
  </div>
  <!-- <input type="range" name="" value="0" id="progress"> -->
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
    ...mapState(['songs', 'loading']),
  },
  methods: {
    ...handleSongs.methods,
    ...mapActions(['fetchAllSongsAsync']),
  },
  mounted() {
    this.getSongsAsync()
  },
}
</script>
