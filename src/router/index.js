import Vue from "vue";
import VueRouter from "vue-router";
import Users from "../api/users";
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

router.beforeEach(async (to, from, next) => {
  let users = JSON.parse(localStorage.getItem("list_of_users"));
  if (!users) {
    try {
      let { data } = await Users.getUsersList(1);
      data = data.map((e) => {
        return { ...e, updated_at: new Date() };
      });
      localStorage.setItem("list_of_users", JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  }
  next();
});

export default router;
