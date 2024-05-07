import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {path: '/', name: 'Home', component: () => import("../views/Home.vue")},
    {path: '/songs', name: 'Songs', component: () => import("../views/Songs.vue")},
    {path: '/songs/upload', name: 'Upload Song', component: () => import("../views/Upload.vue")},
    {path: '/songs/edit:id', name: 'Edit Song', component: () => import("../views/Edit.vue")},
    {path: '/scores', name: 'Scores', component: () => import("../views/Scores.vue")},
    {path: '/scores/upload', name: 'Upload Score', component: () => import("../views/UploadScore.vue")},
    {path: '/scores/edit:id', name: 'Edit Score', component: () => import("../views/EditScore.vue")},
    {path: '/score/:name', name: 'Score', component: () => import("../views/Score.vue")}
]

const router = createRouter ({
    history: createWebHistory(),
    routes
})

export default router