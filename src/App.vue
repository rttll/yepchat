<template>
  <div id="app"> 
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      if ( window.location.hostname === 'localhost') {
        this.$store.dispatch('updateUser', {id: `Foo-${Date.now()}`, name: 'Foo'})
        this.$store.dispatch('updateAvatar', {avatar: 'bear'})
        if ( this.$route.path != '/') this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>