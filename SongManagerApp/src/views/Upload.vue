<template>
  <main class="container upload-container">
    <UploadForm></UploadForm>
  </main>
</template>

<script>
import UploadForm from '../components/UploadForm.vue';

export default {
  components: {
    UploadForm: UploadForm,
  }
}
</script>
