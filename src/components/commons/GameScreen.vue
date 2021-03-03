<template>
  <div class="container d-flex h-100">
    <div class="row justify-content-center align-self-center margin-auto">
      <!-- state init -->
      <b-button
        v-if="state === 'i'"
        size="lg"
        variant="primary"
        @click="startGame()"
        >Click here to start the game
      </b-button>

      <!-- fixation state -->
      <div v-else-if="state === 'f'">
        <!-- <img src="../../assets/plus.svg" style="height: 50px; width: 50px" /> -->
      </div>
      <div v-else-if="state === 't'">
        <img class="la-target" src="../../assets/x.svg" />
        <!-- <b-icon icon="plus" scale="20"></b-icon> -->
      </div>
      <div v-else-if="state === 's'">
        <img class="la-standard" src="../../assets/o.svg" />
        <!-- <b-icon icon="square-fill" scale="20"></b-icon> -->
      </div>
      <div v-else-if="state === 'e'">
        <h4>Congratulation!</h4>
        <h5>Correct Answers: {{ gameStats.correctAnswers }}</h5>
        <h5>Incorrect Answers: {{ gameStats.wrongAnswers }}</h5>

        <b-button class="mt-4" size="lg" variant="primary" @click="nextBtn()"
          >Next
        </b-button>
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
      default: "i", //init
    },
  },
  computed: {
    ...mapGetters(["gameStats"]),
  },

  methods: {
    startGame() {
      this.$emit("start-game");
      console.log(this.state);
    },
    nextBtn() {
      this.$store.dispatch("gameOver");
      this.$router.push({ name: "Debrief" });
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