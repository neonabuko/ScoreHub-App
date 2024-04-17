import { API_URL } from "./variables";
import axios from "axios";

export default {
  methods: {
    async fetchAllSongsAsync() {
      this.loading = true;
      await axios.get(API_URL + "/songs").then(async (response) => {
        this.songs = await response.data;
        console.log("Fetched", this.songs.length, "songs.");
        this.loading = false;
      });
    },

    async uploadSongAsync() {
      this.uploading = true;
      let fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
        let formData = new FormData();
        formData.append("file", fileInput.files[0]);
        await axios
          .post(API_URL + "/upload", formData)
          .then(async () => await this.fetchAllSongsAsync());
        this.uploading = false;
      }
    },

    audioSeek() {
      const audioElements = document.querySelectorAll(".custom-audio");

      audioElements.forEach((audio) => {
        audio.addEventListener("click", function (e) {
          const boundingRect = this.getBoundingClientRect();
          const offsetX = e.clientX - boundingRect.left;
          const width = boundingRect.width;
          const seekPercentage = offsetX / width;
          const seekTime = seekPercentage * this.duration;

          this.currentTime = seekTime;
        });
      });
    },
  },
};
