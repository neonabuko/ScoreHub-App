<template>
    <main class="container edit-container">
        <div class="edit-header">
            <h1>{{ scoreName }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="" method="post" enctype="multipart/form-data">
                <input type="text" name="title" placeholder="Title" :value="scoreTitle" class="form-control" ref="scoreTitle">
                <input type="text" name="author" placeholder="Author" :value="scoreAuthor" class="form-control" ref="scoreAuthor">
                <button type="submit" class="btn btn-primary">Submit</button>
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