<script setup>
import { ref, computed, onMounted } from 'vue'

// Dane użytkownika z localStorage (zamień na rzeczywiste źródło)
const user = ref({
  firstName: 'Jan',
  lastName: 'Kowalski',
  username: 'jankowalski',
  password: 'Test123!', // to będzie z backendu/localStorage
  key: 'ABCD-1234-EFGH-5678', // 16-znakowy klucz
  registrationDate: '15.03.2024',
  avatar: '👤'
})

// Statystyki użytkownika
const stats = ref({
  totalTests: 127,
  averageScore: 82,
  maxStreak: 15,
  currentStreak: 8,
  totalTime: '24:30',
  lastActive: '07.10.2025',
  
  categoryStats: [
    { name: 'INF.02', completed: 45, average: 85, icon: '🖥️', color: '#667eea' },
    { name: 'INF.03', completed: 52, average: 80, icon: '💾', color: '#764ba2' },
    { name: 'INF.04', completed: 30, average: 78, icon: '📱', color: '#f093fb' }
  ],
  
  recentTests: [
    { id: 1, name: 'Test INF.02 - Arkusz 2024', score: 90, date: '05.10.2025', category: 'INF.02' },
    { id: 2, name: 'Test INF.03 - Bazy danych', score: 75, date: '04.10.2025', category: 'INF.03' },
    { id: 3, name: 'Test INF.04 - React', score: 88, date: '03.10.2025', category: 'INF.04' },
    { id: 4, name: 'Test INF.02 - Sieci', score: 92, date: '02.10.2025', category: 'INF.02' },
    { id: 5, name: 'Test INF.03 - SQL', score: 68, date: '01.10.2025', category: 'INF.03' }
  ],
  
  achievements: [
    { id: 1, name: 'Nowicjusz', description: 'Ukończ pierwszy test', icon: '🎯', earned: true },
    { id: 2, name: 'Maratończyk', description: 'Ukończ 50+ testów', icon: '🏃', earned: true },
    { id: 3, name: 'Perfekcjonista', description: 'Zdobądź 5 testów ze 100%', icon: '⭐', earned: false },
    { id: 4, name: 'Tydzień', description: 'Utrzymaj streak przez 7 dni', icon: '📅', earned: true },
    { id: 5, name: 'Mistrz', description: 'Osiągnij średnią 90%+', icon: '👑', earned: false },
    { id: 6, name: 'Wytrwały', description: 'Utrzymaj streak przez 30 dni', icon: '🔥', earned: false }
  ]
})

const activeTab = ref('overview')
const showKeyInput = ref(false)
const passwordInput = ref('')
const showKey = ref(false)
const passwordError = ref('')
const isVisible = ref(false)
const isLoading = ref(false)

// Edycja danych
const editMode = ref(false)
const editData = ref({
  firstName: user.value.firstName,
  lastName: user.value.lastName,
  username: user.value.username,
  newPassword: '',
  confirmPassword: ''
})

const verifyPassword = () => {
  if (passwordInput.value === user.value.password) {
    showKey.value = true
    showKeyInput.value = false
    passwordInput.value = ''
    passwordError.value = ''
  } else {
    passwordError.value = 'Nieprawidłowe hasło'
    setTimeout(() => {
      passwordError.value = ''
    }, 3000)
  }
}

const hideKey = () => {
  showKey.value = false
}

const toggleKeyInput = () => {
  showKeyInput.value = !showKeyInput.value
  passwordInput.value = ''
  passwordError.value = ''
}

const copyKey = async () => {
  try {
    await navigator.clipboard.writeText(user.value.key)
    alert('Klucz skopiowany do schowka!')
  } catch (err) {
    console.error('Błąd kopiowania:', err)
  }
}

const startEdit = () => {
  editMode.value = true
  editData.value = {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    username: user.value.username,
    newPassword: '',
    confirmPassword: ''
  }
}

const cancelEdit = () => {
  editMode.value = false
  editData.value = {
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    username: user.value.username,
    newPassword: '',
    confirmPassword: ''
  }
}

