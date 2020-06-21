<template>
  <div class="relative w-2/3 md:w-1/3 lg:w-1/4" :class="dirClass">
    <div class="relative" :class="{ 'pl-6': !outgoing }">
      <Avatar   
        class="absolute w-6 h-6 p-1 box-content rounded-full bg-gray-100 border border-gray-200" 
        v-if="!outgoing"
        :avatar="message.fields.user.avatar"
        style="top:-5px; left:-10px" />

      <div class="bubble">
        <div 
          class="rounded-t-full h-4"
          :class="{ 'rounded-tl-none': !outgoing }">
        </div>
        <div class="px-4 shadow-sm">
          <p v-for="(part, index) in message.fields.body.split('\n')" class="text-sm text-gray-700">
            <span v-if="part === '' ">&nbsp;</span>
            {{part}}
          </p>
        </div>
        <div 
          class="rounded-b-full h-4 shadow-sm" 
          :class="{'rounded-br-none' : outgoing}">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue'
  export default {
    name: "Message",
    props: {
      message: Object,
      user: String
    },
    data() {
      return {
        dirClass: this.message.fields.user.name === this.user ? 'outgoing' : 'incoming',
        outgoing: this.message.fields.user.name === this.user
      }
    },
    components: { Avatar }
  }
</script>

<style scoped>
  .incoming .bubble > div {
    @apply bg-blue-200
  }
  .outgoing .bubble > div {
    @apply bg-blue-300
  }
</style>