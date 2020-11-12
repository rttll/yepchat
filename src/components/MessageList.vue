<template>

  <div id="list-container" class="pt-4 overflow-hidden flex flex-col justify-end">
    <transition-group 
      ref="list" 
      name="list" 
      tag="div" 
      class="overflow-y-auto"
      >
      <div v-for="(message, index) in messages" :key="index" class="z-20 relative">
        <div v-if="message.notice" class="flex py-2 justify-start">
          <Notification :notice="message.notice" :avatar="message.avatar" class="" />
        </div> 
        <div v-else class="flex py-2" :class="message.fields.user.name === user ? 'justify-end' : 'justify-start' ">
          <Message :message="message" :user="user" class="" />
        </div>
      </div>
    </transition-group>

    <p v-if="typing" 
      class="text-xs text-gray-500 fixed z-10" 
      style="bottom: 116px; left: 50px">
      <transition name="fade">
        <span>{{ typing }} is typing  </span>
      </transition>
    </p>
  </div>

</template>

<script>
  
  import PusherInstance from '../services/pusher'
  import ScrollTop from '../services/scroll-top'
  import Message from './Message.vue'
  import Notification from './Notification.vue'

  const axios = require('axios').default;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  export default {
    name: 'MessageList',
    data() {
      return {
        initialScrollComplete: false,
        userEvents: false,
        userEventsSubscribed: false,
        typing: false,
      }
    },
    components: {Message, Notification},
    computed: {
      messages() {
        return this.$store.state.messages
      },
      user() {
        return this.$store.state.user
      },
    },
    methods: {
      notification(notice) {
        this.messages.push({notice: notice})
      },
      presenceNotification(member, action) {
        this.messages.push({
          notice: `${member.info.name} ${action} the chat.`,
          avatar: member.info.avatar
        });
      },
      addMessage(message) {
        if (message.fields.user.name === this.user) return false;
        this.$store.dispatch('addMessage', {message: message})
      }
    },
    updated: function () {
      this.$nextTick(function () {
        const el = this.$refs.list.$el
        ScrollTop(el)
      })
    },    
    created() {
      // axios.get(`${this.$store.state.api}/index`).then((resp) => {
      //   return resp.data
      // }).then((messages) => {
      //   this.messages = messages
      // }).catch((err) => {
      //   // TODO error for could not load messages
      //   console.error(err)
      // })
      
      PusherInstance.connection.bind('connected', () => {
        this.$store.dispatch('updateSocket', {socket: PusherInstance.connection.socket_id})
      })
    },
    mounted() {
      PusherInstance.config.authEndpoint += 
        `?username=${this.$store.state.user}
        &user_id=${this.$store.state.user_id}
        &avatar=${this.$store.state.avatar}`

      const chat = PusherInstance.subscribe('private-yepchat');
      const presence = PusherInstance.subscribe('presence-yepchat');
      this.userEvents = PusherInstance.subscribe('private-userevents');
      
      chat.bind('new-chat', (data) => {
        this.addMessage(data)
      });

      presence.bind('pusher:subscription_succeeded', (members) => {
        this.presenceNotification({info: {name: 'You', avatar: this.$store.state.avatar}}, 'joined')
        if (members.count > 1) {
          let names = () => {
            let n = []
            for (let id in members.members) {
              n.push([id, members.members[id].name])
            }
            return n
              .filter(arr => arr[0] !== this.$store.state.user_id)
              .map(arr => arr[1])
          }
          let tobe = names().length > 1 ? 'are' : 'is'
          this.notification(`${names().join(' & ')} ${tobe} also here.`)
        } else {
          this.notification("You're the only one here.")
        }
      })

      presence.bind('pusher:subscription_error', function(status) {
        console.log('pusher:subscription_error', status)
      });

      presence.bind('pusher:member_added', (member, a, b) => {
        this.presenceNotification(member, 'joined')
      });

      presence.bind('pusher:member_removed', (member) => {
        this.presenceNotification(member, 'left')
        if (this.typing === member.info.name.trim()) this.typing = false
      });
      
      this.userEvents.bind('pusher:subscription_succeeded', function() {
        this.userEventsSubscribed = true
      });

      this.userEvents.bind('client-typing', (data) => {
        this.typing = data.user
      });
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