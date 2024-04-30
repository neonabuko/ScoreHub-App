<template>
    <main>
        <div class="no-content" v-if="!loading && scores.length === 0">
            <router-link to="/scores/upload" class="btn btn-primary upload-score-button">
                <i class="fas fa-cloud-upload m-1"></i>
                Upload first score
            </router-link>
        </div>
        <UploadCloudButton route="/scores/upload" v-if="!loading && scores.length > 0"></UploadCloudButton>
        <Spinner v-if="loading"></Spinner>
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
import handleScores from '../../scripts/handleScores'
import Spinner from '../Spinner.vue'
import UploadCloudButton from '../UploadCloudButton.vue'

export default {
    data() {
        return {
            scores: '',
            loading: false
        }
    },
    components: {
        UploadCloudButton: UploadCloudButton,
        Spinner: Spinner
    },
    methods: {
        ...handleScores.methods,
    },
    mounted() {
        this.getAllScoreDataAsync()
    },
}
</script>
