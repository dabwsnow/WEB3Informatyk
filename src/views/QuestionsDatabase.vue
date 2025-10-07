<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const category = computed(() => route.params.category)
const searchQuery = ref('')

// База вопросов для каждой категории
const questionsDatabase = {
  'inf02-baza': {
    name: 'INF.02 / EE.08',
    title: 'Baza pytań - Administracja i eksploatacja systemów',
    icon: '🖥️',
    questions: [
      {
        id: 1,
        question: 'Który protokół jest używany do bezpiecznego przesyłania plików?',
        image: null,
        answers: [
          { id: 'a', text: 'FTP', correct: false },
          { id: 'b', text: 'SFTP', correct: true },
          { id: 'c', text: 'HTTP', correct: false },
          { id: 'd', text: 'SMTP', correct: false }
        ],
        explanation: 'SFTP (SSH File Transfer Protocol) zapewnia bezpieczne szyfrowane połączenie do przesyłania plików.'
      },
      {
        id: 2,
        question: 'Jaka jest domyślna maska podsieci dla klasy C?',
        image: null,
        answers: [
          { id: 'a', text: '255.0.0.0', correct: false },
          { id: 'b', text: '255.255.0.0', correct: false },
          { id: 'c', text: '255.255.255.0', correct: true },
          { id: 'd', text: '255.255.255.255', correct: false }
        ],
        explanation: 'Klasa C ma domyślną maskę 255.255.255.0, co daje 254 użyteczne adresy host w sieci.'
      },
      {
        id: 3,
        question: 'Który port używa protokół HTTPS?',
        image: null,
        answers: [
          { id: 'a', text: '80', correct: false },
          { id: 'b', text: '443', correct: true },
          { id: 'c', text: '8080', correct: false },
          { id: 'd', text: '22', correct: false }
        ],
        explanation: 'HTTPS używa portu 443 do bezpiecznej komunikacji HTTP z szyfrowaniem SSL/TLS.'
      }
    ]
  },
  'inf03-baza': {
    name: 'INF.03 / EE.09',
    title: 'Baza pytań - Tworzenie aplikacji webowych',
    icon: '💾',
    questions: [
      {
        id: 1,
        question: 'Która właściwość CSS służy do zmiany koloru tekstu?',
        image: null,
        answers: [
          { id: 'a', text: 'background-color', correct: false },
          { id: 'b', text: 'color', correct: true },
          { id: 'c', text: 'text-color', correct: false },
          { id: 'd', text: 'font-color', correct: false }
        ],
        explanation: 'Właściwość "color" w CSS służy do ustawiania koloru tekstu elementu.'
      },
      {
        id: 2,
        question: 'Która metoda HTTP jest używana do wysyłania danych formularza?',
        image: null,
        answers: [
          { id: 'a', text: 'GET', correct: false },
          { id: 'b', text: 'POST', correct: true },
          { id: 'c', text: 'PUT', correct: false },
          { id: 'd', text: 'DELETE', correct: false }
        ],
        explanation: 'POST jest standardową metodą do wysyłania danych formularza.'
      },
      {
        id: 3,
        question: 'Co oznacza SQL?',
        image: null,
        answers: [
          { id: 'a', text: 'Structured Query Language', correct: true },
          { id: 'b', text: 'Simple Query Language', correct: false },
          { id: 'c', text: 'Standard Question Language', correct: false },
          { id: 'd', text: 'System Query List', correct: false }
        ],
        explanation: 'SQL to Structured Query Language - język strukturalnych zapytań używany do zarządzania bazami danych.'
      }
    ]
  },
  'inf04-baza': {
    name: 'INF.04 / E.14',
    title: 'Baza pytań - Programowanie aplikacji',
    icon: '📱',
    questions: [
      {
        id: 1,
        question: 'Która funkcja w JavaScript służy do wyświetlania komunikatu w konsoli?',
        image: null,
        answers: [
          { id: 'a', text: 'alert()', correct: false },
          { id: 'b', text: 'console.log()', correct: true },
          { id: 'c', text: 'print()', correct: false },
          { id: 'd', text: 'display()', correct: false }
        ],
        explanation: 'console.log() wyświetla informacje w konsoli przeglądarki.'
      },
      {
        id: 2,
        question: 'Co to jest JSON?',
        image: null,
        answers: [
          { id: 'a', text: 'JavaScript Object Notation', correct: true },
          { id: 'b', text: 'Java Standard Object Notation', correct: false },
          { id: 'c', text: 'JavaScript Ordered Network', correct: false },
          { id: 'd', text: 'Java Source Object Node', correct: false }
        ],
        explanation: 'JSON to lekki format wymiany danych, łatwy do odczytu zarówno dla ludzi jak i maszyn.'
      }
    ]
  },
  'e12-baza': {
    name: 'E.12',
    title: 'Baza pytań - Montaż i eksploatacja komputerów',
    icon: '🔌',
    questions: [
      {
        id: 1,
        question: 'Która magistrala jest używana do podłączania dysków SSD?',
        image: null,
        answers: [
          { id: 'a', text: 'PCI', correct: false },
          { id: 'b', text: 'AGP', correct: false },
          { id: 'c', text: 'SATA', correct: true },
          { id: 'd', text: 'ISA', correct: false }
        ],
        explanation: 'SATA to standard interfejsu do podłączania dysków.'
      },
      {
        id: 2,
        question: 'Ile pinów ma złącze procesora Intel LGA 1200?',
        image: null,
        answers: [
          { id: 'a', text: '1150', correct: false },
          { id: 'b', text: '1151', correct: false },
          { id: 'c', text: '1200', correct: true },
          { id: 'd', text: '1700', correct: false }
        ],
        explanation: 'LGA 1200 to gniazdo z 1200 pinami.'
      }
    ]
  },
  'e13-baza': {
    name: 'E.13',
    title: 'Baza pytań - Projektowanie sieci',
    icon: '⚡',
    questions: [
      {
        id: 1,
        question: 'Jaki jest zakres adresów IP klasy A?',
        image: null,
        answers: [
          { id: 'a', text: '1.0.0.0 - 126.255.255.255', correct: true },
          { id: 'b', text: '128.0.0.0 - 191.255.255.255', correct: false },
          { id: 'c', text: '192.0.0.0 - 223.255.255.255', correct: false },
          { id: 'd', text: '224.0.0.0 - 239.255.255.255', correct: false }
        ],
        explanation: 'Klasa A obejmuje adresy od 1.0.0.0 do 126.255.255.255.'
      },
      {
        id: 2,
        question: 'Który protokół służy do automatycznego przydzielania adresów IP?',
        image: null,
        answers: [
          { id: 'a', text: 'DNS', correct: false },
          { id: 'b', text: 'DHCP', correct: true },
          { id: 'c', text: 'FTP', correct: false },
          { id: 'd', text: 'SMTP', correct: false }
        ],
        explanation: 'DHCP automatycznie przydziela adresy IP.'
      }
    ]
  }
}

