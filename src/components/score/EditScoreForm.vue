<template>
    <main class="edit-container">
        <div class="edit-header-div">
            <h1 class="edit-header">{{ name }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" @submit.prevent="prepareUpdate" method="post" enctype="multipart/form-data">
                <label for="title" class="edit-form-label">Title</label>
                <input type="text" name="title" :value="title" class="form-control" ref="title">
                <label for="author" class="edit-form-label">Author</label>
                <input type="text" name="author" :value="author" class="form-control" ref="author">
                <button type="submit" class="btn btn-primary edit-submit-button">Submit</button>
            </form>
            <button type="submit" class="btn btn-danger" @click="deleteAsync(name, '/scores')">Delete</button>
        </div>
    </main>
</template>

<script>
import handleScores from '../../scripts/handleScores'
import handleSongs from '../../scripts/handleSongs'
import general from '../../scripts/general'

export default {
    data() {
        return {
            name: this.$route.params.name,
            title: '',
            author: ''
        }
    },
    methods: {
        ...handleScores.methods,
        ...handleSongs.methods,
        ...general.methods,

        prepareUpdate() {
            let name = this.name
            let title = this.$refs.title.value
            let author = this.$refs.author.value

            let songEditDto = this.createEditDto(name, title, author)
            this.updateAsync('/scores', songEditDto)
        },        
    },
    mounted() {
        this.getAuthorAsync('/scores', this.name)
    },
}

</script>