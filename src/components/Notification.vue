<template>
  <div class="flex items-center space-x-4 w-2/3 md:w-1/3 lg:w-1/4 my-1">
    <Avatar  
      v-if="avatar" 
      class="w-6 h-6 p-1 box-content rounded-full bg-gray-100 border border-gray-200" 
      :avatar="avatar" 
    />
    <div v-else
      class="w-6 h-6 p-1 box-content rounded-full border border-gray-200" ></div>
    
    <p class="text-sm text-gray-700">
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