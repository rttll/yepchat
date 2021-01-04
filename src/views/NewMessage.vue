<template>
  <div id="new-message" class="bg-blue-100 "> 
    <div class="w-full h-screen overflow-hidden">
      <div class="flex flex-col justify-between h-screen">
        <Compose class="flex-initial" />
      </div>
    </div>
  </div>
</template>

<script>
  import Compose from '../components/Compose.vue'
  import Avatar from '../components/Avatar.vue'

  export default {
    name: 'NewMessage',
    data() {
      return {
        avatar: this.$store.state.avatar
      }
    },
    components: {Compose, Avatar},
  }
</script>

<style lang="scss" scoped>

</style>