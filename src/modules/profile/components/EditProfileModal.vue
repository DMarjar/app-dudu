<template>
    <b-modal v-model="showModal" title="Edit Profile" @ok="updateProfile" @hide="emitClose" dialog-class="custom-modal">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" v-model="profile.username" class="form-control" id="username" />
      </div>
      <div class="form-group">
        <label for="gender">Gender</label>
        <select v-model="profile.gender" class="form-control" id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" v-model="profile.email" class="form-control" id="email" />
      </div>
      <template #modal-footer="{ ok, cancel }">
        <button @click="cancel" class="cancel-button">
          Cancel
          <i class="fi fi-tr-circle-xmark"></i>
        </button>
        <button @click="ok" class="confirm-button">
          Save Changes
          <i class="fi fi-tr-vote-yea"></i>
        </button>
      </template>
    </b-modal>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { BModal } from 'bootstrap-vue';
  
  export default defineComponent({
    name: 'EditProfileModal',
    components: {
      BModal
    },
    props: {
      profile: {
        type: Object as PropType<{ username: string; gender: string; email: string }>,
        required: true
      },
      showModal: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      updateProfile() {
        this.$emit('update-profile', this.profile);
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
    background: linear-gradient(135deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0));
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    text-align: left;
    font-family: 'Playfair Display', sans-serif;
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
    font-family: 'Playfair Display', serif;
  }

  .form-group input,
  .form-group select {
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 13px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
    background-color: #333;
    color: rgb(255, 255, 255);
  }

  .form-group input::placeholder,
  .form-group select::placeholder {
    color: #666;
  }

  .form-group input:focus,
  .form-group select:focus {
    background-color: #333;
    color: rgb(255, 255, 255);
  }

  .form-group option {
    color: rgb(255, 255, 255);
    background-color: #333;
  }

  .cancel-button,
  .confirm-button {
    padding: 5px 20px;
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

  </style>