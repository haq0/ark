<template>
  <aside :class="{ 'is-open': isOpen, 'is-mobile': isMobile }">
    <div class="top-section">
      <div class="logo">
        <img src="../assets/profile-picture.jpg" alt="haquire" class="profile-picture">
      </div>
      <button class="menu-toggle" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div class="menu">
      <router-link class="button" to="/" @click="closeMenuOnMobile">
        <i class="fas fa-home"></i>
        <span class="text">Home</span>
      </router-link>
      <router-link class="button" to="/projects" @click="closeMenuOnMobile">
        <i class="fas fa-project-diagram"></i>
        <span class="text">Projects</span>
      </router-link>
      <router-link class="button" to="/about" @click="closeMenuOnMobile">
        <i class="fas fa-user"></i>
        <span class="text">About</span>
      </router-link>
      <router-link class="button" to="/contact" @click="closeMenuOnMobile">
        <i class="fas fa-envelope"></i>
        <span class="text">Contact</span>
      </router-link>
      <router-link class="button" to="/blog" @click="closeMenuOnMobile">
        <i class="fas fa-blog"></i>
        <span class="text">Blog</span>
      </router-link>
      <router-link class="button" to="/photography" @click="closeMenuOnMobile">
        <i class="fas fa-camera"></i>
        <span class="text">Photography</span>
      </router-link>
    </div>
    <div class="flex"></div>
    <div class="menu bottom-section">
      <router-link class="button" to="/settings" @click="closeMenuOnMobile">
        <i class="fas fa-cog"></i>
        <span class="text">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps(['isOpen']);
const emit = defineEmits(['toggle-sidebar']);

const isMobile = ref(false);

const toggleMenu = () => {
  emit('toggle-sidebar');
};

const closeMenuOnMobile = () => {
  if (isMobile.value) {
    emit('toggle-sidebar');
  }
};

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const handleResize = () => {
  checkMobile();
};

onMounted(() => {
  checkMobile();
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
  width: var(--sidebar-width);
  min-height: 100vh;
  padding: 1rem;
  background-color: var(--sidebar-bg);
  color: var(--sidebar-color);
  transition: 0.3s ease-in-out;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  transform: translateX(0); // Remove the initial transform

  &.is-open {
    transform: translateX(0);
  }

  &.is-mobile {
    transform: translateX(-100%);
    width: 100%;

    &.is-open {
      transform: translateX(0);
    }
  }

  &:not(.is-open) {
    width: 70px; // Set a fixed width of 70px when closed
  }

  &.is-open {
    width: var(--sidebar-width);
  }

  .top-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem; // Increased from 1rem to 2rem
    position: relative;
  }

  .logo {
    margin-bottom: 0.5rem; // Reduced from 1rem to 0.5rem
    .profile-picture {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .menu-toggle {
    font-size: 1.5rem;
    color: var(--sidebar-color);
    transition: 0.2s ease-out;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    position: absolute;
    top: calc(100% - 0.5rem); // Moved up slightly
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      color: var(--primary);
    }
  }

  &.is-open {
    .top-section {
      flex-direction: row;
      justify-content: space-between;
      align-items: center; // Changed from flex-start to center
      padding-right: 1rem;
    }

    .menu-toggle {
      position: static;
      transform: none;
    }
  }

  .menu {
    margin: 0 -1rem;
    overflow: hidden;
    padding-top: 1rem; // Added padding to move menu items down

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;
      white-space: nowrap;

      .fas, .fab {
        font-size: 1.8rem;
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        width: 2.4rem;
        text-align: center;
        margin-right: 0.5rem;
      }

      .text {
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        font-size: 1.2rem;
        opacity: 0;
        max-width: 0;
        overflow: hidden;
        transition: opacity 0.2s ease-out, max-width 0.2s ease-out;
      }

      &:hover, &.router-link-exact-active {
        background-color: rgba(255, 255, 255, 0.1);

        .fas, .fab, .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid var(--primary);
      }
    }
  }

  &:not(.is-open) {
    .menu .button {
      width: 70px; // Adjust button width to match sidebar width
      justify-content: center;

      .fas, .fab {
        margin-right: 0;
      }

      .text {
        display: none;
      }
    }
  }

  &.is-open {
    .menu .button .text {
      opacity: 1;
      max-width: 200px; // Adjust this value as needed
    }
  }

  .flex {
    flex-grow: 1;
  }

  .bottom-section {
    margin-top: auto;
  }
}

@media (max-width: 768px) {
  aside {
    width: 100%;
    transform: translateX(-100%);

    &.is-open {
      transform: translateX(0);
    }

    &:not(.is-open) {
      width: 0; // Hide completely on mobile when closed
    }
  }

  .menu-toggle {
    position: fixed;
    top: 1rem;
    left: 1rem; // Change from right to left
    z-index: 1000;
    background-color: var(--sidebar-bg);
    padding: 0.5rem;
    border-radius: 50%;
  }
}
</style>