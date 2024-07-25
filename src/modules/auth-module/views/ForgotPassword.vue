<template>
  <div class="view-body">
    <div class="form-login glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">Please enter your email</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(forgotPassword)">
            <b-form-group
              id="input-group-1"
              label="Email:"
              label-for="input-1"
              style="margin-bottom: 15px"
            >
              <ValidationProvider rules="required|email" v-slot="{ errors }">
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
            <br />
            <div class="text-center">
              <div class="button-container">
                <span><i class="fi fi-ts-angle-right button-icon"></i></span>
                <b-button class="button open-sans" type="submit"
                  >Send code</b-button
                >
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <div class="lower-links">
          <div>
            <a href="/">Go to log in</a>
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
  name: "ForgotPassword",
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  methods: {
    forgotPassword() {
      alert("ForgotPassword");
    },
  },
};
</script>

<style src="@/assets/styles/auth-styles.css"></style>
