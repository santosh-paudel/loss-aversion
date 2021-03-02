<template>
  <div class="container d-flex h-100">
    <div class="row justify-content-center align-self-center margin-auto">
      <!-- state init -->
      <b-button
        v-if="state === 'init'"
        size="lg"
        variant="primary"
        @click="btnClick()"
        >Click here to start
      </b-button>

      <!-- fixation state -->
      <div v-else-if="state === 'fixation'">
        <!-- <img src="../../assets/plus.svg" style="height: 50px; width: 50px" /> -->
      </div>
      <div v-else-if="state === 'target'">
        <img class="la-target" src="../../assets/x.svg" />
        <!-- <b-icon icon="plus" scale="20"></b-icon> -->
      </div>
      <div v-else-if="state === 'standard'">
        <img class="la-standard" src="../../assets/o.svg" />
        <!-- <b-icon icon="square-fill" scale="20"></b-icon> -->
      </div>
      <div v-else-if="state === 'exit'">
        <h4>Congratulation!</h4>
        <h5>Correct Answers: {{ gameStats.wrongAnswers }}</h5>
        <h5>Incorrect Answers: {{ gameStats.correctAnswers }}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "GameScreen",
  props: {
    state: {
      type: String,
      default: "init",
    },
  },
  computed: {
    ...mapGetters(["gameStats"]),
  },

  methods: {
    btnClick() {
      this.$emit("start-game");
      console.log(this.state);
    },
  },
  mounted() {},
  components: {},
};
</script>
<style scoped>
.margin-auto {
  margin: auto;
}
.la-target,
.la-standard {
  width: 200px;
  height: 200px;
}
</style>