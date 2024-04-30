<template>
    <main>
        <div class="upload-score-button-div">
            <router-link to="/scores/upload" class="btn btn-primary">
                <i class="fas fa-cloud-upload"></i>
                Upload score
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
                <div class="delete-button-div">
                    <button class="btn btn-danger" @click="deleteScoreAsync(score.name)">Delete</button>
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
            scores: ''
        }
    },
    methods: {
        ...handleScores.methods
    },
    mounted() {
        this.getAllScoreDataAsync()
    },
}
</script>
