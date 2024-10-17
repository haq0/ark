<template>
  <div v-if="post" class="blog-post">
    <article v-html="postContent"></article>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);
const postContent = ref('');

onMounted(async () => {
  const response = await fetch(`/blog-posts/${route.params.slug}.html`);
  postContent.value = await response.text();

  const postsResponse = await fetch('/blog-posts/posts.json');
  const posts = await postsResponse.json();
  post.value = posts.find(p => p.slug === route.params.slug);
});
</script>

<style scoped>
@import '/asr/markdown-styles.css';

.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

article {
  line-height: 1.6;
  color: var(--text-primary);
}

h1, h2, h3, h4, h5, h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

p {
  margin-bottom: 1rem;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
