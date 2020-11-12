<template>
  <div v-if="showMe" class="bg-teal-400 h-screen fixed inset-0 flex items-center md:items-baseline justify-center p-4 md:py-0">
    <div class="bg-white w-full max-w-md mx-auto shadow-xl md:mt-24 relative rounded">
      <div class="w-full w-full flex items-center justify-center relative -mt-16">
        <div class="w-32 h-32 p-4 rounded-full bg-gray-200 border border-white ">
          <span v-html="getAvatar" class="block h-full flex justify-center items-center"></span>
        </div>
      </div>

      <div class="px-8 my-10">
        <label for="name" class="block shadow-md">
          <input @input="input" v-model="name" type="text" id="name" class="border p-4 block w-full rounded" placeholder="Username" autocomplete="off">
        </label>

        <div class="mt-4">
          <div class="flex flex-row shadow-md">
            <!-- todo use v-for -->
            <label for="fox" class="block cursor-pointer "
              :class="{'bg-green-200' : avatar === 'fox', 'hover:bg-green-100' : avatar !== 'fox'}" >
              <input 
                type="radio"
                @input="input" v-model="avatar" 
                id="fox" 
                value="fox"
                class="opacity-0 absolute"
              />
              <Avatar avatar="fox" class="h-16 w-16 border p-4 block" />
            </label>
            <label for="bear" class="block cursor-pointer"
              :class="{'bg-green-200' : avatar === 'bear', 'hover:bg-green-100' : avatar !== 'bear'}" >
              <input 
                type="radio"
                @input="input" v-model="avatar" 
                id="bear" 
                value="bear"
                class="opacity-0 absolute"
              />
              <Avatar avatar="bear" class="h-16 w-16 border p-4 block" />
            </label>
            <label for="hedgehog" class="block cursor-pointer"
              :class="{'bg-green-200' : avatar === 'hedgehog', 'hover:bg-green-100' : avatar !== 'hedgehog'}" >
              <input 
                type="radio"
                @input="input" v-model="avatar" 
                id="hedgehog" 
                value="hedgehog"
                class="opacity-0 absolute"
              />
              <Avatar avatar="hedgehog" class="h-16 w-16 border p-4 block" />
            </label>
            <label for="owl" class="block cursor-pointer" 
              :class="{'bg-green-200' : avatar === 'owl', 'hover:bg-green-100' : avatar !== 'owl'}" >
              <input 
                type="radio"
                @input="input" v-model="avatar" 
                id="owl" 
                value="owl"
                class="opacity-0 absolute"
              />
              <Avatar avatar="owl" class="h-16 w-16 border p-4 block" />
            </label>
          </div>
        </div>

      </div>
      <div class="bg-gray-100 py-4 px-8 flex justify-end relative rounded">
        <button 
          v-on:click="save"
          class="button bg-white border shadow-md hover:shadow-sm">
          Enter
        </button>
        <div class="absolute left-0 right-0 px-8" v-if="saved">
          <transition name="fade">
            <div class="bg-green-200 border border-green-600 text-green-500 block rounded p-4 flex items-center justify-between">
              <p class="">Saved!</p>
              <span class="cursor-pointer" v-on:click="saved = false"> &times; </span>
            </div>
          </transition>
        </div>
      </div>
      <div v-if="!newAccount" class="relative">
        <span v-on:click="destroy" class="absolute cursor-pointer text-xs p-1 hover:text-red-500">Destroy</span>
      </div> 
    </div>
  </div>
</template>

<script>
  import Avatar from '../components/Avatar.vue'
  const axios = require('axios').default;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  
  export default {
    name: 'Account',
    data() {
      return {
        heading: "Pick your info",
        newAccount: localStorage.getItem('yepchat') === null,
        saved: false,
        name: null,
        avatar: null,
        avatars: {
          fox: require(`!svg-inline-loader?classPrefix!../images/fox.svg`),
          bear: require(`!svg-inline-loader?classPrefix!../images/bear.svg`),
          hedgehog: require(`!svg-inline-loader?classPrefix!../images/hedgehog.svg`),
          owl: require(`!svg-inline-loader?classPrefix!../images/owl.svg`)
        }
      }
    },
    components: {Avatar},
    computed: {
      showMe() {
        return this.$route.name === 'Account'
      },
      getAvatar: function() {
        if (this.avatar === null) {
          return ""
        } else {
          return this.avatars[this.avatar]
        }
      }
    },
    methods: {
      input: function() {
        this.saved = false
      },
      save: async function() {
        if (this.name == null || this.avatar === null) return false
        var data = {
          user_id: `${this.name}-${Math.floor(Math.random() * 1000000)}`,
          name: this.name, 
          avatar: this.avatar
        }
        this.$store.dispatch('updateUser', {id: data.user_id, name: data.name})
        this.$store.dispatch('updateAvatar', {avatar: data.avatar})
        this.$router.push({name: 'Home'})
        // try {
        //   let request = await axios.post(`${this.$store.state.api}/login`, data)
        //   if (request.status === 200) {
        //     Store.updateUser(data.user_id, data.name)
        //     Store.updateAvatar(data.avatar)
        //     this.$router.push({name: 'Home'})
        //   }
        // } catch (error) {
        //   console.log(error)
        // }
      },
      destroy: function() {
        localStorage.removeItem('yepchat')
        this.name = null
        this.avatar = null
        this.$router.push('/bye')
      }
    },
  }
</script>

<style>
  svg {
    height: inherit;
  }
  input[type="radio"]:checked + span {
    @apply border-green-300 bg-green-100
  }

  .button {
    @apply p-4 px-6 rounded-full block cursor-pointer transition-all duration-100 outline-none
  }
  
  input {
    @apply outline-none
  }
  input:focus, input:active, .button:focus, .button:active {
    @apply shadow-outline
  }

  .wigwag {
    position: relative;
  }
  .wigwag.active {
    animation: pulse 1s infinite alternate;
  }

  @keyframes pulse {
    0% {
      transform: translateX(-5px);
      /* color: blue; */
    }
    100% {
      transform: translateX(5px);
      /* color: red */
    }
  }

</style>