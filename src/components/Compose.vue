<template>
  <div class="relative flex flex-col h-screen p-4" v-on:click="focus">
      <div class="flex justify-between px-4 py-1">
        <p>New Message</p>
        <router-link to="/" class="">X</router-link>
      </div>
      <textarea 
        ref="textarea"
        class="relative z-10 flex-grow-0 w-full p-4 overflow-hidden text-sm text-gray-700 bg-white rounded-lg shadow-sm outline-none resize-none"
        v-model="body"
        style="min-height:1px"
        @keydown="keyhandler"
        @keyup="keyhandler"
      >
      </textarea>

      <div class="flex justify-end p-4 pr-2">
        <div class="relative">
          <transition name="slide-fade">
            <span class="text-xs" v-if="showSendHelp">&#8984; + Enter</span>
          </transition>
          <button 
            @click="send" 
            @mouseenter="mouseEnterSendButton" 
            @mouseleave="showSendHelp = false" 
            class="relative z-20 w-6 h-6 transition-all rounded-full hover:bg-gray-100">
              <i class="fas fa-paper-plane"></i>
            <!-- &#8679; -->
          </button>
        </div>
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
        isFocused: true,
        body: '',
        sending: false,
        isTyping: false,
        typingTimer: null,
        userEventsSubscribed: null,
        userEvents: null,
        style: '',
        offset: 18,
        showSendHelp: false,
      }
    },
    components: { Avatar },
    computed: {
      avatar() {
        return this.$store.state.avatar
      },
    },
    methods: {
      focus() {
        this.$refs.textarea.focus()
      },
      onFocusHandler() {

      },
      onBlueHandler() {

      },
      mouseEnterSendButton() {
        const touch = matchMedia('(hover: none)').matches;
        if (!touch) this.showSendHelp = true
      },
      keyhandler: function(e) {
      
        let which = e.which,
            keydown = e.type === 'keydown',
            keyup = e.type === 'keyup',
            enterKey = which === 13,
            shouldSend = enterKey && this.meta;
        
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
        const body = this.body
        this.body = ''

        const message = {
          body: body,
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
          this.$router.push('/')
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focus()
        window.addEventListener('focus', this.focus() )
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
 
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .3s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
  /* transform: translateX(-10px); */
  opacity: 0;
}

.slide-fade-enter-to, .slide-fade-leave {
  transform: translateX(-10px);
  /* opacity: 0; */
}


</style>