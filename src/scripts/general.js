export default {
    methods: {
        goBack() {
            window.history.back()
        },

        async getAudioDurationAsync(file) {
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
                this.$store.commit('filterSongs', allSongs)
                return
            }
            const query = this.searchQuery.toLowerCase()
            let filtered = allSongs.filter(song => song.title.toLowerCase().includes(query))
            this.$store.commit('filterSongs', filtered)
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

        formatTimeSpan(timeSpan) {
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

        formatAudioTime(time) {
            const hours = Math.floor(time / 3600)
            const minutes = Math.floor((time % 3600) / 60)
            const seconds = Math.floor(time % 60)
            
            if (hours > 0) {
              return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            } else {
              return `${minutes}:${String(seconds).padStart(2, '0')}`
            }
          },

        updateAudioRowColor(newSongName) {
            let previousSongName = this.$store.state.currentSongName
            if (previousSongName !== '') {
                let previousAudioRow = document.getElementById(previousSongName)
                if (previousAudioRow) {
                    previousAudioRow.style.backgroundColor = "#212529"
                }
            }

            let currentAudioRow = document.getElementById(newSongName)
            if (currentAudioRow) currentAudioRow.style.backgroundColor = '#9c65d736'
        },

        selectFile() {
            this.$refs.scoreFile.click();
        },
        
        onFileSelected(event) {
            const file = event.target.files[0];
            this.selectedFile = file
            this.selectedFileName = file.name
            let button = document.getElementById('select-file-button')
            button.classList.replace('btn-outline-success', 'btn-success')
        },        

    },
}