const currentDatabase = computed(() => questionsDatabase[category.value] || null)

const filteredQuestions = computed(() => {
  if (!currentDatabase.value) return []
  
  if (!searchQuery.value.trim()) {
    return currentDatabase.value.questions
  }
  
  const query = searchQuery.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  return currentDatabase.value.questions.filter(q => {
    const questionText = q.question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const answersText = q.answers.map(a => a.text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')).join(' ')
    const explanationText = q.explanation.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    
    return questionText.includes(query) || answersText.includes(query) || explanationText.includes(query)
  })
})
</script>

<template>
  <div v-if="currentDatabase" class="database-view">
    <div class="database-header">
      <div class="header-info">
        <div class="category-badge">
          <span class="category-icon">{{ currentDatabase.icon }}</span>
          <span class="category-name">{{ currentDatabase.name }}</span>
        </div>
        <h1 class="database-title">{{ currentDatabase.title }}</h1>
        <p class="database-subtitle">
          {{ currentDatabase.questions.length }} pytań z odpowiedziami
        </p>
      </div>
    </div>

    <div class="search-section">
      <div class="search-box-large">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Szukaj pytania, odpowiedzi lub tematu..."
          class="search-input-large"
        />
        <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="results-count">
        Znaleziono: {{ filteredQuestions.length }} / {{ currentDatabase.questions.length }} pytań
      </div>
    </div>

    <div class="questions-list">
      <div
        v-for="(question, index) in filteredQuestions"
        :key="question.id"
        class="question-card"
      >
        <div class="question-number-badge">
          Pytanie {{ index + 1 }}
        </div>
        
        <h3 class="question-text">{{ question.question }}</h3>
        
        <div v-if="question.image" class="question-image">
          <img :src="question.image" alt="Grafika do pytania" />
        </div>
        
        <div class="answers-list">
          <div
            v-for="answer in question.answers"
            :key="answer.id"
            class="answer-item"
            :class="{ 'correct-answer': answer.correct }"
          >
            <div class="answer-marker">
              <span class="answer-letter">{{ answer.id.toUpperCase() }}</span>
              <svg v-if="answer.correct" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="answer-text">{{ answer.text }}</span>
          </div>
        </div>
        
        <div class="explanation-section">
          <div class="explanation-header">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <strong>Wyjaśnienie</strong>
          </div>
          <p>{{ question.explanation }}</p>
        </div>
      </div>
      
      <div v-if="filteredQuestions.length === 0" class="no-results">
        <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
          <line x1="8" y1="11" x2="14" y2="11" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3>Nie znaleziono pytań</h3>
        <p>Spróbuj zmienić frazę wyszukiwania</p>
      </div>
    </div>

    <button @click="$router.push('/tests')" class="back-button">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Wróć do listy testów
    </button>
  </div>

  <div v-else class="error-view">
    <h1>Nie znaleziono bazy pytań</h1>
    <p>Kategoria "{{ category }}" nie istnieje</p>
    <button @click="$router.push('/tests')" class="back-button">
      Wróć do listy testów
    </button>
  </div>
</template>

<style scoped>
.database-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.database-header {
  margin-bottom: 40px;
}

.header-info {
  text-align: center;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 12px;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 1.5rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.database-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-text, #333);
  margin-bottom: 12px;
}

.database-subtitle {
  font-size: 1.1rem;
  color: var(--color-subtext, #666);
}

.search-section {
  margin-bottom: 40px;
}

.search-box-large {
  position: relative;
  max-width: 800px;
  margin: 0 auto 16px;
}

.search-icon {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  color: var(--color-subtext, #666);
  pointer-events: none;
}

.search-input-large {
  width: 100%;
  padding: 20px 60px 20px 64px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 16px;
  font-size: 1.1rem;
  color: var(--color-text, #333);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.search-input-large:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.clear-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-hover, #f5f5f5);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #ef4444;
}

.clear-btn:hover svg {
  stroke: white;
}

.clear-btn svg {
  width: 18px;
  height: 18px;
}

.results-count {
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}

.question-card {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.question-card:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.question-number-badge {
  display: inline-block;
  padding: 6px 14px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 16px;
}

.question-text {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text, #333);
  margin-bottom: 20px;
  line-height: 1.5;
}

.question-image {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.question-image img {
  width: 100%;
  height: auto;
  display: block;
}

.answers-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.answer-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 20px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.answer-item.correct-answer {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.answer-marker {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.answer-letter {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
}

.check-icon {
  width: 24px;
  height: 24px;
  stroke: #22c55e;
  stroke-width: 3;
}

.answer-text {
  flex: 1;
  font-size: 1rem;
  color: var(--color-text, #333);
  line-height: 1.5;
}

.answer-item.correct-answer .answer-text {
  font-weight: 600;
}

.explanation-section {
  padding: 20px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 12px;
}

.explanation-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  color: #667eea;
  font-weight: 700;
}

.info-icon {
  width: 20px;
  height: 20px;
  stroke-width: 2;
}

.explanation-section p {
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
  margin: 0;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
}

.no-results-icon {
  width: 80px;
  height: 80px;
  color: var(--color-subtext, #666);
  opacity: 0.3;
  margin: 0 auto 24px;
}

.no-results h3 {
  font-size: 1.8rem;
  color: var(--color-text, #333);
  margin-bottom: 12px;
}

.no-results p {
  font-size: 1.1rem;
  color: var(--color-subtext, #666);
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0 auto;
  padding: 16px 32px;
  background: transparent;
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  color: var(--color-text, #333);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-button:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

.back-button svg {
  width: 20px;
  height: 20px;
}

.error-view {
  text-align: center;
  padding: 100px 20px;
}

.error-view h1 {
  font-size: 2.5rem;
  color: var(--color-text, #333);
  margin-bottom: 16px;
}

.error-view p {
  font-size: 1.2rem;
  color: var(--color-subtext, #666);
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .database-view {
    padding: 30px 16px;
  }

  .database-title {
    font-size: 1.6rem;
  }

  .database-subtitle {
    font-size: 1rem;
  }

  .search-input-large {
    padding: 16px 52px 16px 52px;
    font-size: 1rem;
  }

  .question-card {
    padding: 24px 20px;
  }

  .question-text {
    font-size: 1.1rem;
  }

  .answer-item {
    padding: 14px 16px;
  }

  .answer-letter {
    width: 28px;
    height: 28px;
    font-size: 0.85rem;
  }

  .answer-text {
    font-size: 0.95rem;
  }
}
</style>