<template>
  <div class="view-body">
    <div class="forms glass">
      <div class="login-container alice-regular">
        <h1 class="title playfair-display">Sign in</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(login)">
            <b-form-group
              id="input-group-1"
              label="Correo:"
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
              label="Contraseña:"
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
                  >Ingresar</b-button
                >
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <br />
        <div class="lower-links">
          <div>
            <a href="#">Join the community</a>
          </div>
          <div>
            <a href="#">Forgot your password?</a>
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
  width: 25%;
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
  margin-bottom: 40px;
}

.lower-links {
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  margin-top: 25px;
}

.lower-links a {
  color: rgb(226, 226, 226);
  text-decoration: underline;
  text-underline-position: under;
}

.lower-links a:hover {
  color: white;
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
    width: 25%;
  }
}

@media (min-width: 1280px) {
  .forms {
    width: 28%;
  }
}

@media (min-width: 1440px) {
  .forms {
    width: 25%;
  }
}

@media (min-width: 1920px) {
  .forms {
    width: 35%;
  }
}
</style>
