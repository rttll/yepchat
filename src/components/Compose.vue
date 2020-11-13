<template>
  <div class="p-4 pt-1 pb-2" v-on:click="focus">
    <div class="relative flex flex-col shadow-sm w-full h-full outline-none">

      <span class="block relative z-0 transform translate-y-2 rounded-tl-full rounded-tr-full bg-white w-full" :style=" `height: ${offset}px` ">&nbsp;</span>
      <textarea 
        ref="textarea"
        class="bg-transparent relative z-10 w-full overflow-hidden outline-none resize-none px-4 text-sm text-gray-700"
        v-model="body"
        :style="style"
        style="min-height:1px"
        @input="setStyle"
        @keydown="keyhandler"
        @keyup="keyhandler"
      >
      </textarea>
      <div class="absolute z-0 left-0 top-0 w-full h-full" :style=" `padding: ${offset}px 0` ">
        <div class="bg-white h-full flex"></div>
      </div>
      <span class="block relative z-0 transform -translate-y-2 rounded-bl-full rounded-br-full bg-white w-full" :style=" `height: ${offset}px` ">&nbsp;</span>

      <div class="absolute right-0 bottom-0 p-4 pr-2 z-30">
        <div class="relative">
          <transition name="slide-fade">
            <span class="text-xs" v-if="showSendHelp">&#8984; + Enter</span>
          </transition>
          <button @click="send" @mouseenter="mouseEnterSendButton" @mouseleave="showSendHelp = false" class="h-6 w-6 transition-all hover:bg-gray-100 rounded-full relative z-20">&#8679;</button>
        </div>
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
      setStyle() {
        const el = this.$refs.textarea
        if ( this.body.length < 1 || el.scrollHeight < 32 ) {
          el.style.height = '1rem'
          return
        }
        el.style.height = 'auto'
        el.style.height = el.scrollHeight + 'px'
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
        this.setStyle()

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
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.focus()
        window.addEventListener('focus', this.focus() )
        this.setStyle()
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