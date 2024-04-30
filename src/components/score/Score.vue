<template>
    <div>
        <div class="navigation">
            <button class="btn" @click="prevPage" :disabled="currentPage <= 1">
                <i class="fas fa-arrow-left"></i>
            </button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn" @click="nextPage" :disabled="currentPage >= totalPages">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div id="score" class="bg-white"></div>
    </div>
</template>

<script>
import handleScores from '../scripts/handleScores'

export default {
    data() {
        return {
            verovioToolkit: null,
            currentPage: 1,
            totalPages: 0,
        }
    },
    methods: {
        ...handleScores.methods
    },
    mounted() {
        this.fetchScore()
    },
}
</script>