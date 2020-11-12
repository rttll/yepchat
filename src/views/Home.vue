<template>
  <div id="home" class="bg-blue-100 "> 
    <div class="h-screen w-full grid grid-cols-12 overflow-hidden">
      <div class="col-span-12 grid grid-rows-6 h-screen">
        <MessageList data-message-list class="row-span-5 bg-blue-100 px-4 py-1" />
        <Compose class="row-span-1" />
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../state/index'
  import MessageList from '../components/MessageList.vue'
  import Compose from '../components/Compose.vue'
  import Avatar from '../components/Avatar.vue'

  export default {
    name: 'Home',
    data() {
      return {
        avatar: Store.state.avatar
      }
    },
    components: {MessageList, Compose, Avatar},
    methods: {
      login: function() {
        Store.updateUser(this.$refs.userInput.value)
        localStorage.setItem('user', this.$refs.userInput.value)
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>