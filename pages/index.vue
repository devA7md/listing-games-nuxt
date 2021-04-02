<template>
  <div class="my-4 sm:my-5 p-4 sm:p-10">
    <Categories />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Categories from '~/components/Categories.vue'

export default Vue.extend({
  name: 'Home',
  components: { Categories },
  head: {
    title: 'Home',
  },
})
</script>

<style></style>
