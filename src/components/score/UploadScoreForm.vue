<template>
    <div class="upload-header">
        <i class="fas fa-file fa-2x score-icon"></i>
        <h1 class="form-label">Upload a score</h1>
    </div>
    <div class="upload-form-div">
        <form class="upload-form" @submit.prevent="prepareUpload" method="post" enctype="multipart/form-data">
            <label for="title-input" class="edit-form-label">Title</label>
            <input class="form-control" id="title-input" type="text" name="title" ref="scoreTitle">
            <label for="author-input" class="edit-form-label">Author</label>
            <input class="form-control" id="author-input" type="text" name="author" ref="scoreAuthor">

            <div class="file-input-wrapper">
                <input type="file" accept=".mei" id="file-input" class="file-input-hidden" ref="scoreFile" aria-describedby="fileHelpId"
                    @change="onFileSelected">
                <button class="btn btn-outline-secondary text-white w-100" id="select-file-button" @click="selectFile" type="button">
                    <i class="fas fa-file" v-if="selectedFileName !== 'Choose file'"></i>
                    {{ selectedFileName }}
                </button>
            </div>

            <button class="btn btn-primary" id="submit-button" type="submit" value="Upload" :disabled="uploading">
                {{ upload.at(uploading) }}
            </button>
            <div class="progress-header-div">
                <h2 id="progress-header" class="upload-progress"></h2>
            </div>
        </form>
    </div>

    <div id="fileHelpId" class="form-text text-center">Only <strong>mei</strong> files are accepted.</div>
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
            progressHeader: '',
            selectedFile: '',
            selectedFileName: 'Choose file',
            baseRoute: '/scores'
        }
    },
    methods: {
        ...handleSongs.methods,

        prepareUpload() {
            const file = this.selectedFile
            const name = file.name
            const title = this.$refs.scoreTitle.value
            const author = this.$refs.scoreAuthor.value
            const publishedAt = new Date().toISOString()

            const scoreDto = this.createScoreDto(name, title, author, publishedAt)
            this.uploadAsync(file, scoreDto)
        }
    },
    mounted() {
        this.progressHeader = document.getElementById('progress-header')
    },
}

</script>