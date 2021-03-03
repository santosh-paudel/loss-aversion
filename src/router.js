import Vue from "vue";
import Router from "vue-router";

import InformedConsent from "./components/pages/InformedConsent";
import DemographicPage from "./components/pages/DemographicPage";
import Game from "./components/pages/Game";
import DebriefForm from "./components/pages/DebriefForm";

import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/consent",
      name: "InformedConsent",
      component: InformedConsent,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/",
      name: "Demographic",
      component: DemographicPage,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/main",
      name: "Game",
      component: Game,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/debrief",
      name: "Debrief",
      component: DebriefForm,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth && currentUser == null) {
    next("/");
  } else {
    next();
  }
});

export default router;
