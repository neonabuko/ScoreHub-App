import { createApp } from "vue";
import "./style.css";
import "./components/Navbar.css"
import "./components/UploadForm.css"
import "./components/AudioRow.css"
import App from "./App.vue";
import router from "./router/index.js";
import { createStore } from "vuex";
import axios from "axios";
import { API_URL } from "./scripts/variables.js";

const store = createStore({
    state() {
        return {
            songs: [],
            loading: false
        };
    },
    actions: {
        async fetchAllSongsAsync() {
            let response = await axios.get(API_URL + "/songs")
            let songs = await Promise.all(
                response.data.map(async (song) => {
                    song.url = API_URL + song.url
                    return song
                })
            )
            
            console.log("Fetched", songs.length, "songs.")
            return songs
        },
    },
    mutations: {
        setSongs(state, songs) {
            state.songs = songs
        }
    }
});

createApp(App).use(router).use(store).mount("#app");
