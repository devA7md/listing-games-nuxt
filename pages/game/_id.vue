<template>
  <div class="m-5">
    <div class="text-gray-500 text-5xl">Game Details</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GameDetails',
  key(route) {
    return route.fullPath
  },
  head: {
    title: 'Game Details',
  },
})
</script>

<style></style>
