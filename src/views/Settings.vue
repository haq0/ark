<template>
  <main class="settings">
    <h1 class="title">Settings</h1>
    <div class="setting-item">
      <span>Theme</span>
      <select v-model="selectedTheme" @change="updateTheme" class="theme-select">
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </select>
    </div>
  </main>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';

const changeTheme = inject('changeTheme');
const currentTheme = inject('currentTheme');
const selectedTheme = ref(currentTheme.value);

onMounted(() => {
  selectedTheme.value = currentTheme.value;
});

const updateTheme = () => {
  changeTheme(selectedTheme.value);
};
</script>

<style scoped>
.settings {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.theme-select {
  background-color: var(--primary);
  color: var(--light);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.theme-select:hover {
  background-color: var(--primary-dark);
}
</style>