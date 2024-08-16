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

      <ValidationObserver v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(createMission)">
          <b-form-group
            label="Dutie Description:"
            class="alice-regular"
            label-for="description"
          >
            <ValidationProvider
              rules="required|max:150|no_invalid_chars|min:15"
              v-slot="{ errors }"
            >
              <b-form-textarea
                id="description"
                v-model="newMission.description"
                no-resize
                trim
                max-rows="3"
                no-auto-shrink
                rows="3"
              ></b-form-textarea>
              <span class="errors open-sans">{{ errors[0] }}</span>
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
                    disabled
                  ></b-form-input>
                  <span class="errors open-sans">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-form-group>
            </div>
            <div class="col">
              <b-form-group
                label="Due date"
                class="alice-regular"
                label-for="dueDate"
              >
                <ValidationProvider
                  rules="required|date_after_today"
                  v-slot="{ errors }"
                >
                  <b-form-input
                    id="dueDate"
                    v-model="newMission.dueDate"
                    type="date"
                  ></b-form-input>
                  <span class="errors open-sans">{{ errors[0] }}</span>
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

            <b-spinner v-if="isLoading" label="Loading..."></b-spinner>
          </div>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import missionService from "@/modules/missions/services/missionService";
import { getUserId } from "@/utils/getTokenInformation";

import { extend } from "vee-validate";
import { required, max, min } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

extend("min", {
  ...min,
  params: ["length"],
  message: "This field cannot be shorter than {length} characters",
});

extend("max", {
  ...max,
  params: ["length"],
  message: "This field cannot be longer than {length} characters",
});

extend("no_invalid_chars", {
  validate: (value) => {
    const invalidChars = /[\{\}\[\];<>'`]/;
    return !invalidChars.test(value);
  },
  message:
    "Dutie description cannot contain the following characters: { } [ ] ; < > \" '",
});

extend("date_after_today", {
  validate: (value) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate());

    const selectedDate = new Date(value);
    return selectedDate >= tomorrow;
  },
  message: "The due date must be tomorrow or later",
});

export default Vue.extend({
  data() {
    return {
      showModal: false,
      isLoading: false,
      newMission: {
        description: "",
        creationDate: "",
        dueDate: "",
      },
    };
  },
  methods: {
    changeModalStatus() {
      this.showModal = !this.showModal;
    },

    setModalStatus(status: boolean) {
      this.showModal = status;
    },

    async createMission() {
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
    },

    resetForm() {
      const today = new Date().toISOString().split("T")[0];
      this.newMission = {
        description: "",
        creationDate: today,
        dueDate: "",
      };
    },
  },
  mounted() {
    this.resetForm();
  },
});
</script>
