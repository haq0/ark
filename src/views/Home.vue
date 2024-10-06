<template>
  <main class="home">
    <h1 class="title">Welcome to My Portfolio</h1>
    <p class="subtitle">Passionate developer creating innovative solutions</p>
    <div class="cta-buttons">
      <router-link to="/projects" class="btn">
        <i class="fas fa-project-diagram"></i> View My Projects
      </router-link>
      <router-link to="/about" class="btn btn-secondary">
        <i class="fas fa-user"></i> Learn More About Me
      </router-link>
    </div>
  </main>
</template>

<script setup>
// You can add any necessary imports or logic here
</script>

<style scoped>
.home {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 3rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s ease-out;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--grey);
  animation: fadeInUp 1s ease-out 0.5s both;
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  animation: fadeIn 1s ease-out 1s both;
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary);
  color: var(--light);
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.btn i {
  margin-right: 0.5rem;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-secondary {
  background-color: var(--dark-alt);
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
</style>