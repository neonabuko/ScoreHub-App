<template>
    <div class="container text-center mt-3">
        <h1>{{ name.replace(/\.mp3$/, '') }}</h1>
        <button class="btn btn-danger" @click="deleteSong(name)">Delete</button>
    </div>
</template>

<script>
import axios from 'axios'
import { API_URL } from '../scripts/variables.js'
import general from '../scripts/general.js'

export default {
    data() {
        return {
            name: this.$route.params.name
        }
    },
    methods: {
        ...general.methods,

        async deleteSong(name) {
            alert('Delete permanently?')
            await axios.delete(API_URL + `/delete/${name}`).then((response) => {
                console.log(response.status);
                this.goBack()
            })
        }
    },
}
</script>