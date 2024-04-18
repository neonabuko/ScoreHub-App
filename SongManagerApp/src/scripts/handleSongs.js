import { API_URL } from "./variables";
import axios from "axios";

export default {
  methods: {
    async uploadSongAsync() {
      this.uploading = true;
      let fileInput = this.$refs.fileInput;
      if (fileInput.files.length > 0) {
          let formData = new FormData();
          formData.append("file", fileInput.files[0]);
          await axios
              .post(API_URL + "/upload", formData)
          this.uploading = false;
      }
  },
  }
}
