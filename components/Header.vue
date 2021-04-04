<template>
  <header class="py-4 bg-white sec-layout">
    <div class="flex items-center justify-between">
      <NuxtLink to="/">
        <h2 class="text-gray-800 cursor-pointer text-lg">Game Store</h2>
      </NuxtLink>

      <div class="flex items-center space-x-4">
        <SearchModal />
        <DropDownMenu />
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
