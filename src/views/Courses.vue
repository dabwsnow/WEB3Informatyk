<script setup>
import { ref } from 'vue'

const qualifications = ref([
  {
    id: 'inf02',
    name: 'INF.02 / EE.08',
    title: 'Administracja systemami komputerowymi',
    icon: '🖥️',
    color: '#667eea',
    description: 'Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych',
    archives: [
      { id: 1, code: 'INF.02-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 1245 },
      { id: 2, code: 'INF.02-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 2130 },
      { id: 3, code: 'INF.02-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 3456 },
      { id: 4, code: 'INF.02-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 2890 },
      { id: 5, code: 'INF.02-05-22.06', date: 'Czerwiec 2022', type: 'Egzamin główny', downloaded: 4120 },
      { id: 6, code: 'INF.02-06-22.01', date: 'Styczeń 2022', type: 'Egzamin główny', downloaded: 3780 },
      { id: 7, code: 'INF.02-07-21.06', date: 'Czerwiec 2021', type: 'Egzamin główny', downloaded: 5230 },
      { id: 8, code: 'INF.02-08-21.01', date: 'Styczeń 2021', type: 'Egzamin główny', downloaded: 4560 },
    ]
  },
  {
    id: 'inf03',
    name: 'INF.03 / EE.09',
    title: 'Tworzenie aplikacji internetowych',
    icon: '💾',
    color: '#10b981',
    description: 'Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych',
    archives: [
      { id: 1, code: 'INF.03-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 2340 },
      { id: 2, code: 'INF.03-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 3120 },
      { id: 3, code: 'INF.03-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 4567 },
      { id: 4, code: 'INF.03-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 3890 },
      { id: 5, code: 'INF.03-05-22.06', date: 'Czerwiec 2022', type: 'Egzamin główny', downloaded: 5234 },
      { id: 6, code: 'INF.03-06-22.01', date: 'Styczeń 2022', type: 'Egzamin główny', downloaded: 4567 },
      { id: 7, code: 'INF.03-07-21.06', date: 'Czerwiec 2021', type: 'Egzamin główny', downloaded: 6123 },
      { id: 8, code: 'INF.03-08-21.01', date: 'Styczeń 2021', type: 'Egzamin główny', downloaded: 5432 },
      { id: 9, code: 'INF.03-09-20.06', date: 'Czerwiec 2020', type: 'Egzamin główny', downloaded: 7234 },
      { id: 10, code: 'INF.03-10-20.01', date: 'Styczeń 2020', type: 'Egzamin główny', downloaded: 6543 },
    ]
  },
  {
    id: 'inf04',
    name: 'INF.04',
    title: 'Projektowanie aplikacji',
    icon: '📱',
    color: '#8b5cf6',
    description: 'Projektowanie, programowanie i testowanie aplikacji desktopowych i mobilnych',
    archives: [
      { id: 1, code: 'INF.04-01-24.06', date: 'Czerwiec 2024', type: 'Egzamin główny', downloaded: 890 },
      { id: 2, code: 'INF.04-02-24.01', date: 'Styczeń 2024', type: 'Egzamin główny', downloaded: 1230 },
      { id: 3, code: 'INF.04-03-23.06', date: 'Czerwiec 2023', type: 'Egzamin główny', downloaded: 2345 },
      { id: 4, code: 'INF.04-04-23.01', date: 'Styczeń 2023', type: 'Egzamin główny', downloaded: 1890 },
      { id: 5, code: 'INF.04-05-22.06', date: 'Czerwiec 2022', type: 'Egzamin główny', downloaded: 2678 },
      { id: 6, code: 'INF.04-06-22.01', date: 'Styczeń 2022', type: 'Egzamin główny', downloaded: 2345 },
    ]
  }
])
const expandedCards = ref({})

const toggleCard = (id) => {
  expandedCards.value[id] = !expandedCards.value[id]
}
</script>

<template>
  <div class="courses-page">
    <div class="page-header">
      <h1 class="page-title">Arkusze praktyczne</h1>
      <p class="page-subtitle">Pobierz i przećwicz zadania z prawdziwych egzaminów zawodowych</p>
    </div>
    <div class="info-card">
      <div class="info-icon">📋</div>
      <div class="info-content">
        <h3>Część praktyczna egzaminu</h3>
        <p>Czas trwania: 120-240 minut | Wymagane minimum: 75% punktów</p>
        <p>Każdy arkusz zawiera zadania praktyczne z poprzednich sesji egzaminacyjnych wraz z przykładowymi rozwiązaniami</p>
      </div>
    </div>
    <div class="qualifications-grid">
      <div
        v-for="qual in qualifications"
        :key="qual.id"
        class="qualification-card"
        :style="{ borderColor: qual.color + '40' }"
      >
        <div class="qual-header" @click="toggleCard(qual.id)">
          <div class="qual-info">
            <div class="qual-icon" :style="{ background: qual.color + '20', color: qual.color }">
              {{ qual.icon }}
            </div>
            <div class="qual-text">
              <h2 class="qual-name">{{ qual.name }}</h2>
              <p class="qual-title">{{ qual.title }}</p>
            </div>
          </div>
          <button class="expand-btn" :class="{ expanded: expandedCards[qual.id] }">
            <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <p class="qual-description">{{ qual.description }}</p>
        <div class="archives-count">
          <svg class="count-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ qual.archives.length }} arkuszy dostępnych</span>
        </div>
        <transition name="expand">
          <div v-if="expandedCards[qual.id]" class="archives-list">
            <div
              v-for="archive in qual.archives"
              :key="archive.id"
              class="archive-item"
            >
              <div class="archive-info">
                <div class="archive-header">
                  <span class="archive-code">{{ archive.code }}</span>
                  <span class="archive-badge">{{ archive.type }}</span>
                </div>
                <div class="archive-meta">
                  <span class="archive-date">
                    <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                      <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/>
                      <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round"/>
                      <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
                    </svg>
                    {{ archive.date }}
                  </span>
                  <span class="archive-downloads">
                    <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    {{ archive.downloaded }}
                  </span>
                </div>
              </div>
              <div class="archive-actions">
                <button class="action-btn view-btn">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2"/>
                  </svg>
                  Arkusz
                </button>
                <button class="action-btn download-btn" :style="{ background: qual.color, borderColor: qual.color }">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Pobierz
                </button>
                <button class="action-btn view-solved-btn">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2"/>
                  </svg>
                  Arkusz Rozwiązany
                </button>
                <button class="action-btn download-solved-btn" :style="{ background: qual.color, borderColor: qual.color }">
                  <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Pobierz Rozwiązany
                </button>
              </div>
            </div>
          </div>
        </transition>
        <button
          class="show-archives-btn"
          @click="toggleCard(qual.id)"
          :style="{ background: qual.color + '15', color: qual.color, borderColor: qual.color + '30' }"
        >
          {{ expandedCards[qual.id] ? 'Zwiń listę' : 'Pokaż arkusze' }}
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
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

.courses-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 40px;
}

.page-title {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
}

.page-subtitle {
  font-size: 1.2rem;
  color: var(--color-subtext);
}

.info-card {
  display: flex;
  gap: 20px;
  padding: 24px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  margin-bottom: 40px;
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-content h3 {
  font-size: 1.2rem;
  color: var(--color-text);
  margin-bottom: 8px;
}

.info-content p {
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 4px;
  line-height: 1.5;
}

.qualifications-grid {
  display: grid;
  gap: 32px;
}

.qualification-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 2px solid;
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.qualification-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px var(--color-shadow);
}

.qual-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
}

.qual-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.qual-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.qual-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.qual-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text);
}

.qual-title {
  font-size: 1rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.expand-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.expand-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.expand-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text);
  transition: transform 0.3s ease;
}

.expand-btn.expanded .expand-icon {
  transform: rotate(180deg);
}

.qual-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin-bottom: 20px;
}

.archives-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-bg-hover);
  border-radius: 12px;
  margin-bottom: 20px;
  color: var(--color-text);
  font-weight: 600;
}

