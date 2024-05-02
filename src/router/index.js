import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/songs', name: 'Songs', component: () => import("../views/Songs.vue")},
    {path: '/songs/upload', name: 'Upload Song', component: () => import("../views/Upload.vue")},
    {path: '/songs/edit:name', name: 'Edit Song', component: () => import("../views/Edit.vue")},
    {path: '/scores', name: 'Scores', component: () => import("../views/Scores.vue")},
    {path: '/scores/upload', name: 'Upload Score', component: () => import("../views/UploadScore.vue")},
    {path: '/scores/edit:name', name: 'Edit Score', component: () => import("../views/EditScore.vue")},
    {path: '/score:name', name: 'Score', component: () => import("../views/Score.vue")}
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router