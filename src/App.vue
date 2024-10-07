<template>
  <div class="app" :class="[currentTheme, { 'sidebar-open': sidebarStore.isOpen }]">
    <Sidebar />
    <div class="content-wrapper">
      <div class="content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide, onMounted, watch } from 'vue';
import { useSidebarStore } from './stores/sidebarStore';
import Sidebar from "./components/Sidebar.vue";

const sidebarStore = useSidebarStore();
const currentTheme = ref(localStorage.getItem('theme') || 'dark');
const isMobile = ref(false);

const changeTheme = (theme) => {
  currentTheme.value = theme;
  localStorage.setItem('theme', theme);
  document.body.className = theme;
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

provide('currentTheme', currentTheme);
provide('changeTheme', changeTheme);

onMounted(() => {
  document.body.className = currentTheme.value;
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

watch(currentTheme, (newTheme) => {
  document.body.className = newTheme;
});
</script>

<style lang="scss">
:root {
  --sidebar-width: 300px;
  --sidebar-collapsed-width: calc(2rem + 32px);
  --sidebar-bg: #2c3e50;
  --sidebar-color: #ecf0f1;
  --card-bg: #f0f0f0;
  --text-primary: #333;
  --text-secondary: #666;
}

.light {
  --primary: #3498db;
  --primary-dark: #2980b9;
  --grey: #95a5a6;
  --dark: #34495e;
  --dark-alt: #2c3e50;
  --light: #ecf0f1;
}

.dark {
  --primary: #7aa2f7;
  --primary-dark: #3d59a1;
  --grey: #565f89;
  --dark: #c0caf5;
  --dark-alt: #a9b1d6;
  --light: #1f2335;
  --card-bg: #1e1e2e;
  --text-primary: #fff;
  --text-secondary: #aaa;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  line-height: 1.6;
  font-size: 16px;
}

.app {
  display: flex;
  min-height: 100vh;
  background-color: var(--light);
}

.content-wrapper {
  flex: 1;
  margin-left: var(--sidebar-collapsed-width);
  width: calc(100% - var(--sidebar-collapsed-width));
  transition: margin-left 0.3s ease-in-out;
}

.sidebar-open .content-wrapper {
  margin-left: var(--sidebar-width);
  width: calc(100% - var(--sidebar-width));
}

.content {
  padding: 2rem;
  min-height: 100vh;
  overflow-y: auto;
  background-color: var(--light);
}

main {
  max-width: 1200px;
  margin: 0 auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

h1, h2, h3, h4, h5, h6 {
  margin-bottom: 1rem;
  line-height: 1.2;
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    margin-left: 0;
    width: 100%;
  }

  .sidebar-open .content-wrapper {
    margin-left: 0;
    width: 100%;
  }

  body {
    font-size: 14px;
  }
}
</style>