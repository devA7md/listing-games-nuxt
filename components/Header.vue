<template>
  <header class="p-4 bg-gray-800 rounded-b-md">
    <div class="flex items-center justify-between">
      <NuxtLink to="/">
        <h2 class="text-gray-100 cursor-pointer text-lg">GAMES</h2>
      </NuxtLink>

      <div class="hidden sm:block w-64 sm:w-96">
        <SearchGame />
      </div>
      <DropDownMenu />

      <div class="sm:hidden flex items-center space-x-4">
        <SearchModal />
        <Drawer />
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Header',
})
</script>
