<template>
  <div class="view-body">
    <div class="forms glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">Change password</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(forgotPassword)">
            <div class="row">
              <div class="col-12 col-md-6">
                <b-form-group
                    id="input-group-1"
                    label="Email:"
                    label-for="input-1"
                    style="margin-bottom: 15px"
                >
                  <ValidationProvider
                      rules="required|email"
                      v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-tr-circle-envelope icon"></i></span>
                      <b-form-input
                          id="input-1"
                          class="input"
                          v-model="form.email"
                      ></b-form-input>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                    id="input-group-2"
                    label="Recovery code:"
                    label-for="input-2"
                    style="margin-bottom: 15px"
                >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-input">
                      <span><i class="fi fi-tr-password icon"></i></span>
                      <b-form-input
                          id="input-2"
                          class="input"
                          v-model="form.code"
                      ></b-form-input>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                    id="input-group-3"
                    label="New password:"
                    label-for="input-3"
                    class="input-with-icon"
                >
                  <ValidationProvider
                      rules="required|password:@confirm"
                      v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                          id="input-3"
                          class="input"
                          v-model="form.password"
                          :type="showPassword ? 'text' : 'password'"
                      ></b-form-input>
                      <b-icon
                          :icon="showPassword ? 'eye-slash' : 'eye'"
                          aria-hidden="true"
                          @click="togglePassword"
                          id="eye-icon"
                      ></b-icon>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                    id="input-group-4"
                    label="Repeat password:"
                    label-for="input-4"
                    class="input-with-icon"
                >
                  <ValidationProvider
                      rules="required"
                      name="confirm"
                      v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                          id="input-4"
                          class="input"
                          v-model="confirmation"
                          :type="showRepeatPassword ? 'text' : 'password'"
                      ></b-form-input>
                      <b-icon
                          :icon="showRepeatPassword ? 'eye-slash' : 'eye'"
                          aria-hidden="true"
                          @click="toggleRepeatPassword"
                          id="eye-icon"
                      ></b-icon>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>

            <br/>
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
                  Change
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
            <a href="/forgot-password">Go back</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {extend} from "vee-validate";
import {required, email} from "vee-validate/dist/rules";
import axios from "axios";

extend("email", {
  ...email,
  message: "The email is not valid",
});

extend("required", {
  ...required,
  message: "This field is required",
});

export default {
  name: "ChangePassword",
  data() {
    return {
      form: {
        email: "",
        code: "",
        password: "",
      },
      confirmation: "",
      showPassword: false,
      showRepeatPassword: false,
      loading: false,
    };
  },
  methods: {
    forgotPassword() {
      this.loading = true;
      axios
          .post(
              "https://thl3xtink3.execute-api.us-east-2.amazonaws.com/Prod/change_password",
              {
                username: this.form.email,
                confirmation_code: this.form.code,
                new_password: this.form.password,
                confirm_new_password: this.form.password,
              }
          )
          .then((response) => {
            this.form.email = "";
            this.form.password = "";
            this.form.code = "";
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
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleRepeatPassword() {
      this.showRepeatPassword = !this.showRepeatPassword;
    },
    redirectUser() {
      this.$router.push("/");
    },
  },
};
</script>

<style src="@/assets/styles/auth-styles.css"></style>
