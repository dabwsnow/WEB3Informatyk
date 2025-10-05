<script setup>
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'

onMounted(() => {
  const savedTheme = 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<template>
  <div class="app-container">
    <Header />
    <main class="main-content">
      <Home />
      <div class="page-content">
        <router-view />
      </div>
    </main>
    <Footer />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--page-bg);
  color: var(--color-text);
  transition: background 0.6s ease, color 0.6s ease;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.main-content {
  flex: 1;
  width: 100%;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-content {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  color: var(--color-text);
  transition: color 0.4s ease;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #764ba2, #f093fb);
}

/* Selection Color */
::selection {
  background: rgba(102, 126, 234, 0.3);
  color: var(--color-text);
}

::-moz-selection {
  background: rgba(102, 126, 234, 0.3);
  color: var(--color-text);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding-top: 160px;
  }

  .page-content {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding-top: 140px;
  }
}
</style>