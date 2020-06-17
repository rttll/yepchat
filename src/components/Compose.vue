<template>
  <div class="flex items-center shadow-lg w-full h-24 bg-white rounded-full outline-none py-4 px-8 resize-none">
    <Avatar 
      class="w-10 h-10"
      :animal="animal" 
    />
    <textarea     
      class="w-full outline-none resize-none bg-transparent py-2 pr-2 pl-4 h-10"
      ref="input"
      @keydown="keyhandler"
      @keyup="keyhandler"
    >
    </textarea>
  </div>
</template>

<script>
  import Store from '../state/index'
  import Avatar from './Avatar.vue'
  import PusherInstance from '../services/pusher'
  
  const axios = require('axios').default;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  export default {
    name: 'Compose',
    data() {
      return {
        meta: false,
        sending: false,
        typing: false,
        typingTimer: null,
        userEventsSubscribed: null,
        userEvents: null
      }
    },
    components: { Avatar },
    computed: {
      animal() {
        return Store.state.animal
      }
    },
    methods: {
      keyhandler: function(e) {
        // TODO: what about touch devices / no keyboard?
        var which = e.which;
        if ( which === 13 && ( this.meta ) ) {
          this.sending = true
          this.send()
        } else { 
          if (which === 91) {
            this.meta = e.type === 'keydown'
          } else if (!this.sending) {
            if (!this.typing) {
              var trigger = this.userEvents.trigger('client-typing', {user: Store.state.user})
            }
            this.typing = true
            if (this.typingTimer !== null) clearInterval(this.typingTimer)
            this.typingTimer = setInterval(() => {
              clearInterval(this.typingTimer)
              this.typing = false
              var trigger = this.userEvents.trigger('client-typing', {user: false})
            }, 1000);
          }

        }
      },
      send: async function(e) {
        var body = this.$refs.input.value;
        if (body.trim().length < 1) return false
        try {
          var request = await axios.post(`${Store.state.api}/create`, {
            body: body,
            user: {
              name: Store.state.user,
              avatar: 'bear',
            }
          })
          setTimeout(() => {
            this.sending = false
          }, 500);
          if (this.typingTimer !== null) clearInterval(this.typingTimer)
          this.typing = false
          var trigger = this.userEvents.trigger('client-typing', {user: false})
          this.$refs.input.value = ''
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.input.focus()
        this.userEvents = PusherInstance.subscribe('private-userevents');
        
        // todo set anima for real on login
        localStorage.setItem('animal', 'fox')
      
        PusherInstance.connection.bind('connected', () => {
          Store.updateSocket(PusherInstance.connection.socket_id)
        })
      
        this.userEvents.bind('pusher:subscription_succeeded', function() {
          this.userEventsSubscribed = true
        });


        // Dev: Create a bunch of texts from another user
        // setInterval(() => {
        //   axios.post(`${Store.state.api}/create`, {
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