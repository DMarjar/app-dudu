<template>
  <div class="view-body">
    <div class="form-login glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">Sign in</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(login)">
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
            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
              class="input-with-icon"
            >
              <ValidationProvider rules="required" v-slot="{ errors }">
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
            <br />
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
        <br />
        <div class="lower-links">
          <div>
            <a href="/sign-up">Join the community</a>
          </div>
          <div>
            <a href="/forgot-password">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import axios from "axios";

extend("required", {
  ...required,
  message: "Este campo es requerido",
});

export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      showPassword: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    login() {
      axios
        .post(
          "https://thl3xtink3.execute-api.us-east-2.amazonaws.com/Prod/login",
          {
            username: this.form.username,
            password: this.form.password,
          }
        )
        .then((response) => {
          // Aquí podrías almacenar el token en el local storage si es necesario
          localStorage.setItem("token", response.data.token);

          // Limpia las credenciales solo si el inicio de sesión es exitoso
          this.form.username = "";
          this.form.password = "";
          console.log(response);

          // Muestra una alerta de éxito
          this.$swal({
            title: "Inicio de sesión exitoso",
            text: "Checa el local storage para verificar.",
            icon: "success",
          });
        })
        .catch((error) => {
          // Maneja el error y muestra una alerta de error
          console.error(error);
          this.$swal({
            title: "Error de inicio de sesión",
            text: "Por favor, verifica tus credenciales.",
            icon: "error",
          });
        });
    },
  },
};
</script>

<style src="@/assets/styles/auth-styles.css"></style>
