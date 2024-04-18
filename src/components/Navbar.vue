<template>
    <nav class="app-nav navbar border-bottom p-1 px-4 d-flex">
        <router-link class="navbar-brand fw-normal" to="/">Song Manager</router-link>
        <div>
            <ul class="navbar gap-3 p-0 m-0 mx-1">
                <li class="nav-link">
                    <router-link class="nav-link" to="/upload">Upload</router-link>
                </li>
                <div class="">
                    <input class="form-control" placeholder="Search" to="/upload">
                </div>
            </ul>
        </div>
    </nav>
</template>