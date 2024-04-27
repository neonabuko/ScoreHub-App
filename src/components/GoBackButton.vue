<template>
    <button class="btn go-back-button" @click="goBack()">
        <i class="fas fa-angle-left fa-2x"></i>
    </button>
</template>

<script>
import general from '../scripts/general'

export default {
    methods: {
        ...general.methods
    },
}

</script>