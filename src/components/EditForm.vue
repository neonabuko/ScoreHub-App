<template>
    <main class="container edit-container">
        <div class="edit-header">
            <h1>{{ songName.replace(/\.mp3$/, '') }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="updateSongAsync" method="post" enctype="multipart/form-data">
                <input type="hidden" name="name" id="" :value="songName" ref="name">
                <input type="text" name="title" placeholder="Title" id="" :value="title" class="form-control" ref="title">
                <input type="text" name="author" placeholder="Author" :value="author" id="" class="form-control" ref="author">
                <button type="submit" class="btn btn-primary">Submit</button>
                <button type="submit" class="btn btn-danger" @click="deleteSongAsync(songName)">Delete</button>
            </form>
        </div>
    </main>
</template>

<script>
import handleSongs from '../scripts/handleSongs'
import general from '../scripts/general'
import axios from 'axios'
import { API_URL } from '../scripts/variables'
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
            let response = await axios.get(API_URL + "/songs/data/" + songName)
            this.title = response.data.title
            this.author = response.data.author
        },
    },
    mounted() {
        this.getSongAuthor(this.songName)
    },
}

</script>