<template>
  <aside :class="{ 'is-open': sidebarStore.isOpen, 'mobile': isMobile }">
    <div class="top-section">
      <div class="logo">
        <img src="../assets/profile-picture.jpg" alt="haquire" class="profile-picture">
      </div>
      <div class="menu-toggle-wrapper" :class="{ 'open': sidebarStore.isOpen }">
        <button class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">{{ sidebarStore.isOpen ? 'menu_open' : 'menu' }}</span>
        </button>
      </div>
    </div>
    <h3 v-if="sidebarStore.isOpen">Menu</h3>
    <div class="menu">
      <router-link class="button" to="/" @click="closeMenuOnMobile">
        <span class="material-icons">dashboard</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link class="button" to="/projects" @click="closeMenuOnMobile">
        <span class="material-icons">code</span>
        <span class="text">Projects</span>
      </router-link>
      <router-link class="button" to="/about" @click="closeMenuOnMobile">
        <span class="material-icons">person_outline</span>
        <span class="text">About</span>
      </router-link>
      <router-link class="button" to="/contact" @click="closeMenuOnMobile">
        <span class="material-icons">mail_outline</span>
        <span class="text">Contact</span>
      </router-link>
      <router-link class="button" to="/blog" @click="closeMenuOnMobile">
        <span class="material-icons">create</span>
        <span class="text">Blog</span>
      </router-link>
      <router-link class="button" to="/photography" @click="closeMenuOnMobile">
        <span class="material-icons">photo_camera</span>
        <span class="text">Photography</span>
      </router-link>
    </div>
    <div class="flex"></div>
    <div class="menu bottom-section">
      <router-link class="button" to="/settings" @click="closeMenuOnMobile">
        <span class="material-icons">settings</span>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { useSidebarStore } from '../stores/sidebarStore';

const route = useRoute();
const sidebarStore = useSidebarStore();
const isMobile = ref(false);

const ToggleMenu = () => {
  sidebarStore.toggleSidebar();
}

const closeMenuOnMobile = () => {
  if (isMobile.value) {
    sidebarStore.setSidebarOpen(false);
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
}

const handleResize = () => {
  const wasMobile = isMobile.value;
  checkMobile();
  
  if (!isMobile.value && wasMobile) {
    // Transitioning from mobile to desktop
    if (!wasClosedByUser.value) {
      is_open.value = true;
      localStorage.setItem('is_open', 'true');
    }
  } else if (isMobile.value && !wasMobile) {
    // Transitioning from desktop to mobile
    is_open.value = false;
    localStorage.setItem('is_open', 'false');
  }
}

onMounted(() => {
  checkMobile();
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: var(--sidebar-collapsed-width);
  min-height: 100vh;
  padding: 0.5rem 0;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-color);
  transition: width 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  overflow: hidden;

  &.is-open {
    width: var(--sidebar-width);
  }

  .top-section {
    position: relative;
    height: 5rem;
    margin-bottom: 0.5rem;
  }

  .logo {
    width: 2.5rem;
    height: 2.5rem;
    overflow: hidden;
    border-radius: 50%;
    position: absolute;
    top: 0.75rem;
    left: calc((var(--sidebar-collapsed-width) - 2.5rem) / 2);
    z-index: 2;

    .profile-picture {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .menu-toggle-wrapper {
    position: absolute;
    top: 3.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    transition: all 0.3s ease-in-out;
  }

  .menu-toggle {
    font-size: 1.5rem;
    color: var(--sidebar-color);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    &:hover {
      color: var(--primary);
    }
  }

  h3 {
    color: var(--grey);
    font-size: 0.875rem;
    margin: 0.5rem 0;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    padding: 0 1rem;
  }

  .menu {
    margin: 0;

    .button {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-decoration: none;
      padding: 0 1rem;
      transition: background-color 0.3s ease-in-out;
      height: 3rem;
      overflow: hidden;
      position: relative;

      .material-icons {
        font-size: 1.8rem;
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        width: 2rem;
        text-align: center;
        flex-shrink: 0;
      }

      .text {
        color: var(--sidebar-color);
        transition: opacity 0.3s ease-in-out;
        font-size: 1rem;
        white-space: nowrap;
        opacity: 0;
        position: absolute;
        left: 3.5rem;
      }

      &:hover, &.router-link-exact-active {
        background-color: rgba(255, 255, 255, 0.1);

        .material-icons, .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 3px solid var(--primary);
      }
    }
  }

  .flex {
    flex-grow: 1;
  }

  .bottom-section {
    margin-top: 0.25rem;
  }

  &.is-open {
    .menu-toggle-wrapper {
      top: 0.75rem;
      right: 0.5rem;
      left: auto;
      transform: none;
    }

    .menu .button {
      .text {
        opacity: 1;
      }
    }
  }
}

@media (min-width: 769px) {
  aside {
    .menu-toggle {
      font-size: 2rem;
    }

    h3 {
      font-size: 1rem;
    }

    .menu {
      .button {
        .material-icons {
          font-size: 2rem;
        }

        .text {
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>