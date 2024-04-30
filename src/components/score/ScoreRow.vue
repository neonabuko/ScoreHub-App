<template>
    <main>
        <div :class="uploadButtonClass">
            <router-link to="/scores/upload" class="btn upload-score-button">
                <i class="fas fa-cloud-upload"></i>
                {{ uploadButtonText }}
            </router-link>
        </div>
        <div class="audio-grid" v-for="(score, index) in scores" :key="index" :id="score.name">
            <div class="audio-inner-grid">
                <div class="song-title">
                    <i class="fas fa-file fa-2x music-icon"></i>
                    <div class="song-title-inner">
                        <button class="song-title-button">
                            {{ score.title }}
                        </button>
                        <div class="score-details">
                            <div class="score-name-div">
                                {{ score.name }}
                            </div>
                            ·
                            <div class="score-author-div">
                                {{ score.author ? score.author : "Unknown" }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="song-edit">
                    <router-link :to="{ path: '/scores/edit' + score.name }" class="btn">
                        <i class="fas fa-ellipsis-v"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import handleScores from '../../scripts/handleScores';

export default {
    data() {
        return {
            scores: '',
            uploadButtonClass: '',
            uploadButtonText: ''
        }
    },
    methods: {
        ...handleScores.methods,
        handleUploadButtonState() {
            this.uploadButtonClass = this.scores.length > 0 ? 'upload-score-button-div' : 'no-content'
            this.uploadButtonText = this.scores.length > 0 ? '' : 'Upload the first score'
        }
    },
    mounted() {
        this.getAllScoreDataAsync().then(() => {
            this.handleUploadButtonState()
        })
        
    },
}
</script>
