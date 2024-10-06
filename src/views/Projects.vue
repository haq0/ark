<template>
  <main class="projects">
    <h1 class="title">My Projects</h1>
    <div class="projects-grid">
      <div v-for="(project, index) in projects" :key="project.id" class="project-card" :style="{ animationDelay: `${index * 0.1}s` }">
        <div class="project-info">
          <h3>{{ project.title }}</h3>
          <p class="project-description">{{ project.description }}</p>
          <div class="project-tech">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">{{ tech }}</span>
          </div>
          <div class="project-links">
            <a :href="project.github" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const projects = ref([
  {
    id: 1,
    title: 'Napalm',
    description: 'The NixVim config that burns.',
    github: 'https://github.com/haq0/napalm',
    technologies: ['Nix', 'Neovim', 'Lua'],
  },
  {
    id: 2,
    title: 'My Website',
    description: 'Personal portfolio website showcasing my projects and skills.',
    github: 'https://github.com/haq0/ark',
    technologies: ['Vue.js', 'JavaScript', 'HTML', 'CSS', 'Vite'],
  },
]);
</script>

<style scoped>
.projects {
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out both;
}

:global(.dark) .project-card {
  background-color: #1e1e2e;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

:global(.dark) .project-card:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

:global(.dark) .project-info h3 {
  color: #fff;
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

:global(.dark) .project-description {
  color: #aaa;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background-color: var(--primary);
  color: var(--light);
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.btn {
  flex: 1;
  text-align: center;
  padding: 0.6rem 1rem;
  background-color: var(--primary);
  color: var(--light);
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn i {
  margin-right: 0.5rem;
}

.btn-secondary {
  background-color: var(--dark-alt);
}

.btn:hover {
  opacity: 0.8;
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

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:root {
  --card-bg: #f0f0f0;
  --text-primary: #333;
  --text-secondary: #666;
}

:global(.dark) {
  --card-bg: #1e1e2e;
  --text-primary: #fff;
  --text-secondary: #aaa;
}
</style>