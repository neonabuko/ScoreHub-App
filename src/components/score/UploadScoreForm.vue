<template>
    <div class="upload-header">
        <h1>Upload score</h1>
    </div>
    <form class="upload-form" @submit.prevent="uploadScoreAsync" method="post" enctype="multipart/form-data">
        <input class="form-control" name="score-upload" ref="scorefile" type="file">
        <input class="form-control" placeholder="Title" type="text" name="Name" ref="scoreTitle">
        <input class="form-control" placeholder="Author" type="text" name="Author" ref="scoreAuthor">
        <button class="btn btn-primary" type="submit">
            Upload
        </button>
        <div class="progress-header-div">
          <h2 id="progress-header" class="upload-progress"></h2>
        </div>
    </form>
</template>

<script>
import handleScores from '../../scripts/handleScores';

export default {
    methods: {
        ...handleScores.methods
    },
}

</script>