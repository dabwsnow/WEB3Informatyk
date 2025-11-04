<script setup>
import { ref } from 'vue'
import QualificationList from '../tests/QualificationList.vue'

const qualifications = ref([
  {
    id: 'inf02',
    name: 'INF.02',
    title: 'Administracja systemami komputerowymi',
    icon: '🖥️',
    color: '#667eea',
    category: 'Technik informatyk',
    description: 'Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych',
    archives: Array(28).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `INF.02-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(68600 / 28) 
    }))
  },
  {
    id: 'ee08',
    name: 'EE.08',
    title: 'Montaż i eksploatacja systemów komputerowych',
    icon: '🔧',
    color: '#f59e0b',
    category: 'Technik informatyk (stara podstawa)',
    description: 'Montaż, uruchamianie i konserwacja komputerów oraz urządzeń peryferyjnych',
    archives: Array(30).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `EE.08-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(76500 / 30) 
    }))
  },
  {
    id: 'e12',
    name: 'E.12',
    title: 'Montaż i eksploatacja komputerów osobistych',
    icon: '💻',
    color: '#06b6d4',
    category: 'Technik informatyk (bardzo stara podstawa)',
    description: 'Montaż komputerów osobistych oraz instalacja systemów i programów użytkowych',
    archives: Array(63).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `E.12-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(264600 / 63) 
    }))
  },
  {
    id: 'e13',
    name: 'E.13',
    title: 'Projektowanie lokalnych sieci komputerowych',
    icon: '🌐',
    color: '#8b5cf6',
    category: 'Technik informatyk (bardzo stara podstawa)',
    description: 'Projektowanie lokalnych sieci komputerowych i administrowanie sieciami',
    archives: Array(68).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `E.13-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(302600 / 68) 
    }))
  },
  {
    id: 'inf03',
    name: 'INF.03',
    title: 'Tworzenie i administrowanie stronami',
    icon: '💾',
    color: '#10b981',
    category: 'Technik programista',
    description: 'Tworzenie i administrowanie stronami i aplikacjami internetowymi oraz bazami danych',
    archives: Array(49).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `INF.03-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(171500 / 49) 
    }))
  },
  {
    id: 'ee09',
    name: 'EE.09',
    title: 'Programowanie aplikacji internetowych',
    icon: '🌍',
    color: '#ec4899',
    category: 'Technik programista (stara podstawa)',
    description: 'Tworzenie aplikacji internetowych i baz danych oraz administrowanie bazami',
    archives: Array(45).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `EE.09-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(148500 / 45) 
    }))
  },
  {
    id: 'e14',
    name: 'E.14',
    title: 'Tworzenie aplikacji internetowych i baz danych',
    icon: '📊',
    color: '#f43f5e',
    category: 'Technik programista (bardzo stara podstawa)',
    description: 'Tworzenie aplikacji internetowych, baz danych i administrowanie bazami danych',
    archives: Array(79).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `E.14-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(395000 / 79) 
    }))
  },
  {
    id: 'inf04',
    name: 'INF.04',
    title: 'Projektowanie, programowanie i testowanie aplikacji',
    icon: '📱',
    color: '#a855f7',
    category: 'Technik programista',
    description: 'Projektowanie, programowanie i testowanie aplikacji desktopowych i mobilnych',
    archives: Array(13).fill(null).map((_, i) => ({ 
      id: i + 1, 
      code: `INF.04-${String(i + 1).padStart(2, '0')}`, 
      downloaded: Math.floor(22100 / 13) 
    }))
  }
])
</script>

<template>
  <div class="courses-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Arkusze praktyczne</h1>
        <p class="page-subtitle">Pobierz i przećwicz zadania z prawdziwych egzaminów zawodowych</p>
      </div>
      <div class="header-stats">
        <div class="stat-card">
          <div class="stat-number">{{ qualifications.length }}</div>
          <div class="stat-label">Profili</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">{{ qualifications.reduce((sum, q) => sum + q.archives.length, 0) }}</div>
          <div class="stat-label">Arkuszy</div>
        </div>
      </div>
    </div>

    <div class="info-card">
      <div class="info-icon">📋</div>
      <div class="info-content">
        <h3>Część praktyczna egzaminu zawodowego</h3>
        <div class="info-details">
          <div class="info-item">
            <span class="info-label">⏱️ Czas trwania:</span>
            <span class="info-value">120-240 minut</span>
          </div>
          <div class="info-item">
            <span class="info-label">✅ Wymagane minimum:</span>
            <span class="info-value">75% punktów</span>
          </div>
        </div>
        <p class="info-description">Każdy arkusz zawiera zadania praktyczne z poprzednich sesji egzaminacyjnych wraz z przykładowymi rozwiązaniami</p>
      </div>
    </div>

    <div class="filter-section">
      <h2 class="section-title">Wybierz kwalifikację</h2>
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
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 40px;
}

.header-content {
  flex: 1;
}

.page-title {
  font-size: 3.5rem;
  font-weight: 900;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 12px;
  letter-spacing: -1px;
}

.page-subtitle {
  font-size: 1.25rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.header-stats {
  display: flex;
  gap: 16px;
}

.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 32px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
  font-weight: 600;
}

.info-card {
  display: flex;
  gap: 24px;
  padding: 28px;
  background: var(--color-card-bg);
  border: 2px solid var(--color-border);
  border-radius: 20px;
  margin-bottom: 48px;
}

.info-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.info-content {
  flex: 1;
}

.info-content h3 {
  font-size: 1.4rem;
  color: var(--color-text);
  margin-bottom: 16px;
  font-weight: 700;
}

.info-details {
  display: flex;
  gap: 32px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-label {
  font-weight: 600;
  color: var(--color-subtext);
  font-size: 0.95rem;
}

.info-value {
  font-weight: 700;
  color: #667eea;
  font-size: 0.95rem;
}

.info-description {
  font-size: 1rem;
  color: var(--color-subtext);
  line-height: 1.6;
}

.filter-section {
  margin-bottom: 32px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 16px;
}

.filter-tags {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 10px 20px;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-tag:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.filter-tag.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
}

@media (max-width: 1024px) {
  .page-header {
    flex-direction: column;
    gap: 24px;
  }

  .header-stats {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .courses-page {
    padding: 30px 16px;
  }

  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }

  .stat-card {
    padding: 16px 24px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .info-card {
    flex-direction: column;
    padding: 24px;
  }

  .info-details {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 2rem;
  }

  .header-stats {
    flex-direction: column;
    width: 100%;
  }

  .stat-card {
    width: 100%;
  }
}
</style>