<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArchiveCards from '../card/ArchiveCards.vue'
import { api } from '../../services/api'

const route = useRoute()
const router = useRouter()

const profile = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    loading.value = true
    const profileId = route.params.profileId
    const data = await api.getPracticeProfile(profileId)
    profile.value = data
  } catch (err) {
    error.value = err.message
    console.error('Ошибка загрузки профиля:', err)
  } finally {
    loading.value = false
  }
})

const goBack = () => {
  router.push('/courses')
}
</script>

<template>
  <div v-if="loading" class="loading">
    <p>Загрузка...</p>
  </div>

  <div v-else-if="error" class="error-page">
    <h1>Ошибка</h1>
    <p>{{ error }}</p>
    <button @click="goBack" class="back-btn">Wróć do listy</button>
  </div>

  <div v-else-if="profile" class="profile-page">
    <button class="back-btn" @click="goBack">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M19 12H5m7-7l-7 7 7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Wróć do listy
    </button>

    <div class="profile-hero" :style="{ '--profile-color': profile.color }">
      <div class="hero-content">
        <div class="hero-icon">{{ profile.icon }}</div>
        <div class="hero-text">
          <div class="hero-header">
            <h1 class="hero-title">{{ profile.name }}</h1>
            <span class="hero-category">{{ profile.category }}</span>
          </div>
          <p class="hero-subtitle">{{ profile.title }}</p>
          <p class="hero-description">{{ profile.description }}</p>
        </div>
      </div>
      
      <div class="hero-stats">
        <div class="stat-box">
          <div class="stat-number">{{ profile.archives_count }}</div>
          <div class="stat-label">Arkusze dostępne</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">{{ profile.total_downloads }}</div>
          <div class="stat-label">Łączne pobrania</div>
        </div>
      </div>
    </div>

    <div class="archives-section">
      <h2 class="section-title">Dostępne arkusze egzaminacyjne</h2>
      <ArchiveCards :archives="profile.archives" :qual-color="profile.color" />
    </div>
  </div>

  <div v-else class="error-page">
    <h1>404</h1>
    <p>Nie znaleziono profilu</p>
    <button @click="goBack" class="back-btn">Wróć do listy</button>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;
}

.back-btn svg {
  width: 20px;
  height: 20px;
  stroke: var(--color-text);
}

.back-btn:hover {
  border-color: var(--profile-color);
  color: var(--profile-color);
  transform: translateX(-4px);
}

.back-btn:hover svg {
  stroke: var(--profile-color);
}

.profile-hero {
  background: var(--color-card-bg);
  border: 2px solid var(--color-border);
  border-radius: 24px;
  padding: 48px;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
}

.profile-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: var(--profile-color);
}

.hero-content {
  display: flex;
  gap: 32px;
  margin-bottom: 32px;
  align-items: flex-start;
}

.hero-icon {
  width: 100px;
  height: 100px;
  background: var(--color-bg-hover);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  flex-shrink: 0;
}

.hero-text {
  flex: 1;
}

.hero-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  color: var(--profile-color);
  line-height: 1.1;
  letter-spacing: -1px;
}

.hero-category {
  padding: 6px 16px;
  background: var(--color-bg-hover);
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.3;
}

.hero-description {
  font-size: 1.1rem;
  color: var(--color-subtext);
  line-height: 1.6;
}

.hero-stats {
  display: flex;
  gap: 24px;
}

.stat-box {
  flex: 1;
  padding: 24px;
  background: var(--color-bg-hover);
  border-radius: 16px;
  text-align: center;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--profile-color);
  margin-bottom: 8px;
  line-height: 1;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-subtext);
  font-weight: 600;
}

.archives-section {
  margin-top: 48px;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 24px;
}

.error-page {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 40px 20px;
}

.error-page h1 {
  font-size: 6rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 16px;
}

.error-page p {
  font-size: 1.5rem;
  color: var(--color-subtext);
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  .profile-hero {
    padding: 32px 24px;
  }

  .hero-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .hero-icon {
    width: 80px;
    height: 80px;
    font-size: 3rem;
  }

  .hero-title {
    font-size: 2.2rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-stats {
    flex-direction: column;
  }
}
</style>