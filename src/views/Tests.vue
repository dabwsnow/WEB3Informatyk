<script setup>
import { ref, computed } from 'vue'
import TestCards from '../components/card/TestCard.vue'

const selectedCategory = ref('all')
const searchQuery = ref('')
const categories = ref([
  { id: 'all', name: 'Wszystkie', icon: '📚', count: 20 },
  { id: 'inf02', name: 'INF.02 / EE.08', icon: '🖥️', count: 4 },
  { id: 'inf03', name: 'INF.03 / EE.09', icon: '💾', count: 4 },
  { id: 'inf04', name: 'INF.04 / E.14', icon: '📱', count: 4 },
  { id: 'e12', name: 'E.12', icon: '🔌', count: 4 },
  { id: 'e13', name: 'E.13', icon: '⚡', count: 4 }
])
const testTypes = ref([
  {
    id: 1,
    title: 'Test 40 pytań INF.02 / EE.08',
    category: 'inf02-40',
    categoryGroup: 'inf02',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test teoretyczny z administracji systemami i sieciami',
    topics: ['Systemy', 'Sieci', 'Bezpieczeństwo']
  },
  {
    id: 2,
    title: 'Test 20 pytań INF.02 / EE.08',
    category: 'inf02-20',
    categoryGroup: 'inf02',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test teoretyczny z administracji',
    topics: ['Sieci', 'Konfiguracja', 'Administracja']
  },
  {
    id: 3,
    title: 'Losowe pytanie INF.02 / EE.08',
    category: 'inf02-1',
    categoryGroup: 'inf02',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie do szybkiej weryfikacji wiedzy',
    topics: ['Losowy temat']
  },
  {
    id: 4,
    title: 'Baza pytań INF.02 / EE.08',
    category: 'inf02-baza',
    categoryGroup: 'inf02',
    type: 'database',
    questions: 900,
    time: 0,
    description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
    topics: ['Wszystkie tematy', 'Z odpowiedziami']
  },
  {
    id: 5,
    title: 'Test 40 pytań INF.03 / EE.09',
    category: 'inf03-40',
    categoryGroup: 'inf03',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z tworzenia aplikacji webowych i baz danych',
    topics: ['HTML/CSS', 'JavaScript', 'SQL']
  },
  {
    id: 6,
    title: 'Test 20 pytań INF.03 / EE.09',
    category: 'inf03-20',
    categoryGroup: 'inf03',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z tworzenia stron i baz danych',
    topics: ['PHP', 'Bazy danych', 'Aplikacje webowe']
  },
  {
    id: 7,
    title: 'Losowe pytanie INF.03 / EE.09',
    category: 'inf03-1',
    categoryGroup: 'inf03',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z tworzenia aplikacji',
    topics: ['Losowy temat']
  },
  {
    id: 8,
    title: 'Baza pytań INF.03 / EE.09',
    category: 'inf03-baza',
    categoryGroup: 'inf03',
    type: 'database',
    questions: 900,
    time: 0,
    description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
    topics: ['Wszystkie tematy', 'Z odpowiedziami']
  },
  {
    id: 9,
    title: 'Test 40 pytań INF.04 / E.14',
    category: 'inf04-40',
    categoryGroup: 'inf04',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z projektowania i programowania aplikacji',
    topics: ['Programowanie', 'UX/UI', 'Testowanie']
  },
  {
    id: 10,
    title: 'Test 20 pytań INF.04 / E.14',
    category: 'inf04-20',
    categoryGroup: 'inf04',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z programowania aplikacji',
    topics: ['Aplikacje mobilne', 'Testy', 'UI']
  },
  {
    id: 11,
    title: 'Losowe pytanie INF.04 / E.14',
    category: 'inf04-1',
    categoryGroup: 'inf04',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z programowania',
    topics: ['Losowy temat']
  },
  {
    id: 12,
    title: 'Baza pytań INF.04 / E.14',
    category: 'inf04-baza',
    categoryGroup: 'inf04',
    type: 'database',
    questions: 900,
    time: 0,
    description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
    topics: ['Wszystkie tematy', 'Z odpowiedziami']
  },
  {
    id: 13,
    title: 'Test 40 pytań E.12',
    category: 'e12-40',
    categoryGroup: 'e12',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z montażu i eksploatacji komputerów i urządzeń peryferyjnych',
    topics: ['Montaż', 'Eksploatacja', 'Diagnostyka', 'Sprzęt']
  },
  {
    id: 14,
    title: 'Test 20 pytań E.12',
    category: 'e12-20',
    categoryGroup: 'e12',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z montażu sprzętu komputerowego',
    topics: ['Komputery', 'Urządzenia', 'Naprawa']
  },
  {
    id: 15,
    title: 'Losowe pytanie E.12',
    category: 'e12-1',
    categoryGroup: 'e12',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z eksploatacji sprzętu',
    topics: ['Losowy temat']
  },
  {
    id: 16,
    title: 'Baza pytań E.12',
    category: 'e12-baza',
    categoryGroup: 'e12',
    type: 'database',
    questions: 900,
    time: 0,
    description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
    topics: ['Wszystkie tematy', 'Z odpowiedziami']
  },
  {
    id: 17,
    title: 'Test 40 pytań E.13',
    category: 'e13-40',
    categoryGroup: 'e13',
    type: 'theoretical',
    questions: 40,
    time: 60,
    description: 'Pełny test z programowania i eksploatacji systemów mechatronicznych',
    topics: ['Programowanie', 'Mechatronika', 'Systemy', 'Eksploatacja']
  },
  {
    id: 18,
    title: 'Test 20 pytań E.13',
    category: 'e13-20',
    categoryGroup: 'e13',
    type: 'theoretical',
    questions: 20,
    time: 30,
    description: 'Krótki test z urządzeń mechatronicznych',
    topics: ['Urządzenia', 'Systemy', 'Programowanie']
  },
  {
    id: 19,
    title: 'Losowe pytanie E.13',
    category: 'e13-1',
    categoryGroup: 'e13',
    type: 'theoretical',
    questions: 1,
    time: 5,
    description: 'Jedno losowe pytanie z mechatroniki',
    topics: ['Losowy temat']
  },
  {
    id: 20,
    title: 'Baza pytań E.13',
    category: 'e13-baza',
    categoryGroup: 'e13',
    type: 'database',
    questions: 900,
    time: 0,
    description: 'Wszystkie pytania z odpowiedziami i wyszukiwarką',
    topics: ['Wszystkie tematy', 'Z odpowiedziami']
  }
])

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
    <TestCards :tests="filteredTests" />
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