<template>
  <div class="sec-layout">
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

