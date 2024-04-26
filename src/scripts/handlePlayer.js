export default {
    methods: {
        setPlayPauseIcon() {
            return this.isPlaying
                ? "fas fa-pause fa-3x"
                : "fas fa-play fa-3x"
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
            if (audio) {
                this.totalTime = Math.round(audio.duration)
                const progress = (audio.currentTime / audio.duration) * 100
                this.progress = isNaN(progress) ? 0 : progress
                this.currentTime = audio.currentTime
                if (audio.duration === audio.currentTime) {
                    this.currentTime = this.totalTime
                    this.isPlaying = false
                }
            }
        },

        seek(event) {
            const audio = this.$refs.player
            const seekTime = (event.target.value / 100) * audio.duration
            audio.currentTime = seekTime
        },
    },
}