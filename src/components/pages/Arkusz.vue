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

// Фильтры
const selectedMonth = ref('all')
const selectedYear = ref('all')

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

// Получаем уникальные месяцы
const availableMonths = computed(() => {
  if (!profile.value?.archives) return []
  const months = new Set()
  
  profile.value.archives.forEach(archive => {
    // Формат: "2025 - Styczeń" - берем последнюю часть (месяц)
    const parts = archive.date.split(' - ')
    const month = parts[1] // "Styczeń" или "Czerwiec"
    if (month) {
      months.add(month)
    }
  })
  
  return Array.from(months).sort((a, b) => {
    const order = { 'Styczeń': 1, 'Czerwiec': 6 }
    return order[a] - order[b]
  })
})

// Получаем уникальные годы
const availableYears = computed(() => {
  if (!profile.value?.archives) return []
  const years = new Set()
  
  profile.value.archives.forEach(archive => {
    // Используем поле year напрямую
    if (archive.year) {
      years.add(archive.year)
    }
  })
  
  return Array.from(years).sort((a, b) => b - a) // От нового к старому
})

// Отфильтрованные архивы
const filteredArchives = computed(() => {
  if (!profile.value?.archives) return []
  
  return profile.value.archives.filter(archive => {
    // Формат date: "2025 - Styczeń"
    const parts = archive.date.split(' - ')
    const month = parts[1]
    const year = archive.year
    
    const monthMatch = selectedMonth.value === 'all' || month === selectedMonth.value
    const yearMatch = selectedYear.value === 'all' || year === parseInt(selectedYear.value)
    
    return monthMatch && yearMatch
  })
})

// Сброс фильтров
const resetFilters = () => {
  selectedMonth.value = 'all'
  selectedYear.value = 'all'
}

const goBack = () => {
  router.push('/courses')
}
</script>

<template>
  <div v-if="loading" class="loading">
    <div class="spinner"></div>
    <p>Ładowanie...</p>
  </div>

  <div v-else-if="error" class="error-page">
    <div class="error-icon">⚠️</div>
    <h1>Błąd</h1>
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
          <div class="stat-number">{{ profile.total_downloads?.toLocaleString() || 0 }}</div>
          <div class="stat-label">Łączne pobrania</div>
        </div>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="filters-section">
      <div class="section-header">
        <h2 class="section-title">Dostępne arkusze egzaminacyjne</h2>
        <div class="results-info">
          Znaleziono: <strong>{{ filteredArchives.length }}</strong> {{ filteredArchives.length === 1 ? 'arkusz' : 'arkuszy' }}
        </div>
      </div>
      
      <div class="filters">
        <div class="filter-group">
          <label for="month-filter">Miesiąc:</label>
          <select id="month-filter" v-model="selectedMonth" class="filter-select">
            <option value="all">Wszystkie</option>
            <option v-for="month in availableMonths" :key="month" :value="month">
              {{ month }}
            </option>
          </select>
        </div>

        <div class="filter-group">
          <label for="year-filter">Rok:</label>
          <select id="year-filter" v-model="selectedYear" class="filter-select">
            <option value="all">Wszystkie</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
        </div>

        <button 
          v-if="selectedMonth !== 'all' || selectedYear !== 'all'" 
          @click="resetFilters" 
          class="reset-btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Wyczyść
        </button>
      </div>
    </div>

    <!-- Архивы -->
    <div class="archives-section">
      <ArchiveCards 
        v-if="filteredArchives.length > 0"
        :archives="filteredArchives" 
        :qual-color="profile.color" 
      />
      <div v-else class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>Brak wyników</h3>
        <p>Nie znaleziono arkuszy spełniających wybrane kryteria</p>
        <button @click="resetFilters" class="reset-btn-large">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Resetuj filtry
        </button>
      </div>
    </div>
  </div>

  <div v-else class="error-page">
    <div class="error-icon">404</div>
    <h1>Nie znaleziono</h1>
    <p>Profil o tym identyfikatorze nie istnieje</p>
    <button @click="goBack" class="back-btn">Wróć do listy</button>
  </div>
</template>


<style scoped>
/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid var(--color-border);
  border-top-color: var(--profile-color, #667eea);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading p {
  font-size: 1.1rem;
  color: var(--color-subtext);
  font-weight: 500;
}

/* Error Page */
.error-page {
  max-width: 600px;
  margin: 100px auto;
  text-align: center;
  padding: 40px 20px;
}

.error-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
}

.error-page h1 {
  font-size: 3rem;
  font-weight: 900;
  color: var(--color-text);
  margin-bottom: 16px;
}

.error-page p {
  font-size: 1.2rem;
  color: var(--color-subtext);
  margin-bottom: 32px;
}

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
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
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

/* Filters Section */
.filters-section {
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
  letter-spacing: -0.5px;
}

.results-info {
  font-size: 1rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.results-info strong {
  color: var(--color-text);
  font-weight: 700;
}

.filters {
  display: flex;
  gap: 16px;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 24px;
  background: var(--color-bg-hover);
  border: 2px solid var(--color-border);
  border-radius: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
  flex: 1;
}

.filter-group label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-subtext);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.filter-select {
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  background: var(--color-bg);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-select:hover {
  border-color: var(--profile-color);
}

.filter-select:focus {
  outline: none;
  border-color: var(--profile-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.reset-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.reset-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.reset-btn svg {
  width: 18px;
  height: 18px;
  stroke-width: 2.5;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 60px 40px;
  background: var(--color-bg-hover);
  border: 2px dashed var(--color-border);
  border-radius: 20px;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 16px;
  opacity: 0.5;
}

.no-results h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}

.no-results p {
  font-size: 1rem;
  color: var(--color-subtext);
  margin-bottom: 24px;
  line-height: 1.6;
}

.reset-btn-large {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.reset-btn-large:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
}

.reset-btn-large svg {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.archives-section {
  margin-top: 32px;
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

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    flex-direction: column;
  }

  .filter-group {
    min-width: 100%;
  }

  .reset-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>