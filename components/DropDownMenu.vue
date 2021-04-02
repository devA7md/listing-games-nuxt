<template>
  <div class="hidden sm:block">
    <div
      data-testid="menu-btn"
      class="flex items-center justify-between text-gray-50 space-x-1 cursor-pointer"
      @click="toggle"
    >
      <p data-testid="menu-text">MENU</p>
      <i data-testid="menu-icon" class="pi pi-angle-down"></i>
    </div>
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
