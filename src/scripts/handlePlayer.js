export default {
    methods: {
        setPlayPauseIcon() {
            return this.$store.state.isPlaying
                ? "fas fa-pause fa-3x"
                : "fas fa-play fa-3x"
        },

        playPause() {
            const audio = this.$refs.player
            if (this.$store.state.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
            this.$store.state.isPlaying = !this.$store.state.isPlaying
        },

        updateProgress() {
            const audio = this.$refs.player
            if (audio) {
                this.$store.state.totalPlayTime = Math.round(audio.duration)
                const playProgress = (audio.currentTime / audio.duration) * 100
                this.$store.state.playProgress = isNaN(playProgress) ? 0 : playProgress
                this.$store.state.currentPlayTime = audio.currentTime
                if (audio.duration === audio.currentTime) {
                    this.$store.state.currentPlayTime = this.$store.state.totalPlayTime
                    this.$store.state.isPlaying = false
                }
            }
        },

        seek(event) {
            const audio = this.$refs.player
            const seekTime = (event.target.value / 100) * audio.duration
            audio.currentTime = seekTime
        },

        reset(currentSongName) {
            this.$store.commit('resetPlayer')
            this.updateAudioRowColor(currentSongName)
        }
    },
}