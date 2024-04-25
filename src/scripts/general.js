export default {
    methods: {
        goBack() {
            window.history.back()
        },

        async getAudioDuration(file) {
            return new Promise((resolve, reject) => {
                const audio = new Audio()
                audio.addEventListener('loadedmetadata', () => {
                    resolve(audio.duration)
                })
                audio.src = URL.createObjectURL(file)
            })
        },

        async filterSongs() {
            let allSongs = await this.fetchAllSongDataAsync()
            if (!this.searchQuery) {
                this.$store.commit('setSongs', allSongs)
                return
            }
            const query = this.searchQuery.toLowerCase()
            let filtered = allSongs.filter(song => song.name.toLowerCase().includes(query))
            this.$store.commit('setSongs', filtered)
        },

        removeAudioExtensions(audioName) {
            let nameWithoutMp3 = audioName.replace(/\.mp3$/i, '')
            let finalName = nameWithoutMp3.replace(/\.wav$/i, '')
            return finalName
        },

        convertSecondsToTimeSpan(seconds) {
            const timeSpan = new Date(seconds * 1000).toISOString().substr(11, 8)
            return timeSpan
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

        formatTime(time) {
            const hours = Math.floor(time / 3600);
            const minutes = Math.floor((time % 3600) / 60);
            const seconds = Math.floor(time % 60);
            
            if (hours > 0) {
              return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            } else {
              return `${minutes}:${String(seconds).padStart(2, '0')}`;
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