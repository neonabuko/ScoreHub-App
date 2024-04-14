import { API_URL } from "./variables";
import axios from "axios";

export default {
  methods: {
    async fetchAllSongsAsync() {
      await axios.get(API_URL + "/songs").then(async (response) => {
        this.songs = await response.data;
        console.log("ok");
      })
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
    }
  }
}
