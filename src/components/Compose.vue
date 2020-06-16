<template>
  <div class="flex items-center w-full h-24 bg-white rounded-full outline-none py-4 px-8 resize-none">
    <textarea     
      class="w-full outline-none resize-none bg-transparent py-2 px-2 h-10"
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
        try {
          var request = await axios.post(`${Store.state.api}/create`, {
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