<template>
  <div id="foo" class="flex items-stretch w-full h-24 bg-white rounded-full outline-none py-4 px-8 resize-none">
    <textarea     
      class="w-full outline-none resize-none bg-transparent py-2 px-2"
      ref="input"
      @keydown="keyhandler"
      @keyup="keyhandler"
      >
    </textarea>
  </div>
</template>

<script>
  import Store from '../state/index'
  const axios = require('axios').default;
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  export default {
    name: 'Compose',
    data() {
      return {
        meta: false
      }
    },
    methods: {
      keyhandler: function(e) {
        // TODO: what about touch devices / no keyboard?
        var which = e.which;
        if (which === 91) {
          this.meta = e.type === 'keydown'
        } else if ( which === 13 && ( this.meta ) ) {
          this.send()
        }
      },
      send: async function(e) {
        var body = this.$refs.input.value;
        if (body.trim().length < 1) return false
        let api = 'http://localhost:9000/create'
        try {
          var request = await axios.post(api, {
            body: body,
            user: Store.state.user
          })
          this.$refs.input.value = ''
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    }
  }
</script>

<style scoped>
  textarea::-webkit-scrollbar-track
  {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      background-color: #F5F5F5;
  }

  textarea::-webkit-scrollbar
  {
      width: 6px;
      background-color: #F5F5F5;
  }

  textarea::-webkit-scrollbar-thumb
  {
      background-color: #000000;
  }

</style>