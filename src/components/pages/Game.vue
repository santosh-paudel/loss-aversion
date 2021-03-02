<template>
  <div class="container-fluid">
    <div ref="la-instruction" class="mt-4">
      <h4>{{ instruction }}</h4>
    </div>
    <div :class="['la-game-screen', state]" :style="gameScreenStyle">
      <p v-if="state != 'init'" class="text-right la-error-text pr-2 pt-2">
        Wrong {{ wrongAnswers }}
      </p>
      <game-screen :state="state" @start-game="startGame()"></game-screen>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import GameScreen from "../commons/GameScreen";
export default {
  name: "Game",
  data: function () {
    return {
      gameScreenStyle: {},
      state: "init", // Possible values are 'init', 'fixation', 'standard', target', exit
      wrongAnswers: 0,
    };
  },
  computed: {
    ...mapGetters(["instruction", "pattern"]),
  },
  methods: {
    initGameScreen() {
      const instructionBoundingBox = this.$refs[
        "la-instruction"
      ].getBoundingClientRect();

      const height =
        window.innerHeight -
        instructionBoundingBox.y -
        instructionBoundingBox.height -
        60; // 60pxis margin top on App.vue.

      this.gameScreenStyle = {
        height: `${height}px`,
        width: "100%",
        "border-radius": "10px",
      };
    },
    spacePressed() {
      const now = Date.now();
      const event = this.eventList[this.eventList.length - 1];

      // If the user has not already responded to this state and if this is not a target
      // mark it as incorrect and calculate response time
      if (event.userResponse == null && event.state != "target") {
        this.wrongAnswers = this.wrongAnswers + 1;
        event.assessment = "incorrect";
        event.reactionTime = now - event.start;
      }
      event.userResponse = now;
    },
    startGame() {
      const vm = this;
      window.addEventListener("keydown", (e) => {
        if (e.keyCode == 32) {
          vm.spacePressed();
        }
      });
      this.state = "fixation";
      this.play();
    },
    async play() {
      console.log(this.pattern);

      let prevEvent = null;
      for (let i = 0; i < this.pattern.length; i++) {
        const current = this.pattern[i];

        const event = {
          state: current,
          userResponse: null,
        };
        // push the event to the list right now instead of after the delay
        // this way, if the user presses space on the first state, the list is available
        this.eventList.push(event);

        this.state = current;

        // When the screen refreshes, record the time when the event showed
        this.$nextTick(async function () {
          const now = Date.now();
          // console.log(Date.now());
          event.start = now;

          if (prevEvent != null) {
            prevEvent.end = now;
            prevEvent.interval = prevEvent.end - prevEvent.start;

            // If the previous event has state 'taget' but the user didn't press a key, mark is as incorrect
            if (
              prevEvent.state === "target" &&
              prevEvent.reactionTime == null
            ) {
              prevEvent.assessment = "incorrect";
              this.wrongAnswers += 1;
            }
          }
        });

        await this.delay(current);

        prevEvent = event;
      }

      this.state = "exit";
      this.$store.dispatch("updateGameState", this.eventList);
      console.log(this.eventList);
    },
    /**
     * Produces an artificial delay based on the given state
     */
    async delay(state) {
      let ms = 0;
      switch (state) {
        case "fixation":
          ms = 200;
          break;
        case "standard":
          ms = 1000;
          break;
        case "target":
          ms = 1000;
          break;
        default:
          throw Error(`Invalid state ${state} in delay method`);
      }
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
  mounted() {
    this.$nextTick(function () {
      this.initGameScreen();
      window.addEventListener("resize", this.initGameScreen);
    });

    this.eventList = [];
  },
  components: {
    GameScreen,
  },
};
</script>
<style scoped>
.la-game-screen.init,
.la-game-screen.exit {
  background-color: #e9ecef !important;
}

.la-game-screen {
  background-color: #000000;
}

.la-error-text {
  color: red;
}
</style>