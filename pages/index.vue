<template>
  <div>
    <div class="sec-layout">
      <Categories />
    </div>

    <div class="sec-layout">
      <FeaturedGame />
    </div>

    <div class="sec-layout">
      <PopularGames />
    </div>

    <div class="sec-layout">
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
