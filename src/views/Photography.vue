<template>
  <main class="photography">
    <h1 class="title">Photography Portfolio</h1>
    <div class="photo-grid">
      <div v-for="photo in visiblePhotos" :key="photo.id" class="photo-item">
        <img 
          :src="photo.url" 
          :alt="photo.title" 
          @click="openLightbox(photo)"
          loading="lazy"
        >
        <p class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <img :src="currentPhoto.url" :alt="currentPhoto.title">
      <div class="photo-info">
        <h2>{{ currentPhoto.title }}</h2>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

const photos = ref([]);
const lightboxOpen = ref(false);
const currentPhoto = ref(null);
const lastVisibleIndex = ref(20); // Initial number of visible photos

const openLightbox = (photo) => {
  currentPhoto.value = photo;
  lightboxOpen.value = true;
};

const closeLightbox = () => {
  lightboxOpen.value = false;
};

const visiblePhotos = computed(() => {
  return photos.value.slice(0, lastVisibleIndex.value);
});

const loadMorePhotos = () => {
  lastVisibleIndex.value += 20; // Load 20 more photos
};

onMounted(async () => {
  const imageContext = import.meta.glob('../assets/photography/*.{jpg,jpeg,png,gif}', { eager: true });

  photos.value = Object.entries(imageContext).map(([path, module], index) => {
    const fileName = path.split('/').pop();
    const title = fileName.split('.')[0];
    return {
      id: index + 1,
      title,
      url: module.default
    };
  });

  // Set up intersection observer for infinite scrolling
  const el = document.querySelector('.photo-grid');
  useIntersectionObserver(el, ([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadMorePhotos();
    }
  }, { threshold: 0.5 });
});
</script>

<style scoped>
.photography {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  animation: fadeInDown 1s ease-out;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  justify-content: center;
  max-width: 900px; /* Adjust this value to fit 3 columns comfortably */
  margin: 0 auto;
}

.photo-item {
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-self: center;
}

.photo-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.photo-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.photo-title {
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
  background-color: var(--card-bg);
  color: var(--text-primary);
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox img {
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
}

.photo-info {
  color: white;
  text-align: center;
  margin-top: 1rem;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .photo-grid {
    gap: 1rem;
  }
}
</style>

