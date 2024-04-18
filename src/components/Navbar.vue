<template>
    <nav class="app-nav navbar navbar-expand-sm border-bottom p-1 px-4 d-flex">
        <router-link class="navbar-brand fw-normal" to="/">Song Manager</router-link>
        <div>
            <ul class="navbar gap-3 p-0 m-0 mx-2">
                <li class="nav-link p-0 m-0">
                    <router-link class="nav-link" to="/upload">Upload</router-link>
                </li>
                <li class="nav-link p-0 m-0">
                    <input class="form-control" placeholder="Search" to="/upload">
                </li>                
            </ul>
        </div>
    </nav>
</template>