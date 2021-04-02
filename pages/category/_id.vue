<template>
  <div class="m-5">
    <div class="text-gray-500 text-5xl">Category Games</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Category',
  key(route) {
    return route.fullPath
  },
  head: {
    title: 'Category Games',
  },
})
</script>

<style></style>
