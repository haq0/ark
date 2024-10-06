<template>
  <main class="contact">
    <h1 class="title">Contact Me</h1>
    <p class="subtitle">Scan the QR code below to chat with me on SimpleX:</p>
    <div class="qr-container">
      <div class="qr-box">
        <img src="../assets/simplex.png" alt="SimpleX Chat QR Code" class="qr-code">
      </div>
    </div>
    <div class="instructions-container">
      <button @click="toggleInstructions" class="btn instructions-toggle">
        {{ showInstructions ? 'Hide Instructions' : 'Show Instructions' }}
      </button>
      <transition name="fade">
        <div v-if="showInstructions" class="instructions">
          <ol>
            <li>Install SimpleX Chat from <a href="https://simplex.chat" target="_blank" rel="noopener noreferrer">simplex.chat</a></li>
            <li>Open the app and tap "Scan QR code"</li>
            <li>Scan the QR code above to start chatting</li>
          </ol>
        </div>
      </transition>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const showInstructions = ref(false);

const toggleInstructions = () => {
  showInstructions.value = !showInstructions.value;
};
</script>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  animation: fadeInDown 1s ease-out;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--grey);
  animation: fadeIn 1s ease-out 0.5s both;
}

.qr-container {
  margin-bottom: 2rem;
  animation: fadeIn 1s ease-out 1s both;
  perspective: 1000px;
}

.qr-box {
  display: inline-block;
  position: relative;
  padding: 10px;
  transition: all 0.3s ease;
}

.qr-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid var(--primary);
  border-radius: 8px;
  transform: scale(1.03);
  opacity: 0.7;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.qr-box:hover::before {
  transform: scale(1.05);
  opacity: 1;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.qr-code {
  max-width: 300px;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.qr-box:hover .qr-code {
  transform: scale(1.02);
}

.instructions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.instructions-toggle {
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease-out 1.5s both;
}

.instructions {
  text-align: left;
  margin: 1rem auto;
  max-width: 400px;
  line-height: 1.6;
  background-color: var(--light);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.instructions ol {
  padding-left: 1.5rem;
}

.instructions li {
  margin-bottom: 0.5rem;
}

.btn {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background-color: var(--primary);
  color: var(--light);
  text-decoration: none;
  border-radius: 30px;
  transition: all 0.3s ease;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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
</style>