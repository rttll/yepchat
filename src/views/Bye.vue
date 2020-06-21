<template>
  <div class="bg-gray-100 flex items-baseline justify-center h-screen p-4 md:py-0">
    <div class="fixed top-0 left-0 p-4 pt-2">
      <router-link to="/account" class="text-lg"> &larr; Join Chat </router-link>
    </div>
    <div class="bg-white w-full max-w-md mx-auto space-y-4 shadow-xl p-8 md:mt-24">
      <h1 class="text-2xl">Bye!</h1>
      <p class="text-lg">You're logged out</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Bye' 
  }
</script>
