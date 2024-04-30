<template>
    <GoBackButton></GoBackButton>
    <EditScoreForm></EditScoreForm>
</template>

<script>
import EditScoreForm from '../components/score/EditScoreForm.vue'
import GoBackButton from '../components/GoBackButton.vue'
import general from '../scripts/general'

export default {
    components: {
        EditScoreForm: EditScoreForm,
        GoBackButton: GoBackButton
    },
    methods: {
        ...general.methods
    },
}
</script>