import { createRouter, createWebHistory } from "vue-router";
import { supabase } from "../supabase/init";
import CardsList from "@/components/CardsList.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

const routes = [
  {
    path: "/",
    name: "cards_list",
    component: CardsList,
    meta: {
      title: "cards_list",
      auth: false,
    },
  },
  {
    path: "/login",
    name: "user_login",
    component: Login,
    meta: {
      title: "user_login",
      auth: false,
    },
  },
  {
    path: "/register",
    name: "user_register",
    component: Register,
    meta: {
      title: "user_register",
      auth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Active Tracker`;
  next();
});

// Route guard for auth routes
router.beforeEach((to, from, next) => {
  const user = supabase.auth.user();
  if (to.matched.some((res) => res.meta.auth)) {
    if (user) {
      next();
      return;
    }
    next({ name: "user_login" });
    return;
  }
  next();
});

export default router;