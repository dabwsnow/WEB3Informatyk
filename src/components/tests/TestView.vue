<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import TestQuestion from '../tests/TestQuestion.vue'
import { api } from '../../services/api'

const route = useRoute()
const category = computed(() => route.params.category)

const currentTest = ref(null)
const userAnswers = ref({})
const showResults = ref(false)
const timeLeft = ref(0)
const timerInterval = ref(null)
const loading = ref(true)
const error = ref(null)

// Определяем время в зависимости от категории
const getInitialTime = () => {
  const cat = category.value
  if (cat === 'wszystkie') return 300 * 60
  if (cat.endsWith('-40')) return 60 * 60
  if (cat.endsWith('-20')) return 30 * 60
  if (cat.endsWith('-1')) return 5 * 60
  return 60 * 60
}

// Проверяем является ли тест с 1 вопросом
const isSingleQuestion = computed(() => {
  return category.value.endsWith('-1')
})

const correctAnswersCount = computed(() => {
  if (!currentTest.value) return 0
  let count = 0
  currentTest.value.questions.forEach(q => {
    if (userAnswers.value[q.id] === q.correctAnswer) {
      count++
    }
  })
  return count
})

const scorePercentage = computed(() => {
  if (!currentTest.value) return 0
  return Math.round((correctAnswersCount.value / currentTest.value.questions.length) * 100)
})

const formatTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const startTimer = () => {
  timerInterval.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      finishTest()
    }
  }, 1000)
}

const selectAnswer = (questionId, answerId) => {
  userAnswers.value[questionId] = answerId
  
  if (isSingleQuestion.value) {
    setTimeout(() => {
      showResults.value = true
      clearInterval(timerInterval.value)
    }, 300)
  }
}

