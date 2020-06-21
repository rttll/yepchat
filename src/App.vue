<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>

<script>
  import Store from './state/index'
  
  export default {
    name: 'App',
    created() {
      let config = JSON.parse(localStorage.getItem('yepchat'))
      if (config) {
        Store.initFromLocalStorage(config)
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>