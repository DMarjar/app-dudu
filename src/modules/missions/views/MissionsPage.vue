<template>
  <div>
    <b-row no-gutters>
      <!-- Player image -->
      <b-col>
        <img src="../../../assets/wizard-lvl50.png" alt="wizard" class="player-image"/>
      </b-col>

      <!-- Missions list -->
      <b-col v-if="missions.length > 0">
        <b-row no-gutters>
          <b-col v-for="mission in missions" :key="mission.id_mission" class="h-100">
            <b-card
                :title="mission.fantasy_description"
                :sub-title="subtitleDisplayMessage(mission)"
            >
            </b-card>
          </b-col>
        </b-row>
      </b-col>
      <b-col v-else>
        <b-card>
          <p>No missions found</p>
        </b-card>
      </b-col>

      <!-- Filters -->
      <b-col>
        <b-card
            title="Filters"
        >
          <b-form-group label="Search">
            <b-form-input
                v-model="searchRequest.search_query"
                @keydown.enter="searchMissions"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Order by">
            <b-form-select
                v-model="searchRequest.order_by"
                @change="searchMissions"
            >
              <b-form-select-option value="creation_date">Creation date</b-form-select-option>
              <b-form-select-option value="due_date">Due date</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Order">
            <b-form-select
                v-model="searchRequest.order"
                @change="searchMissions"
            >
              <b-form-select-option value="ASC">Ascending</b-form-select-option>
              <b-form-select-option value="DESC">Descending</b-form-select-option>
            </b-form-select>
          </b-form-group>

          <b-form-group label="Status">
            <b-form-select
                v-model="searchRequest.status"
                @change="searchMissions"
            >
              <b-form-select-option value="pending">Pending</b-form-select-option>
              <b-form-select-option value="completed">Completed</b-form-select-option>
              <b-form-select-option value="failed">Failed</b-form-select-option>
            </b-form-select>
          </b-form-group>
        </b-card>
      </b-col>
    </b-row>

    <!-- Pagination -->
    <b-row>
      <b-col>
        <b-pagination
            v-model="currentPage"
            :total-rows="totalMissions"
            :per-page="missionsPerPage"
            @change="searchMissions"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import missionService from "@/modules/missions/services/missionService";
import {SearchRequest} from "../types/SearchRequest";
import {Mission} from "@/modules/missions/types/Mission";

export default Vue.extend({
  name: "MissionsPage",
  data() {
    return {
      // Missions
      missions: [] as Mission[],

      // Pagination
      currentPage: 1,
      totalMissions: 0,
      missionsPerPage: 6, // static value, do not change

      // Filters and search object
      searchRequest: {
        id_user: 1,
        search_query: "",
        order_by: "creation_date",
        order: "ASC",
        status: "pending",
        page: 1,
      } as SearchRequest,
    };
  },

  methods: {
    // Function to search missions
    async searchMissions() {
      const response = await missionService.searchMissions(this.searchRequest);
      this.missions = response.missions;
      this.totalMissions = response.total;
    },

    // Function to display the subtitle message
    subtitleDisplayMessage(mission: Mission): string {
      // Check the mission status to display the correct message
      switch (mission.status) {
        case "completed":
          return "Completed!";
        case "failed":
          return "Failed...";
        case "cancelled":
          return "Cancelled...";
        case "pending":
          // Calculate the remaining days
          const dueDate = new Date(mission.due_date);
          const now = new Date();
          const diffTime = dueDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return `${diffDays} days left`;
      }
      // Default message
      return "=Unknown...";
    },
  },

  mounted() {
    this.searchMissions();
  },
});
</script>

<style scoped>
.player-image {
  width: 100%;
  height: auto;
}
</style>