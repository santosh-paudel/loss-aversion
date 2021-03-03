<template>
  <div class="container-fluid">
    <loading v-if="loading"></loading>
    <div v-else>
      <div ref="la-instruction" class="mt-4">
        <h4>{{ instruction }}</h4>
      </div>
      <div :class="['la-game-screen', state]" :style="gameScreenStyle">
        <!-- If this is not an init or exit state, show the wrong answer on the top right corner  -->
        <p
          v-if="state != 'i' && state != 'e'"
          class="text-right la-error-text pr-2 pt-2"
        >
          Wrong {{ wrongAnswers }}
        </p>
        <game-screen :state="state" @start-game="startGame()"></game-screen>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import GameScreen from "../commons/GameScreen";
import Loading from "../commons/Loading";
export default {
  name: "Game",
  data: function () {
    return {
      gameScreenStyle: {},
      state: "i", // Possible values are 'i' (init), 'f' (fixation), 's' (standard), 't' (target), e (exit)
      wrongAnswers: 0,
      loading: false,
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
        100; // 60pxis margin top on App.vue.

      this.gameScreenStyle = {
        height: `${height}px`,
        width: "100%",
        "border-radius": "10px",
      };
    },
    spacePressed() {
      const now = Date.now();
      const event = this.eventList[this.eventList.length - 1];

      // If the state is fixation, ignore it
      if (event.state === "f") return;

      // Increment the keyPress count
      event.keyPressCount = event.keyPressCount + 1;

      // For the first keyPress, note down the reaction time and compute whether the answer was right or wrong
      if (event.keyPressCount == 1) {
        event.reactionTime = now - event.start;

        // If the user has not already responded to this state and if this is not a target
        // mark it as incorrect and calculate response time
        if (event.state == "s") {
          this.wrongAnswers = this.wrongAnswers + 1;
          event.assessment = "incorrect";
        }
        event.userResponse = now;
      }
    },
    async startGame() {
      const vm = this;
      window.addEventListener("keydown", (e) => {
        if (e.key == " ") {
          vm.spacePressed();
        }
      });
      this.state = "f";
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
          keyPressCount: 0,
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
        });

        await this.delay(current);

        if (prevEvent != null) {
          prevEvent.end = event.start;
          prevEvent.eventLength = prevEvent.end - prevEvent.start;

          // If the previous event has state 't' but the user didn't press a key, mark is as incorrect
          if (prevEvent.state === "t" && prevEvent.reactionTime == null) {
            // eslint-disable-next-line no-debugger
            debugger;
            prevEvent.assessment = "incorrect";
            this.wrongAnswers += 1;
          }
        }

        prevEvent = event;
      }

      this.state = "e";
      this.$store.dispatch("updateGameState", this.eventList);
      console.log(this.eventList);
    },
    /**
     * Produces an artificial delay based on the given state
     */
    async delay(state) {
      let ms = 0;
      switch (state) {
        case "f": // fixation
          ms = 200;
          break;
        case "s": // standard
          ms = 1000;
          break;
        case "t": // target
          ms = 1000;
          break;
        default:
          throw Error(`Invalid state ${state} in delay method`);
      }
      return new Promise((resolve) => setTimeout(resolve, ms));
    },

    async init() {
      // if (this.$store.state.user == null) {
      //   await this.$store.dispatch("initProject");
      // }

      // First, check to see if the user has already played the game. If they have,
      // game state should be 'e' (exit)
      if (this.$store.state.gameOver) {
        this.state = "e";
      }

      this.$nextTick(function () {
        this.initGameScreen();
        window.addEventListener("resize", this.initGameScreen);
      });

      this.eventList = [];
      // this.loading = false;
    },
  },
  mounted() {
    this.init();
  },
  components: {
    GameScreen,
    Loading,
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