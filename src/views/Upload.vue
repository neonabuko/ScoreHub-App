<template>
  <GoBackButton></GoBackButton>
  <main class="container upload-container">
    <UploadForm></UploadForm>
  </main>
</template>

<script>
import GoBackButton from '../components/GoBackButton.vue';
import UploadForm from '../components/UploadForm.vue';
import general from '../scripts/general';

export default {
  components: {
    UploadForm: UploadForm,
    GoBackButton: GoBackButton
  },
  methods: {
    ...general.methods
  },
}
</script>
