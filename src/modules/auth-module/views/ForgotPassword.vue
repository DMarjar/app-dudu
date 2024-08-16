<template>
  <div class="view-body">
    <div class="form-login glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">
          Please enter your account's username
        </h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(forgotPassword)">
            <b-form-group
              id="input-group-1"
              label="Username:"
              label-for="input-1"
              style="margin-bottom: 15px"
            >
              <ValidationProvider
                rules="required|max:20|min:3|no_invalid_chars"
                v-slot="{ errors }"
              >
                <div class="form-input">
                  <span><i class="fi fi-ts-hat-wizard icon"></i></span>
                  <b-form-input
                    id="input-1"
                    class="input"
                    v-model="form.username"
                  ></b-form-input>
                </div>
                <span class="errors open-sans">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>
            <br />
            <div class="text-center">
              <div class="button-container">
                <span v-if="!loading"
                  ><i class="fi fi-ts-angle-right button-icon"></i
                ></span>
                <b-button
                  v-if="!loading"
                  class="button open-sans"
                  type="submit"
                >
                  Send code
                </b-button>
                <b-spinner v-if="loading" label="Loading..."></b-spinner>
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <div class="lower-links">
          <div>
            <a href="/">Go to sign up</a>
          </div>
          <div>
            <a href="/change-password">I have a code already </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, max, min } from "vee-validate/dist/rules";
import axios from "axios";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("max", {
  ...max,
  params: ["length"],
  message: "This field cannot be longer than {length} characters",
});

extend("min", {
  ...min,
  params: ["length"],
  message: "This field cannot be shorter than {length} characters",
});

extend("no_invalid_chars", {
  validate: (value) => {
    const invalidChars = /[\{\}\[\];<>"'`]/;
    return !invalidChars.test(value);
  },
  message:
    "Username cannot contain the following characters: { } [ ] ; < > \" '",
});

export default {
  name: "ForgotPassword",
  data() {
    return {
      form: {
        username: "",
      },
      loading: false,
    };
  },
  methods: {
    forgotPassword() {
      this.loading = true;
      axios
        .post(
          "https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod/recover_password",
          {
            username: this.form.username,
          }
        )
        .then((response) => {
          this.form.username = "";
          this.redirectUser();
        })
        .catch((error) => {
          console.log(error);
          this.$swal({
            title: "There's been an error",
            text: "Please verify your information and try again.",
            icon: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    redirectUser() {
      this.$router.push("/change-password");
    },
  },
};
</script>

<style src="@/assets/styles/auth-styles.css"></style>
