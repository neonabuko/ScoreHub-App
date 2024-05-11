<template>
    <div class="player-controls" v-if="isSongSelected">
        <audio preload="metadata" autoplay id="player" ref="player" @timeupdate="updateProgress"
            :src="currentSongUrl"></audio>
        <input type="range" id="progress-bar" step="0.1" :value="playProgress" @input="seek" />
        <div id="time">
            <div class="current-time">
                {{ formatAudioTime(currentPlayTime) }}
            </div>
            <div class="total-time text-end">
                {{ formatAudioTime(totalPlayTime) }}
            </div>
        </div>
        <div class="buttons-div">
            <div class="no-button-div">
                <button class="btn no-button"></button>
            </div>
            <div class="play-button-div">
                <button class="btn play-button" id="play-button">
                <i id="play-button-icon" ref="playButtonIcon" :class="setPlayPauseIcon()" @click="playPause()"></i>
            </button>
            </div>
            <button class="btn close-button-div" id="close-button" @click="reset">
                <i class="fas fa-x"></i>
            </button>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import handlePlayer from '../../scripts/handlePlayer'
import handleMusic from '../../scripts/handleMusic'

export default {
    computed: {
    ...mapState(["currentSongUrl", "isSongSelected", "playProgress", "currentPlayTime", "totalPlayTime"]),
  },
  methods: {
    ...handleMusic.methods,
    ...handlePlayer.methods,
  },
}
</script>