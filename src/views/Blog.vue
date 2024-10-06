<template>
  <main class="blog">
    <h1 class="title">Blog</h1>
    <div class="blog-posts">
      <article v-for="post in blogPosts" :key="post.id" class="blog-post">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-date">{{ post.date }}</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <a :href="post.link" class="read-more">Read More</a>
      </article>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const blogPosts = ref([
  {
    id: 1,
    title: 'Blog Being Developed',
    date: 'Coming Soon',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    link: '#'
  },
]);
</script>

<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  animation: fadeInDown 1s ease-out;
}

.blog-posts {
  display: grid;
  gap: 2rem;
}

.blog-post {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease-out both;
}

:global(.dark) .blog-post {
  background-color: #1e1e2e;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

:global(.dark) .blog-post:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.post-date {
  font-size: 0.9rem;
  color: var(--grey);
  margin-bottom: 1rem;
}

.post-excerpt {
  margin-bottom: 1rem;
}

.read-more {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary);
  color: var(--light);
  text-decoration: none;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
}

.read-more:hover {
  background-color: var(--primary-dark);
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