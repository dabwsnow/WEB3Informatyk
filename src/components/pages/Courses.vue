<script setup>
import { ref } from 'vue'
import QualificationList from '../tests/QualificationList.vue'

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
    name: 'INF.03 / EE.09 / E.14',
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
    <QualificationList :qualifications="qualifications" />
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
  color: var(--color-subtext, #666666);
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
  color: var(--color-text, #333333);
  margin-bottom: 8px;
}

.info-content p {
  font-size: 0.95rem;
  color: var(--color-text, #333333);
  margin-bottom: 4px;
  line-height: 1.5;
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
}

@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
}
</style>