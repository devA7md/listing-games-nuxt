<template>
  <div class="my-4 sm:my-5 p-4 sm:p-10">
    <CategoryPreview />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CategoryPage',
  key(route) {
    return route.fullPath
  },
  head: {
    title: 'Category',
  },
})
</script>

<style></style>
