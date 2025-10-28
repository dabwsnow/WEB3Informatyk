<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../services/api'

const router = useRouter()
const searchQuery = ref('')
const isFocused = ref(false)
const searchInput = ref(null)
const searchContainer = ref(null)
const isSearching = ref(false)

// Результаты из API
const searchResults = ref({
  questions: [],
  tests: [],
  practices: []
})

// Debounce для поиска
let searchTimeout = null

watch(searchQuery, (newQuery) => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  
  if (newQuery.trim().length < 2) {
    searchResults.value = { questions: [], tests: [], practices: [] }
    return
  }
  
  searchTimeout = setTimeout(async () => {
    await performSearch(newQuery)
  }, 300)
})

const performSearch = async (query) => {
  if (!query || query.trim().length < 2) return
  
  try {
    isSearching.value = true
    const results = await api.search(query.trim())
    searchResults.value = results
  } catch (error) {
    console.error('Ошибка поиска:', error)
    searchResults.value = { questions: [], tests: [], practices: [] }
  } finally {
    isSearching.value = false
  }
}

const hasResults = computed(() => {
  return searchResults.value.questions.length > 0 || 
         searchResults.value.tests.length > 0 ||
         searchResults.value.practices.length > 0
})

const showDropdown = computed(() => {
  return isFocused.value && searchQuery.value.trim()
})

const goToQuestion = (question) => {
  router.push(`/baza/${question.category}`)
  closeSearch()
}

const goToTest = (test) => {
  if (test.type === 'database') {
    router.push(`/baza/${test.category}`)
  } else {
    router.push(`/tests/${test.category}`)
  }
  closeSearch()
}

const goToPractice = (practice) => {
  if (practice.type === 'archive') {
    // Переход к профилю (можно позже сделать прокрутку к архиву)
    router.push(`/courses/${practice.profile_id}`)
  } else {
    // Переход к профилю
    router.push(`/courses/${practice.profile_id}`)
  }
  closeSearch()
}

const closeSearch = () => {
  isFocused.value = false
  searchQuery.value = ''
}

