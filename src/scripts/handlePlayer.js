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
                this.$store.state.totalTime = Math.round(audio.duration)
                const progress = (audio.currentTime / audio.duration) * 100
                this.$store.state.progress = isNaN(progress) ? 0 : progress
                this.$store.state.currentTime = audio.currentTime
                if (audio.duration === audio.currentTime) {
                    this.$store.state.currentTime = this.$store.state.totalTime
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