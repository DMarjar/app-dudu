<template>
  <b-modal v-model="showModal" title="Edit Profile" @hide="emitClose" dialog-class="custom-modal">
    <div class="form-group">
      <label for="gender">Gender</label>
      <select v-model="profile.gender" class="form-input" id="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" v-model="profile.email" class="form-input" id="email" />
    </div>
    <template #modal-footer="{ cancel }">
      <div v-if="!isLoading" class="row">
      <button @click="cancel" class="cancel-button">
        Cancel
        <i class="fi fi-tr-circle-xmark"></i>
      </button>
      <button @click="updateProfile" class="confirm-button">
        Save Changes
        <i class="fi fi-tr-vote-yea"></i>
      </button>
    </div>
    <div v-else class="d-flex justify-content-center align-items-center">
      <b-spinner label="Loading..." small></b-spinner>
    </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { BModal } from 'bootstrap-vue';
import profileService from '../services/profileService';
import { getUserId } from '@/utils/getTokenInformation';
import { is } from 'vee-validate/dist/rules';

export default defineComponent({
  name: 'EditProfileModal',
  components: {
    BModal
  },
  data() {
    return {
      isLoading: false
    }
  },
  props: {
    profile: {
      type: Object as PropType<{gender: string; email: string }>,
      required: true
    },
    showModal: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    validateForm(){
      return !(
        this.profile.email === '' ||
        this.profile.gender === ''
      )
    },
    async updateProfile() {
      if (!this.validateForm()) {
        this.$swal(
          "Error",
          "Please fill all the fields.",
          "error"
        );
        return;
      }
      const result = await this.$swal({
        title: "Are you sure?",
        text: "You are about to update your profile.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, update it!",
        cancelButtonText: "No, cancel!",
      });
      if (result.isConfirmed){
        this.isLoading = true;
        try {
        const requestBody = {
          id_user: getUserId(),
          sub: getUserId(),
          email: this.profile.email,
          gender: this.profile.gender.substring(0, 1)
        };
        const response = await profileService.updateProfile(requestBody);
        if (response.status !== 200) {
            this.$swal(
              "Error",
              "An error occurred while creating the mission. Try again later.",
              "error"
            );
            return;
          }
          this.$swal(
            "Success",
            "The mission has been created successfully.",
            "success"
          );
          this.$emit('update-profile', this.profile);
          this.emitClose(); // Cerrar el modal después de una respuesta exitosa
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }        
      } else {
        this.$swal("Cancelled", "The mission is safe!", "info");
      }
    },
    emitClose() {
      this.$emit('close');
    }
  }
});
</script>


<style scoped>
@import "~@flaticon/flaticon-uicons/css/all/all";

.custom-modal .modal-content {
  padding: 20px;
  color: white;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  text-align: left;
  font-family: 'Playfair Display', serif;
  max-width: 90%; 
  margin: 0 auto; 
}

.custom-modal .modal-header {
  border-bottom: none;
}

.custom-modal .modal-footer {
  border-top: none;
}

.custom-modal .btn-primary,
.custom-modal .btn-secondary {
  display: none;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  font-family: 'Alice', serif;
}

.form-input {
  width: 100%;
  margin: 0 auto; /* Centra el contenedor si es necesario */
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 13px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  color: #000000;
  font-family: 'Open Sans', sans-serif;
}

.form-input::placeholder {
  color: #666;
}

.form-input:focus {
  border-color: #007bff; /* Border color when focused */
  background-color: #ffffff;
  color: #000000;
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.25); /* Focus shadow effect */
}

/* Button Styles */
.cancel-button,
.confirm-button {
  padding: 10px 20px; 
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
}

.cancel-button {
  background-color: #ACA7A4;
}

.cancel-button i {
  margin-left: 10px;
  font-size: 16px;
}

.cancel-button:hover {
  background-color: #615e5d;
}

.confirm-button {
  background-color: #577CA6;
}

.confirm-button i {
  margin-left: 10px;
  font-size: 16px;
}

.confirm-button:hover {
  background-color: #3b5a82;
}

/* Estilos responsivos */
@media (max-width: 600px) {
  .custom-modal .modal-content {
    max-width: 100%; 
    padding: 15px;
  }

  .form-input {
    font-size: 14px; 
  }

  .cancel-button,
  .confirm-button {
    font-size: 14px; 
    padding: 8px 15px; 
  }

  .cancel-button i,
  .confirm-button i {
    font-size: 14px; 
  }
}

@media (max-width: 400px) {
  .custom-modal .modal-content {
    max-width: 90%; 
    padding: 10px;
  }

  .form-input {
    font-size: 12px;
  }

  .cancel-button,
  .confirm-button {
    font-size: 12px; 
    padding: 6px 12px; 
  }

  .cancel-button i,
  .confirm-button i {
    font-size: 12px; 
  }
}
</style>
