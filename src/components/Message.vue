<template>
  <div class="relative w-1/2 md:w-1/3 lg:w-1/4">
    <div class="bg-blue-400 rounded-t-full">&nbsp;</div>
    <div class="bg-blue-400 px-8">
      <p v-for="(part, index) in message.body.split('\n')">
        <span v-if="part === '' ">&nbsp;</span>
        {{part}}
      </p>
    </div>
    <div class="bg-blue-400 rounded-b-full">&nbsp;</div>
  </div>
</template>

<script>
  export default {
    name: "Message",
    props: {
      message: Object
    }
  }
</script>

<style lang="scss" scoped>

</style>