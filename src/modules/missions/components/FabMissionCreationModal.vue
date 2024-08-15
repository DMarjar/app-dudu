<template>
  <div>
    <b-button variant="primary" class="fab" @click="showModal = true">
      <span
      ><i
          style="position: relative; top: 6px"
          class="fi fi-tr-scroll-document-story"
      ></i
      ></span>
    </b-button>

    <b-modal
      class="glass-card"
      id="form-modal"
      v-model="showModal"
      @hide="resetForm"
      no-close-on-esc
      no-stacking
      centered
      hide-header-close
      hide-footer
      @hidden="resetForm"
    >
      <template v-slot:modal-title>
        <span class="playfair-display form-title">Create mission</span>
      </template>

      <!-- TODO: CHANGE THE VALIDATION BECAUSE I DONT UNDERSTAND VEE-VALIDATE-->
      <ValidationObserver>
        <b-form @submit.prevent="createMission">
          <b-form-group
            label="Dutie Description:"
            class="alice-regular"
            label-for="description"
          >
            <ValidationProvider rules="required" v-slot="{ errors }">
              <b-form-textarea
                  id="description"
                  v-model="newMission.description"
                  required
                  no-resize
                  trim
                  max-rows="3"
                  no-auto-shrink
                  rows="3"
              ></b-form-textarea>
              <span class="errors">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-form-group>

          <div class="row">
            <div class="col">
              <b-form-group
                label="Creation date"
                class="alice-regular"
                label-for="creationDate"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="creationDate"
                    v-model="newMission.creationDate"
                    type="date"
                    required
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group
                label="Due date"
                class="alice-regular"
                label-for="dueDate"
              >
                <ValidationProvider rules="required" v-slot="{ errors }">
                  <b-form-input
                    id="dueDate"
                    v-model="newMission.dueDate"
                    type="date"
                    required
                  ></b-form-input>
                  <span class="errors">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
          </div>

          <div class="text-center btn-modal-container">
            <div class="row" id="btn-modal-row">
              <div class="col-6" id="btn-create-modal-col">
                <div class="button-container-modal">
                  <span><i class="fi fi-tr-add button-icon-modal"></i></span>
                  <b-button
                    type="submit"
                    id="create-btn-modal"
                    class="open-sans"
                    :disabled="isLoading"
                    >Create</b-button
                  >
                </div>
              </div>
              <div class="col-6" id="btn-cancel-modal-col">
                <div class="button-container-modal">
                  <span
                    ><i class="fi fi-tr-circle-xmark button-icon-modal"></i
                  ></span>
                  <b-button
                    id="cancel-btn-modal"
                    class="open-sans"
                    @click="setModalStatus(false)"
                    :disabled="isLoading"
                    >Cancel</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {required} from "vee-validate/dist/rules";
import {extend} from "vee-validate";
import missionService from "@/modules/missions/services/missionService";
import {getUserId} from "@/utils/getTokenInformation";

extend("required", {
  ...required,
  message: "This field is required",
});

/*
TODO: Add validation for the creation and due date, such as:
- The creation date must be before the end date
- The due date must be after the creation date
- The due date must be in the future
- Both dates must be different
 */

export default Vue.extend({
  data() {
    return {
      // Modal status
      showModal: false,

      // Loading status
      isLoading: false,

      // Mission data
      newMission: {
        description: "",
        creationDate: "",
        dueDate: "",
      },
    };
  },
  methods: {
    // Function to change modal status to the opposite value
    changeModalStatus() {
      this.showModal = !this.showModal;
    },

    // Function to set modal status to a specific value
    setModalStatus(status: boolean) {
      this.showModal = status;
    },

    changeLoadingStatus() {
      this.isLoading = !this.isLoading;
    },

    setLoadingStatus(status: boolean) {
      this.isLoading = status;
    },

    // Function to reset the form values when the modal is hidden
    resetForm() {
      this.newMission = {
        description: "",
        creationDate: "",
        dueDate: "",
      };
    },

    // TODO: CHANGE ME to a correct validation with vee-validate
    validateForm() {
      return !(
          this.newMission.description === "" ||
          this.newMission.creationDate === "" ||
          this.newMission.dueDate === ""
      );
    },

    // Function to handle the form submission
    async createMission() {
      // TODO: Add correct form validation CHANGE ME
      if (!this.validateForm()) {
        return;
      }

      this.changeLoadingStatus();
      try {
        const requestBody = {
          id_user: getUserId(),
          original_description: this.newMission.description,
          creation_date: this.newMission.creationDate,
          due_date: this.newMission.dueDate,
          status: "pending",
        };

        const response = await missionService.createMission(requestBody);

        if (response.status !== 200) {
          // TODO: Manage correct swal style
          this.$swal(
              "Error",
              "An error occurred while creating the mission. Try again later.",
              "error"
          );
          return;
        }

        // TODO: Manage correct swal style
        this.$swal(
            "Success",
            "The mission has been created successfully.",
            "success"
        );
        this.setModalStatus(false);
        // Emit an event to notify the parent component that a mission has been created to get the latest data
        this.$emit("mission-created");
      } catch (error) {
        console.error(error);
      } finally {
        this.changeLoadingStatus();
      }
    },
  },
});
</script>
