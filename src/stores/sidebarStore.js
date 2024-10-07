import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpen: localStorage.getItem('sidebarOpen') === 'true',
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen
      localStorage.setItem('sidebarOpen', this.isOpen)
    },
    setSidebarOpen(value) {
      this.isOpen = value
      localStorage.setItem('sidebarOpen', value)
    },
  },
})