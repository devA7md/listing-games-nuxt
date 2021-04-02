<template>
  <div>
    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <Categories />
    </div>

    <div class="my-4 sm:my-5 p-4 sm:p-10">
      <MostRecommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  head: {
    title: 'Home',
  },
})
</script>

<style></style>
