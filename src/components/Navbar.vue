<template>
    <nav class="app-nav navbar">
        <div class="logo-header">
            <img src="/vite.svg" alt="logo">
            <router-link class="navbar-brand" to="/">Song Manager</router-link>
        </div>
        <div>
            <ul class="navbar gap-3 p-0 m-0 mx-1">
                <li class="nav-link">
                    <router-link class="nav-link" to="/upload"><i class="fas fa-upload"></i></router-link>
                </li>
                <!-- <div class="">
                    <input class="form-control" placeholder="Search" to="/upload">
                </div> -->
            </ul>
        </div>
    </nav>
</template>