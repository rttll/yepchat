<template>

  <div ref="list">
    <div v-if="messages.length > 0">
      <transition-group name="list" tag="div">
        <div v-for="(message, index) in list" :key="index" class="z-20 relative">
          <div class="flex py-2" :class="message.fields.user.name === user ? 'justify-end' : 'justify-start' ">
            <Message :message="message" :user="user" class="" />
          </div>
        </div>
      </transition-group>
    </div>
    <p v-if="typing" 
      class="text-sm text-gray-500 fixed z-10" 
      style="bottom: 125px; left: 50px">
      <transition name="fade">
        <span>{{ typing }} is typing  </span>
      </transition>
    </p>
  </div>

</template>

<script>
  
  import Store from '../state/index'
  import PusherInstance from '../services/pusher'
  import Message from './Message.vue'

  export default {
    name: 'MessageList',
    data() {
      return {
        messages: [],
        initialScrollComplete: false,
        userEvents: false,
        userEventsSubscribed: false,
        typing: false,
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
      fetch(`${Store.state.api}/index`).then((data) => {
        debugger
        return data.json()
      }).then((messages) => {
        this.messages = messages
      }).catch((err) => {
        debugger
        // TODO error for could not load messages
        console.error(err)
      })
      
      PusherInstance.connection.bind('connected', () => {
        Store.updateSocket(PusherInstance.connection.socket_id)
      })
    },
    mounted() {
      const chat = PusherInstance.subscribe('private-yepchat');
      this.userEvents = PusherInstance.subscribe('private-userevents');
      
      chat.bind('new-chat', (data) => {
        this.messages.push(data);
      });
      
      this.userEvents.bind('pusher:subscription_succeeded', function() {
        this.userEventsSubscribed = true
        console.log('subscribed to client-events')
      });

      this.userEvents.bind('client-typing', (data) => {
        console.log(data.user)
        this.typing = data.user
      });
    },
    updated: function () {
      this.$nextTick(function () {
        if (!this.initialScrollComplete) {
          this.$refs.list.scrollTop = this.$refs.list.scrollHeight
          this.initialScrollComplete = true;
          return
        }

        const h = this.$refs.list.scrollHeight
        const top = this.$refs.list.scrollTop
        const dist = h - top;
        
        const easing = {
          quad: function(timeFraction) {
            return Math.pow(timeFraction, 2)
          }
        }

        let start = performance.now(),
            duration = 2000;
        
        const draw = (progress) => {
          let percent = dist * progress;
          let l = percent * 100 + top
          this.$refs.list.scrollTop = l
        }

        function animate() {
          let frac = (performance.now() - start) / duration;
          if (frac > 1) frac = 1;

          let progress = easing.quad(frac)
          draw(progress)

          if (frac < 1) requestAnimationFrame(animate)
        }

        animate()

      })
    },
  }
</script>

<style>
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    /* transform: translateY(30px); */
  }
</style>