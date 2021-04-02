<template>
  <div class="my-4 sm:my-5 p-4 sm:p-10">
    <GameDetails />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'GameDetailsPage',
  key(route) {
    return route.fullPath
  },
  head: {
    title: 'Game Details',
  },
})
</script>

<style></style>
