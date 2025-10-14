<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const isVisible = ref(false)

// Pobierz nazwę funkcji z parametru URL lub ustaw domyślną
const featureName = ref(route.query.feature || 'Ta funkcja')

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="coming-soon-container" :class="{ visible: isVisible }">
    <div class="background-decoration">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <div class="content-wrapper">
      <div class="coming-soon-card">
        <div class="icon-wrapper">
          <div class="construction-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="pulse-ring"></div>
        </div>

        <h1 class="main-title">W trakcie budowy</h1>
        <p class="feature-name">{{ featureName }}</p>
        
        <p class="description">
          {{ featureName }} jest obecnie w fazie rozwoju. Nasz zespół intensywnie pracuje nad jej implementacją, aby zapewnić Ci najlepsze możliwe doświadczenie.
        </p>

        <div class="info-box">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <div class="info-text">
            <strong>Status:</strong> W aktywnym rozwoju
          </div>
        </div>

        <div class="features-list">
          <div class="feature-item">
            <span class="check-icon">⏳</span>
            <span>Trwają prace programistyczne</span>
          </div>
          <div class="feature-item">
            <span class="check-icon">🔧</span>
            <span>Testowanie funkcjonalności</span>
          </div>
          <div class="feature-item">
            <span class="check-icon">🚀</span>
            <span>Wkrótce dostępne dla użytkowników</span>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="goBack" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Wróć
          </button>
          <button @click="goHome" class="btn btn-secondary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Strona główna
          </button>
        </div>
      </div>

      <div class="bottom-note">
        <p>💡 Śledź nasze aktualizacje, aby być na bieżąco z nowymi funkcjami!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.coming-soon-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.coming-soon-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.15;
  filter: blur(80px);
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -250px;
  right: -250px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  top: 50%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 700px;
}

.coming-soon-card {
  background: var(--color-bg);
  backdrop-filter: blur(20px);
  border: 1px solid var(--color-border);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.icon-wrapper {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 32px;
}

.construction-icon {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  animation: bounce 2s ease-in-out infinite;
}

.construction-icon svg {
  width: 60px;
  height: 60px;
  stroke: #667eea;
  stroke-width: 2;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.pulse-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 120px;
  height: 120px;
  border: 3px solid rgba(102, 126, 234, 0.4);
  border-radius: 50%;
  animation: pulse 2s ease-out infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.main-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.feature-name {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--color-subtext);
  margin-bottom: 32px;
}

.info-box {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-left: 4px solid #667eea;
  border-radius: 12px;
  margin-bottom: 32px;
}

.info-icon {
  width: 28px;
  height: 28px;
  color: #667eea;
  flex-shrink: 0;
}

.info-text {
  text-align: left;
  font-size: 0.95rem;
  color: var(--color-text);
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(102, 126, 234, 0.03);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: left;
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.check-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.action-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: var(--color-bg);
  color: var(--color-text);
  border: 2px solid var(--color-border);
}

.btn-secondary:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.bottom-note {
  margin-top: 32px;
  text-align: center;
}

.bottom-note p {
  font-size: 0.95rem;
  color: var(--color-subtext);
  padding: 16px 24px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
  display: inline-block;
}

/* Responsive */
@media (max-width: 768px) {
  .coming-soon-card {
    padding: 32px 24px;
  }

  .main-title {
    font-size: 2rem;
  }

  .feature-name {
    font-size: 1.1rem;
  }

  .description {
    font-size: 1rem;
  }

  .icon-wrapper {
    width: 100px;
    height: 100px;
  }

  .construction-icon {
    width: 100px;
    height: 100px;
  }

  .construction-icon svg {
    width: 50px;
    height: 50px;
  }

  .pulse-ring {
    width: 100px;
    height: 100px;
  }
}

@media (max-width: 480px) {
  .coming-soon-container {
    padding: 20px 16px;
  }

  .coming-soon-card {
    padding: 24px 20px;
  }

  .main-title {
    font-size: 1.6rem;
  }

  .feature-name {
    font-size: 1rem;
  }

  .description {
    font-size: 0.95rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .info-box {
    flex-direction: column;
    text-align: center;
  }

  .info-text {
    text-align: center;
  }
}
</style>