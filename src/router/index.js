import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/:catchAll(.*)",
    name: "Not Found",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