.count-icon {
  width: 20px;
  height: 20px;
}

.archives-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  transition: all 0.3s ease;
  gap: 20px;
}

.archive-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.archive-info {
  flex: 1;
  min-width: 0;
}

.archive-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.archive-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: 'Courier New', monospace;
}

.archive-badge {
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.archive-meta {
  display: flex;
  gap: 20px;
  color: var(--color-subtext);
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.archive-date,
.archive-downloads {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.archive-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid;
  white-space: nowrap;
}

.view-btn,
.view-solved-btn {
  background: var(--color-bg);
  color: var(--color-text);
  border-color: var(--color-border);
}

.view-btn:hover,
.view-solved-btn:hover {
  background: var(--color-bg-hover);
}

.download-btn,
.download-solved-btn {
  color: white;
}

.download-btn:hover,
.download-solved-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.show-archives-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1.5px solid;
  margin-top: 20px;
}

.show-archives-btn:hover {
  transform: translateY(-2px);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}

@media (max-width: 768px) {
  .courses-page {
    padding: 30px 16px;
  }
  .page-title {
    font-size: 2rem;
  }
  .page-subtitle {
    font-size: 1rem;
  }
  .info-card {
    flex-direction: column;
    padding: 20px;
  }
  .qualification-card {
    padding: 24px 20px;
  }
  .qual-info {
    gap: 16px;
  }
  .qual-icon {
    width: 56px;
    height: 56px;
    font-size: 1.8rem;
  }
  .qual-name {
    font-size: 1.4rem;
  }
  .qual-title {
    font-size: 0.9rem;
  }
  .archive-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }
  .archive-actions {
    width: 100%;
    flex-direction: column;
  }
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  .qual-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .expand-btn {
    align-self: flex-end;
  }
  .archive-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>