import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Categories from "../views/Categories.vue";
import DetailRecord from "../views/DetailRecord.vue";
import History from "../views/History.vue";
import Planning from "../views/Planning.vue";
import Profile from "../views/Profile.vue";
import Record from "../views/Record.vue";
import Register from "../views/Register.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/record",
    name: "detail",
    component: DetailRecord,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/record",
    name: "record",
    component: Record,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/history",
    name: "history",
    component: History,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/planning",
    name: "planning",
    component: Planning,
    meta: { layout: "MainLayout" }
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: "MainLayout" },
    component: Categories

    // component: () => {import('../views/Categories.vue')}
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "EmptyLayout" },
    component: Login
    // component: () => {import('../views/Login.vue')}
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "EmptyLayout" },
    component: Register
    // component: () => {import('../views/Login.vue')}
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
