<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>

<script>
  import Store from './state/index'
  import Home from './views/Home.vue'
  import Account from './views/Account.vue'
  
  export default {
    data() {
      return {
        auth: false
      }
    },
    components: {Home, Account},
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