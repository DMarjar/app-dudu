<template>
  <div class="view-home">
    <div class="name-xp-container">
      <div>
        <h3 class="playfair-display wizard-name">WizardGuy123</h3>
        <!-- <div class="xp-bar open-sans">
          <div class="xp-fill" :style="{ width: xpPercentage + '%' }"></div>
          <span class="xp-number">{{ currentXp }}/{{ totalXp }}</span>
        </div> -->
      </div>
      <div class="fab-top">
        <span><i class="fi fi-ts-circle-user user-icon"></i></span>
      </div>
    </div>

    <div class="player-img-container">
      <img :src="getPlayerImage()" class="player-image" alt="Player image" />
    </div>
    <div class="home-mission-filter-container">
      <b-row>
        <!-- Missions list -->
        <b-col cols="8" v-if="missions.length > 0">
          <div class="home-only-mission-container">
            <b-row no-gutters>
              <b-col
                cols="6"
                v-for="mission in missions"
                :key="mission.id_mission"
                class="mission-col-card"
              >
                <b-card
                  class="glass-card"
                  @click="selectMission(mission)"
                  v-b-modal.missionDetailsModal
                >
                  <template>
                    <div class="top-part-card">
                      <span class="open-sans mission-number"
                        >#{{ mission.id_mission }}</span
                      >
                      <b-badge class="pending-badge badge"
                        ><span class="alice-regular">
                          {{ mission.status }}</span
                        ></b-badge
                      >
                    </div>
                  </template>

                  <div>
                    <h5 class="playfair-display">
                      <span class="mission-description">
                        {{ mission.fantasy_description }}
                      </span>
                    </h5>
                    <p class="open-sans time-left">
                      {{ subtitleDisplayMessage(mission) }}
                    </p>
                  </div>
                </b-card>
              </b-col>
            </b-row>
          </div>
        </b-col>

        <b-col cols="8" v-else class="no-mission-col-card">
          <b-card class="glass-card">
            <p>No missions {{ searchRequest.status }} yet.</p>
          </b-card>
        </b-col>

        <!-- Filters -->
        <b-col cols="4" class="filters-card">
          <b-card
            title="Filters"
            class="filters-card-container playfair-display"
          >
            <b-form-group label="Search">
              <div class="form-input">
                <span><i class="fi fi-tr-issue-loupe icon"></i></span>
                <b-form-input
                  id="input-1"
                  class="input"
                  @keydown.enter="searchMissions"
                  v-model="searchRequest.search_query"
                ></b-form-input>
              </div>
            </b-form-group>

            <b-form-group label="Order by">
              <b-form-select
                class="input-no-icon"
                v-model="searchRequest.order_by"
                @change="searchMissions"
              >
                <b-form-select-option value="creation_date"
                  >Creation date</b-form-select-option
                >
                <b-form-select-option value="due_date"
                  >Due date</b-form-select-option
                >
              </b-form-select>
            </b-form-group>

            <b-form-group label="Order">
              <b-form-select
                class="input-no-icon"
                v-model="searchRequest.order"
                @change="searchMissions"
              >
                <b-form-select-option value="ASC"
                  >Ascending</b-form-select-option
                >
                <b-form-select-option value="DESC"
                  >Descending</b-form-select-option
                >
              </b-form-select>
            </b-form-group>

            <b-form-group label="Status">
              <b-form-select
                class="input-no-icon"
                v-model="searchRequest.status"
                @change="searchMissions"
              >
                <b-form-select-option value="pending"
                  >Pending</b-form-select-option
                >
                <b-form-select-option value="completed"
                  >Completed</b-form-select-option
                >
                <b-form-select-option value="failed"
                  >Failed</b-form-select-option
                >
                <b-form-select-option value="cancelled"
                  >Cancelled</b-form-select-option
                >
              </b-form-select>
            </b-form-group>
          </b-card>
        </b-col>
      </b-row>
      <div style="width: 66%; display: flex; justify-content: center">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalMissions"
          :per-page="missionsPerPage"
          @change="searchMissions"
        ></b-pagination>
      </div>
    </div>

    <FabMissionCreationModal @mission-created="searchMissions()" />
    <MissionDetailsModal
      @statusChanged="handleStatusChange"
      :mission="selectedMission"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import missionService from "@/modules/missions/services/missionService";
import { SearchRequest } from "../types/SearchRequest";
import { Mission } from "@/modules/missions/types/Mission";
import { getUserId } from "@/utils/getTokenInformation";

export default Vue.extend({
  name: "MissionsPage",
  components: {
    FabMissionCreationModal: () =>
      import("@/modules/missions/components/FabMissionCreationModal.vue"),
    MissionDetailsModal: () =>
      import("@/modules/missions/components/MissionDetailsModal.vue"),
  },
  data() {
    return {
      // Missions
      missions: [] as Mission[],
      selectedMission: {} as Mission,

      // Pagination
      currentPage: 1,
      totalMissions: 0,
      missionsPerPage: 6, // static value, do not change

      // Filters and search object
      searchRequest: {
        id_user: 0,
        search_query: "",
        order_by: "due_date",
        order: "ASC",
        status: "pending",
        page: 1,
        limit: 6,
      } as SearchRequest,

      // Loading
      isLoading: false,
    };
  },

  methods: {
    // Function to change loading status to the opposite value
    changeLoadingStatus() {
      this.isLoading = !this.isLoading;
    },

    // Function to set the loading status to a specific value
    // Useful for chained async function calls
    setLoadingStatus(status: boolean) {
      this.isLoading = status;
    },

    // Function to select a mission and open the details modal
    selectMission(mission: Mission) {
      this.selectedMission = mission;
    },

    // Function to search missions
    async searchMissions() {
      // TODO: Add the loading spinner
      this.missions = [];
      this.changeLoadingStatus();
      try {
        this.searchRequest.page = this.currentPage;
        const response = await missionService.searchMissions(
          this.searchRequest
        );

        console.log(response);

        // If the response status is not 200, show an error message
        if (response.status !== 200) {
          // TODO: Manage correct swal style
          this.$swal(
            "Error",
            "An error occurred while searching the missions. Try again later.",
            "error"
          );
          return;
        }

        const data = response.data;
        this.missions = data.missions;
        this.totalMissions = data.total;
      } catch (error) {
        console.error(error);
      } finally {
        this.changeLoadingStatus();
      }
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

    // Function to handle the status change of a mission
    handleStatusChange(status: string) {
      this.searchRequest.status = status;
      this.searchMissions();
    },

    // Function to display the players image
    getPlayerImage(): string {
      // TODO: Get the profile data to display the correct gender and level
      const profilePLACEHOLDER = {
        gender: "M",
        level: 50,
      };

      // Return the correct image based on the level and gender
      return require(`@/assets/wizards/${profilePLACEHOLDER.gender.toLowerCase()}/wizard_lvl_${
        profilePLACEHOLDER.level
      }.png`);
    },

    // TODO: Decide to use a fixed background or a dynamic one
    // if you want the fixed background, use @/assets/backgrounds/bg_home.png
    // Function to get a random background image
    getRandomBackgroundImage(): string {
      // Get a random number between 0 and 6
      const randomNumber = Math.floor(Math.random() * 7);
      // Return the correct image based on the random number
      return require(`@/assets/backgrounds/bg_dynamic_${randomNumber}.png`);
    },
  },

  mounted() {
    // Set the user id
    this.searchRequest.id_user = getUserId();
    // Search missions
    this.searchMissions();
  },
});
</script>

<style src="@/assets/styles/home-styles.css"></style>
