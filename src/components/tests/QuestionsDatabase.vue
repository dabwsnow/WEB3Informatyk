<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '../../services/api'

const route = useRoute()
const category = computed(() => route.params.category)
const searchQuery = ref('')
const currentDatabase = ref(null)
const loading = ref(true)
const error = ref(null)
const highlightedQuestionId = ref(null)

// Маппинг категорий
const categoryMeta = {
  'inf02-baza': {
    name: 'INF.02 / EE.08',
    title: 'Baza pytań - Administracja i eksploatacja systemów',
    icon: '🖥️'
  },
  'inf03-baza': {
    name: 'INF.03 / EE.09 / E.14',
    title: 'Baza pytań - Tworzenie aplikacji webowych',
    icon: '💾'
  },
  'inf04-baza': {
    name: 'INF.04',
    title: 'Baza pytań - Programowanie aplikacji',
    icon: '📱'
  },
  'e12-baza': {
    name: 'E.12',
    title: 'Baza pytań - Montaż i eksploatacja komputerów',
    icon: '🔌'
  },
  'e13-baza': {
    name: 'E.13',
    title: 'Baza pytań - Projektowanie sieci',
    icon: '⚡'
  }
}

const filteredQuestions = computed(() => {
  if (!currentDatabase.value || !currentDatabase.value.questions) return []
  
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

// Функция прокрутки к вопросу
const scrollToQuestion = (questionId) => {
  nextTick(() => {
    const element = document.getElementById(`question-${questionId}`)
    if (element) {
      // Прокручиваем с отступом сверху
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Подсвечиваем вопрос
      highlightedQuestionId.value = questionId
      
      // Убираем подсветку через 3 секунды
      setTimeout(() => {
        highlightedQuestionId.value = null
      }, 3000)
    }
  })
}

// Загружаем данные при монтировании
onMounted(async () => {
  try {
    const meta = categoryMeta[category.value]
    if (!meta) {
      error.value = 'Kategoria nie znaleziona'
      loading.value = false
      return
    }

    const data = await api.getQuestionDatabase(category.value)
    
    // Преобразуем формат для совместимости
    const questions = data.questions.map(q => ({
      id: q.id,
      question: q.question,
      image: q.image,
      answers: q.answers.map(a => ({
        id: a.id,
        text: a.text,
        correct: a.id === q.correctAnswer
      })),
      explanation: q.explanation
    }))

    currentDatabase.value = {
      name: meta.name,
      title: meta.title,
      icon: meta.icon,
      questions: questions
    }
    
    // Проверяем, есть ли query параметр с ID вопроса
    const questionId = route.query.question
    if (questionId) {
      scrollToQuestion(parseInt(questionId))
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <!-- Индикатор загрузки -->
  <div v-if="loading" class="loading-view">
    <div class="spinner"></div>
    <p>Ładowanie bazy pytań...</p>
  </div>

  <!-- Ошибка -->
  <div v-else-if="error" class="error-view">
    <h1>Błąd</h1>
    <p>{{ error }}</p>
    <button @click="$router.push('/tests')" class="back-button">
      Wróć do listy testów
    </button>
  </div>

  <!-- База вопросов -->
  <div v-else-if="currentDatabase" class="database-view">
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
        :id="`question-${question.id}`"
        class="question-card"
        :class="{ 'highlighted': highlightedQuestionId === question.id }"
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

  <!-- Категория не найдена -->
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
  scroll-margin-top: 100px;
}

.question-card:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

/* Анимация подсветки вопроса */
.question-card.highlighted {
  animation: highlight-pulse 2s ease-in-out;
  border-color: #667eea !important;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2) !important;
}

@keyframes highlight-pulse {
  0% {
    background: var(--color-bg, #fff);
    transform: scale(1);
  }
  10% {
    background: rgba(102, 126, 234, 0.1);
    transform: scale(1.02);
  }
  20% {
    background: rgba(102, 126, 234, 0.15);
  }
  40% {
    background: rgba(102, 126, 234, 0.1);
  }
  60% {
    background: rgba(102, 126, 234, 0.05);
  }
  80% {
    background: rgba(102, 126, 234, 0.02);
  }
  100% {
    background: var(--color-bg, #fff);
    transform: scale(1);
  }
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

/* Стили для изображений */
.question-image {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border, #e0e0e0);
  background: #f9f9f9;
}

.question-image img {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
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

.loading-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-view p {
  font-size: 1.1rem;
  color: var(--color-subtext, #666);
}

/* Плавная прокрутка */
html {
  scroll-behavior: smooth;
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

  .question-image img {
    max-height: 300px;
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