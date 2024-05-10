<template>
    <main>
        <div class="no-content" v-if="!loading && scores.length === 0">
            <router-link to="/scores/upload" class="btn btn-primary">
                <i class="fas fa-cloud-upload m-1"></i>
                Upload first score
            </router-link>
        </div>
        <UploadCloudButton route="/scores/upload" v-else></UploadCloudButton>
        <Spinner v-if="loading"></Spinner>
        <div class="file-grid" v-for="(score, index) in scores" :key="index" :id="score.name">
            <div class="file-inner-grid">
                <router-link :to="{ path: '/score/' + score.name }" class="file-title">
                    <i class="fas fa-folder fa-2x score-icon"></i>
                    <div class="file-title-inner" :title="score.name">
                        <button class="file-title-button">
                            {{ score.title }}
                        </button>
                        <div class="file-details">
                            <div class="file-author-div">
                                {{ score.author ? score.author : "Unknown" }}
                            </div>
                        </div>
                        <div class="file-published-at-div">
                            {{ formatDateTime(score.publishedAt) }}
                        </div>
                    </div>
                </router-link>
                <div class="file-edit">
                    <router-link :to="{ path: '/scores/edit' + score.id }" class="btn">
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
import general from '../../scripts/general'

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
        ...general.methods
    },
    mounted() {
        this.getAllScoreDataAsync()
    },
}
</script>
