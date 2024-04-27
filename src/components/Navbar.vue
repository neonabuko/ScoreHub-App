<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-transparent app-nav">
        <div class="navbar-header">
            <router-link class="navbar-brand" to="/">
                <img src="/vite.svg" alt="logo" width="30" height="30" class="d-inline-block align-top">
                Song Manager
            </router-link>
        </div>

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
            <div class="mt-3" v-if="$route.name === 'Home'">
                <input
                    type="text"
                    class="form-control"
                    v-model="searchQuery"
                    placeholder="Search"
                    @input="filterSongs"
                />
            </div>

            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <router-link class="nav-link" to="/upload">
                        <i class="fas fa-upload"></i>
                    </router-link>
                </li>
            </ul>
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