<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-grid" @click="getCurrentSongAsync(song.name)" v-for="(song, index) in songs" :key="index"
      :id="song.name">
      <div class="audio-inner-grid">
        <div class="song-title">
          <i class="fas fa-music fa-2x music-icon"></i>
          <div class="song-title-inner">
            <button class="song-title-button">
              {{ song.title }}
            </button>
            <div class="song-details">
              {{ song.author ? song.author : "Unknown" }} ·
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
  <div class="player-controls" v-if="songSelected">
    <audio preload="metadata" autoplay id="player" ref="player" @timeupdate="updateProgress" :src="currentSong"></audio>
    <input type="range" id="progress-bar" step="0.1" :value="progress" @input="seek" />
    <div id="time">
      <div class="current-time">
        {{ formatTime(currentTime) }}
      </div>
      <div class="total-time text-end">
        {{ formatTime(totalTime) }}
      </div>
    </div>
    <div class="play-button-div">
      <button class="btn play-button">
        <i id="play-button-icon" ref="playButtonIcon" :class="setPlayPauseIcon()" @click="playPause"></i>
      </button>
      <div class="close-player-div">
        <button class="btn close-player" @click="closePlayer">
          <i class="fas fa-x"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex"
import handleSongs from "../scripts/handleSongs.js"
import handlePlayer from "../scripts/handlePlayer.js"
import general from "../scripts/general.js"

export default {
  data() {
    return {
      isPlaying: false,
      progress: 0,
      currentTime: 0,
      totalTime: 0,
      songSelected: false,
      songsFiltered: [],
      loadingSong: true
    }
  },
  computed: {
    ...mapState(["songs", "loading", "currentSong"]),
  },
  methods: {
    ...handleSongs.methods,
    ...handlePlayer.methods,
    ...general.methods,
    ...mapActions(["fetchAllSongDataAsync", "fetchCurrentSongAsync"]),
  },
  mounted() {
    this.getAllSongDataAsync()
  },
}
</script>
