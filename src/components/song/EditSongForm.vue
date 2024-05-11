<template>
    <main class="edit-container">
        <div class="edit-header-div">
            <h1 class="edit-header">{{ name }}</h1>
        </div>
        <div class="edit-form-div">
            <form class="edit-form" name="edit-song-form" @submit.prevent="prepareUpdate" method="post"
                enctype="multipart/form-data">
                <input type="hidden" name="name" :value="name" ref="name">
                <label for="title-input" class="edit-form-label">Title</label>
                <input type="text" id="title-input" name="title" :value="title" class="form-control" ref="title">
                <label for="author-input" class="edit-form-label">Author</label>
                <input type="text" id="author-input" name="author" :value="author" class="form-control" ref="author">
                <button type="submit" class="btn btn-primary edit-submit-button">Submit</button>
            </form>
            <button type="submit" class="btn btn-danger" @click="deleteAsync()">Delete</button>
        </div>
    </main>
</template>

<script>
import handleMusic from '../../scripts/handleMusic'
import general from '../../scripts/general'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            id: this.$route.params.id,
            name: '',
            title: '',
            author: '',
            baseRoute: '/songs'
        }
    },
    computed: {
        ...mapState(["songs"]),
    },
    methods: {
        ...handleMusic.methods,
        ...general.methods,
        ...mapActions(["fetchAllDataAsync"]),

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