const handleClickOutside = (e) => {
  if (searchContainer.value && !searchContainer.value.contains(e.target)) {
    isFocused.value = false
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    closeSearch()
    searchInput.value?.blur()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="searchContainer" class="global-search-container">
    <div class="search-wrapper" :class="{ focused: isFocused, 'has-results': showDropdown }">
      <div class="search-box">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8" stroke-width="2"/>
          <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <input
          ref="searchInput"
          v-model="searchQuery"
          @focus="isFocused = true"
          type="text"
          placeholder="Szukaj pytań, testów, arkuszy praktycznych..."
          class="search-input"
        />
        <button v-if="searchQuery" @click="closeSearch" class="clear-search-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <transition name="dropdown">
        <div v-if="showDropdown" class="search-dropdown">
          <div class="dropdown-content">
            <!-- Loading -->
            <div v-if="isSearching" class="search-loading">
              <div class="spinner"></div>
              <p>Szukam...</p>
            </div>

            <!-- No Results -->
            <div v-else-if="!hasResults" class="no-results-dropdown">
              <svg class="no-results-icon-small" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" stroke-width="2"/>
                <path d="M21 21l-4.35-4.35" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p>Nie znaleziono "{{ searchQuery }}"</p>
            </div>

            <!-- Results -->
            <template v-else>
              <!-- Praktyki -->
              <div v-if="searchResults.practices.length > 0" class="dropdown-section">
                <div class="section-header">
                  <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>Praktyka</span>
                </div>
                <div
                  v-for="practice in searchResults.practices"
                  :key="practice.id"
                  @click="goToPractice(practice)"
                  class="dropdown-item practice-item"
                  :style="{ '--practice-color': practice.color }"
                >
                  <div class="item-icon practice-icon">{{ practice.icon }}</div>
                  <div class="item-content">
                    <div class="item-title">{{ practice.title }}</div>
                    <div class="item-meta">
                      <span class="item-badge practice-badge">{{ practice.category }}</span>
                      <span v-if="practice.subtitle" class="item-info">{{ practice.subtitle }}</span>
                      <span v-if="practice.archives_count" class="item-info">{{ practice.archives_count }} arkuszy</span>
                    </div>
                  </div>
                  <svg class="item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <!-- Pytania -->
              <div v-if="searchResults.questions.length > 0" class="dropdown-section">
                <div class="section-header">
                  <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>Pytania</span>
                </div>
                <div
                  v-for="question in searchResults.questions"
                  :key="question.id"
                  @click="goToQuestion(question)"
                  class="dropdown-item"
                >
                  <div class="item-icon question-icon">{{ question.icon || '?' }}</div>
                  <div class="item-content">
                    <div class="item-title">{{ question.question }}</div>
                    <span class="item-badge">{{ question.categoryName }}</span>
                  </div>
                  <svg class="item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>

              <!-- Testy -->
              <div v-if="searchResults.tests.length > 0" class="dropdown-section">
                <div class="section-header">
                  <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke-width="2"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke-width="2"/>
                  </svg>
                  <span>Testy i Bazy</span>
                </div>
                <div
                  v-for="test in searchResults.tests"
                  :key="test.id"
                  @click="goToTest(test)"
                  class="dropdown-item"
                >
                  <div class="item-icon test-icon">
                    {{ test.icon || (test.type === 'database' ? '📚' : '📝') }}
                  </div>
                  <div class="item-content">
                    <div class="item-title">{{ test.title }}</div>
                    <div class="item-meta">
                      <span class="item-badge">{{ test.categoryName }}</span>
                      <span class="item-info">{{ test.questions }} pytań</span>
                    </div>
                  </div>
                  <svg class="item-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </template>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.global-search-container {
  position: relative;
  width: 100%;
}

.search-wrapper {
  position: relative;
  width: 100%;
  transition: all 0.3s ease;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 2px solid transparent;
  border-radius: 16px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.search-box::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1), rgba(240, 147, 251, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.search-wrapper.focused .search-box {
  background: var(--color-bg, #fff);
  border-color: rgba(102, 126, 234, 0.5);
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
}

.search-wrapper.focused .search-box::before {
  opacity: 1;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
  flex-shrink: 0;
  z-index: 1;
  transition: all 0.3s ease;
}

.search-wrapper.focused .search-icon {
  transform: scale(1.1);
}

.search-loading {
  text-align: center;
  padding: 40px 20px;
}

.spinner {
  width: 40px;
  height: 40px;
  margin: 0 auto 12px;
  border: 3px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.search-loading p {
  color: var(--color-subtext, #666);
  font-size: 0.9rem;
}

.practice-item {
  border-left: 3px solid var(--practice-color);
}

.practice-icon {
  background: transparent !important;
  font-size: 1.8rem !important;
}

.practice-badge {
  background: var(--practice-color) !important;
  color: white !important;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  background: transparent;
  z-index: 1;
}

.search-input::placeholder {
  color: var(--color-subtext, #666);
  opacity: 0.7;
}

.clear-search-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  z-index: 1;
}

.clear-search-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.clear-search-btn svg {
  width: 14px;
  height: 14px;
  color: #ef4444;
}

.search-kbd {
  padding: 4px 8px;
  background: rgba(102, 126, 234, 0.1);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
  color: #667eea;
  font-family: monospace;
  flex-shrink: 0;
  z-index: 1;
}

.search-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  right: 0;
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
  max-height: 500px;
  backdrop-filter: blur(20px);
}

.dropdown-content {
  max-height: 500px;
  overflow-y: auto;
  padding: 8px;
}

.dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.dropdown-content::-webkit-scrollbar-track {
  background: transparent;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #667eea, #764ba2);
  border-radius: 3px;
}

.no-results-dropdown {
  text-align: center;
  padding: 40px 20px;
}

.no-results-icon-small {
  width: 40px;
  height: 40px;
  color: var(--color-subtext, #666);
  opacity: 0.3;
  margin: 0 auto 12px;
}

.no-results-dropdown p {
  color: var(--color-subtext, #666);
  font-size: 0.9rem;
}

.dropdown-section {
  margin-bottom: 12px;
}

.dropdown-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--color-subtext, #666);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-icon {
  width: 14px;
  height: 14px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dropdown-item:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08), rgba(118, 75, 162, 0.08));
  transform: translateX(4px);
}

.item-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  flex-shrink: 0;
  font-weight: 700;
}

.question-icon {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  color: #667eea;
  font-size: 1.1rem;
}

.test-icon {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(16, 185, 129, 0.15));
  font-size: 1.2rem;
}

.item-content {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text, #333);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.item-badge {
  padding: 2px 8px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  color: #667eea;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 600;
}

.item-info {
  font-size: 0.75rem;
  color: var(--color-subtext, #666);
}

.item-arrow {
  width: 16px;
  height: 16px;
  color: var(--color-subtext, #666);
  flex-shrink: 0;
  opacity: 0;
  transition: all 0.2s ease;
}

.dropdown-item:hover .item-arrow {
  opacity: 1;
  transform: translateX(4px);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

@media (max-width: 768px) {
  .search-kbd {
    display: none;
  }
  
  .search-box {
    padding: 10px 14px;
  }
  
  .search-input {
    font-size: 0.9rem;
  }
  
  .search-dropdown {
    max-height: 400px;
  }
  
  .dropdown-content {
    max-height: 400px;
  }
}
</style>