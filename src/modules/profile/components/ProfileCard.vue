<template>
  <div class="profile-card glass">
    <h1 class="title">User Profile</h1>
    <div class="profile-container">
      <div class="avatar-container">
        <img :src="avatarSrc" alt="Avatar" class="avatar" />
        <span class="username">{{ username }}</span>
        <span class="gender">{{ profile.gender }}</span>
      </div>
      <div class="details-container">
        <div class="profile-detail">
          <label>Email:</label>
          <span>{{ email }}</span>
        </div>
        <div class="profile-detail">
          <label>Current level:</label>
          <span>{{ profile.currentLevel }}</span>
          <div class="level-container">
            <div class="level-bar">
              <div class="level-progress" :style="{ width: xpPercentage + '%' }"></div>
              <span class="level-text">{{ profile.currentXP }} / {{ profile.maxXP }}</span>
            </div>
          </div>
        </div>
        <div class="button-container">
          <button @click="showEditModal" class="edit-button">
            Edit Profile
            <i class="fi fi-rs-user-pen"></i>
          </button>
          <button @click="$emit('show-delete-modal')" class="delete-button">
            Delete Profile
            <i class="fi fi-tr-trash-xmark"></i>
          </button>
        </div>
      </div>
    </div>
    <EditProfileModal
      :profile="profile"
      :showModal="showModal"
      @close="showModal = false"
      @update-profile="updateProfile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import avatar from '@/assets/magician-profile.png';
import EditProfileModal from './EditProfileModal.vue';
import { getUserId, getUserEmail, getUsername } from '@/utils/getTokenInformation';



export default defineComponent({
  name: 'ProfileCard',
  components: {
    EditProfileModal
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const username = ref('');
    const email = ref('');
    const userId = ref('');

    const xpPercentage = computed(() => {
      return (props.profile.currentXP / props.profile.maxXP) * 100;
    });

    const showModal = ref(false);

    const showEditModal = () => {
      showModal.value = true;
    };

    const updateProfile = (updatedProfile: any) => {
      console.log('Profile updated', updatedProfile);
    };

    onMounted(() => {
      username.value = getUsername() || '';
      email.value = getUserEmail() || '';
      userId.value = getUserId() || '';
      //llamar a otras funciones para obtener más datos usando el userId
    });

    return {
      username,
      email,
      userId,
      xpPercentage,
      showModal,
      showEditModal,
      updateProfile,
      avatarSrc: avatar
    };
  }
});
</script>

<style scoped>
@import "~@flaticon/flaticon-uicons/css/all/all";

.profile-card {
  padding: 15px;
  color: white;
  border-radius: 15px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  text-align: left;
  width: 100%;
  max-width: 600px;
  overflow: hidden;
  animation: fade-up 0.5s;
  margin: 0 auto; 
}

.title {
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem; 
}

.profile-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  flex-shrink: 0;
  width: 150px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid white;
  margin-bottom: 10px;
}

.username, .gender {
  font-size: 1.0rem; 
  font-family: 'Playfair Display', serif;
  margin-bottom: 5px;
}

.details-container {
  flex: 1;
  min-width: 0;
}

.profile-detail {
  margin-bottom: 15px;
  font-size: 1rem; 
  font-family: 'Playfair Display', serif;
}

.profile-detail label {
  font-weight: bold;
  margin-right: 10px;
}

.profile-detail span {
  font-size: 1rem; 
  font-family: 'Playfair Display', serif;
  word-break: break-word;
}

.level-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.level-bar {
  position: relative;
  flex: 1;
  height: 30px;
  background-color: black;
  border-radius: 13px;
  border: 2px solid black;
  overflow: hidden;
  margin-right: 10px;
}

.level-progress {
  height: 100%;
  background-color: orange;
  border-radius: 10px;
}

.level-text {
  position: absolute;
  top: 50%;
  left: 90%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 14px;
  white-space: nowrap;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.edit-button, .delete-button {
  padding: 10px 20px; 
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  font-family: 'Open Sans', sans-serif;
  display: flex;
  align-items: center;
}

.edit-button {
  background-color: #000000;
  margin: 0 10px;
}

.edit-button i {
  margin-left: 10px;
  font-size: 20px; 
}

.edit-button:hover {
  background-color: #1a1919;
}

.delete-button {
  background-color: #BB2B31;
}

.delete-button i {
  margin-left: 10px;
  font-size: 20px; 
}

.delete-button:hover {
  background-color: #99222B;
}

@keyframes fade-up {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .profile-card {
    padding: 10px;
    max-width: 90%; 
  }

  .title {
    font-size: 1.8rem; 
  }

  .profile-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .avatar-container {
    margin-right: 0;
    margin-bottom: 15px;
    width: 120px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .username, .gender {
    font-size: 1rem; 
  }

  .profile-detail {
    font-size: 0.9rem; 
  }

  .level-text {
    font-size: 12px; 
  }

  .button-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-button, .delete-button {
    font-size: 14px; 
    padding: 8px 15px; 
  }

  .edit-button i,
  .delete-button i {
    font-size: 18px; 
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 5px;
    max-width: 100%;
  }

  .title {
    font-size: 1.5rem; 
  }

  .avatar-container {
    margin-bottom: 10px;
    width: 100px;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .username, .gender {
    font-size: 0.9rem; 
  }

  .profile-detail {
    font-size: 0.8rem; 
  }

  .level-text {
    font-size: 10px;
  }

  .button-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .edit-button, .delete-button {
    font-size: 12px; 
    padding: 5px 10px; 
  }

  .edit-button i,
  .delete-button i {
    font-size: 16px; 
  }
}
</style>
