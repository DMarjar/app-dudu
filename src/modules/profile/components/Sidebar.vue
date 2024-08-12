<template>
  <div class="sidebar" :class="{ open: isOpen }">
    <div class="sidebar-header">
      <span>D&D</span>
      <i
        class="fi fi-br-cross sidebar-close"
        @click="toggleSidebar"
        aria-label="Close Sidebar"
      ></i>
    </div>
    <ul>
      <li>
        <button><i class="fi fi-tr-house-chimney"></i> Home</button>
      </li>
      <li>
        <button><i class="fi fi-ts-circle-user"></i> Profile</button>
      </li>
      <li>
        <button><i class="fi fi-ts-book-bookmark"></i> Mission History</button>
      </li>
      <li>
        <button @click="endSession">
          <i class="fi fi-sr-enter"></i> Logout
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from "vue";

export default defineComponent({
  name: "Sidebar",
  methods: {
    endSession() {
      localStorage.removeItem("id_token");
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },
  setup(_, { emit }) {
    const isOpen = ref(false);

    const toggleSidebar = () => {
      isOpen.value = !isOpen.value;
      emit("toggle", isOpen.value);
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen.value) {
        toggleSidebar();
      }
    };

    onMounted(() => {
      document.addEventListener("keydown", handleKeydown);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("keydown", handleKeydown);
    });

    return {
      isOpen,
      toggleSidebar,
    };
  },
});
</script>

<style src="@/assets/styles/sidebar-styles.css"></style>
