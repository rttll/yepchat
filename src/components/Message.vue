<template>
  <div class="relative w-1/2 md:w-1/3 lg:w-1/4" :class="{ 'incoming': message.fields.user.name !== user }">
    <div class="relative" :class="{ 'pl-6': message.fields.user.name !== user }">

      <Avatar   
        class="absolute w-6 h-6 p-1 box-content rounded-full bg-gray-100 border border-gray-200" 
        v-if="message.fields.user.name !== user"
        :avatar="message.fields.user.avatar"
        style="top:-5px; left:-10px" />

      <div 
        class="bg-blue-400 rounded-t-full"
        :class="{ 'rounded-tl-none': message.fields.user.name !== user }">
        &nbsp;</div>
      <div class="bg-blue-400 px-8">
        <p v-for="(part, index) in message.fields.body.split('\n')">
          <span v-if="part === '' ">&nbsp;</span>
          {{part}}
        </p>
      </div>
      <div 
        class="bg-blue-400 rounded-b-full" 
        :class="{'rounded-br-none' : message.fields.user.name === user}">
        &nbsp;</div>

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
    components: { Avatar }
  }
</script>

<style lang="scss" scoped>

</style>