<template>
    <main class="edit-container">
        <div class="edit-header-div">
            <h1 class="edit-header">{{ songName }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="prepareUpdate" method="post" enctype="multipart/form-data">
                <input type="hidden" name="name" :value="songName" ref="name">
                <label for="title" class="edit-form-label">Title</label>
                <input type="text" name="title" :value="title" class="form-control" ref="title">
                <label for="author" class="edit-form-label">Author</label>
                <input type="text" name="author" :value="author" class="form-control" ref="author">
                <button type="submit" class="btn btn-primary edit-submit-button">Submit</button>
            </form>
            <button type="submit" class="btn btn-danger" @click="deleteAsync(songName, '/songs')">Delete</button>
        </div>
    </main>
</template>

<script>
import handleSongs from '../../scripts/handleSongs'
import general from '../../scripts/general'
import axios from 'axios'
import { API_URL } from '../../scripts/variables'
import { mapActions } from 'vuex'

export default {
    data() {
        return {
            songName: this.$route.params.name,
            title: '',
            author: ''
        }
    },
    methods: {
        ...handleSongs.methods,
        ...general.methods,
        ...mapActions(["fetchAllSongDataAsync"]),
        
        async getSongAuthor(songName) {
            let response = await axios.get(API_URL + `/songs/${songName}/data`)
            this.title = response.data.title
            this.author = response.data.author
        },

        prepareUpdate() {
            let name = this.songName
            let title = this.$refs.title.value
            let author = this.$refs.author.value

            let songEditDto = this.createEditDto(name, title, author)
            this.updateAsync('/songs', songEditDto)
        },
    },
    mounted() {
        this.getSongAuthor(this.songName)
    },
}

</script>