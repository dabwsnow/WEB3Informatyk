<script setup>
import { ref } from 'vue'
import ArchiveCards from '../components/card/ArchiveCards.vue'

const props = defineProps({
  qualifications: {
    type: Array,
    required: true,
    default: () => []
  }
})

const expandedCards = ref({})

const toggleCard = (id) => {
  expandedCards.value[id] = !expandedCards.value[id]
}
</script>

<template>
  <div class="qualifications-grid">
    <div
      v-for="qual in qualifications"
      :key="qual.id"
      class="qualification-card"
      :style="{ borderColor: qual.color + '40' }"
    >
      <div class="qual-header" @click="toggleCard(qual.id)">
        <div class="qual-info">
          <div class="qual-icon" :style="{ background: qual.color + '20', color: qual.color }">
            {{ qual.icon }}
          </div>
          <div class="qual-text">
            <h2 class="qual-name">{{ qual.name }}</h2>
            <p class="qual-title">{{ qual.title }}</p>
          </div>
        </div>
        <button class="expand-btn" :class="{ expanded: expandedCards[qual.id] }" @click.stop="toggleCard(qual.id)">
          <svg class="expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <p class="qual-description">{{ qual.description }}</p>
      <div class="archives-count">
        <svg class="count-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ qual.archives.length }} arkuszy dostępnych</span>
      </div>
      <transition name="expand">
        <ArchiveCards v-if="expandedCards[qual.id]" :archives="qual.archives" :qual-color="qual.color" />
      </transition>
      <button
        class="show-archives-btn"
        @click="toggleCard(qual.id)"
        :style="{ background: qual.color + '15', color: qual.color, borderColor: qual.color + '30' }"
      >
        {{ expandedCards[qual.id] ? 'Zwiń listę' : 'Pokaż arkusze' }}
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.qualifications-grid {
  display: grid;
  gap: 32px;
}

.qualification-card {
  background: var(--color-bg, #ffffff);
  backdrop-filter: blur(12px);
  border: 2px solid;
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
}

.qualification-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px var(--color-shadow, rgba(0, 0, 0, 0.1));
}

.qual-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  cursor: pointer;
}

.qual-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.qual-icon {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.qual-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.qual-name {
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--color-text, #333333);
}

.qual-title {
  font-size: 1rem;
  color: var(--color-subtext, #666666);
  font-weight: 500;
}

.expand-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 1px solid var(--color-border, #e0e0e0);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.expand-btn:hover {
  background: rgba(102, 126, 234, 0.1);
}

.expand-icon {
  width: 20px;
  height: 20px;
  color: var(--color-text, #333333);
  transition: transform 0.3s ease;
}

.expand-btn.expanded .expand-icon {
  transform: rotate(180deg);
}

.qual-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-subtext, #666666);
  margin-bottom: 20px;
}

.archives-count {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--color-bg-hover, #f5f5f5);
  border-radius: 12px;
  margin-bottom: 20px;
  color: var(--color-text, #333333);
  font-weight: 600;
}

.count-icon {
  width: 20px;
  height: 20px;
}

.show-archives-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  max-width: 200px;
  margin: 20px auto 0;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1.5px solid;
}

.show-archives-btn:hover {
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.show-archives-btn.expanded .btn-icon {
  transform: rotate(180deg);
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 2000px;
}

@media (max-width: 768px) {
  .qualification-card {
    padding: 24px 20px;
  }

  .qual-info {
    gap: 16px;
  }

  .qual-icon {
    width: 56px;
    height: 56px;
    font-size: 1.8rem;
  }

  .qual-name {
    font-size: 1.4rem;
  }

  .qual-title {
    font-size: 0.9rem;
  }

  .show-archives-btn {
    padding: 10px 20px;
    max-width: 180px;
  }
}

@media (max-width: 480px) {
  .qual-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .expand-btn {
    align-self: flex-end;
  }

  .show-archives-btn {
    max-width: 160px;
  }
}
</style>