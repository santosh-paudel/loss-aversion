<template>
  <div id="app">
    <div>
      <b-navbar type="light" variant="light">
        <!-- <b-navbar-brand href="#">Gameplay & Decision Making</b-navbar-brand> -->
        <b-navbar-brand href="#">
          <img
            class="img-fluid"
            src="@/assets/logo.png"
            style="max-height: 50px"
          />
          Gameplay & Decision Making
        </b-navbar-brand>
        <!-- <b-nav-form>
          <b-input-group prepend="@">
            <b-form-input placeholder="Username"></b-form-input>
          </b-input-group>
        </b-nav-form> -->
      </b-navbar>
    </div>
    <loading v-if="loading"></loading>
    <div v-else><router-view></router-view></div>
  </div>
</template>

<script>
import Loading from "./components/commons/Loading.vue";
export default {
  components: { Loading },
  name: "App",
  data: function () {
    return {
      loading: true,
    };
  },
  methods: {
    navigateToDebrief() {
      if (this.$route.name != "Debrief") {
        this.$router.push({ name: "Debrief" });
      }
    },

    async init() {
      if (this.$store.state.user == null) {
        await this.$store.dispatch("initProject");
      }
      this.loading = false;

      if (this.$store.state.gameOver) {
        this.navigateToDebrief();
      }
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // If the user has already finished the game and they are going to some other route, force
      // them to the game route
      if (to.name != "Debrief" && this.$store.state.gameOver) {
        this.navigateToDebrief();
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
