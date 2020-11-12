<template>
  <div id="home" class="bg-blue-100 "> 
    <div class="h-screen w-full overflow-hidden">
      <div class="h-screen flex flex-col justify-between">
        <MessageList class="bg-blue-100 px-4 py-1 flex-grow" />
        <Compose class="" />
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
        avatar: this.$store.state.avatar
      }
    },
    components: {MessageList, Compose, Avatar},
    methods: {
      login: function() {
        debugger
        // Store.updateUser(this.$refs.userInput.value)
        // this.$store.dispatch('updateUser', {id: data.user_id, name: data.name})
        // localStorage.setItem('user', this.$refs.userInput.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>