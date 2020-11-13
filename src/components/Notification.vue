<template>
  <div class="flx items-center space-x-4 my-1">
    <!-- <div
      class="w-6 h-6 p-1 box-content rounded-full border border-gray-200" ></div>
     -->
    <p class="text-xs text-gray-700">
      {{ notice }}
    </p>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue'
  export default {
    name: "Notification",
    props: {
      avatar: String,
      notice: String
    },
    data() {
      return {

      }
    },
    components: { Avatar }
  }
</script>

<style scoped>
 
</style>