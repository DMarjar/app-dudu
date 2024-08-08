<template>
    <b-modal v-model="internalShow" title="Confirm Delete" @ok="confirmDelete" @hide="cancel" dialog-class="custom-modal">
      <p>Are you sure you want to delete this profile?</p>
      <template #modal-footer="{ ok, cancel }">
        <button @click="cancel" class="cancel-button">
          Cancel
          <i class="fi fi-tr-circle-xmark"></i>
        </button>
        <button @click="ok" class="delete-button">
          Delete Profile
          <i class="fi fi-tr-trash-xmark"></i>
        </button>
      </template>
    </b-modal>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BModal } from 'bootstrap-vue';
  
  export default defineComponent({
    name: 'ConfirmDeleteModal',
    components: {
      BModal
    },
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    emits: ['confirm', 'close'],
    setup(props, { emit }) {
      const internalShow = ref(props.show);
  
      watch(() => props.show, (newVal) => {
        internalShow.value = newVal;
      });
  
      const confirmDelete = () => {
        emit('confirm');
        internalShow.value = false;
      };
  
      const cancel = () => {
        emit('close');
        internalShow.value = false;
      };
  
      return {
        internalShow,
        confirmDelete,
        cancel
      };
    }
  });
  </script>
  
  <style src="@/assets/styles/delete-profile-modal-styles.css"></style>
  