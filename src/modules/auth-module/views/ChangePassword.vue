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
                  id="input-group-1"
                  label="Recovery code:"
                  label-for="input-1"
                  style="margin-bottom: 15px"
                >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-input">
                      <span><i class="fi fi-tr-password icon"></i></span>
                      <b-form-input
                        id="input-1"
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
                  id="input-group-2"
                  label="New password:"
                  label-for="input-2"
                  class="input-with-icon"
                >
                  <ValidationProvider
                    rules="required|password:@confirm"
                    v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                        id="input-2"
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
                  id="input-group-2"
                  label="Repeat password:"
                  label-for="input-2"
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
                        id="input-2"
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

            <br />
            <div class="text-center">
              <div class="button-container">
                <span><i class="fi fi-ts-angle-right button-icon"></i></span>
                <b-button class="button open-sans" type="submit"
                  >Change password</b-button
                >
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <div class="lower-links">
          <div>
            <a href="/">Go to log in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

extend("email", {
  ...email,
  message: "The email is not valid",
});

extend("required", {
  ...required,
  message: "Este campo es requerido",
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
    };
  },
  methods: {
    forgotPassword() {
      alert("ForgotPassword");
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleRepeatPassword() {
      this.showRepeatPassword = !this.showRepeatPassword;
    },
  },
};
</script>

<style src="@/assets/styles/auth-styles.css"></style>
