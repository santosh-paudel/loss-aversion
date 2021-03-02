import Vue from "vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App.vue";

// import auth from "./firebase/firebase";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import firebase from "firebase/app";

import router from "./router";
import store from "./store/store";

const firebaseConfig = {
  apiKey: "AIzaSyCzhcRDkedKLXPbOL8GZ3sNEeWVIdDUIhU",
  authDomain: "loss-aversion.firebaseapp.com",
  projectId: "loss-aversion",
  storageBucket: "loss-aversion.appspot.com",
  messagingSenderId: "304480813182",
  appId: "1:304480813182:web:54b2470ef4a1126473182f",
  measurementId: "G-5FGREB60YT",
};
firebase.initializeApp(firebaseConfig);

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

let app = null;
firebase.auth().onAuthStateChanged(() => {
  if (app == null) {
    app = new Vue({
      router: router,
      store: store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
