<template>
  <div>
    <div v-html="image" class=""></div>
  </div>
</template>

<script>
  export default {
    name: 'Avatar',
    props: {
      avatar: String
    },
    computed: {
      image() {
        var svg = require(`!svg-inline-loader?classPrefix!../images/${this.avatar}.svg`);
        return svg
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>