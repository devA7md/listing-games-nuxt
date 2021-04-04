<template>
  <div>
    <Categories />

    <div class="sec-layout sec-layout-vertical">
      <FeaturedGame />
    </div>

    <div class="sec-layout sec-layout-vertical">
      <MostRecommendation />
    </div>

    <div class="sec-layout sec-layout-vertical">
      <MostPopular />
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