const saveChanges = () => {
  // Walidacja
  if (!editData.value.firstName || !editData.value.lastName || !editData.value.username) {
    alert('Wypełnij wszystkie pola!')
    return
  }

  if (editData.value.newPassword) {
    if (editData.value.newPassword.length < 6) {
      alert('Hasło musi mieć minimum 6 znaków')
      return
    }
    if (editData.value.newPassword !== editData.value.confirmPassword) {
      alert('Hasła nie są identyczne')
      return
    }
  }

  isLoading.value = true

  // TODO: Wyślij na backend
  setTimeout(() => {
    user.value.firstName = editData.value.firstName
    user.value.lastName = editData.value.lastName
    user.value.username = editData.value.username
    
    if (editData.value.newPassword) {
      user.value.password = editData.value.newPassword
    }

    // Zapisz do localStorage (zmień na odpowiedni store/api)
    localStorage.setItem('userData', JSON.stringify({
      firstName: user.value.firstName,
      lastName: user.value.lastName,
      username: user.value.username
    }))

    isLoading.value = false
    editMode.value = false
    alert('Zmiany zapisane!')
  }, 1000)
}

const earnedAchievements = computed(() => {
  return stats.value.achievements.filter(a => a.earned)
})

const unearnedAchievements = computed(() => {
  return stats.value.achievements.filter(a => !a.earned)
})

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="profile-container" :class="{ visible: isVisible }">
    <!-- Hero Section -->
    <section class="profile-hero">
      <div class="hero-background">
        <div class="gradient-orb orb-1"></div>
        <div class="gradient-orb orb-2"></div>
      </div>
      
      <div class="profile-header">
        <div class="avatar-section">
          <div class="avatar-circle">
            <span class="avatar-emoji">{{ user.avatar }}</span>
          </div>
          <div class="avatar-badge">Aktywny</div>
        </div>
        
        <div class="user-info">
          <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
          <p class="user-username">@{{ user.username }}</p>
          <div class="user-meta">
            <span class="meta-item">
              <span class="meta-icon">📅</span>
              Dołączył: {{ user.registrationDate }}
            </span>
            <span class="meta-item">
              <span class="meta-icon">⏱️</span>
              Ostatnia aktywność: {{ stats.lastActive }}
            </span>
          </div>
        </div>
      </div>

      <div class="quick-stats">
        <div class="quick-stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-value">{{ stats.totalTests }}</div>
          <div class="stat-label">Testów ukończono</div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-value">{{ stats.averageScore }}%</div>
          <div class="stat-label">Średni wynik</div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-value">{{ stats.currentStreak }}</div>
          <div class="stat-label">Aktualny streak</div>
        </div>
        <div class="quick-stat-card">
          <div class="stat-icon">🏆</div>
          <div class="stat-value">{{ stats.maxStreak }}</div>
          <div class="stat-label">Rekord streak</div>
        </div>
      </div>
    </section>

    <!-- Navigation Tabs -->
    <div class="tabs-navigation">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'overview' }"
        @click="activeTab = 'overview'"
      >
        <span class="tab-icon">📊</span>
        <span>Przegląd</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'statistics' }"
        @click="activeTab = 'statistics'"
      >
        <span class="tab-icon">📈</span>
        <span>Statystyki</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'achievements' }"
        @click="activeTab = 'achievements'"
      >
        <span class="tab-icon">🏆</span>
        <span>Osiągnięcia</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        <span class="tab-icon">⚙️</span>
        <span>Ustawienia</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="tab-panel">
        <div class="content-grid">
          <!-- Category Statistics -->
          <div class="content-section full-width">
            <h2 class="section-title">
              <span class="title-icon">📚</span>
              Statystyki według kategorii
            </h2>
            <div class="category-stats-grid">
              <div 
                v-for="category in stats.categoryStats" 
                :key="category.name"
                class="category-stat-card"
              >
                <div class="category-header">
                  <span class="category-icon">{{ category.icon }}</span>
                  <h3 class="category-name">{{ category.name }}</h3>
                </div>
                <div class="category-progress">
                  <div class="progress-info">
                    <span class="progress-label">Ukończono</span>
                    <span class="progress-value">{{ category.completed }} testów</span>
                  </div>
                  <div class="progress-bar">
                    <div 
                      class="progress-fill" 
                      :style="{ width: category.average + '%', background: category.color }"
                    ></div>
                  </div>
                  <div class="average-score">
                    Średnia: <strong>{{ category.average }}%</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Tests -->
          <div class="content-section full-width">
            <h2 class="section-title">
              <span class="title-icon">⏱️</span>
              Ostatnie testy
            </h2>
            <div class="recent-tests-list">
              <div 
                v-for="test in stats.recentTests" 
                :key="test.id"
                class="test-item"
              >
                <div class="test-info">
                  <div class="test-name">{{ test.name }}</div>
                  <div class="test-date">{{ test.date }}</div>
                </div>
                <div class="test-score" :class="{ 
                  'excellent': test.score >= 90,
                  'good': test.score >= 75 && test.score < 90,
                  'needs-improvement': test.score < 75
                }">
                  {{ test.score }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistics Tab -->
      <div v-if="activeTab === 'statistics'" class="tab-panel">
        <div class="stats-overview">
          <div class="stat-box">
            <div class="stat-box-icon">⏱️</div>
            <div class="stat-box-content">
              <div class="stat-box-value">{{ stats.totalTime }}</div>
              <div class="stat-box-label">Całkowity czas nauki</div>
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-box-icon">📊</div>
            <div class="stat-box-content">
              <div class="stat-box-value">{{ stats.averageScore }}%</div>
              <div class="stat-box-label">Średnia ze wszystkich testów</div>
            </div>
          </div>
          <div class="stat-box">
            <div class="stat-box-icon">🎯</div>
            <div class="stat-box-content">
              <div class="stat-box-value">{{ stats.maxStreak }}</div>
              <div class="stat-box-label">Maksymalny streak poprawnych</div>
            </div>
          </div>
        </div>

        <div class="detailed-stats">
          <h3 class="stats-subtitle">Szczegółowa analiza</h3>
          <div class="category-comparison">
            <div 
              v-for="category in stats.categoryStats" 
              :key="category.name"
              class="comparison-item"
            >
              <div class="comparison-header">
                <span class="comparison-icon">{{ category.icon }}</span>
                <span class="comparison-name">{{ category.name }}</span>
              </div>
              <div class="comparison-bars">
                <div class="comparison-bar">
                  <span class="bar-label">Ukończone</span>
                  <div class="bar-wrapper">
                    <div 
                      class="bar-fill" 
                      :style="{ 
                        width: (category.completed / stats.totalTests * 100) + '%',
                        background: category.color 
                      }"
                    ></div>
                  </div>
                  <span class="bar-value">{{ category.completed }}</span>
                </div>
                <div class="comparison-bar">
                  <span class="bar-label">Średnia</span>
                  <div class="bar-wrapper">
                    <div 
                      class="bar-fill" 
                      :style="{ 
                        width: category.average + '%',
                        background: category.color 
                      }"
                    ></div>
                  </div>
                  <span class="bar-value">{{ category.average }}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements Tab -->
      <div v-if="activeTab === 'achievements'" class="tab-panel">
        <div class="achievements-section">
          <div class="achievements-header">
            <h2 class="section-title">
              <span class="title-icon">🏆</span>
              Twoje osiągnięcia
            </h2>
            <div class="achievements-progress">
              {{ earnedAchievements.length }} / {{ stats.achievements.length }} odblokowanych
            </div>
          </div>

          <div class="achievements-grid">
            <div 
              v-for="achievement in earnedAchievements" 
              :key="achievement.id"
              class="achievement-card earned"
            >
              <div class="achievement-icon">{{ achievement.icon }}</div>
              <h3 class="achievement-name">{{ achievement.name }}</h3>
              <p class="achievement-description">{{ achievement.description }}</p>
              <div class="achievement-badge">Odblokowane ✓</div>
            </div>
          </div>

          <h3 class="locked-title">Do odblokowania</h3>
          <div class="achievements-grid locked-section">
            <div 
              v-for="achievement in unearnedAchievements" 
              :key="achievement.id"
              class="achievement-card locked"
            >
              <div class="achievement-icon">🔒</div>
              <h3 class="achievement-name">{{ achievement.name }}</h3>
              <p class="achievement-description">{{ achievement.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Tab -->
      <div v-if="activeTab === 'settings'" class="tab-panel">
        <div class="settings-section">
          <div class="settings-header">
            <h2 class="section-title">
              <span class="title-icon">⚙️</span>
              Ustawienia konta
            </h2>
            <button 
              v-if="!editMode"
              @click="startEdit" 
              class="edit-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke-width="2" stroke-linecap="round"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Edytuj
            </button>
          </div>

          <div class="settings-group">
            <h3 class="settings-group-title">Informacje podstawowe</h3>
            
            <div class="setting-item">
              <label class="setting-label">Imię</label>
              <input 
                v-if="editMode"
                type="text" 
                class="setting-input" 
                v-model="editData.firstName" 
              />
              <input 
                v-else
                type="text" 
                class="setting-input" 
                :value="user.firstName" 
                readonly
              />
            </div>

            <div class="setting-item">
              <label class="setting-label">Nazwisko</label>
              <input 
                v-if="editMode"
                type="text" 
                class="setting-input" 
                v-model="editData.lastName" 
              />
              <input 
                v-else
                type="text" 
                class="setting-input" 
                :value="user.lastName" 
                readonly
              />
            </div>

            <div class="setting-item">
              <label class="setting-label">Nazwa użytkownika</label>
              <input 
                v-if="editMode"
                type="text" 
                class="setting-input" 
                v-model="editData.username" 
              />
              <input 
                v-else
                type="text" 
                class="setting-input" 
                :value="user.username" 
                readonly
              />
            </div>

            <div v-if="editMode" class="password-change-section">
              <h3 class="settings-group-title">Zmiana hasła (opcjonalnie)</h3>
              
              <div class="setting-item">
                <label class="setting-label">Nowe hasło</label>
                <input 
                  type="password" 
                  class="setting-input" 
                  v-model="editData.newPassword"
                  placeholder="Minimum 6 znaków"
                />
              </div>

              <div class="setting-item">
                <label class="setting-label">Potwierdź nowe hasło</label>
                <input 
                  type="password" 
                  class="setting-input" 
                  v-model="editData.confirmPassword"
                  placeholder="Powtórz nowe hasło"
                />
              </div>
            </div>

            <div v-if="editMode" class="edit-actions">
              <button @click="saveChanges" class="save-btn" :disabled="isLoading">
                <span v-if="!isLoading">Zapisz zmiany</span>
                <span v-else class="loading-spinner"></span>
              </button>
              <button @click="cancelEdit" class="cancel-btn">
                Anuluj
              </button>
            </div>
          </div>

          <div class="settings-group">
            <h3 class="settings-group-title">Klucz odzyskiwania</h3>
            
            <div class="setting-item">
              <label class="setting-label">Twój klucz</label>
              <div class="key-field">
                <input 
                  type="text" 
                  class="setting-input key-display" 
                  :value="showKey ? user.key : '••••-••••-••••-••••'" 
                  readonly
                />
                <button 
                  v-if="!showKey"
                  class="key-toggle-btn"
                  @click="toggleKeyInput"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" stroke-width="2"/>
                  </svg>
                  Pokaż klucz
                </button>
                <button 
                  v-else
                  class="key-toggle-btn"
                  @click="hideKey"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  Ukryj klucz
                </button>
                <button 
                  v-if="showKey"
                  class="copy-key-btn"
                  @click="copyKey"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
                  </svg>
                  Kopiuj
                </button>
              </div>

              <div v-if="showKeyInput" class="key-verify">
                <input 
                  type="password" 
                  class="setting-input" 
                  v-model="passwordInput"
                  placeholder="Wpisz hasło aby zobaczyć klucz"
                  @keyup.enter="verifyPassword"
                />
                <button class="verify-btn" @click="verifyPassword">Potwierdź</button>
                <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
              </div>

              <p class="key-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke-width="2"/>
                  <path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round"/>
                </svg>
                Zapisz ten klucz w bezpiecznym miejscu. Możesz go użyć do odzyskania dostępu do konta.
              </p>
            </div>
          </div>

          <div class="settings-group danger-zone">
            <h3 class="settings-group-title danger">Strefa niebezpieczna</h3>
            <button class="danger-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Usuń konto
            </button>
          </div>
        </div>
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

.profile-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.profile-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.profile-hero {
  position: relative;
  padding: 60px 0 40px;
  margin-bottom: 40px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  border-radius: 24px;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(60px);
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -100px;
  left: -50px;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -100px;
  right: -50px;
  animation-delay: -10s;
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

.profile-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 40px;
  padding: 40px;
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 24px;
}

.avatar-section {
  position: relative;
  flex-shrink: 0;
}

.avatar-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid var(--color-bg);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
}

.avatar-emoji {
  font-size: 3.5rem;
}

.avatar-badge {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 16px;
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.user-info {
  flex: 1;
}

.user-name {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 8px;
}

.user-username {
  font-size: 1.1rem;
  color: var(--color-subtext);
  margin-bottom: 16px;
}

.user-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.meta-icon {
  font-size: 1.2rem;
}

.quick-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.quick-stat-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.quick-stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-shadow);
  border-color: rgba(102, 126, 234, 0.3);
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
  font-weight: 500;
}

