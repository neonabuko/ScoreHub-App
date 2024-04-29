<template>
    <div>
        <div class="navigation">
            <button class="btn" @click="prevPage" :disabled="currentPage <= 1">Previous</button>
            <span>Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="btn" @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
        </div>
        <div id="notation" class="bg-white"></div>
    </div>
</template>

<script>
import createVerovioModule from 'verovio/wasm';
import { VerovioToolkit } from 'verovio/esm';

export default {
    data() {
        return {
            verovioToolkit: null,
            currentPage: 1,
            totalPages: 0,
        };
    },
    methods: {
        async fetchScore() {
            try {
                const VerovioModule = await createVerovioModule();
                this.verovioToolkit = new VerovioToolkit(VerovioModule);

                const response = await fetch('/credo.musicxml');

                if (!response.ok) {
                    throw new Error(`Failed to fetch MusicXML: ${response.statusText}`);
                }

                const musicXML = await response.text();

                this.verovioToolkit.loadData(musicXML, { format: 'xml' });

                this.totalPages = this.verovioToolkit.getPageCount();

                this.renderPage(this.currentPage);
            } catch (error) {
                console.error('Error in fetchScore:', error);
            }
        },
        renderPage(pageNumber) {
            const svg = this.verovioToolkit.renderToSVG(pageNumber, {});
            const notationDiv = document.getElementById('notation');
            notationDiv.innerHTML = svg;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.renderPage(this.currentPage);
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPage(this.currentPage);
            }
        },
    },
    mounted() {
        this.fetchScore();
    },
};
</script>

<style>
#notation {
    text-align: center;
}

#notation svg {
    width: 100%;
    height: 100%;
    max-width: fit-content;
    max-height: fit-content;
}

.navigation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgb(83, 34, 125);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>