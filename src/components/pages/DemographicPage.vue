}
<template>
  <div class="container mt-4">
    <h5>
      Thank you for signing up for the Gameplay & Decision Making study. Please
      answer the following before proceeding
    </h5>
    <div class="text-left mt-5">
      <b-form @submit="onSubmit">
        <b-form-group
          id="la-gender-grp"
          label="Gender:"
          label-for="la-input-gender"
        >
          <b-form-select
            id="la-gender-input"
            v-model="gender"
            :state="errorMessages['gender'] == null ? null : false"
            :options="genderOptions"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="la-race-grp" label="Race:" label-for="la-input-race">
          <b-form-select
            id="la-race-input"
            v-model="race"
            :state="errorMessages['race'] == null ? null : false"
            :options="raceOptions"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="la-schoolyear-grp"
          label="Year in school:"
          label-for="la-schoolyear-input"
        >
          <b-form-select
            id="la-schoolyear-input"
            v-model="yearInSchool"
            :state="errorMessages['yearInSchool'] == null ? null : false"
            :options="yearInSchoolOptions"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group>
          <label for="la-age">Age</label>
          <b-form-input
            id="la-age"
            v-model="age"
            placeholder="E.g. 21"
            :state="ageState"
            type="number"
            required
          ></b-form-input>

          <!-- This will only be shown if the preceding input has an invalid state -->
          <b-form-invalid-feedback id="input-live-feedback">
            You must be {{ legalAge }} or older to participate in this study;
          </b-form-invalid-feedback>
        </b-form-group>

        <div class="la-errors">
          <p
            v-for="key in Object.keys(errorMessages)"
            class="text-danger"
            :key="key"
          >
            {{ errorMessages[key] }} #
          </p>
        </div>

        <b-button class="la-btn-color" type="submit" variant="primary"
          >Submit</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Demographic",
  data() {
    return {
      genderOptions: [
        { text: "Select Gender", value: null },
        "Male",
        "Female",
        "Other/Prefer not to say",
      ],
      raceOptions: [
        {
          text: "Select your Race",
          value: null,
        },
        "Asian",
        "Black",
        "Hispanic",
        "Native American",
        "White",
        "Other",
      ],
      yearInSchoolOptions: [
        {
          text: "Select your year in school",
          value: null,
        },
        "Freshmen",
        "Sophomore",
        "Junior",
        "Senior",
      ],
      // Array of error messages that should be displayed to the user (if any)
      errorMessages: {},

      legalAge: 18,
    };
  },
  computed: {
    gender: {
      get() {
        return this.$store.state.gender;
      },
      set(value) {
        this.$store.state.gender = value;
      },
    },
    race: {
      get() {
        // eslint-disable-next-line no-debugger
        debugger;
        return this.$store.state.race;
      },
      set(value) {
        this.$store.state.race = value;
      },
    },
    yearInSchool: {
      get() {
        return this.$store.state.yearInSchool;
      },
      set(value) {
        this.$store.state.yearInSchool = value;
      },
    },
    age: {
      get() {
        return this.$store.state.age;
      },
      set(value) {
        if (value == "") {
          this.$store.state.age = null;
        } else {
          this.$store.state.age = value;
        }
      },
    },
    ageState() {
      return this.age == null || this.age >= this.legalAge ? true : false;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      if (this.age >= this.legalAge) {
        this.$router.push({ name: "InformedConsent" });
      }
    },
    async init() {
      // this.$store.dispatch("initProject", {});
    },
  },

  mounted() {
    this.init();
  },
};
</script>
<style scoped>
.la-btn-color {
  background-color: #5a1e04;
}
</style>