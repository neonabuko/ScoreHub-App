<template>
    <GoBackButton></GoBackButton>
    <EditSongForm></EditSongForm>
</template>

<script>
import EditSongForm from '../components/EditSongForm.vue';
import GoBackButton from '../components/GoBackButton.vue';
import general from '../scripts/general';

export default {
    components: {
        EditSongForm: EditSongForm,
        GoBackButton: GoBackButton
    },
    methods: {
        ...general.methods
    },
}
</script>