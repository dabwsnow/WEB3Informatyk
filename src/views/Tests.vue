```vue
<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('all')
const searchQuery = ref('')

const categories = ref([
  { id: 'all', name: 'Wszystkie', icon: '📚', count: 15 }, // 3 теста × 5 категорий
  { id: 'inf02', name: 'INF.02 / EE.08', icon: '🖥️', count: 3 }, // 3 теста
  { id: 'inf03', name: 'INF.03 / EE.09', icon: '💾', count: 3 },
  { id: 'inf04', name: 'INF.04 / E.14', icon: '📱', count: 3 },
  { id: 'e12', name: 'E.12', icon: '🔌', count: 3 },
  { id: 'e13', name: 'E.13', icon: '⚡', count: 3 }
])

const testTypes = ref([
  // INF.02 / EE.08
  {
    id: 1,
    title: 'Test 40 pytań INF.02 / EE.08',
    category: 'inf02',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test teoretyczny z administracji systemami i sieciami',
    topics: ['Systemy', 'Sieci', 'Bezpieczeństwo']
  },
  {
    id: 2,
    title: 'Test 20 pytań INF.02 / EE.08',
    category: 'inf02',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test teoretyczny z administracji',
    topics: ['Sieci', 'Konfiguracja', 'Administracja']
  },
  {
    id: 3,
    title: 'Losowe pytanie INF.02 / EE.08',
    category: 'inf02',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie do szybkiej weryfikacji wiedzy',
    topics: ['Losowy temat']
  },
  // INF.03 / EE.09
  {
    id: 4,
    title: 'Test 40 pytań INF.03 / EE.09',
    category: 'inf03',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z tworzenia aplikacji webowych i baz danych',
    topics: ['HTML/CSS', 'JavaScript', 'SQL']
  },
  {
    id: 5,
    title: 'Test 20 pytań INF.03 / EE.09',
    category: 'inf03',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z tworzenia stron i baz danych',
    topics: ['PHP', 'Bazy danych', 'Aplikacje webowe']
  },
  {
    id: 6,
    title: 'Losowe pytanie INF.03 / EE.09',
    category: 'inf03',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z tworzenia aplikacji',
    topics: ['Losowy temat']
  },
  // INF.04 / E.14
  {
    id: 7,
    title: 'Test 40 pytań INF.04 / E.14',
    category: 'inf04',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z projektowania i programowania aplikacji',
    topics: ['Programowanie', 'UX/UI', 'Testowanie']
  },
  {
    id: 8,
    title: 'Test 20 pytań INF.04 / E.14',
    category: 'inf04',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z programowania aplikacji',
    topics: ['Aplikacje mobilne', 'Testy', 'UI']
  },
  {
    id: 9,
    title: 'Losowe pytanie INF.04 / E.14',
    category: 'inf04',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z programowania',
    topics: ['Losowy temat']
  },
  // E.12 - Montaż i eksploatacja komputerów i urządzeń peryferyjnych
  {
    id: 10,
    title: 'Test 40 pytań E.12',
    category: 'e12',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z montażu i eksploatacji komputerów i urządzeń peryferyjnych',
    topics: ['Montaż', 'Eksploatacja', 'Diagnostyka', 'Sprzęt']
  },
  {
    id: 11,
    title: 'Test 20 pytań E.12',
    category: 'e12',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z montażu sprzętu komputerowego',
    topics: ['Komputery', 'Urządzenia', 'Naprawa']
  },
  {
    id: 12,
    title: 'Losowe pytanie E.12',
    category: 'e12',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z eksploatacji sprzętu',
    topics: ['Losowy temat']
  },
  // E.13 - Programowanie, przygotowanie i eksploatacja urządzeń i systemów mechatronicznych
  {
    id: 13,
    title: 'Test 40 pytań E.13',
    category: 'e13',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z programowania i eksploatacji systemów mechatronicznych',
    topics: ['Programowanie', 'Mechatronika', 'Systemy', 'Eksploatacja']
  },
  {
    id: 14,
    title: 'Test 20 pytań E.13',
    category: 'e13',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z urządzeń mechatronicznych',
    topics: ['Urządzenia', 'Systemy', 'Programowanie']
  },
  {
    id: 15,
    title: 'Losowe pytanie E.13',
    category: 'e13',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z mechatroniki',
    topics: ['Losowy temat']
  }
])

const filteredTests = computed(() => {
  let result = testTypes.value
  if (selectedCategory.value !== 'all') {
    result = result.filter(test => test.category === selectedCategory.value)
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
</script>

<template>
  <div class="tests-page">
    <div class="page-header">
      <div class="header-content">
        <h1 class="page-title">Testy egzaminacyjne</h1>
        <p class="page-subtitle">Ponad 900 pytań teoretycznych</p>
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
    <div class="tests-grid">
      <div
        v-for="test in filteredTests"
        :key="test.id"
        class="test-card"
      >
        <div class="test-badge badge-theoretical">
          Część teoretyczna
        </div>
        <h3 class="test-title">{{ test.title }}</h3>
        <p class="test-description">{{ test.description }}</p>
        <div class="test-topics">
          <span v-for="(topic, index) in test.topics" :key="index" class="topic-tag">
            {{ topic }}
          </span>
        </div>
        <div class="test-stats">
          <div class="stat-item">
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ test.questions }} pytań</span>
          </div>
          <div class="stat-item">
            <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>{{ test.time }} min</span>
          </div>
        </div>
        <button class="start-test-btn">
          <span>Rozpocznij test</span>
          <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="filteredTests.length === 0" class="no-results">
      <svg class="no-results-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" stroke-width="2"/>
        <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
        <line x1="8" y1="11" x2="14" y2="11" stroke-width="2" stroke-linecap="round"/>
      </svg>
      <h3>Nie znaleziono testów</h3>
      <p>Spróbuj zmienić kryteria wyszukiwania</p>
    </div>
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
  color: var(--color-subtext);
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
  color: var(--color-subtext);
  pointer-events: none;
}
.search-input {
  width: 100%;
  padding: 16px 20px 16px 52px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  font-size: 1rem;
  color: var(--color-text);
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;
}
.search-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.search-input::placeholder {
  color: var(--color-subtext);
  opacity: 0.6;
}
.categories-filter {
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
  background: var(--color-bg);
  border-radius: 4px;
}
.categories-filter::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 4px;
  border: 1px solid var(--color-bg);
}
.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  flex-shrink: 0;
}
.category-btn:hover {
  background: var(--color-bg-hover);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}
.category-btn.active {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  border-color: rgba(102, 126, 234, 0.5);
  color: var(--color-text);
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
  color: var(--color-text);
  margin-bottom: 12px;
}
.info-content p {
  font-size: 0.95rem;
  color: var(--color-text);
  margin-bottom: 8px;
  line-height: 1.5;
}
.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
}
.test-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  position: relative;
}
.test-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 16px 48px var(--color-shadow);
}
.test-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 16px;
  width: fit-content;
}
.badge-theoretical {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}
.test-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
}
.test-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin-bottom: 20px;
}
.test-topics {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}
.topic-tag {
  padding: 6px 12px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--color-text);
}
.test-stats {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}
.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-subtext);
  font-size: 0.9rem;
}
.stat-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}
.start-test-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 28px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  margin-top: auto;
}
.start-test-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}
.btn-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}
.start-test-btn:hover .btn-arrow {
  transform: translateX(4px);
}
.no-results {
  text-align: center;
  padding: 80px 20px;
}
.no-results-icon {
  width: 64px;
  height: 64px;
  color: var(--color-subtext);
  opacity: 0.5;
  margin-bottom: 20px;
}
.no-results h3 {
  font-size: 1.5rem;
  color: var(--color-text);
  margin-bottom: 8px;
}
.no-results p {
  color: var(--color-subtext);
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
  .tests-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .test-card {
    padding: 24px 20px;
  }
  .test-title {
    font-size: 1.3rem;
  }
}
@media (max-width: 480px) {
  .page-title {
    font-size: 1.8rem;
  }
  .test-stats {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
```