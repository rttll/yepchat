<template>
  <div class="p-4 pt-1" v-on:click="focus">
    <div class="flex items-center shadow-lg w-full h-full bg-white rounded-full outline-none px-8 mb-6">
      <textarea 
        id="foo"    
        class="w-full outline-none resize-none bg-transparent py-2 px-2 h-10 text-sm text-gray-700"
        ref="input"
        v-model="body"
        @keydown="keyhandler"
        @keyup="keyhandler"
      >
      </textarea>
    </div>
  </div>
</template>

<script>
  import Avatar from './Avatar.vue'
  import PusherInstance from '../services/pusher'
  
  const axios = require('axios').default;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  export default {
    name: 'Compose',
    data() {
      return {
        meta: false,
        body: '',
        sending: false,
        isTyping: false,
        typingTimer: null,
        userEventsSubscribed: null,
        userEvents: null
      }
    },
    components: { Avatar },
    computed: {
      avatar() {
        return this.$store.state.avatar
      }
    },
    methods: {
      focus() {
        this.$refs.input.focus()
      },
      keyhandler: function(e) {
        let which = e.which,
            keydown = e.type === 'keydown',
            keyup = e.type === 'keyup',
            enterKey = which === 13,
            shouldSend = enterKey && keyup// && this.meta;
        
        if (keydown && enterKey) e.preventDefault()
        // this.body += "\n"

        if (shouldSend) {
          this.sending = true
          this.send()
        } else { 
          if (which === 91) {
            this.meta = keydown
          }
          this.typing() 
        }
      },
      typing() {
        if (this.sending) return false;
        if (!this.isTyping) {
          var trigger = this.userEvents.trigger('client-typing', {user: this.$store.state.user})
        }
        this.isTyping = true
        if (this.typingTimer !== null) clearInterval(this.typingTimer)
        this.typingTimer = setInterval(() => {
          clearInterval(this.typingTimer)
          this.isTyping = false
          var trigger = this.userEvents.trigger('client-typing', {user: false})
        }, 1000);
      },
      addMessage(data) {
        const message = {
          fields: {
            body: data.body,
            user: data.user
          }
        }
        this.$store.dispatch('addMessage', {message: message})
      },
      send: async function(e) {
        if (this.body.trim().length < 1) return false
        const message = {
          body: this.body,
          user: {
            name: this.$store.state.user,
            avatar: this.$store.state.avatar,
          }
        }
        this.addMessage(message)
        this.sending = false
        try {
          var request = await axios.post(`${this.$store.state.api}/create`, message)
          // setTimeout(() => {
          //   this.sending = false
          // }, 500);
          if (this.typingTimer !== null) clearInterval(this.typingTimer)
          this.isTyping = false
          var trigger = this.userEvents.trigger('client-typing', {user: false})
          this.body = ''
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focus()
        this.userEvents = PusherInstance.subscribe('private-userevents');
      
        PusherInstance.connection.bind('connected', () => {
          this.$store.dispatch('updateSocket', {socket: PusherInstance.connection.socket_id})
        })
      
        this.userEvents.bind('pusher:subscription_succeeded', function() {
          this.userEventsSubscribed = true
        });


        // Dev: Create a bunch of texts from another user
        // setInterval(() => {
        //   axios.post(`${this.$store.state.api}/create`, {
        //     body: 'hello worlds',
        //     user: 'foo'
        //   })
        // }, 500);
      })
    }
  }
</script>

<style scoped>

  textarea::-webkit-scrollbar
  {
      width: 6px;
  }

</style>