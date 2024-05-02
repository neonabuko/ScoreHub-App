<template>
    <div class="upload-header">
        <i class="fas fa-file fa-2x score-icon"></i>
        <h1 class="form-label">Upload a score</h1>
    </div>
    <div class="upload-form-div">
        <form class="upload-form" @submit.prevent="prepareUploadAsync" method="post" enctype="multipart/form-data">
            <label for="title" class="edit-form-label">Title</label>
            <input class="form-control" placeholder="Title" type="text" name="title" ref="scoreTitle">
            <label for="author" class="edit-form-label">Author</label>
            <input class="form-control" placeholder="Author" type="text" name="author" ref="scoreAuthor">

            <div class="file-input-wrapper">
                <label for="file" class="edit-form-label">File</label>
                <input type="file" class="file-input-hidden" ref="scoreFile" aria-describedby="fileHelpId"
                    @change="onFileSelected">
                <button class="btn btn-outline-success text-white w-100" id="select-file-button" @click="selectFile" type="button">
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
            progressHeader: '',
            selectedFileName: 'Choose file'
        }
    },
    methods: {
        ...handleSongs.methods,

        selectFile() {
            this.$refs.scoreFile.click();
        },
        onFileSelected(event) {
            const file = event.target.files[0];
            this.selectedFileName = file.name
            let button = document.getElementById('select-file-button')
            button.classList.replace('btn-outline-success', 'btn-success')
        },

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