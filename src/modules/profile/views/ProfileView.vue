<template>
  <div class="view-body-profile">
    <img
      src="@/assets/icon-sidebar.png"
      class="sidebar-toggle"
      :class="{ hidden: isSidebarOpen }"
      @click="toggleSidebar"
      alt="Menu Icon"
    />
    <Sidebar ref="sidebar" @toggle="onSidebarToggle" />
    <div class="profile-container">
      <div v-if="loading" class="loading-container">
        <span class="loading-spinner"></span>
        <!-- Indicador de carga -->
      </div>
      <div v-else>
        <ProfileCard
          :profile="userProfile"
          @level-updated="updateMageImage"
          @show-delete-modal="showDeleteModal"
        />
        <img :src="mageImageSrc" class="mage-image" alt="Mage Image" />
      </div>
    </div>
    <ConfirmDeleteModal
      :show="showDelete"
      @confirm="deleteProfile"
      @close="showDelete = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProfileCard from "../components/ProfileCard.vue";
import Sidebar from "../components/Sidebar.vue";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";
import profileService from "@/modules/profile/services/profileService";
import { getUserId } from "@/utils/getTokenInformation";

export default defineComponent({
  name: "ProfileView",
  components: {
    ProfileCard,
    Sidebar,
    ConfirmDeleteModal,
  },
  data() {
    return {
      userProfile: {
        level: "",
        current_xp: 0,
        gender: "",
        username: "",
        email: "",
      },
      isSidebarOpen: false,
      showDelete: false,
      mageImageSrc: "",
      loading: true, // Estado de carga inicializado en true
    };
  },
  async mounted() {
    try {
      const response = await profileService.getProfile();
      if (response.status === 200) {
        this.userProfile = response.data.profile;
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      this.loading = false; // Carga finalizada
    }
  },
  methods: {
    toggleSidebar() {
      (this.$refs.sidebar as any).toggleSidebar();
    },
    onSidebarToggle(isOpen: boolean) {
      if (!isOpen) {
        setTimeout(() => {
          this.isSidebarOpen = isOpen;
        }, 300);
      } else {
        this.isSidebarOpen = isOpen;
      }
    },
    showDeleteModal() {
      this.showDelete = true;
    },
    async deleteProfile() {
      const result = await this.$swal({
        title: "Are you sure?",
        text: "Do you really want to complete this mission?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      });
      if (result.isConfirmed) {
        try {
          this.loading = true;
          const requestBody = {
            id_user: getUserId(),
            sub: getUserId(),
          };

          const response = await profileService.deleteUserProfile(requestBody);
          console.log("Profile successfully deleted");
          if (response.status !== 200) {
            this.$swal(
              "Error",
              "An error occurred while deleting the profile. Try again later.",
              "error"
            );
            return;
          }

          this.$swal(
            "Success",
            "The mission has been created successfully.",
            "success"
          );
          if (typeof localStorage !== "undefined") {
            if (localStorage.getItem("id_token")) {
              localStorage.removeItem("id_token");
            }
            if (localStorage.getItem("access_token")) {
              localStorage.removeItem("access_token");
            }
          } else {
            this.$swal(
              "Error",
              "An error occurred while deleting the profile.",
              "error"
            );
          }

          if (this.$router) {
            this.$router.push("/");
          } else {
            console.error("Alert error.");
          }
        } catch (error) {
          console.error("Error deleting profile: ", error);
          if (this.$router) {
            this.$router.push("/");
          }
        } finally {
          this.showDelete = false;
          this.loading = false;
        }
      } else {
        this.$swal("Cancelled", "The mission is safe!", "info");
        this.showDelete = false;
      }
    },

    updateMageImage(level: number, gender: string) {
      const folder = gender.toLowerCase() === "m" ? "m" : "f";
      const levelSegment = Math.floor((level - 1) / 5) * 5 + 1;
      const adjustedLevelSegment = level % 5 === 0 ? level : levelSegment;
      try {
        this.mageImageSrc = require(`@/assets/wizards/${folder}/wizard_lvl_${adjustedLevelSegment}.png`);
      } catch (error) {
        console.error("Error loading mage image:", error);
        this.mageImageSrc = require("@/assets/magician.png");
      }
    },
  },
});
</script>

<style>
.view-body-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/backgrounds/bg_dynamic_1.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.profile-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mage-image {
  position: absolute;
  width: 60%;
  height: auto;
  z-index: 20;
  right: -64%;
  top: 50%;
  transform: translateY(-50%);
  animation: fade-up 0.3s;
}

.profile-card {
  position: relative;
  z-index: 10;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.loading-spinner {
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 5px solid #000;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
