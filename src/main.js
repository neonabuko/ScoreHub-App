import { createApp } from "vue";
import "./style.css";
import "./components/Navbar.css"
import "./components/UploadForm.css"
import "./components/AudioRow.css"
import "./components/EditForm.css"
import App from "./App.vue";
import router from "./router/index.js";
import { createStore } from "vuex";
import axios from "axios";
import { API_URL } from "./scripts/variables.js";

const store = createStore({
    state() {
        return {
            songs: [],
            currentSong: '',
            loading: false
        };
    },
    actions: {
        async fetchAllSongDataAsync() {
            let response = await axios.get(API_URL + "/songs")
            return await response.data
        },
    },
    mutations: {
        setSongs(state, songs) {
            state.songs = songs
        },
        setCurrentSong(state, currentSong) {
            state.currentSong = currentSong
        }
    }
});

createApp(App).use(router).use(store).mount("#app");
