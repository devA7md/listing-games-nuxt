<template>
  <div>
    <i
      data-testid="menu-icon"
      class="pi pi-ellipsis-v text-gray-900 cursor-pointer"
      @click="toggle"
    ></i>
    <Menu ref="menu" data-testid="menu" :model="items" :popup="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Menu from 'primevue/menu/Menu'

@Component
export default class DropDownMenu extends Vue {
  items = [
    {
      label: 'Update',
      icon: 'pi pi-refresh',
    },
    {
      label: 'Delete',
      icon: 'pi pi-times',
    },
  ]

  $refs!: {
    menu: Menu
  }

  toggle(event: any) {
    this.$refs.menu.toggle(event)
  }
}
</script>
