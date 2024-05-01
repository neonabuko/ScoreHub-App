<template>
    <div class="upload-header">
        <h1>Upload score</h1>
    </div>
    <form class="upload-form" @submit.prevent="prepareUploadAsync" method="post" enctype="multipart/form-data">
        <input class="form-control" name="score-upload" type="file" ref="scoreFile">
        <input class="form-control" placeholder="Title" type="text" name="Name" ref="scoreTitle">
        <input class="form-control" placeholder="Author" type="text" name="Author" ref="scoreAuthor">
        <button class="btn btn-primary" id="submit-button" type="submit" value="Upload" :disabled="uploading">
            {{ upload.at(uploading) }}
        </button>
        <div class="progress-header-div">
            <h2 id="progress-header" class="upload-progress"></h2>
        </div>
    </form>
    <div id="fileHelpId" class="form-text">Only <strong>musicxml</strong> files are accepted.</div>
</template>

<script>
import handleSongs from '../../scripts/handleSongs'

export default {
    data() {
        return {
            uploading: false,
            upload: ['Upload', 'Uploading...'],
            uploadSuccess: false,
            uploadProgress: '0%',
            progressHeader: ''
        }
    },
    methods: {
        ...handleSongs.methods,

        async prepareUploadAsync() {
            const fileInput = this.$refs.scoreFile
            const file = fileInput.files[0]

            const name = file.name
            const title = this.$refs.scoreTitle.value
            const author = this.$refs.scoreAuthor.value

            const scoreDto = this.createScoreDto(name, title, author)
            this.uploadAsync('/scores', file, scoreDto)
        }
    },
    mounted() {
        this.progressHeader = document.getElementById('progress-header')
    },
}

</script>