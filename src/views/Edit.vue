<template>
    <GoBackButton/>
    <EditSongForm/>
</template>

<script>
import EditSongForm from '../components/song/EditSongForm.vue'
import GoBackButton from '../components/GoBackButton.vue'
import general from '../scripts/general'

export default {
    components: {
        EditSongForm,
        GoBackButton
    },
    methods: {
        ...general.methods
    },
}
</script>