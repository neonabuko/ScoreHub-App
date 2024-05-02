import createVerovioModule from 'verovio/wasm'
import { VerovioToolkit } from 'verovio/esm'
import { API_URL } from './variables'
import axios from 'axios'

export default {
    methods: {
        async getAllScoreDataAsync() {
            this.loading = true
            let response = await axios.get(API_URL + '/scores/data')
            this.scores = response.data
            this.loading = false
        },
        async getScoreAsync(name) {
            this.loading = true
            const VerovioModule = await createVerovioModule()
            this.verovioToolkit = new VerovioToolkit(VerovioModule)

            const response = await axios.get(API_URL + `/scores/${name}`)

            const musicxml = await response.data

            this.verovioToolkit.loadData(musicxml, { format: 'xml' })

            this.totalPages = this.verovioToolkit.getPageCount()

            this.renderPage(this.currentPage)
            this.loading = false
        },
        renderPage(pageNumber) {
            const svg = this.verovioToolkit.renderToSVG(pageNumber, {})
            const notationDiv = document.getElementById('score')
            notationDiv.innerHTML = svg
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.loading = true

                this.currentPage++
                this.renderPage(this.currentPage)
                
                this.loading = false
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.loading = true

                this.currentPage--
                this.renderPage(this.currentPage)

                this.loading = false
            }
        },
    },
}