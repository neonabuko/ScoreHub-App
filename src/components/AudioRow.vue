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
            <button class="song-title-button">{{ removeAudioExtensions(song.name) }}</button>
            <div class="song-details">
              {{ song.author ? song.author : 'Unknown' }} ·
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
    <audio autoplay id="player" ref="player" @timeupdate="updateProgress" :src="currentSong">
    </audio>
    <input type="range" id="progress-bar" :value="progress" @input="seek">
    <div id="time">
      <div class="current-time">
        {{ formatTime(currentTime) }}
      </div>
      <div class="total-time text-end" >
        {{ formatTime(totalTime) }}
      </div>
    </div>
    <div class="play-button">
      <button class="btn border-0">
        <i id="play-button-icon" ref="playButtonIcon" :class="iconClass()" @click="playPause"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import handleSongs from '../scripts/handleSongs.js'
import general from '../scripts/general.js'

export default {
  data() {
    return {
      isPlaying: false,
      progress: 0,
      currentTime: '',
      totalTime: '',
      songSelected: false,
      songsFiltered: []
    }
  },
  computed: {
    ...mapState(['songs', 'loading', 'currentSong']),
  },
  methods: {
    ...handleSongs.methods,
    ...general.methods,
    ...mapActions(['fetchAllSongDataAsync', 'fetchCurrentSongAsync']),

    iconClass() {
      return this.isPlaying ? 'fas fa-circle-pause fa-3x' : 'fas fa-circle-play fa-3x'
    },

    playPause() {
      const audio = this.$refs.player
      if (this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      this.isPlaying = !this.isPlaying
    },

    updateProgress() {
      const audio = this.$refs.player
      this.totalTime = Math.round(audio.duration)
      const progress = (audio.currentTime / audio.duration) * 100
      this.progress = isNaN(progress) ? 0 : progress
      this.currentTime = audio.currentTime
    },

    seek(event) {
      const audio = this.$refs.player
      const seekTime = (event.target.value / 100) * audio.duration
      audio.currentTime = seekTime
    }

  },
  mounted() {
    this.getAllSongDataAsync()
  }
}
</script>
