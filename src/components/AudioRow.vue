<template>
  <div class="audio-grid">
    <div class="loading-container" v-if="loading">
      <div class="spinner"></div>
    </div>
    <div class="audio-grid" @click="getCurrentSongAsync(song.name).then(() =>  playPause())" v-for="(song, index) in songs" :key="index"
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
    <audio autoplay id="player" ref="player" @timeupdate="updateProgress">
      <source :src="currentSong" type="audio/mpeg">
    </audio>
    <input type="range" class="progress" :value="progress" @input="seek">
    <div class="player-button">
      <button class="btn border-0">
        <i id="play-button-icon" ref="playButtonIcon" class="fas fa-play" @click="playPause"></i>
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

    playPause() {
      console.log('playing');
      const audio = this.$refs.player
      let playButtonIcon = this.$refs.playButtonIcon
      if (this.isPlaying) {
        playButtonIcon.classList.remove('fa-pause')
        playButtonIcon.classList.add('fa-play')
        audio.pause()
      } else {
        playButtonIcon.classList.remove('fa-play')
        playButtonIcon.classList.add('fa-pause')
        audio.play()
      }
      this.isPlaying = !this.isPlaying
    },

  
    updateProgress() {
      const audio = this.$refs.player
      const progress = (audio.currentTime / audio.duration) * 100
      this.progress = isNaN(progress) ? 0 : progress
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
