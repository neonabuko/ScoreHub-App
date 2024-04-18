import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', name: 'Home', component: () => import("../views/Home.vue")},
    {path: '/upload', name: 'Upload', component: () => import("../views/Upload.vue")},
    {path: '/edit:name', name: 'Edit', component: () => import("../views/Edit.vue")}
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router