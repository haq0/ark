<template>
  <aside :class="{ 'is-open': isOpen }">
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
  transform: translateX(-100%);

  &.is-open {
    transform: translateX(0);
  }

  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .logo {
    .profile-picture {
      width: 2.4rem;
      height: 2.4rem;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .menu-toggle {
    font-size: 1.8rem;
    color: var(--sidebar-color);
    transition: 0.2s ease-out;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    &:hover {
      color: var(--primary);
    }
  }

  h3, .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }

  &.is-open {
    h3, .button .text {
      opacity: 1;
    }
  }

  h3 {
    color: var(--grey);
    font-size: 1.05rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .fas, .fab {
        font-size: 1.8rem;
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        width: 2.4rem;
        text-align: center;
      }

      .text {
        color: var(--sidebar-color);
        transition: 0.2s ease-out;
        margin-left: 0.5rem;
        font-size: 1.2rem;
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
  }
}
</style>