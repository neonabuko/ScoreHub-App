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
  <div class="player-div" v-if="songSelected">
    <audio autoplay id="player" ref="player" @timeupdate="updateProgress">
      <source :src="currentSong" type="audio/mpeg">
    </audio>
  </div>
  <div class="player-controls ">
    <input type="range" class="progress" :value="progress" @input="seek">
    <div class="player-button">
      <button class="btn border-0">
        <i id="play-button-icon" class="fas fa-play" @click="playPause">
        </i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import handleSongs from '../scripts/handleSongs.js'
import general from '../scripts/general.js';

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
      const audio = this.$refs.player;
      let playButtonIcon = document.getElementById('play-button-icon')
      if (this.isPlaying) {
        audio.pause();
        playButtonIcon.classList.remove('fa-play')
        playButtonIcon.classList.add('fa-pause')
      } else {
        playButtonIcon.classList.remove('fa-pause')
        playButtonIcon.classList.add('fa-play')
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    updateProgress() {
      const audio = this.$refs.player;
      const progress = (audio.currentTime / audio.duration) * 100;
      this.progress = isNaN(progress) ? 0 : progress;
    },
    seek(event) {
      const audio = this.$refs.player;
      const seekTime = (event.target.value / 100) * audio.duration;
      audio.currentTime = seekTime;
    }

  },
  mounted() {
    this.getAllSongDataAsync()
  }
}
</script>

<style>
.progress {
  width: 100%;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-apperance: none;
  appearance: none;
  height: 5px;
}

.player-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(52, 0, 92);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
}

.player-button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  scale: 3;
}

.progress::-webkit-slider-runnable-track {
  background-color: #cc6cff;
  height: 10px;
}

.progress::-moz-range-track {
  background-color: #cc6cff;
  height: 10px;
}

.progress::-webkit-slider-thumb {
  appearance: none;
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: #ffffff;
  cursor: pointer;
}

.progress::-moz-range-thumb {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: #ffffff;
  cursor: pointer;
}
</style>