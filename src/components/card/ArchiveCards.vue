<script setup>
const props = defineProps({
  archives: {
    type: Array,
    required: true,
    default: () => []
  },
  qualColor: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="archives-list">
    <div
      v-for="archive in archives"
      :key="archive.id"
      class="archive-item"
    >
      <div class="archive-info">
        <div class="archive-header">
          <span class="archive-code">{{ archive.code }}</span>
          <span class="archive-badge">{{ archive.type }}</span>
        </div>
        <div class="archive-meta">
          <span class="archive-date">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke-width="2" stroke-linecap="round"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke-width="2" stroke-linecap="round"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke-width="2"/>
            </svg>
            {{ archive.date }}
          </span>
          <span class="archive-downloads">
            <svg class="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            {{ archive.downloaded }}
          </span>
        </div>
      </div>
      <div class="archive-actions">
        <button class="action-btn download-btn" :style="{ background: qualColor, borderColor: qualColor }">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz
        </button>
        <button class="action-btn view-solved-btn">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2"/>
          </svg>
          Arkusz Rozwiązany
        </button>
        <button class="action-btn download-solved-btn" :style="{ background: qualColor, borderColor: qualColor }">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz Rozwiązany
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives-list {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: var(--color-bg-hover, #f5f5f5);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 14px;
  transition: all 0.3s ease;
  gap: 20px;
}

.archive-item:hover {
  background: rgba(102, 126, 234, 0.05);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.archive-info {
  flex: 1;
  min-width: 0;
}

.archive-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.archive-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text, #333333);
  font-family: 'Courier New', monospace;
}

.archive-badge {
  padding: 4px 10px;
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.archive-meta {
  display: flex;
  gap: 20px;
  color: var(--color-subtext, #666666);
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.archive-date,
.archive-downloads {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-icon {
  width: 16px;
  height: 16px;
}

.archive-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid;
  white-space: nowrap;
}

.view-btn,
.view-solved-btn {
  background: var(--color-bg, #ffffff);
  color: var(--color-text, #333333);
  border-color: var(--color-border, #e0e0e0);
}

.view-btn:hover,
.view-solved-btn:hover {
  background: var(--color-bg-hover, #f5f5f5);
}

.download-btn,
.download-solved-btn {
  color: white;
}

.download-btn:hover,
.download-solved-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

@media (max-width: 768px) {
  .archive-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 16px;
  }

  .archive-actions {
    width: 100%;
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .archive-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>