<template>
  <div id="home" class=""> 
    <div class="relative flex flex-col w-full h-screen border-t border-b border-red-600">
      <MessageList v-if="page === 'Home' " class="flex-grow" />
      
      <div class="p-2">
        <router-link to="/new" class="relative block h-8 bg-white rounded-full"></router-link>
      </div>
      
    </div>
  </div>
</template>

<script>
  import MessageList from '../components/MessageList.vue'
  import Compose from '../components/Compose.vue'
  import Avatar from '../components/Avatar.vue'

  export default {
    name: 'Home',
    data() {
      return {
        avatar: this.$store.state.avatar,
        page: this.$route.name
      }
    },
    components: {MessageList, Compose, Avatar},
    methods: {
      login: function() {
        // Store.updateUser(this.$refs.userInput.value)
        // this.$store.dispatch('updateUser', {id: data.user_id, name: data.name})
        // localStorage.setItem('user', this.$refs.userInput.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>