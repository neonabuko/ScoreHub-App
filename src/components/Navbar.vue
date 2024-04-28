<template>
    <nav class="navbar navbar-expand-md bg-transparent app-nav">
        <div class="navbar-header">
            <router-link class="navbar-brand" to="/">
                <img src="/vite.svg" alt="logo" width="30" height="30" class="d-inline-block align-top">
                ScoreHub
            </router-link>
        </div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse navbar-content" id="navbarContent">
            <div class="navbar-content">
                <div class="routes-div">
                    <ul class="navbar-nav">
                        <li>
                            <router-link to="/scores" class="nav-link">Scores</router-link>
                        </li>
                    </ul>
                </div>

                <div class="search-div ms-auto" v-if="$route.name === 'Home'">
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="Search"
                        @input="filterSongs" />
                </div>

                <div class="upload-div">
                    <router-link class="nav-link ms-2" to="/upload">
                        <i class="fas fa-upload"></i>
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import general from '../scripts/general'
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            searchQuery: ''
        }
    },
    computed: {
        ...mapState(['songs']),
    },
    methods: {
        ...general.methods,
        ...mapActions(['setSongs', 'fetchAllSongDataAsync'])
    }
}

</script>