<template>
  <main class="about">
    <h1 class="title">About Me</h1>
    <div class="about-content">
      <img src="../assets/profile-picture.jpg" alt="haquire" class="profile-picture">
      <div class="bio">
        <p>Hi, I'm haquire, a 17 year old software engineer passionate about elegant solutions and functional programming.</p>
        <p>I specialize in systems programming and open-source technologies, always seeking to learn and innovate.</p>
        <p>Outside of coding, I enjoy nature photography, hiking, and contributing to open-source projects.</p>
      </div>
    </div>
    <h2 class="skills-title">Technical Skills</h2>
    <ul class="skills-list">
      <li v-for="(skill, index) in skills" :key="skill" :style="{ animationDelay: `${index * 0.1}s` }">{{ skill }}</li>
    </ul>
    <h2 class="social-title">Connect with me</h2>
    <div class="social-links">
      <a href="https://github.com/haq0" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-github"></i>
      </a>
      <a href="https://www.youtube.com/@haquire" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-youtube"></i>
      </a>
      <a href="https://bsky.app/profile/haquire.bsky.social" target="_blank" rel="noopener noreferrer" class="social-link">
        <img src="../assets/bluesky.png" alt="Bluesky" class="bluesky-icon">
      </a>
      <a href="https://www.reddit.com/user/haquire0" target="_blank" rel="noopener noreferrer" class="social-link">
        <i class="fab fa-reddit"></i>
      </a>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const skills = ref([
  'Haskell',
  'Linux',
  'C',
  'Python',
  'BSD',
  'Git'
]);
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title, .skills-title, .social-title {
  text-align: center;
  animation: fadeInDown 1s ease-out;
  color: var(--text-primary);
}

.about-content {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 0.5s both;
}

.profile-picture {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.bio p {
  margin-bottom: 1rem;
  line-height: 1.6;
  color: var(--text-secondary);
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  justify-content: center;
}

.skills-list li {
  background-color: var(--primary);
  color: var(--light);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  animation: fadeInUp 1s ease-out both;
}

.social-title {
  margin-top: 2rem;
  text-align: center;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.social-link {
  font-size: 2rem;
  color: var(--primary);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.social-link:hover {
  color: var(--primary-dark);
  transform: translateY(-3px);
}

.bluesky-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  filter: brightness(0) saturate(100%) invert(53%) sepia(68%) saturate(434%) hue-rotate(194deg) brightness(101%) contrast(94%);
}

.social-link:hover .bluesky-icon {
  filter: brightness(0) saturate(100%) invert(45%) sepia(36%) saturate(953%) hue-rotate(176deg) brightness(90%) contrast(84%);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>