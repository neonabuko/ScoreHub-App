<template>
  <button class="btn btn-sm" id="btn-goBack" @click="goBack()">
    <i class="fas fa-angle-left fa-2x"></i>
  </button>
  <main class="container upload-container">
    <UploadForm></UploadForm>
  </main>
</template>

<script>
import UploadForm from '../components/UploadForm.vue';
import general from '../scripts/general';

export default {
  components: {
    UploadForm: UploadForm,
  },
  methods: {
    ...general.methods
  },
}
</script>
