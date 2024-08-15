<template>
  <b-modal
    class="glass-card background-modal"
    id="missionDetailsModal"
    hide-header-close
    hide-footer
    centered
    no-stacking
    no-close-on-esc
  >
    <template v-slot:modal-title>
      <div class="top-part-card">
        <span class="open-sans mission-number mission-number-details"
          >#{{ mission.id_mission }}</span
        >
        <b-badge class="pending-badge badge"
          ><span class="alice-regular"> {{ mission.status }}</span></b-badge
        >
      </div>
    </template>

    <div class="playfair-display mission-description-details">
      <span>{{ mission.fantasy_description }}</span>
    </div>

    <b-row>
      <b-col class="mission-og-description-details">
        <span class="alice-regular">{{
          missionDetails.original_description
        }}</span>
      </b-col>
    </b-row>

    <b-row class="open-sans">
      <b-col cols="12" md="4" class="mission-time-details">
        <label>Creation date:</label>
        <div class="date-details">
          <p>{{ missionDetails.creation_date }}</p>
        </div>
      </b-col>
      <b-col cols="12" md="4" class="mission-time-details">
        <label>Due date:</label>
        <div class="date-details">
          <p>{{ missionDetails.due_date }}</p>
        </div>
      </b-col>

      <!-- THIS FRAGMENT DECIDES WHETHER TO DISPLAY THE REMAINING TIME OR THE STATUS OF THE MISSION-->
      <b-col
        v-if="missionDetails.status === 'pending'"
        cols="12"
        md="4"
        class="mission-time-details"
      >
        <label>Remaining time:</label>
        <div class="date-details">
          <p>{{ calculateRemainingTime() }}</p>
        </div>
      </b-col>
      <b-col v-else cols="12" md="4" class="mission-time-details">
        <label>Status:</label>
        <div class="date-details">
          <p>{{ statusDisplayMessage() }}</p>
        </div>
      </b-col>
    </b-row>

    <div
      class="text-center btn-modal-container"
      v-if="missionDetails.status === 'pending'"
    >
      <!-- THIS ROW IS ONLY SHOWN IF THE MISSION IS PENDING-->
      <b-row id="btn-modal-row-details" style="margin-top: 35px">
        <b-col cols="6" id="btn-complete-modal-col">
          <div class="button-container-modal">
            <span><i class="fi fi-tr-add button-icon-modal"></i></span>
            <b-button
              @click="completeMission"
              id="complete-btn-modal-details"
              variant="primary"
              class="open-sans"
              :disabled="isLoading"
              block
            >
              Complete
            </b-button>
          </div>
        </b-col>

        <b-col id="btn-cancel-modal-col-details">
          <div class="button-container-modal">
            <span><i class="fi fi-tr-circle-xmark button-icon-modal"></i></span>
            <b-button
              id="cancel-btn-modal-details"
              @click="cancelMission"
              class="open-sans"
              :disabled="isLoading"
              block
            >
              Cancel
            </b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-modal>
</template>

<script lang="ts">
import Vue from "vue";
import { Mission } from "@/modules/missions/types/Mission";
import missionService from "@/modules/missions/services/missionService";
import { getUserId } from "@/utils/getTokenInformation";

export default Vue.extend({
  name: "MissionDetailsModal",
  props: {
    mission: {
      type: Object as () => Mission,
      required: true as boolean,
    },
  },

  data() {
    return {
      // Selected mission data
      missionDetails: this.mission as Mission,

      // Loading status
      isLoading: false as boolean,
    };
  },

  methods: {
    // Function to change loading status to the opposite value
    changeLoadingStatus() {
      this.isLoading = !this.isLoading;
    },

    // Function to set loading status to a specific value
    setLoadingStatus(status: boolean) {
      this.isLoading = status;
    },

    statusDisplayMessage() {
      switch (this.missionDetails.status) {
        case "cancelled":
          return "Cancelled...";
        case "completed":
          return "Completed!";
        case "failed":
          return "Failed...";
        default:
          return "Unknown...";
      }
    },

    // Function to cancel a pending mission
    async cancelMission() {
      this.changeLoadingStatus();

      const requestBody = {
        id_mission: this.missionDetails.id_mission,
        id_user: getUserId(),
      };
      try {
        const response = await missionService.cancelMission(requestBody);

        if (response.status !== 200) {
          // TODO: Manage correct swal style
          this.$swal(
            "Error",
            "An error occurred while canceling the mission. Try again later.",
            "error"
          );
          return;
        }

        // TODO: Manage correct swal style
        this.$swal(
          "Success",
          "The mission has been cancelled successfully.",
          "success"
        );
        this.missionDetails.status = "cancelled";
        this.$emit("statusChanged", this.missionDetails.status);
      } catch (error) {
        console.error("Error cancelling mission:", error);
      } finally {
        this.changeLoadingStatus();
      }
    },

    // Function to mark a pending mission as completed
    async completeMission() {
      this.changeLoadingStatus();

      const requestBody = {
        id_mission: this.missionDetails.id_mission,
<<<<<<< HEAD
      };
=======
        id_user: getUserId(),
      }
>>>>>>> 79d4696867093712c7ad5629dcfd248c69f294d4
      try {
        const response = await missionService.completeMission(requestBody);

        if (response.status !== 200) {
          // TODO: Manage correct swal style
          this.$swal(
            "Error",
            "An error occurred while canceling the mission. Try again later.",
            "error"
          );
          return;
        }

        const {level, level_up, xp,} = response.data;

        let message = `The mission has been completed successfully! You earned ${xp} XP.`;

        if (level_up) {
          message += ` You leveled up to level ${level}!`;
        }

        this.$swal(
<<<<<<< HEAD
          "Success",
          "The mission has been completed successfully.",
          "success"
        );
        this.missionDetails.status = "completed";
        this.$emit("statusChanged", this.missionDetails.status);
=======
            "Success",
            message,
            "success"
        );

        this.missionDetails.status = 'completed';
        this.$emit('statusChanged', this.missionDetails.status);
>>>>>>> 79d4696867093712c7ad5629dcfd248c69f294d4
      } catch (error) {
        console.error("Error completing mission:", error);
      } finally {
        this.changeLoadingStatus();
      }
    },

    // Function to calculate the remaining time for the mission
    calculateRemainingTime() {
      const dueDate = new Date(this.missionDetails.due_date);
      const currentDate = new Date();
      const timeDifference = dueDate.getTime() - currentDate.getTime();
      const remainingDays = Math.floor(timeDifference / (1000 * 3600 * 24));
      const remainingHours = Math.floor(
        (timeDifference % (1000 * 3600 * 24)) / (1000 * 3600)
      );
      const remainingMinutes = Math.floor(
        (timeDifference % (1000 * 3600)) / (1000 * 60)
      );

      if (remainingDays > 0) {
        return `${remainingDays} days, ${remainingHours} hours`;
      } else if (remainingHours > 0) {
        return `${remainingHours} hours, ${remainingMinutes} minutes`;
      } else {
        return `${remainingMinutes} minutes`;
      }
    },
  },

  watch: {
    // watcher for the mission prop
    mission: {
      handler() {
        this.missionDetails = this.mission;
      },
      immediate: true,
    },
  },

  mounted() {},
});
</script>

<style scoped></style>
