<template>
  <div>
    <i class="pi pi-search icon-style" @click="display = true"></i>

    <Dialog
      :closeOnEscape="true"
      :modal="true"
      :dismissableMask="true"
      :visible.sync="display"
      :style="{ width: '65vw', height: '70vh' }"
    >
      <SearchGame v-on:searched="display = false" />
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      display: false,
    }
  },
})
</script>
