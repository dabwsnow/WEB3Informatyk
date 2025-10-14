<script setup>
import { ref, computed, onMounted } from 'vue'
import TestCards from '../card/TestCard.vue' // путь к TestCard
import { api } from '../../services/api' // путь к API

const selectedCategory = ref('all')
const searchQuery = ref('')
const loading = ref(true)
const error = ref(null)
const categoriesData = ref([])
const totalQuestions = ref(0)

const categories = computed(() => {
  const cats = [
    { 
      id: 'all', 
      name: 'Wszystkie', 
      icon: '📚', 
      count: categoriesData.value.reduce((sum, cat) => sum + cat.test_count, 0)
    }
  ]
  
  categoriesData.value.forEach(cat => {
    const categoryId = cat.code.toLowerCase().replace('.', '')
    cats.push({
      id: categoryId,
      name: cat.name,
      icon: cat.icon,
      count: cat.test_count
    })
  })
  
  return cats
})

const testTypes = computed(() => {
  const tests = []
  let testId = 1
  
  categoriesData.value.forEach(cat => {
    const categoryId = cat.code.toLowerCase().replace('.', '')
    const questionCount = cat.question_count
    
    tests.push({
      id: testId++,
      title: `Test 40 pytań ${cat.name}`,
      category: `${categoryId}-40`,
      categoryGroup: categoryId,
      type: 'theoretical',
      questions: Math.min(40, questionCount),
      time: 60,
      description: `Pełny test teoretyczny z ${cat.name}`,
      topics: ['Wszystkie tematy']
    })
    
    tests.push({
      id: testId++,
      title: `Test 20 pytań ${cat.name}`,
      category: `${categoryId}-20`,
      categoryGroup: categoryId,
      type: 'theoretical',
      questions: Math.min(20, questionCount),
      time: 30,
      description: `Krótki test teoretyczny z ${cat.name}`,
      topics: ['Wybrane tematy']
    })
    
    tests.push({
      id: testId++,
      title: `Losowe pytanie ${cat.name}`,
      category: `${categoryId}-1`,
      categoryGroup: categoryId,
      type: 'theoretical',
      questions: 1,
      time: 5,
      description: 'Jedno losowe pytanie do szybkiej weryfikacji wiedzy',
      topics: ['Losowy temat']
    })
    
    tests.push({
      id: testId++,
      title: `Baza pytań ${cat.name}`,
      category: `${categoryId}-baza`,
      categoryGroup: categoryId,
      type: 'database',
      questions: questionCount,
      time: 0,
      description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
      topics: ['Wszystkie tematy', 'Z odpowiedziami']
    })
  })
  
  return tests
})

const filteredTests = computed(() => {
  let result = testTypes.value
  
  if (selectedCategory.value !== 'all') {
    result = result.filter(test => test.categoryGroup === selectedCategory.value)
  }
  
  if (searchQuery.value) {
    const query = searchQuery.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    result = result.filter(test =>
      test.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query) ||
      test.description.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query) ||
      test.topics.some(topic => topic.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(query))
    )
  }
  
  return result
})

onMounted(async () => {
  try {
    const data = await api.getCategories()
    categoriesData.value = data.categories
    totalQuestions.value = data.total_questions
  } catch (err) {
    error.value = err.message
    console.error('Error loading categories:', err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
<div class="tests-page">
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading-view">
      <div class="spinner"></div>
      <p>Ładowanie testów...</p>
    </div>

    <!-- Ошибка -->
    <div v-else-if="error" class="error-view">
      <h1>Błąd</h1>
      <p>{{ error }}</p>
      <button @click="$router.push('/')" class="back-btn">
        Wróć do strony głównej
      </button>
    </div>

    <!-- Основной контент -->
    <template v-else>
      <div class="page-header">
        <div class="header-content">
          <h1 class="page-title">Testy egzaminacyjne</h1>
          <p class="page-subtitle">Ponad {{ totalQuestions }}+ pytań teoretycznych</p>
        </div>
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" stroke-width="2"/>
            <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Szukaj testu..."
            class="search-input"
          />
        </div>
      </div>
      
      <div class="categories-filter">
        <button
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
          class="category-btn"
          :class="{ active: selectedCategory === cat.id }"
        >
          <span class="cat-icon">{{ cat.icon }}</span>
          <span class="cat-name">{{ cat.name }}</span>
          <span class="cat-count">{{ cat.count }}</span>
        </button>
      </div>
      
      <div class="info-banner">
        <div class="info-icon">ℹ️</div>
        <div class="info-content">
          <h3>Jak wygląda egzamin?</h3>
          <p><strong>Część teoretyczna:</strong> 40 pytań (60 minut), 20 pytań (30 minut) lub 1 losowe pytanie (5 minut), minimum 50% do zdania</p>
        </div>
      </div>
      
      <TestCards :tests="filteredTests" />
    </template>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.tests-page {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 40px;
}

.header-content {
  margin-bottom: 30px;
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

.search-box {
  position: relative;
  max-width: 600px;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: var(--color-subtext, #666666);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: var(--color-bg, #ffffff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 14px;
  font-size: 1rem;
  color: var(--color-text, #333333);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.search-input::placeholder {
  color: var(--color-subtext, #666666);
  opacity: 0.6;
}

.categories-filter {
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.categories-filter::-webkit-scrollbar {
  height: 8px;
}

.categories-filter::-webkit-scrollbar-track {
  background: var(--color-bg, #ffffff);
  border-radius: 4px;
}

.categories-filter::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  border: 1px solid var(--color-bg, #ffffff);
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--color-bg, #ffffff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  color: var(--color-text, #333333);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-btn:hover {
  background: var(--color-bg-hover, #f5f5f5);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  border-color: rgba(102, 126, 234, 0.5);
  color: var(--color-text, #333333);
}

.cat-icon {
  font-size: 1.1rem;
}

.cat-count {
  padding: 2px 6px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 6px;
  font-size: 0.8rem;
}

.info-banner {
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
  margin-bottom: 12px;
}

.info-content p {
  font-size: 0.95rem;
  color: var(--color-text, #333333);
  margin-bottom: 8px;
  line-height: 1.5;
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

.back-btn {
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

@media (max-width: 768px) {
  .tests-page {
    padding: 30px 16px;
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .info-banner {
    flex-direction: column;
    padding: 20px;
  }

  .category-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
    gap: 6px;
  }

  .cat-icon {
    font-size: 1rem;
  }

  .cat-count {
    font-size: 0.75rem;
  }
}
</style>