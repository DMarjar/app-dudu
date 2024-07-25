<template>
  <div class="view-body">
    <div class="forms glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">Sign up</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(login)">
            <div class="row">
              <div class="col-12 col-md-6">
                <b-form-group
                  id="input-group-1"
                  label="Name:"
                  label-for="input-1"
                  style="margin-bottom: 15px"
                >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-input">
                      <span><i class="fi fi-ts-circle-user icon"></i></span>
                      <b-form-input
                        id="input-1"
                        class="input"
                        v-model="form.name"
                      ></b-form-input>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
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
                  label="Username:"
                  label-for="input-1"
                  style="margin-bottom: 15px"
                >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-input">
                      <span><i class="fi fi-ts-hat-wizard icon"></i></span>
                      <b-form-input
                        id="input-1"
                        class="input"
                        v-model="form.username"
                      ></b-form-input>
                    </div>
                    <span class="errors">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>

            <div class="row" id="password-container">
              <div class="col-12 col-md-6">
                <b-form-group
                  id="input-group-2"
                  label="Password:"
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

            <div class="text-center">
              <div class="button-container">
                <span><i class="fi fi-ts-angle-right button-icon"></i></span>
                <b-button class="button open-sans" type="submit"
                  >Continue</b-button
                >
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <div class="lower-links">
          <div>
            <a href="#">Go to log in</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import axios from "axios";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Passwords do not match",
});

extend("email", {
  ...email,
  message: "The email is not valid",
});

export default {
  name: "Login",
  data() {
    return {
      form: {
        name: "",
        email: "",
        username: "",
        password: "",
      },
      confirmation: "",
      showPassword: false,
      showRepeatPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleRepeatPassword() {
      this.showRepeatPassword = !this.showRepeatPassword;
    },
    login() {
      alert("Hello there");
    },
  },
};
</script>

<style>
@import "~@flaticon/flaticon-uicons/css/all/all";

.view-body {
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/background-dudu.png);
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forms {
  padding: 50px;
  color: white;
  width: 35%;
}

.glass {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}

.alice-regular {
  font-family: "Alice", serif;
  font-weight: 400;
  font-style: normal;
}

.playfair-display {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 800;
  font-style: normal;
}

.title {
  margin-bottom: 30px;
}

.open-sans {
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-variation-settings: "wdth" 100;
  font-size: 18px !important;
}

.input {
  border-radius: 13px !important;
  display: block;
  padding: 5px 10px 5px 50px !important;
}

.form-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}

.icon {
  position: absolute;
  left: 15px;
  top: 0;
  font-size: 25px;
  color: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#eye-icon {
  position: absolute;
  right: 15px;
  top: 0;
  font-size: 25px;
  color: black;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 16px;
}

.button {
  color: white;
  background-color: #7f81a4 !important;
  width: 65%;
}

.button-icon {
  position: absolute;
  right: 20%;
  top: 0;
  margin-bottom: 25px;
  font-size: 1.1rem;
  color: white;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#password-container {
  margin-top: 10px;
}

.errors {
  color: rgb(255, 124, 124);
}

@media (min-width: 320px) {
  .forms {
    width: 95%;
  }
}

@media (min-width: 480px) {
  .forms {
    width: 90%;
  }
}

@media (min-width: 600px) {
  .forms {
    width: 80%;
  }
}

@media (min-width: 768px) {
  .forms {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .forms {
    width: 35%;
  }
}

@media (min-width: 1280px) {
  .forms {
    width: 35%;
  }
}

@media (min-width: 1440px) {
  .forms {
    width: 35%;
  }
}

@media (min-width: 1920px) {
  .forms {
    width: 35%;
  }
}
</style>
