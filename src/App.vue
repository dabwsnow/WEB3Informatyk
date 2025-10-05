<script setup>
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Footer from './components/Footer.vue'
import { onMounted } from 'vue'

onMounted(() => {
  // Устанавливаем тему из localStorage при загрузке
  const savedTheme = localStorage.getItem('theme') || 'dark'
  document.documentElement.setAttribute('data-theme', savedTheme)
})
</script>

<template>
  <div class="main-container">
    <Header />
    <Home />
    <Footer />
    <main class="page-content">
    </main>
  </div>
</template>

<style>
/* Используем глобальные переменные из theme.css */
.main-container {
  min-height: 100svh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 90px;
  box-sizing: border-box;
  background: var(--page-bg);
  transition: background 0.6s ease, color 0.6s ease;
}

/* Контентная область */
.page-content {
  width: 80%;
  max-width: 1200px;
  margin-top: 3svh;
  color: var(--color-text);
  transition: color 0.4s ease;
}

/* Адаптивность */
@media (max-width: 768px) {
  .page-content {
    width: 92%;
  }
}
</style>
