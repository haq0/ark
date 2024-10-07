<template>
  <div class="blog-post-container" v-if="post">
    <main class="blog-post">
      <article class="post-card">
        <header>
          <h1 class="post-title">{{ post.title }}</h1>
          <div class="post-meta">
            <span class="post-date">{{ formatDate(post.date) }}</span>
            <span class="post-author">by {{ post.author }}</span>
            <span class="post-read-time">{{ post.readTime }} min read</span>
          </div>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="post-tag">{{ tag }}</span>
          </div>
        </header>
        <div class="post-content" v-html="highlightedContent"></div>
      </article>
      <div class="post-navigation">
        <router-link v-if="previousPost" :to="`/blog/${previousPost.slug}`" class="nav-link prev-post">
          ← {{ previousPost.title }}
        </router-link>
        <router-link v-if="nextPost" :to="`/blog/${nextPost.slug}`" class="nav-link next-post">
          {{ nextPost.title }} →
        </router-link>
      </div>
    </main>
    <aside class="table-of-contents" v-if="tableOfContents.length > 0">
      <div class="toc-container">
        <h3>Table of Contents</h3>
        <nav>
          <ul>
            <li v-for="(heading, index) in tableOfContents" :key="index">
              <a :href="`#heading-${index}`" v-html="heading"></a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  </div>
  <div v-else>
    <p>Loading post...</p>
    <p v-if="error">Error: {{ error }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const postContent = ref('');
const tableOfContents = ref([]);
const error = ref(null);

const blogPosts = [
  {
    id: 1,
    title: "Haskell vs OCaml: A Tale of Two Functional Languages",
    slug: "haskell-vs-ocaml",
    date: "2023-05-15",
    author: "haquire",
    tags: ["Functional Programming", "Haskell", "OCaml"],
    readTime: 10
  }
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const highlightedContent = computed(() => {
  if (!postContent.value) return '';
  
  const highlighted = postContent.value.replace(/<pre><code.*?>([\s\S]*?)<\/code><\/pre>/g, (match, p1) => {
    const highlightedCode = hljs.highlightAuto(p1).value;
    return `<pre><code>${highlightedCode}</code></pre>`;
  });

  // Generate table of contents
  const headings = highlighted.match(/<h2.*?>(.*?)<\/h2>/g) || [];
  tableOfContents.value = headings.map((heading, index) => {
    const text = heading.replace(/<\/?[^>]+(>|$)/g, "");
    return `<a href="#heading-${index}">${text}</a>`;
  });

  // Add ids to headings
  return highlighted.replace(/<h2/g, (match, index) => `<h2 id="heading-${index}"`);
});

const currentIndex = computed(() => blogPosts.findIndex(p => p.slug === route.params.slug));
const previousPost = computed(() => currentIndex.value > 0 ? blogPosts[currentIndex.value - 1] : null);
const nextPost = computed(() => currentIndex.value < blogPosts.length - 1 ? blogPosts[currentIndex.value + 1] : null);

const fetchPostContent = async (slug) => {
  try {
    const response = await fetch(`/blog-posts/${slug}.html`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    postContent.value = await response.text();
    console.log('Fetched content:', postContent.value);
  } catch (err) {
    console.error('Error fetching blog post content:', err);
    error.value = err.message;
    postContent.value = '<p>Error loading blog post content. Please try again later.</p>';
  }
};

const loadPost = async () => {
  post.value = blogPosts.find(p => p.slug === route.params.slug);
  if (post.value) {
    await fetchPostContent(post.value.slug);
  } else {
    console.error('Blog post not found');
    error.value = 'Blog post not found';
    postContent.value = '<p>Blog post not found.</p>';
  }
};

onMounted(loadPost);

watch(() => route.params.slug, loadPost);
</script>

<style scoped>
.blog-post-container {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  gap: 2rem;
}

.blog-post {
  flex: 1;
  max-width: 800px;
  padding: 0 1rem; /* Add padding to the sides of the blog post */
}

.post-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.post-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.post-tags {
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

.post-content {
  line-height: 1.8;
  color: var(--text-secondary);
}

.post-content h1 {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.post-content .lead {
  font-size: 1.2rem;
  font-style: italic;
  color: var(--text-primary);
  border-left: 4px solid var(--primary);
  padding-left: 1rem;
  margin-bottom: 2rem;
}

.post-content h2 {
  font-size: 2rem;
  color: var(--text-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--primary);
  padding-bottom: 0.5rem;
}

.post-content h3, .post-content h4 {
  color: var(--text-primary);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.post-content p {
  margin-bottom: 1rem;
}

.post-content .comparison-table,
.post-content .feature-list,
.post-content .ecosystem {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-content .column,
.post-content .feature,
.post-content .eco-item {
  flex: 1;
  background-color: rgba(122, 162, 247, 0.1);
  padding: 1rem;
  border-radius: 8px;
}

.post-content .performance-chart {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.post-content .bar {
  height: 30px;
  background-color: var(--primary);
  color: var(--light);
  display: flex;
  align-items: center;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 15px;
}

.post-content .note {
  font-style: italic;
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.post-content .code-comparison {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.post-content .code-block {
  flex: 1;
}

.post-content .cta-box {
  background-color: rgba(122, 162, 247, 0.1);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  margin-top: 3rem;
}

.post-content .cta-button {
  display: inline-block;
  background-color: var(--primary);
  color: var(--light);
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 1rem;
  transition: all 0.3s ease;
}

.post-content .cta-button:hover {
  background-color: var(--primary-dark);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .post-content .comparison-table,
  .post-content .feature-list,
  .post-content .ecosystem,
  .post-content .code-comparison {
    flex-direction: column;
  }
}

.post-navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.nav-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: var(--primary-dark);
}

.table-of-contents {
  width: 250px;
  position: sticky;
  top: 2rem;
  align-self: flex-start;
}

.toc-container {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.table-of-contents h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: var(--text-primary);
  border-bottom: 2px solid var(--primary);
  padding-bottom: 0.5rem;
}

.table-of-contents nav ul {
  list-style-type: none;
  padding: 0;
}

.table-of-contents nav li {
  margin-bottom: 0.75rem;
}

.table-of-contents a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  background-color: transparent;
  border-left: 3px solid transparent;
}

.table-of-contents a:hover {
  color: var(--primary);
  background-color: rgba(122, 162, 247, 0.1);
  border-left-color: var(--primary);
}

@media (max-width: 1200px) {
  .blog-post-container {
    flex-direction: column;
    padding: 1rem; /* Reduce padding on smaller screens */
  }

  .blog-post {
    max-width: 100%; /* Allow full width on smaller screens */
    padding: 0; /* Remove side padding on smaller screens */
  }

  .table-of-contents {
    width: 100%;
    position: static;
    margin-top: 2rem;
  }
}

.post-content ul, .post-content ol {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
  text-align: left;
  list-style-position: inside;
}

.post-content ul li, .post-content ol li {
  margin-bottom: 0.5rem;
}
</style>