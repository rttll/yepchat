<template>

  <div class="" ref="list">
    <div v-if="messages.length > 0">
      <div v-for="(message, index) in list" :key="index" class="">
        <div class="flex py-2" :class="message.fields.user === user ? 'justify-end' : 'justify-start' ">
          <Message :message="message" class="" />
        </div>
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
      // const api = '/api/index';
      const localAPI = 'http://localhost:9000/index';
      const productionAPI = 'https://yepchat.herokuapp.com/index'
      const api = window.location.hostname === 'localhost' ? localAPI : productionAPI
      fetch(api).then((data) => {
        return data.json()
      }).then((messages) => {
        debugger
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