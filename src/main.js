import { createApp } from "vue"
import "./style.css"
import "./components/Navbar.css"
import "./components/UploadForm.css"
import "./components/FileRow.css"
import "./components/song/SongRow.css"
import "./components/EditForm.css"
import "./components/song/Player.css"
import "./components/score/Score.css"
import "./components/score/ScoreRow.css"
import App from "./App.vue"
import router from "./router/index.js"
import { createStore } from "vuex"
import axios from "axios"
import { API_URL } from "./scripts/variables.js"

const store = createStore({
    state() {
        return {
            //songs
            songs: [],
            filteredSongs: '',
            currentSongUrl: '',
            currentSongName: '',
            isSongSelected: false,
            isLoadingSongs: false,
            isPlaying: false,
            playProgress: 0,
            currentPlayTime: 0,
            totalPlayTime: 0,

            //scores
            isLoadingScores: false,
            scores: []
        }
    },
    actions: {
        async fetchAllDataAsync({state}, uri) {
            let response = await axios.get(API_URL + uri)
            return await response.data
        },
    },
    mutations: {
        //songs
        setSongs(state, songs) {
            state.songs = songs
        },
        filterSongs(state, songs) {
            state.filteredSongs = songs
        },
        resetPlayer(state) {
            state.currentSongUrl = ''
            state.isPlaying = false
            state.isSongSelected = false
            state.playProgress = 0
            state.currentPlayTime = 0
            state.totalPlayTime = 0
        },
        startPlayer(state, { currentSongUrl, currentSongName }) {
            state.currentSongUrl = currentSongUrl
            state.currentSongName = currentSongName
            state.isSongSelected = true
            state.isPlaying = true
        },

        //scores
        setScores(state, scores) {
            state.scores = scores
        }
    }
})

createApp(App).use(router).use(store).mount("#app")
