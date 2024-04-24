<template>
    <nav class="app-nav navbar">
        <div class="logo-header">
            <img src="/vite.svg" alt="logo">
            <router-link class="navbar-brand" to="/">Song Manager</router-link>
        </div>
        <div class="mt-3" id="search">
            <nav>
                <input type="text" class="form-control" v-model="searchQuery" placeholder="Search"
                    @input="filterSongs">
            </nav>
        </div>
        <div>
            <ul class="navbar gap-3 p-0 m-0 mx-1">
                <li class="nav-link">
                    <router-link class="nav-link" to="/upload"><i class="fas fa-upload"></i></router-link>
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
    },
}

</script>