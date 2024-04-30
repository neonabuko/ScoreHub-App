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
        <div class="file-grid" v-for="(score, index) in scores" :key="index" :id="score.name">
            <div class="file-inner-grid">
                <div class="file-title">
                    <i class="fas fa-file fa-2x music-icon"></i>
                    <div class="file-title-inner">
                        <button class="file-title-button">
                            {{ score.title }}
                        </button>
                        <div class="file-details">
                            <div class="file-name-div">
                                {{ score.name }}
                            </div>
                            ·
                            <div class="file-author-div">
                                {{ score.author ? score.author : "Unknown" }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="file-edit">
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
