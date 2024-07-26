<template>
  <div>
    <h1>This should be blocked</h1>
    <b-button @click="endSession">Log out</b-button>
  </div>
</template>

<script>
export default {
  name: "Test",
  methods: {
    endSession() {
      localStorage.removeItem("access_token");
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
