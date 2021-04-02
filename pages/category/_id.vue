<template>
  <div class="sec-layout">
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
