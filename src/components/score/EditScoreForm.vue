<template>
    <main class="edit-container">
        <div class="edit-header-div">
            <h1 class="edit-header">{{ scoreName }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="updateAsync('/scores')" method="post" enctype="multipart/form-data">
                <label for="title" class="edit-form-label">Title</label>
                <input type="text" name="title" placeholder="Title" :value="scoreTitle" class="form-control" ref="scoreTitle">
                <label for="author" class="edit-form-label">Author</label>
                <input type="text" name="author" placeholder="Author" :value="scoreAuthor" class="form-control" ref="scoreAuthor">
                <button type="submit" class="btn btn-primary edit-submit-button">Submit</button>
            </form>
            <button type="submit" class="btn btn-danger" @click="deleteAsync(scoreName, '/scores')">Delete</button>
        </div>
    </main>
</template>

<script>
import handleScores from '../../scripts/handleScores'
import handleSongs from '../../scripts/handleSongs'
import general from '../../scripts/general'
import axios from 'axios'
import { API_URL } from '../../scripts/variables'

export default {
    data() {
        return {
            scoreName: this.$route.params.name,
            scoreTitle: '',
            scoreAuthor: ''
        }
    },
    methods: {
        ...handleScores.methods,
        ...handleSongs.methods,
        ...general.methods,
        async getScoreAuthorAsync(scoreName) {
            let response = await axios.get(API_URL + `/scores/${scoreName}/data`)
            this.scoreTitle = response.data.title
            this.scoreAuthor = response.data.author
        },
    },
    mounted() {
        this.getScoreAuthorAsync(this.scoreName)
    },
}

</script>