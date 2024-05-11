<template>
    <main class="edit-container">
        <div class="edit-header-div">
            <h1 class="edit-header">{{ name }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" name="edit-song-form" @submit.prevent="prepareUpdate" method="post"
                enctype="multipart/form-data">
                <label for="title" class="edit-form-label">Title</label>
                <input type="text" name="title" :value="title" class="form-control" ref="title">
                <label for="author" class="edit-form-label">Author</label>
                <input type="text" name="author" :value="author" class="form-control" ref="author">
                <button type="submit" class="btn btn-primary edit-submit-button">Submit</button>
            </form>
            <button type="submit" class="btn btn-danger" @click="deleteAsync()">Delete</button>
        </div>
    </main>
</template>

<script>
import handleScores from '../../scripts/handleScores'
import handleMusic from '../../scripts/handleMusic'
import general from '../../scripts/general'

export default {
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            title: '',
            author: '',
            baseRoute: '/scores'
        }
    },
    methods: {
        ...handleScores.methods,
        ...handleMusic.methods,
        ...general.methods,

        prepareUpdate() {
            let id = this.id
            
            let name = this.name
            let title = this.$refs.title.value
            let author = this.$refs.author.value

            let songEditDto = this.createEditDto(id, name, title, author)
            this.updateAsync(songEditDto)
        },
    },
    mounted() {
        this.getMetadata()
    },
}

</script>