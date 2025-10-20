<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  qualifications: {
    type: Array,
    required: true,
    default: () => []
  }
})

const goToProfile = (qualId) => {
  router.push(`/courses/${qualId}`)
}
</script>

<template>
  <div class="qualifications-grid">
    <div
      v-for="qual in qualifications"
      :key="qual.id"
      class="qualification-card"
      :style="{ '--qual-color': qual.color }"
    >
      <div class="qual-header">
        <div class="qual-icon">
          {{ qual.icon }}
        </div>
        <div class="qual-text">
          <h2 class="qual-name">{{ qual.name }}</h2>
          <span class="qual-category">{{ qual.category }}</span>
        </div>
      </div>

      <p class="qual-title">{{ qual.title }}</p>
      <p class="qual-description">{{ qual.description }}</p>

      <div class="qual-stats">
        <div class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span><strong>{{ qual.archives.length }}</strong> arkuszy</span>
        </div>
        <div class="stat-item">
          <svg class="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span><strong>{{ qual.archives.reduce((sum, a) => sum + a.downloaded, 0).toLocaleString() }}</strong> pobrań</span>
        </div>
      </div>

      <button
        class="view-profile-btn"
        @click="goToProfile(qual.id)"
      >
        <span>Przejdź do profilu</span>
        <svg 
          class="btn-icon"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M5 12h14m-7-7l7 7-7 7" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.qualifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
}

.qualification-card {
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 24px;
  padding: 32px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.qualification-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--qual-color);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.qualification-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px var(--color-shadow);
  border-color: var(--qual-color);
}

.qualification-card:hover::before {
  opacity: 1;
}

.qual-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.qual-icon {
  width: 72px;
  height: 72px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  flex-shrink: 0;
  background: var(--color-bg-hover);
  transition: transform 0.3s ease;
}

.qualification-card:hover .qual-icon {
  transform: scale(1.05) rotate(5deg);
}

.qual-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qual-name {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.5px;
  line-height: 1.1;
  color: var(--qual-color);
}

.qual-category {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--color-bg-hover);
  color: var(--color-text);
  align-self: flex-start;
}

.qual-title {
  font-size: 1.15rem;
  color: var(--color-text);
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 12px;
}

.qual-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin-bottom: 24px;
  flex: 1;
}

.qual-stats {
  display: flex;
  gap: 24px;
  padding: 16px;
  background: var(--color-bg-hover);
  border-radius: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  border: 1px solid var(--color-border);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.stat-item span {
  color: var(--color-subtext);
}

.stat-icon {
  width: 18px;
  height: 18px;
  stroke: var(--color-subtext);
}

.stat-item strong {
  color: var(--color-text);
  font-weight: 700;
}

.view-profile-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 28px;
  width: 100%;
  border-radius: 14px;
  font-size: 1.05rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid var(--qual-color);
  background: var(--qual-color);
  color: white;
}

.view-profile-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
}

.view-profile-btn:active {
  transform: translateY(0);
}

.btn-icon {
  width: 20px;
  height: 20px;
  stroke: white;
  transition: transform 0.3s ease;
}

.view-profile-btn:hover .btn-icon {
  transform: translateX(4px);
}

@media (max-width: 1200px) {
  .qualifications-grid {
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  }
}

@media (max-width: 768px) {
  .qualifications-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .qualification-card {
    padding: 28px;
  }

  .qual-icon {
    width: 64px;
    height: 64px;
    font-size: 2rem;
  }

  .qual-name {
    font-size: 1.7rem;
  }

  .qual-stats {
    flex-direction: column;
    gap: 12px;
  }
}

@media (max-width: 480px) {
  .qual-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .qualification-card {
    padding: 24px;
  }

  .qual-icon {
    align-self: center;
  }

  .qual-text {
    width: 100%;
    align-items: center;
    text-align: center;
  }
}
</style>