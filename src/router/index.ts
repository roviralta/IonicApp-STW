import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "HomePage",
        component: HomePage,
    },
    {
        path: "/home/gallery",
        name: "Gallery",
        component: () => import("@/views/Gallery.vue"),
    },
    {
        path: "/home/camera",
        name: "Camera",
        component: () => import("@/views/Camera.vue"),
    },
    {
        path: "/home/settings",
        name: "Settings",
        component: () => import("@/views/Settings.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
