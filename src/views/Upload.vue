<template>
  <GoBackButton/>
  <main class="container upload-container">
    <UploadSongForm/>
  </main>
</template>

<script>
import GoBackButton from '../components/GoBackButton.vue';
import UploadSongForm from '../components/song/UploadSongForm.vue';
import general from '../scripts/general';

export default {
  components: {
    UploadSongForm,
    GoBackButton
  },
  methods: {
    ...general.methods
  },
}
</script>
