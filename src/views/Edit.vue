<template>
    <GoBackButton></GoBackButton>
    <EditForm></EditForm>
</template>

<script>
import EditForm from '../components/EditForm.vue';
import GoBackButton from '../components/GoBackButton.vue';
import general from '../scripts/general';

export default {
    components: {
        EditForm: EditForm,
        GoBackButton: GoBackButton
    },
    methods: {
        ...general.methods
    },
}
</script>