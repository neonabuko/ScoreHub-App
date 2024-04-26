<template>
    <div class="player-controls" v-if="songSelected">
        <audio preload="metadata" autoplay id="player" ref="player" @timeupdate="updateProgress"
            :src="currentSongUrl"></audio>
        <input type="range" id="progress-bar" step="0.1" :value="progress" @input="seek" />
        <div id="time">
            <div class="current-time">
                {{ formatAudioTime(currentTime) }}
            </div>
            <div class="total-time text-end">
                {{ formatAudioTime(totalTime) }}
            </div>
        </div>
        <div class="play-button-div">
            <button class="btn play-button">
                <i id="play-button-icon" ref="playButtonIcon" :class="setPlayPauseIcon()" @click="playPause"></i>
            </button>
            <div class="close-player-div">
                <button class="btn close-player" @click="resetPlayer">
                    <i class="fas fa-x"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import handlePlayer from '../scripts/handlePlayer'
import handleSongs from '../scripts/handleSongs'

export default {
    computed: {
    ...mapState(["currentSongUrl", "songSelected", "isPlaying", "progress", "currentTime", "totalTime"]),
  },
  methods: {
    ...handleSongs.methods,
    ...handlePlayer.methods,
  },
}
</script>