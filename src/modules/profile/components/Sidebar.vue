<template>
    <div class="sidebar" :class="{ open: isOpen }">
      <div class="sidebar-header">
        <span>D&D</span>
        <img src="@/assets/icon-sidebar.png" class="sidebar-close" @click="toggleSidebar" alt="Close Icon">
      </div>
      <ul>
        <li><i class="fi fi-tr-house-chimney"></i> Home</li>
        <li><i class="fi fi-ts-circle-user"></i> Profile</li>
        <li><i class="fi fi-ts-book-bookmark"></i> Mission History</li>
        <li><i class="fi fi-sr-enter"></i> Logout</li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
  
  export default defineComponent({
    name: 'Sidebar',
    setup(_, { emit }) {
      const isOpen = ref(false);
  
      const toggleSidebar = () => {
        isOpen.value = !isOpen.value;
        emit('toggle', isOpen.value);
      };
  
      const handleKeydown = (event: KeyboardEvent) => {
        if (event.key === 'Escape' && isOpen.value) {
          toggleSidebar();
        }
      };
  
      onMounted(() => {
        document.addEventListener('keydown', handleKeydown);
      });
      onBeforeUnmount(() => {
        document.removeEventListener('keydown', handleKeydown);
      });
      return {
        isOpen,
        toggleSidebar
      };
    }
  });
  </script>
  
  <style src="@/assets/styles/sidebar-styles.css"></style>
  