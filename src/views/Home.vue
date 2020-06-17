<template>
  <div id="home"> 
    <div v-if="auth" class="h-screen w-full grid grid-cols-12 overflow-hidden">
      <div class="col-span-12 grid grid-rows-12 h-screen">
        <MessageList class="row-span-5 bg-blue-100 overflow-y-auto p-4" />
        <div class="row-span-1 bg-blue-100 flex items-end p-4">
          <Compose />
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col items-center h-screen">
      <div class="m-auto">
        <input type="text" ref="userInput" class="p-4 border">
        <div>
          <button class="bg-gray-100" v-on:click="login">done</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Store from '../state/index'
  import MessageList from '../components/MessageList.vue'
  import Compose from '../components/Compose.vue'

  export default {
    name: 'Home',
    data() {
      return {
      }
    },
    components: {MessageList, Compose},
    created() {
      let user = localStorage.getItem('user')
      if (user) {
        Store.updateUser(user)
        this.auth = true
      }
      let animal = localStorage.getItem('animal')
      if (animal) {
        Store.updateAnimal(animal)
      }
    },
    methods: {
      login: function() {
        Store.updateUser(this.$refs.userInput.value)
        localStorage.setItem('user', this.$refs.userInput.value)
        this.auth = true
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>