const nextRandomQuestion = async () => {
  userAnswers.value = {}
  showResults.value = false
  loading.value = true
  
  try {
    const data = await api.getTest(category.value)
    currentTest.value = data
    timeLeft.value = getInitialTime()
    startTimer()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

const finishTest = () => {
  showResults.value = true
  clearInterval(timerInterval.value)
  
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, 100)
}

// Загружаем тест при монтировании
onMounted(async () => {
  try {
    const data = await api.getTest(category.value)
    currentTest.value = data
    timeLeft.value = getInitialTime()
    startTimer()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div v-if="loading" class="loading-view">
    <div class="spinner"></div>
    <p>Ładowanie testu...</p>
  </div>

  <!-- Ошибка -->
  <div v-else-if="error" class="error-view">
    <h1>Błąd</h1>
    <p>{{ error }}</p>
    <button @click="$router.push('/tests')" class="back-btn">
      Wróć do listy testów
    </button>
  </div>

  <div v-else-if="currentTest" class="test-view">
    <div class="test-header">
      <div class="test-info">
        <div class="test-category">
          <span class="category-icon">{{ currentTest.icon }}</span>
          <span class="category-name">{{ currentTest.name }}</span>
        </div>
        <h1 class="test-title">{{ currentTest.title }}</h1>
      </div>
      <div class="test-timer" :class="{ warning: timeLeft < 300 }">
        <svg class="timer-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span class="timer-text">{{ formatTime }}</span>
      </div>
    </div>

    <div v-if="!showResults" class="test-content">
      <div class="progress-info">
        <div class="answered-count">
          Odpowiedziano: {{ Object.keys(userAnswers).length }} / {{ currentTest.questions.length }}
        </div>
      </div>

      <div class="all-questions">
        <TestQuestion
          v-for="(question, index) in currentTest.questions"
          :key="question.id"
          :question="question"
          :question-number="index + 1"
          :total-questions="currentTest.questions.length"
          :selected-answer="userAnswers[question.id]"
          @answer-selected="(answerId) => selectAnswer(question.id, answerId)"
        />
      </div>

      <div class="controls">
        <button
          v-if="!isSingleQuestion"
          @click="finishTest"
          class="control-btn finish-btn"
          :disabled="Object.keys(userAnswers).length < currentTest.questions.length"
        >
          Zakończ test
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 13l4 4L19 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="results-view">
      <!-- Для теста с 1 вопросом - компактный результат -->
      <div v-if="isSingleQuestion" class="single-question-result">
        <div class="result-card">
          <div class="result-icon" :class="{ correct: userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer }">
            <svg v-if="userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 13l4 4L19 7" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <h2 class="result-title">
            {{ userAnswers[currentTest.questions[0].id] === currentTest.questions[0].correctAnswer ? 'Poprawna odpowiedź!' : 'Błędna odpowiedź' }}
          </h2>
          
          <div class="question-review">
            <p class="question-text-review">{{ currentTest.questions[0].question }}</p>
            
            <!-- ДОБАВЛЕНО: Изображение в результате -->
            <div v-if="currentTest.questions[0].image" class="question-image-container">
              <img :src="currentTest.questions[0].image" :alt="`Grafika do pytania`" class="question-image" />
            </div>
            
            <div class="answers-review">
              <div
                v-for="answer in currentTest.questions[0].answers"
                :key="answer.id"
                class="answer-review"
                :class="{
                  correct: answer.id === currentTest.questions[0].correctAnswer,
                  selected: userAnswers[currentTest.questions[0].id] === answer.id,
                  incorrect: userAnswers[currentTest.questions[0].id] === answer.id && answer.id !== currentTest.questions[0].correctAnswer
                }"
              >
                <span class="answer-letter-small">{{ answer.id.toUpperCase() }}</span>
                <span>{{ answer.text }}</span>
              </div>
            </div>
            
            <div class="explanation-box">
              <strong>Wyjaśnienie:</strong> {{ currentTest.questions[0].explanation }}
            </div>
          </div>
          
          <div class="single-question-actions">
            <button @click="nextRandomQuestion" class="next-question-btn">
              Następne pytanie
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button @click="$router.push('/tests')" class="back-to-list-btn">
              Wróć do listy testów
            </button>
          </div>
        </div>
      </div>
      
      <!-- Для тестов с 20 и 40 вопросами - полный результат -->
      <div v-else>
        <div class="results-header">
          <div class="score-circle" :class="{ passed: scorePercentage >= 50 }">
            <div class="score-percentage">{{ scorePercentage }}%</div>
            <div class="score-label">{{ scorePercentage >= 50 ? 'Zaliczone!' : 'Niezaliczone' }}</div>
          </div>
          <div class="results-stats">
            <div class="stat">
              <div class="stat-value">{{ correctAnswersCount }}</div>
              <div class="stat-label">Poprawne odpowiedzi</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ currentTest.questions.length - correctAnswersCount }}</div>
              <div class="stat-label">Błędne odpowiedzi</div>
            </div>
            <div class="stat">
              <div class="stat-value">{{ currentTest.questions.length }}</div>
              <div class="stat-label">Wszystkie pytania</div>
            </div>
          </div>
        </div>

        <div class="results-questions">
          <h2>Przegląd odpowiedzi</h2>
          <div
            v-for="(question, index) in currentTest.questions"
            :key="question.id"
            class="result-question"
          >
            <div class="result-header">
              <span class="result-number">Pytanie {{ index + 1 }}</span>
              <span
                class="result-badge"
                :class="userAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'"
              >
                {{ userAnswers[question.id] === question.correctAnswer ? '✓ Poprawna' : '✗ Błędna' }}
              </span>
            </div>
            <p class="result-question-text">{{ question.question }}</p>
            
            <!-- ДОБАВЛЕНО: Изображение в результатах -->
            <div v-if="question.image" class="question-image-container">
              <img :src="question.image" :alt="`Grafika do pytania ${index + 1}`" class="question-image" />
            </div>
            
            <div class="result-answers">
              <div
                v-for="answer in question.answers"
                :key="answer.id"
                class="result-answer"
                :class="{
                  correct: answer.id === question.correctAnswer,
                  selected: userAnswers[question.id] === answer.id,
                  incorrect: userAnswers[question.id] === answer.id && answer.id !== question.correctAnswer
                }"
              >
                {{ answer.id.toUpperCase() }}. {{ answer.text }}
              </div>
            </div>
            <div class="result-explanation">
              <strong>Wyjaśnienie:</strong> {{ question.explanation }}
            </div>
          </div>
        </div>

        <button @click="$router.push('/tests')" class="back-btn">
          Wróć do listy testów
        </button>
      </div>
    </div>
  </div>

  <div v-else class="error-view">
    <h1>Nie znaleziono testu</h1>
    <p>Kategoria "{{ category }}" nie istnieje</p>
    <button @click="$router.push('/tests')" class="back-btn">
      Wróć do listy testów
    </button>
  </div>
</template>

<style scoped>
.test-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.test-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
  gap: 20px;
}

.test-info {
  flex: 1;
}

.test-category {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.category-icon {
  font-size: 2rem;
}

.category-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.test-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text, #333);
  line-height: 1.3;
}

