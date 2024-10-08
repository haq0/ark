<template>
  <main class="blog">
    <h1 class="title">Blog</h1>
    <div v-if="blogPosts.length === 0" class="no-posts">
      No blog posts found.
    </div>
    <div v-else class="blog-posts">
      <article v-for="post in blogPosts" :key="post.slug" class="blog-post">
        <h2 class="post-title">{{ post.title }}</h2>
        <p class="post-date">{{ formatDate(post.date) }}</p>
        <p class="post-read-time">{{ post.readTime }} min read</p>
        <p class="post-excerpt">{{ post.excerpt }}</p>
        <div class="post-meta">
          <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
        </div>
        <router-link :to="`/blog/${post.slug}`" class="read-more">Read More</router-link>
      </article>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const blogPosts = ref([]);

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

onMounted(async () => {
  try {
    const response = await fetch('/blog-posts/posts.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts = await response.json();
    blogPosts.value = posts;
    console.log('Loaded blog posts:', posts);
  } catch (error) {
    console.error('Error loading blog posts:', error);
  }
});
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

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.post-date, .post-read-time {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.post-excerpt {
  margin-bottom: 1rem;
  color: var(--text-secondary);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.post-tag {
  background-color: var(--primary);
  color: var(--light);
  padding: 0.2rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
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

.no-posts {
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-top: 2rem;
}
</style>