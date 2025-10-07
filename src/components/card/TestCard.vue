<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  tests: {
    type: Array,
    required: true,
    default: () => []
  }
})

const filteredTests = computed(() => {
  return props.tests
})

const startTest = (test) => {
  console.log('Kliknięto test:', test.category, 'Type:', test.type)
  
  // Если это база вопросов, перенаправляем на /baza/
  if (test.type === 'database' || test.category.endsWith('-baza')) {
    console.log('Przekierowanie do bazy:', `/baza/${test.category}`)
    router.push(`/baza/${test.category}`)
  } else {
    console.log('Przekierowanie do testu:', `/tests/${test.category}`)
    router.push(`/tests/${test.category}`)
  }
}
</script>

<template>
  <div class="tests-grid">
    <div
      v-for="test in filteredTests"
      :key="test.id"
      class="test-card"
    >
      <div class="test-badge" :class="test.type === 'database' ? 'badge-database' : 'badge-theoretical'">
        {{ test.type === 'database' ? 'Baza pytań' : 'Część teoretyczna' }}
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
        <div v-if="test.time > 0" class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ test.time }} min</span>
        </div>
      </div>
      <button @click="startTest(test)" class="start-test-btn">
        <span>{{ test.type === 'database' ? 'Przeglądaj bazę' : 'Rozpocznij test' }}</span>
        <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
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
.tests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
}

.test-card {
  background: var(--color-bg, #ffffff);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border, #e0e0e0);
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
  box-shadow: 0 16px 48px var(--color-shadow, rgba(0, 0, 0, 0.1));
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

.badge-database {
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
}

.test-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text, #333333);
  margin-bottom: 12px;
}

.test-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext, #666666);
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
  background: var(--color-bg-hover, #f5f5f5);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 8px;
  font-size: 0.85rem;
  color: var(--color-text, #333333);
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
  color: var(--color-subtext, #666666);
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
  grid-column: 1 / -1;
}

.no-results-icon {
  width: 64px;
  height: 64px;
  color: var(--color-subtext, #666666);
  opacity: 0.5;
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.5rem;
  color: var(--color-text, #333333);
  margin-bottom: 8px;
}

.no-results p {
  color: var(--color-subtext, #666666);
}

@media (max-width: 768px) {
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
  .test-stats {
    flex-direction: column;
    gap: 12px;
  }
}
</style>