<template>

  <div class="" ref="list">
    <div v-for="(message, index) in list" :key="index" class="">
      <div class="flex py-2" :class="message.user === user ? 'justify-end' : 'justify-start' ">
        <Message :message="message" class="" />
      </div>
    </div>

  </div>

</template>

<script>
  
  import Store from '../state/index'
  import Channel from '../services/pusher'
  import Message from './Message.vue'

  export default {
    name: 'MessageList',
    data() {
      return {
        channel: Channel,
        messages: []
      }
    },
    components: {Message},
    computed: {
      user() {
        return Store.state.user
      },
      list() {
        return this.messages
      },
    },
    created() {
      fetch('http://localhost:9000/messages').then((data) => {
        return data.json()
      }).then((messages) => {
        this.messages = messages
      }).catch((err) => {
        // TODO error for could not load messages
        console.error(err)
      })
    },
    mounted() {
      this.channel.bind('my-event', (data) => {
        this.messages.push(data);
      });      
    },
    updated: function () {
      this.$nextTick(function () {
        this.$refs.list.scrollTop = this.$refs.list.scrollHeight
      })
    },
  }
</script>

<style lang="scss" scoped>

</style>