import createVerovioModule from 'verovio/wasm';
import { VerovioToolkit } from 'verovio/esm';

export default {
    methods: {
        async fetchScore() {
            const VerovioModule = await createVerovioModule();
            this.verovioToolkit = new VerovioToolkit(VerovioModule);

            const response = await fetch('/credo.musicxml');

            const musicXML = await response.text();

            this.verovioToolkit.loadData(musicXML, { format: 'xml' });

            this.totalPages = this.verovioToolkit.getPageCount();

            this.renderPage(this.currentPage);
        },
        renderPage(pageNumber) {
            const svg = this.verovioToolkit.renderToSVG(pageNumber, {});
            const notationDiv = document.getElementById('score');
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
}