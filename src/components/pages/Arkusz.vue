<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArchiveCards from '../card/ArchiveCards.vue'

const route = useRoute()
const router = useRouter()

// Все профили с данными
const profiles = {
  'inf02': {
    id: 'inf02',
    name: 'INF.02',
    title: 'Administracja systemami komputerowymi',
    icon: '🖥️',
    color: '#667eea',
    category: 'Technik informatyk',
    description: 'Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych',
    archives: [
      { id: 1, code: 'INF.02-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 1245 },
      { id: 2, code: 'INF.02-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 2130 },
      { id: 3, code: 'INF.02-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 3456 },
      { id: 4, code: 'INF.02-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 2890 },
      { id: 5, code: 'INF.02-05-22.06', date: 'Czerwiec 2022', type: 'Egzamin główny', downloaded: 4120 },
    ]
  },
  'ee08': {
    id: 'ee08',
    name: 'EE.08',
    title: 'Montaż i eksploatacja systemów komputerowych',
    icon: '🔧',
    color: '#f59e0b',
    category: 'Technik informatyk (stara podstawa)',
    description: 'Montaż, uruchamianie i konserwacja komputerów oraz urządzeń peryferyjnych',
    archives: [
      { id: 1, code: 'EE.08-01-21.06', date: 'Czerwiec 2021', type: 'Egzamin główny', downloaded: 5230 },
      { id: 2, code: 'EE.08-02-21.01', date: 'Styczeń 2021', type: 'Egzamin główny', downloaded: 4560 },
      { id: 3, code: 'EE.08-03-20.06', date: 'Czerwiec 2020', type: 'Egzamin główny', downloaded: 6123 },
    ]
  },
  'e12': {
    id: 'e12',
    name: 'E.12',
    title: 'Montaż i eksploatacja komputerów osobistych',
    icon: '💻',
    color: '#06b6d4',
    category: 'Technik informatyk (bardzo stara podstawa)',
    description: 'Montaż komputerów osobistych oraz instalacja systemów i programów użytkowych',
    archives: [
      { id: 1, code: 'E.12-01-20.01', date: 'Styczeń 2020', type: 'Egzamin główny', downloaded: 3890 },
      { id: 2, code: 'E.12-02-19.06', date: 'Czerwiec 2019', type: 'Egzamin główny', downloaded: 4234 },
    ]
  },
  'e13': {
    id: 'e13',
    name: 'E.13',
    title: 'Projektowanie lokalnych sieci komputerowych',
    icon: '🌐',
    color: '#8b5cf6',
    category: 'Technik informatyk (bardzo stara podstawa)',
    description: 'Projektowanie lokalnych sieci komputerowych i administrowanie sieciami',
    archives: [
      { id: 1, code: 'E.13-01-20.01', date: 'Styczeń 2020', type: 'Egzamin główny', downloaded: 3567 },
      { id: 2, code: 'E.13-02-19.06', date: 'Czerwiec 2019', type: 'Egzamin główny', downloaded: 4012 },
    ]
  },
  'inf03': {
    id: 'inf03',
    name: 'INF.03',
    title: 'Tworzenie i administrowanie stronami',
    icon: '💾',
    color: '#10b981',
    category: 'Technik programista',
    description: 'Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych',
    archives: [
      { id: 1, code: 'INF.03-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 2340 },
      { id: 2, code: 'INF.03-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 3120 },
      { id: 3, code: 'INF.03-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 4567 },
      { id: 4, code: 'INF.03-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 3890 },
      { id: 5, code: 'INF.03-05-22.06', date: 'Czerwiec 2022', type: 'Egzamin główny', downloaded: 5234 },
    ]
  },
  'ee09': {
    id: 'ee09',
    name: 'EE.09',
    title: 'Programowanie aplikacji internetowych',
    icon: '🌍',
    color: '#ec4899',
    category: 'Technik programista (stara podstawa)',
    description: 'Tworzenie aplikacji internetowych i baz danych oraz administrowanie bazami',
    archives: [
      { id: 1, code: 'EE.09-01-21.06', date: 'Czerwiec 2021', type: 'Egzamin główny', downloaded: 6123 },
      { id: 2, code: 'EE.09-02-21.01', date: 'Styczeń 2021', type: 'Egzamin główny', downloaded: 5432 },
      { id: 3, code: 'EE.09-03-20.06', date: 'Czerwiec 2020', type: 'Egzamin główny', downloaded: 7234 },
    ]
  },
  'e14': {
    id: 'e14',
    name: 'E.14',
    title: 'Tworzenie aplikacji internetowych i baz danych',
    icon: '📊',
    color: '#f43f5e',
    category: 'Technik programista (bardzo stara podstawa)',
    description: 'Tworzenie aplikacji internetowych, baz danych i administrowanie bazami danych',
    archives: [
      { id: 1, code: 'E.14-01-20.01', date: 'Styczeń 2020', type: 'Egzamin główny', downloaded: 6543 },
      { id: 2, code: 'E.14-02-19.06', date: 'Czerwiec 2019', type: 'Egzamin główny', downloaded: 7123 },
    ]
  },
  'inf04': {
    id: 'inf04',
    name: 'INF.04',
    title: 'Projektowanie, programowanie i testowanie aplikacji',
    icon: '📱',
    color: '#a855f7',
    category: 'Technik programista',
    description: 'Projektowanie, programowanie i testowanie aplikacji desktopowych i mobilnych',
    archives: [
      { id: 1, code: 'INF.04-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 890 },
      { id: 2, code: 'INF.04-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 1230 },
      { id: 3, code: 'INF.04-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 2345 },
      { id: 4, code: 'INF.04-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 1890 },
    ]
  }
}

const profile = computed(() => {
  const profileId = route.params.profileId
  return profiles[profileId] || null
})

const goBack = () => {
  router.push('/courses')
}
</script>

<template>
  <div v-if="profile" class="profile-page">
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
          <div class="stat-number">{{ profile.archives.length }}</div>
          <div class="stat-label">Arkusze dostępne</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">{{ profile.archives.reduce((sum, a) => sum + a.downloaded, 0) }}</div>
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