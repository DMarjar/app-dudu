<template>
  <div class="view-body">
    <div class="forms glass">
      <div class="login-container alice-regular">
        <h1 class="playfair-display" id="title-signup">
          Change temporary password
        </h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(changePassword)">
            <div class="row">
              <div class="col-12 col-md-6">
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
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                  id="input-group-2"
                  label="Temporary password:"
                  label-for="input-2"
                  class="input-with-icon"
                >
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                        id="input-2"
                        class="input-type-password"
                        v-model="form.password"
                        :type="showTempPassword ? 'text' : 'password'"
                      ></b-form-input>
                      <b-icon
                        :icon="showTempPassword ? 'eye-slash' : 'eye'"
                        aria-hidden="true"
                        @click="toggleTempPassword"
                        id="eye-icon"
                      ></b-icon>
                    </div>
                    <span class="errors open-sans">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                  id="input-group-4"
                  label="New password:"
                  label-for="input-4"
                  class="input-with-icon"
                >
                  <ValidationProvider
                    rules="required|password:@confirm|password-regex|max:20"
                    v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                        id="input-4"
                        class="input-type-password"
                        v-model="form.new_password"
                        :type="showPassword ? 'text' : 'password'"
                      ></b-form-input>
                      <b-icon
                        :icon="showPassword ? 'eye-slash' : 'eye'"
                        aria-hidden="true"
                        @click="togglePassword"
                        id="eye-icon"
                      ></b-icon>
                    </div>
                    <span class="errors open-sans">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
              <div class="col-12 col-md-6">
                <b-form-group
                  id="input-group-3"
                  label="Repeat password:"
                  label-for="input-3"
                  class="input-with-icon"
                >
                  <ValidationProvider
                    rules="required|password-regex|max:20"
                    name="confirm"
                    v-slot="{ errors }"
                  >
                    <div class="form-input">
                      <span><i class="fi fi-ts-lock-hashtag icon"></i></span>
                      <b-form-input
                        id="input-3"
                        class="input-type-password"
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
                    <span class="errors open-sans">{{ errors[0] }}</span>
                  </ValidationProvider>
                </b-form-group>
              </div>
            </div>

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
                  Change password
                </b-button>
                <b-spinner v-if="loading" label="Loading..."></b-spinner>
              </div>
            </div>
          </b-form>
        </ValidationObserver>
        <div class="lower-links">
          <div>
            <a href="/">Go to sign in</a>
          </div>
          <div>
            <a href="/sign-up">Go back</a>
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

extend("password-regex", {
  validate: (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_])[A-Za-z\d@$!%*?&#_]{8,}$/;
    return passwordRegex.test(value);
  },
  message:
    "Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&#_)",
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

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Password confirmation does not match",
});

export default {
  name: "ChangeTemporaryPassword",
  data() {
    return {
      form: {
        username: "",
        password: "",
        new_password: "",
      },
      genderOptions: [
        { value: "M", text: "Male" },
        { value: "F", text: "Female" },
      ],
      loading: false,
      confirmation: "",
      showPassword: false,
      showTempPassword: false,
      showRepeatPassword: false,
    };
  },
  methods: {
    changePassword() {
      this.loading = true;
      axios
        .post(
          "https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod/set_password",
          {
            username: this.form.username,
            password: this.form.password,
            new_password: this.form.new_password,
          }
        )
        .then((response) => {
          this.form.username = "";
          this.form.password = "";
          localStorage.setItem("id_token", response.data.id_token);
          this.redirectUser();
        })
        .catch((error) => {
          this.$swal({
            title: "Error changing password",
            text: "Something unexpected happened",
            icon: "error",
          });
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleTempPassword() {
      this.showTempPassword = !this.showTempPassword;
    },
    toggleRepeatPassword() {
      this.showRepeatPassword = !this.showRepeatPassword;
    },
    redirectUser() {
      this.$router.push("/missions");
    },
  },
  mounted() {
    if (localStorage.getItem("showToast") === "true") {
      const Toast = this.$swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = this.$swal.stopTimer;
          toast.onmouseleave = this.$swal.resumeTimer;
        },
        customClass: {
          popup: "colored-toast",
        },
      });
      Toast.fire({
        icon: "success",
        title: "Account created, confirm it by changing your password",
        color: "white",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))",
      });
      localStorage.removeItem("showToast");
    }
  },
};
</script>
<style src="@/assets/styles/auth-styles.css"></style>
