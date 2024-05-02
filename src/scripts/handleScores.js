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
            createVerovioModule().then(async (VerovioModule) => {
                this.verovioToolkit = new VerovioToolkit(VerovioModule)
                const response = await axios.get(API_URL + `/scores/${name}`)
                const score = await response.data
                this.verovioToolkit.loadData(score, { format: 'mei' })
                this.totalPages = this.verovioToolkit.getPageCount()
                this.renderPage(this.currentPage)
                this.loading = false
            })
            
        },
        renderPage(pageNumber) {
            const svg = this.verovioToolkit.renderToSVG(pageNumber, {})
            const notationDiv = document.getElementById('score')
            notationDiv.innerHTML = svg
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++
                this.renderPage(this.currentPage)
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--
                this.renderPage(this.currentPage)
            }
        },
    },
}