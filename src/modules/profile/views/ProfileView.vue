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
      <ProfileCard @level-updated="updateMageImage" @show-delete-modal="showDeleteModal" />
      <img :src="mageImageSrc" class="mage-image" alt="Mage Image" />
    </div>
    <ConfirmDeleteModal
      :show="showDelete"
      @confirm="deleteProfile"
      @close="showDelete = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ProfileCard from "../components/ProfileCard.vue";
import Sidebar from "../components/Sidebar.vue";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal.vue";
import profileService from "@/modules/profile/services/profileService";

export default defineComponent({
  name: "ProfileView",
  components: {
    ProfileCard,
    Sidebar,
    ConfirmDeleteModal,
  },
  data() {
    return {
      isSidebarOpen: false,
      showDelete: false,
      mageImageSrc: "",
    };
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
      try {
        await profileService.deleteUserProfile();
        console.log("Profile successfully deleted");
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting profile: ", error);
        this.$router.push("/");
      } finally {
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
        console.error('Error loading mage image:', error);
        this.mageImageSrc = require('@/assets/magician.png');
      }
    }
  }
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
