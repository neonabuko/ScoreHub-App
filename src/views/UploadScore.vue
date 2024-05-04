<template>
    <GoBackButton/>
    <main class="container upload-container">
        <UploadScoreForm/>
    </main>
</template>

<script>
import UploadScoreForm from '../components/score/UploadScoreForm.vue'
import GoBackButton from '../components/GoBackButton.vue';
import general from '../scripts/general';

export default {
    components: {
        UploadScoreForm,
        GoBackButton
    },
    methods: {
        ...general.methods
    },
}
</script>