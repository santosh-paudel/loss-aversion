<template>
  <div class="container">
    <div :style="{ height: '800px' }">
      <!-- <iframe
        src="https://docs.google.com/document/d/e/2PACX-1vS5GCNL5PhWX43pxhspn_R-gHU_sfZoMp7CvZyUkKt8EbsdsuqNKtqdRtZFrsbEPLEFFPvHCXDnoQwR/pub?embedded=true"
      ></iframe> -->
      <div class="la-heading">
        <h3>Informed Consent Form</h3>
        <h3>School of Social Science and Human Services</h3>
        <h4>Ramapo College of New Jersey</h4>
      </div>
      <div class="la-body text-left mt-4">
        <p v-html="title"></p>
        <p v-html="investigator"></p>
        <p v-html="purpose"></p>
        <p v-html="procedure"></p>
        <p v-html="confidentiality"></p>
        <p v-html="pointsGranted"></p>
        <p v-html="voluntaryParticipation"></p>
        <p v-html="faq"></p>
        <p v-html="ethicalConcerns"></p>
        <!--  -->
        <div class="form-check mt-5">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="consentGranted"
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            <span v-html="signatureDescription"></span>
          </label>
        </div>
        <div
          class="la-error"
          :style="{ display: showError == true ? 'block' : 'none' }"
        >
          <p class="text-danger mt-4">
            Please confirm your consent to participate in this study by clicking
            on the checkbox before proceeding
          </p>
        </div>
        <!-- Continue button -->
        <div style="float: right">
          <b-button class="la-btn-color" size="lg" @click="btnClick"
            >Continue</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InformedConsent",
  data: function () {
    return {
      showError: false, // This will show up if the user clicks continue without first accepting the terms
    };
  },
  computed: {
    title() {
      return "<span><b>Title of the Project:</b> Decision making while playing games</span>";
    },
    investigator() {
      return "<span><b>Principal Investigator:</b> Sumaiya Muhammad</span>";
    },
    purpose() {
      return "<span><b>Purpose:</b> This study aims to examine how individuals play games that require them to make a decision. </span>";
    },
    procedure() {
      return `<span><b>Procedure:</b> You will play a short and simple game that will last for about 15 minutes for this study. 
      If you decide to continue to participate in the game, you will be shown a series of visual characters on your screen. 
      You will be asked to respond to the characters by pressing the Space bar on your keyboard. 
      Specific instructions about the game will be provided on the next page. There are no risks associated with this study.</span>`;
    },
    confidentiality() {
      return `<span><b>Confidentiality:</b> Any information collected by the researchers will be kept in complete confidence. 
      Each participant will be assigned a subject number that will be used to collect all the data and will be used in all forms of analyses. 
      Data will be stored in a restricted-access database, but no identifying information will be made available to the persons conducting the study. 
      No one will be able to match your responses with your identity.</span>`;
    },
    pointsGranted() {
      return `<span><b>Points Granted:</b> If you are eligible for subject pool participation, you will earn 0.5 credit hour points for participating
      in this study.  </span>`;
    },
    voluntaryParticipation() {
      return `<span><b>Voluntary Participation:</b> Your participation in this project is voluntary. 
      You may withdraw at any time you want with no negative consequences. The total time to participate will be approximately 20 minutes.</span>`;
    },
    faq() {
      return `<span><b>For Questions regarding the Research:</b> Should you have any questions about the research or your role in the study, please feel free to contact Dr. Naseem A. Choudhury via email at  <a href="#">nchoudhu@ramapo.edu</a> or by phone at 201-684-7776.</span>`;
    },

    ethicalConcerns() {
      return `<span><b>Ethical Concerns:</b> If you have any questions about your rights as a participant or regarding any other ethical concerns related to this study, you should contact
      Dr. Jacqueline Braun, IRB Chair, via email at <a href="#">jbraun@ramapo.edu</a></span>`;
    },
    signatureDescription() {
      return `<b-form-checkbox value="consent">I have read the consent form and agree to be in the study. 
      I am confortable with my data being used <b>anonymously</b> for this research</b-form-checkbox>`;
    },

    consentGranted: {
      get() {
        return this.$store.state.consentGranted;
      },
      set(value) {
        this.$store.dispatch("grantConsent", {
          consentGranted: value,
        });
      },
    },
  },
  methods: {
    btnClick() {
      // If the user has not accepted the terms
      if (this.$store.state.consentGranted == false) {
        this.showError = true;
        return;
      }

      this.$store.dispatch("saveFormData", this.form);
      this.$router.push({ name: "Game" });
    },
  },
  watch: {
    consentGranted: function (newVal) {
      // If the user has checked the consent form, no need to show error message again
      if (newVal) {
        this.showError = false;
      }
    },
  },

  mounted() {},
};
</script>
<style scoped>
iframe {
  width: 100%;
  height: 100%;
}

.la-btn-color {
  background-color: #5a1e04;
}
</style>