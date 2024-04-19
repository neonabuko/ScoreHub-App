<template>
    <div class="container text-center mt-3">
        <h1>{{ name.replace(/\.mp3$/, '') }}</h1>
        <button class="btn btn-danger" @click="deleteSong(name)">Delete</button>
    </div>
</template>

<script>
import handleSongs from '../scripts/handleSongs';

export default {
    data() {
        return {
            name: this.$route.params.name
        }
    },
    methods: {
        ...handleSongs.methods
    },
}
</script>