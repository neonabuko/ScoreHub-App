<template>
    <main class="edit-container">
        <h1>{{ name.replace(/\.mp3$/, '') }}</h1>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="" method="post" enctype="multipart/form-data">
                <input type="text" name="Title" placeholder="Title" id="" class="form-control">
                <input type="text" name="Author" placeholder="Author" id="" class="form-control">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="submit" class="btn btn-danger" @click="deleteSongAsync(name)">Delete</button>
            </form>
        </div>
    </main>
</template>

<script>
import handleSongs from '../scripts/handleSongs'

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