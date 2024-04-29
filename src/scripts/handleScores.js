import createVerovioModule from 'verovio/wasm'
import { VerovioToolkit } from 'verovio/esm'
import { API_URL } from './variables'
import axios from 'axios'

export default {
    methods: {
        async uploadScoreAsync() {
            let scoreFile = this.$refs.scorefile.files[0]
            let scoreName = this.$refs.scoreName.value
            let scoreAuthor = this.$refs.scoreAuthor.value

            let scoreFileFormData = new FormData()
            scoreFileFormData.append("scoreFile", scoreFile)
            let response = await axios.post(API_URL + '/scores', scoreFileFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                  }
            })
            console.log('Uploaded', scoreName, 'score file.');
            if (response.status === 201) {
                let scoreFormData = new FormData()
                scoreFormData.append("name", scoreName)
                scoreFormData.append("author", scoreAuthor)

                let response = axios.post(API_URL + '/scores/data', scoreFormData)
                if (response.ok) {
                    console.log('Uploaded', scoreName, 'score data.');
                }
            }
        },
        async getAllScoresAsync() {
            let response = await axios.get(API_URL + '/scores')
            this.scores = response.data
        },
        async getScoreAsync(name) {
            const VerovioModule = await createVerovioModule()
            this.verovioToolkit = new VerovioToolkit(VerovioModule)

            const response = await axios.get(API_URL + `/scores/${name}`)

            const musicxml = await response.data

            this.verovioToolkit.loadData(musicxml, { format: 'xml' })

            this.totalPages = this.verovioToolkit.getPageCount()

            this.renderPage(this.currentPage)
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