.test-timer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text, #333);
}

.test-timer.warning {
  border-color: #ef4444;
  color: #ef4444;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.timer-icon {
  width: 24px;
  height: 24px;
}

.progress-info {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.answered-count {
  padding: 12px 24px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
}

.all-questions {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
}

.controls {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 16px;
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 32px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text, #333);
  cursor: pointer;
  transition: all 0.3s ease;
}

.control-btn:hover:not(:disabled) {
  border-color: #667eea;
  transform: translateY(-2px);
}

.control-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.control-btn svg {
  width: 20px;
  height: 20px;
}

.finish-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: transparent;
  color: white;
  padding: 16px 48px;
  font-size: 1.2rem;
}

.results-view {
  padding: 40px 20px;
}

.single-question-result {
  max-width: 800px;
  margin: 0 auto;
}

.result-card {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 20px;
  padding: 40px;
  text-align: center;
}

.result-icon {
  width: 100px;
  height: 100px;
  margin: 0 auto 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border: 4px solid #ef4444;
}

.result-icon.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
}

.result-icon svg {
  width: 50px;
  height: 50px;
  stroke-width: 3;
}

.result-icon.correct svg {
  stroke: #22c55e;
}

.result-icon:not(.correct) svg {
  stroke: #ef4444;
}

.result-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text, #333);
  margin-bottom: 30px;
}

.question-review {
  text-align: left;
  margin-bottom: 30px;
}

.question-text-review {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-text, #333);
  margin-bottom: 20px;
  line-height: 1.5;
}

.answers-review {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.answer-review {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 18px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
}

.answer-review.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  font-weight: 600;
}

.answer-review.incorrect {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.answer-letter-small {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.explanation-box {
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
  text-align: left;
}

.single-question-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
}

.next-question-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.next-question-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.next-question-btn svg {
  width: 20px;
  height: 20px;
}

.back-to-list-btn {
  width: 100%;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  color: var(--color-text, #333);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-to-list-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.results-header {
  text-align: center;
  margin-bottom: 60px;
}

.score-circle {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.2));
  border: 8px solid #ef4444;
  margin-bottom: 30px;
}

.score-circle.passed {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.2));
  border-color: #22c55e;
}

.score-percentage {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--color-text, #333);
}

.score-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-subtext, #666);
}

.results-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat {
  text-align: center;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 800;
  color: #667eea;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-subtext, #666);
  margin-top: 8px;
}

.results-questions h2 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 30px;
}

.result-question {
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 16px;
  padding: 28px;
  margin-bottom: 24px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.result-number {
  font-weight: 700;
  color: var(--color-subtext, #666);
}

.result-badge {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.result-badge.correct {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.result-badge.incorrect {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}

.result-question-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-text, #333);
  margin-bottom: 20px;
}

.result-answers {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.result-answer {
  padding: 14px 18px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 2px solid transparent;
  border-radius: 10px;
  font-size: 0.95rem;
}

.result-answer.correct {
  background: rgba(34, 197, 94, 0.1);
  border-color: #22c55e;
  font-weight: 600;
}

.result-answer.incorrect {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.result-explanation {
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  line-height: 1.6;
}

.back-btn {
  display: block;
  margin: 40px auto 0;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
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

.question-image-container {
  margin: 20px 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border, #e0e0e0);
  background: #f9f9f9;
}

.question-image {
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  display: block;
}

/* Адаптив для изображений */
@media (max-width: 768px) {
  .question-image {
    max-height: 300px;
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-view p {
  font-size: 1.1rem;
  color: var(--color-subtext, #666);
}

@media (max-width: 768px) {
  .test-header {
    flex-direction: column;
  }

  .test-timer {
    width: 100%;
    justify-content: center;
  }

  .test-title {
    font-size: 1.4rem;
  }

  .controls {
    flex-direction: column;
  }

  .control-btn {
    width: 100%;
    justify-content: center;
  }

  .finish-btn {
    margin-left: 0;
    padding: 16px 32px;
  }

  .results-stats {
    gap: 20px;
  }

  .score-circle {
    width: 160px;
    height: 160px;
  }

  .score-percentage {
    font-size: 2.8rem;
  }

  .result-card {
    padding: 30px 20px;
  }

  .result-icon {
    width: 80px;
    height: 80px;
  }

  .result-icon svg {
    width: 40px;
    height: 40px;
  }

  .result-title {
    font-size: 1.6rem;
  }
}
</style>