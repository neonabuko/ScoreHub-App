<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-grid" v-for="(song, index) in songs" :key="index"
      :id="song.name">
      <div class="audio-inner-grid">
        <div class="song-title" @click="getCurrentSongAsync(song.name)">
          <i class="fas fa-music fa-2x music-icon"></i>
          <div class="song-title-inner">
            <button class="song-title-button">
              {{ song.title }}
            </button>
            <div class="song-details">
              {{ song.author ? song.author : "Unknown" }} ·
              {{ formatTimeSpan(song.duration) }}
            </div>
          </div>
        </div>
        <div class="song-edit">
          <router-link :to="{ name: 'Edit', params: { name: song.name } }" class="btn">
            <i class="fas fa-ellipsis-v"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import { mapActions, mapState } from "vuex"
import handleSongs from "../scripts/handleSongs.js"
import Player from "./Player.vue"

export default {
  components: {
    Player: Player
  },
  data() {
    return {
      songsFiltered: []
    }
  },
  computed: {
    ...mapState(["songs", "loading"]),
  },
  methods: {
    ...handleSongs.methods,
    ...mapActions(["fetchAllSongDataAsync"]),
  },
  mounted() {
    this.getAllSongDataAsync()
  },
}
</script>
