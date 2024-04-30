<template>
  <main>
    <div class="no-content" v-if="!loading && songs.length === 0">
      <router-link to="/songs/upload" class="btn btn-primary upload-cloud-button">
        <i class="fas fa-cloud-upload m-1"></i>
        Upload the first song
      </router-link>
    </div>
    <UploadCloudButton route="/songs/upload" v-else></UploadCloudButton>
    <Spinner v-if="loading"></Spinner>
    <div class="file-grid" v-for="(song, index) in filteredSongs" :key="index" :id="song.name">
      <div class="file-inner-grid">
        <div class="file-title" @click="getCurrentSongAsync(song.name)">
          <i class="fas fa-music fa-2x music-icon"></i>
          <div class="file-title-inner">
            <button class="file-title-button">
              {{ song.title }}
            </button>
            <div class="file-details">
              {{ song.author ? song.author : "Unknown" }} ·
              {{ formatTimeSpan(song.duration) }}
            </div>
          </div>
        </div>
        <div class="file-edit">
          <router-link :to="{ path: '/songs/edit' + song.name }" class="btn">
            <i class="fas fa-ellipsis-v"></i>
          </router-link>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import { mapActions, mapState } from "vuex"
import handleSongs from "../../scripts/handleSongs.js"
import Player from "./Player.vue"
import UploadCloudButton from "../UploadCloudButton.vue"
import Spinner from "../Spinner.vue"

export default {
  components: {
    Player: Player,
    UploadCloudButton: UploadCloudButton,
    Spinner: Spinner
  },
  data() {
    return {
      songsFiltered: []
    }
  },
  computed: {
    ...mapState(["songs", "filteredSongs", "loading"]),
  },
  methods: {
    ...handleSongs.methods,
    ...mapActions(["fetchAllSongDataAsync"]),
  },
  mounted() {
    this.getAllSongDataAsync()
  },
}
</script>
