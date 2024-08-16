<template>
  <div class="view-body">
    <div class="form-login glass">
      <div class="login-container alice-regular">
        <h1 class="playfair-display" id="title-signup">Sign up</h1>
        <ValidationObserver v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(signup)">
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

            <b-form-group
              id="input-group-2"
              label="Email:"
              label-for="input-2"
              style="margin-bottom: 15px"
            >
              <ValidationProvider
                rules="required|email-format"
                v-slot="{ errors }"
              >
                <div class="form-input">
                  <span><i class="fi fi-tr-circle-envelope icon"></i></span>
                  <b-form-input
                    id="input-2"
                    class="input"
                    v-model="form.email"
                  ></b-form-input>
                </div>
                <span class="errors open-sans">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-form-group>

            <b-form-group
              id="input-group-3"
              label="Gender:"
              label-for="input-3"
              style="margin-bottom: 15px"
            >
              <ValidationProvider rules="required" v-slot="{ errors }">
                <div class="form-input">
                  <span><i class="fi fi-ts-circle-user icon"></i></span>

                  <b-form-select
                    id="input-3"
                    class="input"
                    v-model="form.gender"
                    :options="genderOptions"
                  ></b-form-select>
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
                  Register
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
            <a href="/change-temporary-password">Change temporary password</a>
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

extend("email-format", {
  validate: (value) => {
    const regex = /^[a-zA-Z0-9._%+-]{1,40}@[a-zA-Z0-9.-]{1,40}\.[a-zA-Z]{2,}$/;
    return regex.test(value);
  },
  message:
    "The email address must be in a valid format (e.g., example@domain.com)",
});

export default {
  name: "SignUp",
  data() {
    return {
      form: {
        email: "",
        username: "",
        gender: "",
      },
      genderOptions: [
        { value: "M", text: "Male" },
        { value: "F", text: "Female" },
        {
          value: "Uno de los 39 tipos de gay",
          text: "Uno de los 39 tipos de gay",
        },
      ],
      loading: false,
    };
  },
  methods: {
    signup() {
      this.loading = true;
      axios
        .post(
          "https://3tpdypq2mc.execute-api.us-east-2.amazonaws.com/Prod/register_user",
          {
            email: this.form.email,
            username: this.form.username,
            gender: this.form.gender,
          }
        )
        .then((response) => {
          this.form.email = "";
          this.form.username = "";
          this.form.gender = null;
          this.redirectUser();
        })
        .catch((error) => {
          if (this.form.gender === "Uno de los 39 tipos de gay") {
            this.$swal({
              title: "Cual de los 39?",
              icon: "warning",
              imageUrl:
                "https://i.kym-cdn.com/photos/images/newsfeed/002/418/775/f5d.jpeg",
              imageHeight: "300",
            });
          } else {
            this.$swal({
              title: "Sign up error",
              text: "Please verify your information and try again.",
              icon: "error",
            });
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    redirectUser() {
      localStorage.setItem("showToast", "true");
      this.$router.push("/change-temporary-password");
    },
  },
};
</script>
<style src="@/assets/styles/auth-styles.css"></style>
