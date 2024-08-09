<template>
  <div class="view-body">
    <img src="@/assets/icon-sidebar.png" class="sidebar-toggle" :class="{ hidden: isSidebarOpen }" @click="toggleSidebar" alt="Menu Icon">
    <Sidebar ref="sidebar" @toggle="onSidebarToggle" />
    <div class="profile-container">
      <ProfileCard :profile="profile" @show-delete-modal="showDeleteModal" />
      <img src="@/assets/magician.png" class="mage-image" alt="Mage Image">
    </div>
    <ConfirmDeleteModal
      :show="showDelete"
      @close="showDelete = false"
      @confirm="deleteProfile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProfileCard from '../components/ProfileCard.vue';
import Sidebar from '../components/Sidebar.vue';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal.vue';

export default defineComponent({
  name: 'ProfileView',
  components: {
    ProfileCard,
    Sidebar,
    ConfirmDeleteModal
  },
  data() {
    return {
      profile: {
        username: 'WizardGuy123',
        email: 'john@example.com',
        gender: 'pene',
        currentLevel: 4,
        currentXP: 76,
        maxXP: 100,
      },
      isSidebarOpen: false,
      showDelete: false
    };
  },
  methods: {
    toggleSidebar() {
      (this.$refs.sidebar as any).toggleSidebar();
    },
    onSidebarToggle(isOpen: boolean) {
      this.isSidebarOpen = isOpen;
    },
    showDeleteModal() {
      this.showDelete = true;
    },
    deleteProfile() {
      console.log('Profile deleted');
      this.showDelete = false;
    }
  }
});
</script>


<style>
.view-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url(../../../assets/background-dudu.png);
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
  width: 68.5%; 
  height: auto;
  z-index: 20; 
  right: -64%; 
  top: 42%;
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
