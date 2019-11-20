import Vue from "vue";
import VueRouter from "vue-router";
// lazy loading routes
const Home = () => import ("../views/Home.vue");
const Login = () => import ("../views/Login.vue");
const Categories = () => import ("../views/Categories.vue");
const DetailRecord = () => import ("../views/DetailRecord.vue");
const History = () => import ("../views/History.vue");
const Planning = () => import ("../views/Planning.vue");
const Profile = () => import ("../views/Profile.vue");
const Record = () => import ("../views/Record.vue");
const Register = () => import ("../views/Register.vue");


Vue.use(VueRouter);

// const Categories = () => import('../views/Categories.vue')
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
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: "EmptyLayout" },
    component: Login
  },
  {
    path: "/register",
    name: "register",
    meta: { layout: "EmptyLayout" },
    component: Register
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