/* Tabs Navigation */
.tabs-navigation {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  padding: 8px;
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: var(--color-subtext);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-text);
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.tab-icon {
  font-size: 1.2rem;
}

/* Tab Content */
.tab-content {
  min-height: 400px;
}

.tab-panel {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.content-grid {
  display: grid;
  gap: 32px;
}

.content-section {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
}

.full-width {
  grid-column: 1 / -1;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.title-icon {
  font-size: 1.8rem;
}

.category-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.category-stat-card {
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
}

.category-stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px var(--color-shadow);
  border-color: rgba(102, 126, 234, 0.3);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.category-icon {
  font-size: 2rem;
}

.category-name {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
}

.category-progress {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.progress-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.progress-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 0.6s ease;
}

.average-score {
  font-size: 0.95rem;
  color: var(--color-text);
  text-align: center;
}

.average-score strong {
  color: #667eea;
  font-size: 1.1rem;
}

.recent-tests-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.test-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.test-item:hover {
  background: rgba(102, 126, 234, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.test-info {
  flex: 1;
}

.test-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 4px;
}

.test-date {
  font-size: 0.85rem;
  color: var(--color-subtext);
}

.test-score {
  font-size: 1.4rem;
  font-weight: 800;
  padding: 8px 20px;
  border-radius: 8px;
}

.test-score.excellent {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.test-score.good {
  background: rgba(59, 130, 246, 0.15);
  color: #3b82f6;
}

.test-score.needs-improvement {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

/* Statistics Tab */
.stats-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.stat-box {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.stat-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-shadow);
}

.stat-box-icon {
  font-size: 3rem;
}

.stat-box-content {
  flex: 1;
}

.stat-box-value {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-box-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.detailed-stats {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
}

.stats-subtitle {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 24px;
}

.category-comparison {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.comparison-item {
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 12px;
}

.comparison-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.comparison-icon {
  font-size: 1.8rem;
}

.comparison-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.comparison-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comparison-bar {
  display: grid;
  grid-template-columns: 100px 1fr 80px;
  align-items: center;
  gap: 12px;
}

.bar-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
  font-weight: 600;
}

.bar-wrapper {
  height: 12px;
  background: var(--color-border);
  border-radius: 8px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 8px;
  transition: width 0.6s ease;
}

.bar-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
  text-align: right;
}

/* Achievements Tab */
.achievements-section {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
}

.achievements-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.achievements-progress {
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  color: #667eea;
  font-weight: 700;
  font-size: 0.95rem;
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.achievement-card {
  padding: 24px;
  border: 2px solid var(--color-border);
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.achievement-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
}

.achievement-card:hover::before {
  opacity: 1;
}

.achievement-card.earned {
  border-color: rgba(102, 126, 234, 0.4);
  background: rgba(102, 126, 234, 0.05);
}

.achievement-card.earned:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.achievement-card.locked {
  opacity: 0.6;
  background: rgba(0, 0, 0, 0.02);
}

.achievement-icon {
  font-size: 3.5rem;
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.achievement-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
}

.achievement-description {
  font-size: 0.9rem;
  color: var(--color-subtext);
  line-height: 1.5;
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.achievement-badge {
  display: inline-block;
  padding: 6px 16px;
  background: linear-gradient(135deg, #22c55e, #059669);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 12px;
  position: relative;
  z-index: 1;
}

.locked-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-subtext);
  margin-bottom: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
}

/* Settings Tab */
.settings-section {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.edit-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.edit-btn svg {
  width: 18px;
  height: 18px;
}

.settings-group {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--color-border);
}

.settings-group:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.settings-group-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
}

.settings-group-title.danger {
  color: #ef4444;
}

.setting-item {
  margin-bottom: 20px;
}

.setting-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.setting-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--color-bg);
  transition: all 0.3s ease;
}

.setting-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.setting-input:read-only {
  background: rgba(0, 0, 0, 0.02);
  cursor: not-allowed;
}

.password-change-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.edit-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.save-btn {
  flex: 1;
  padding: 14px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.save-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.cancel-btn {
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

.key-field {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}

.key-display {
  flex: 1;
  min-width: 200px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.key-toggle-btn,
.copy-key-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.key-toggle-btn:hover,
.copy-key-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
}

.key-toggle-btn svg,
.copy-key-btn svg {
  width: 16px;
  height: 16px;
}

.key-verify {
  margin-top: 12px;
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px dashed rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.verify-btn {
  padding: 10px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.verify-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.3);
}

.error-message {
  width: 100%;
  padding: 8px 12px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 600;
  margin-top: 8px;
}

.key-hint {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  margin-top: 12px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 3px solid #667eea;
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--color-text);
  line-height: 1.5;
}

.key-hint svg {
  width: 20px;
  height: 20px;
  color: #667eea;
  flex-shrink: 0;
  margin-top: 2px;
}

.danger-zone {
  border-color: rgba(239, 68, 68, 0.3);
}

.danger-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #ef4444;
  border-radius: 12px;
  color: #ef4444;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.danger-btn:hover {
  background: #ef4444;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
}

.danger-btn svg {
  width: 18px;
  height: 18px;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-container {
    padding: 0 16px 40px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    padding: 24px;
  }

  .user-name {
    font-size: 2rem;
  }

  .user-meta {
    justify-content: center;
  }

  .quick-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .tabs-navigation {
    padding: 6px;
  }

  .tab-button {
    padding: 10px 16px;
    font-size: 0.85rem;
  }

  .tab-icon {
    font-size: 1rem;
  }

  .content-section {
    padding: 20px;
  }

  .category-stats-grid {
    grid-template-columns: 1fr;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }

  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .comparison-bar {
    grid-template-columns: 80px 1fr 60px;
    font-size: 0.85rem;
  }

  .edit-actions {
    flex-direction: column;
  }

  .key-field {
    flex-direction: column;
    align-items: stretch;
  }

  .key-display {
    min-width: 100%;
  }
}

@media (max-width: 480px) {
  .profile-hero {
    padding: 40px 0 30px;
  }

  .avatar-circle {
    width: 100px;
    height: 100px;
  }

  .avatar-emoji {
    font-size: 3rem;
  }

  .user-name {
    font-size: 1.6rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .content-section {
    padding: 16px;
  }

  .settings-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .key-verify {
    flex-direction: column;
  }

  .key-verify .setting-input {
    width: 100%;
  }

  .verify-btn {
    width: 100%;
  }
}
</style>