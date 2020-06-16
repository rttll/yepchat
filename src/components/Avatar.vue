<template>
  <div>
    <div v-html="avatar" class=""></div>
  </div>
</template>

<script>
  import Bear from '../images/bear.svg'
  import Fox from '../images/fox.svg'
  
  export default {
    name: 'Avatar',
    props: {
      animal: String
    },
    computed: {
      avatar() {
        var svg = require(`!svg-inline-loader?classPrefix!../images/${this.animal}.svg`);
        return svg
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>