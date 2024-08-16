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
            <b-row
              v-if="!isLoading"
              id="btn-modal-row-details"
              style="margin-top: 35px"
            >
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
            </b-row>
            <b-row
              v-else
              class="d-flex justify-content-center align-items-center"
            >
              <b-spinner label="Loading..." small></b-spinner>
            </b-row>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { required } from "vee-validate/dist/rules";
import { extend } from "vee-validate";
import missionService from "@/modules/missions/services/missionService";
import { getUserId } from "@/utils/getTokenInformation";

extend("required", {
  ...required,
  message: "This field is required",
});

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
      if (!this.validateForm()) {
          return;
        }
      const result = await this.$swal({
        title: "Are you sure?",
        text: "Do you really want to complete this mission?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });
      if (result.isConfirmed) {

        this.isLoading = true;

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
          this.$emit("mission-created");
          this.setModalStatus(false);
        } catch (error) {
          console.error(error);
        } finally {
          this.isLoading = false;
        }
      } else {
        this.$swal("Cancelled", "The mission is safe!", "info");
        this.setModalStatus(false);
      }
    },
  },
});
</script>
