<template>
    <main>
        <div class="loading-container" v-if="loading">
            <div class="spinner"></div>
        </div>
        <div class="audio-grid" v-for="(score, index) in scores" :key="index" :id="score.name">
            <div class="audio-inner-grid">
                <div class="song-title">
                    <i class="fas fa-file fa-2x music-icon"></i>
                    <div class="song-title-inner">
                        <button class="song-title-button">
                            {{ score.title }}
                        </button>
                        <div class="song-details">
                            {{ score.author ? score.author : "Unknown" }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            scores: {
                file1: {title: 'Score', author: 'Miras'},
                file2: {title: 'Score', author: 'Miras'},
                file3: {title: 'Score', author: 'Miras'}
            }
        }
    },
}
</script>