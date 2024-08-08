<template>
  <b-modal
      id="missionDetailsModal"
      :title="missionDetails.fantasy_description"
      hide-header-close
      hide-footer
      centered
      no-stacking
      no-close-on-esc
  >
    <b-row>
      <b-col class="mb-3">
        {{ missionDetails.original_description }}
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="12" md="4">
        <label>Creation date:</label>
        <p>{{ missionDetails.creation_date }}</p>
      </b-col>
      <b-col cols="12" md="4">
        <label>Due date:</label>
        <p>{{ missionDetails.due_date }}</p>
      </b-col>

      <!-- THIS FRAGMENT DECIDES WHETHER TO DISPLAY THE REMAINING TIME OR THE STATUS OF THE MISSION-->
      <b-col v-if="missionDetails.status === 'pending'" cols="12" md="4">
        <label>Remaining time:</label>
        <p>{{ calculateRemainingTime() }}</p>
      </b-col>
      <b-col v-else cols="12" md="4">
        <label>Status:</label>
        <p>{{ statusDisplayMessage() }}</p>
      </b-col>
    </b-row>

    <!-- THIS ROW IS ONLY SHOWN IF THE MISSION IS PENDING-->
    <b-row v-if="missionDetails.status === 'pending'">
      <b-col cols="12" class="mb-2">
        <b-button @click="completeMission" variant="primary" :disabled="isLoading" block>
          Mark as completed
        </b-button>
      </b-col>
      <b-col>
        <b-button @click="cancelMission" variant="danger" :disabled="isLoading" block>
          Cancel mission
        </b-button>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import Vue from 'vue';
import {Mission} from '@/modules/missions/types/Mission';
import missionService from "@/modules/missions/services/missionService";
import {getUserId} from "@/utils/getTokenInformation";

export default Vue.extend({
  name: 'MissionDetailsModal',
  props: {
    mission: {
      type: Object as () => Mission,
      required: true as boolean,
    }
  },

  data() {
    return {
      // Selected mission data
      missionDetails: this.mission as Mission,

      // Loading status
      isLoading: false as boolean,
    }
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
        case 'cancelled':
          return 'Cancelled...';
        case 'completed':
          return 'Completed!';
        case 'failed':
          return 'Failed...';
        default:
          return 'Unknown...';
      }
    },

    // Function to cancel a pending mission
    async cancelMission() {
      this.changeLoadingStatus();

      const requestBody = {
        id_mission: this.missionDetails.id_mission,
        id_user: getUserId(),
      }
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
        this.missionDetails.status = 'cancelled';
        this.$emit('statusChanged', this.missionDetails.status);
      } catch (error) {
        console.error('Error cancelling mission:', error);
      } finally {
        this.changeLoadingStatus();
      }
    },

    async completeMission() {
      this.changeLoadingStatus();

      const requestBody = {
        id_mission: this.missionDetails.id_mission,
      }
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

        // TODO: Manage correct swal style
        this.$swal(
            "Success",
            "The mission has been completed successfully.",
            "success"
        );
        this.missionDetails.status = 'completed';
        this.$emit('statusChanged', this.missionDetails.status);
      } catch (error) {
        console.error('Error completing mission:', error);
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
      const remainingHours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
      const remainingMinutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

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

  mounted() {
  },
});
</script>


<style scoped>

</style>