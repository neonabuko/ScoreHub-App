<template>
    <nav class="navbar navbar-expand-md bg-transparent app-nav">
        <div class="navbar-header">
            <router-link class="navbar-brand" to="/songs">
                <img src="/vite.svg" alt="logo" width="30" height="30" class="d-inline-block align-top">
                ScoreHub
            </router-link>
        </div>

        <button class="navbar-toggler" id="hamburguer" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
            aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="navbar-collapse navbar-content collapse" id="navbarContent">
            <div class="navbar-content">
                <div class="routes-div">
                    <ul class="navbar-nav">
                        <li class="route">
                            <router-link to="/songs" class="nav-link btn btn-primary">Songs</router-link>
                        </li>
                        <li class="route">
                            <router-link to="/scores" class="nav-link btn btn-primary">Scores</router-link>
                        </li>                        
                    </ul>
                </div>
                <div class="search-div" v-if="$route.name === 'Songs'">
                    <input type="text" class="form-control" v-model="searchQuery" placeholder="Search"
                        @input="filterSongs" />
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