/* eslint-disable no-debugger */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "loss-aversion",
      storage: window.sessionStorage,
    }),
  ],
  state: {
    consentGranted: false,
    gender: null,
    yearInSchool: null,
    race: null,
    // userId: null, // Unique Id generated for this user
    user: null,
    age: null,
    surveyGroup: null,
    startTime: null, // The first time the user signed in to the website
    // One of these instructions will appear on the user's screen. Which of these
    // instructions display depends on the sequence number of the user
    instructions: [
      "Press the button when you see the target, and you'll gain 10 points",
      "Press the button when you see the target. Every time you fail to do so, you'll lose 10 points",
      "Press the button when you see the target (no loss or gain of points)",
      "Press the button when you see the target; you get 10 points if you do it correctly, and lose 10 points if you don't",
    ],
    // pattern: ["O", "O", "X", "O", "O", "O", "X", "O", "X", "X"],
    pattern: [
      "O",
      "O",
      "X",
      "O",
      "O",
      "O",
      "X",
      "O",
      "O",
      "X",
      "X",
      "O",
      "O",
      "O",
      "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "X",
      // "O",
      // "X",
      // "O",
      // "O",
      // "X",
      // "O",
      // "O",
      // "O",
      // "O",
    ],

    gameState: null, //array
  },
  mutations: {
    setConsent(state, val) {
      state.consentGranted = val;
      console.log("#");
    },
    setGender(state, val) {
      state.gender = val;
    },
    setRace(state, val) {
      state.race = val;
    },
    setYearInSchool(state, val) {
      state.yearInSchool = val;
    },
    setAge(state, val) {
      state.age = val;
    },
    setUser(state, user) {
      state.user = user;
    },
    surveyGroup(state, val) {
      state.surveyGroup = val;
    },
    startTime(state, val) {
      state.startTime = val;
    },
    gameState(state, arr) {
      state.gameState = arr;
    },
  },
  getters: {
    instruction: (state) => {
      const surveyGroup = state.surveyGroup;
      return state.instructions[surveyGroup];
    },
    pattern: (state) => {
      const pattern = [];

      for (let i = 0; i < state.pattern.length; i++) {
        if (state.pattern[i] === "X") {
          pattern.push("target");
        } else if (state.pattern[i] === "O") {
          pattern.push("standard");
        } else {
          throw new Error(`Invalid pattern ${state.pattern[i]} at index ${i}`);
        }

        // add fixation at each point
        pattern.push("fixation");
      }

      console.log("pattern", pattern);
      return pattern;
    },

    /**
     * Computes basic stat of the game
     * @param {*} state
     */
    gameStats: (state) => {
      let wrongAnswers = 0;
      let correctAnswers = 0;

      state.gameState.forEach((gameState) => {
        if (gameState.assessment === "incorrect") {
          wrongAnswers += 1;
        } else {
          correctAnswers += 1;
        }
      });

      return { wrongAnswers, correctAnswers };
    },
  },
  actions: {
    grantConsent({ commit }, data) {
      commit("setConsent", data.consentGranted);
    },
    async saveFormData({ commit, state }) {
      const user = firebase.auth().currentUser;

      // First count the total number of users. This will work as a "sequence number"
      // eslint-disable-next-line no-unused-vars
      const snap = await firebase
        .firestore()
        .collection("survey")
        .get();

      // If the user has already previously filled the form, their survey group may
      // not be empty. If so check if the value is null before assinging them a new survey group
      if (state.surveyGroup == null) {
        commit("surveyGroup", snap.size % 4);
      }

      await firebase
        .firestore()
        .collection("survey")
        .doc(user.uid)
        .set({
          consentGranted: state.consentGranted,
          gender: state.gender,
          race: state.race,
          yearInSchool: state.yearInSchool,
          age: state.age,
          startTime: state.startTime,
          surveyGroup: state.surveyGroup,
        });
    },

    async updateGameState({ commit, state }, gameState) {
      commit("gameState", gameState);

      const user = firebase.auth().currentUser;
      await firebase
        .firestore()
        .collection("survey")
        .doc(user.uid)
        .collection("game")
        .doc("raw")
        .set({ state: state.gameState });
    },

    /**
     * This will initialize this anonymous user and setup a collection
     */
    // eslint-disable-next-line no-unused-vars
    async initProject({ commit, state }) {
      await firebase.auth().signInAnonymously();
      const user = firebase.auth().currentUser;

      // Try and load if this user's information already exists in the database. If it does, populate the
      // eslint-disable-next-line no-unused-vars
      const userGameInfo = await firebase
        .firestore()
        .collection("survey")
        .doc(user.uid)
        .get();
      debugger;
      if (userGameInfo.exists) {
        const data = userGameInfo.data();
        state.consentGranted = data.consentGranted;
        state.gender = data.gender;
        state.surveyGroup = data.surveyGroup;
        state.yearInSchool = data.yearInSchool;
      }

      // Don't fetch startTime from the stored state because it can
      // change if the user restarts the game
      commit("startTime", new Date());
    },
  },
});

export default store;
