<template>
  <div id="app">
    <div class="container m-auto">
      <h1>hii</h1>
      <ul>
        <li v-for="message in messages">
          {{message}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Channel from './services/pusher'

  export default {
    data() {
      return {
        channel: Channel,
        messages: []
      }
    },
    mounted() {
      var app = this; 
      this.channel.bind('my-event', (data) => {
        this.messages.push(JSON.stringify(data.message));
      });      
    }    
  }
</script>

<style lang="scss" scoped>

</style>