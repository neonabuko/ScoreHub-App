<template>
    <main class="score-container">
        <Spinner v-if="loading"></Spinner>
        <div class="navigation">
            <button class="btn" @click="prevPage" :disabled="currentPage <= 1">
                <i class="fas fa-arrow-left fa-2x"></i>
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn" @click="nextPage" :disabled="currentPage >= totalPages">
                <i class="fas fa-arrow-right fa-2x"></i>
            </button>
        </div>
        <div id="score" class="bg-white"></div>
    </main>
</template>

<script>
import handleScores from '../../scripts/handleScores'
import Spinner from '../Spinner.vue'

export default {
    components: {
        Spinner: Spinner
    },
    data() {
        return {
            name: this.$route.params.name,
            verovioToolkit: null,
            currentPage: 1,
            totalPages: 0,
            loading: false
        }
    },
    methods: {
        ...handleScores.methods
    },
    mounted() {
        this.getScoreAsync(this.name)
    },
}
</script>