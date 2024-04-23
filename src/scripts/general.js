export default {
    methods: {
        goBack() {
            window.history.back()
        },
        formatDuration(timeSpan) {
            let parts = timeSpan.split(':')
            let hours = parseInt(parts[0])
            let minutes = parseInt(parts[1])
            let seconds = Math.round(parseFloat(parts[2]))

            if (hours > 0) {
                return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            } else {
                return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0')
            }
        },
        updateAudioRowColor(newSongName) {
            let previousSongName = this.currentSongName
            if (previousSongName !== '') {
                let previousAudioRow = document.getElementById(previousSongName)
                if (previousAudioRow) {
                    previousAudioRow.style.backgroundColor = "#101010"
                }
            }

            let currentAudioRow = document.getElementById(newSongName)
            if (currentAudioRow) currentAudioRow.style.backgroundColor = '#9c65d736'
        }
    },
}