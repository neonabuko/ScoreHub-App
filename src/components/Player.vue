<template>
    <div class="player-controls" v-if="songSelected">
        <audio preload="metadata" autoplay id="player" ref="player" @timeupdate="updateProgress"
            :src="currentSong"></audio>
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
import { mapState, mapActions } from 'vuex'
import handlePlayer from '../scripts/handlePlayer'
import handleSongs from '../scripts/handleSongs'
import general from '../scripts/general'

export default {
    data() {
        return {
            progress: 0,
            currentTime: 0,
            totalTime: 0,
        }
    },
    computed: {
    ...mapState(["currentSong", "songSelected", "isPlaying"]),
  },
  methods: {
    ...handleSongs.methods,
    ...handlePlayer.methods,
    ...general.methods,
    ...mapActions(["fetchCurrentSongAsync"]),
  },
}
</script>