<template>
  <div id="app">
    <div>
      <b-navbar type="light" variant="light">
        <b-navbar-brand href="#">Gameplay & Decision Making</b-navbar-brand>
        <!-- <b-navbar-brand href="#">
          <img :src="'src/assets/logo.png'" alt=""
        /></b-navbar-brand> -->
        <!-- <b-nav-form>
          <b-input-group prepend="@">
            <b-form-input placeholder="Username"></b-form-input>
          </b-input-group>
        </b-nav-form> -->
      </b-navbar>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
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
