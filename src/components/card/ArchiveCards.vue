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
      :style="{ '--qual-color': qualColor }"
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
        <button class="action-btn download-btn">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz arkusz
        </button>
        <button class="action-btn view-btn">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2"/>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2"/>
          </svg>
          Zobacz rozwiązanie
        </button>
        <button class="action-btn download-solution-btn">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz rozwiązanie
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archives-list {
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.archive-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  background: var(--color-bg-hover);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  transition: all 0.3s ease;
  gap: 24px;
}

.archive-item:hover {
  border-color: var(--qual-color);
  transform: translateX(4px);
  box-shadow: 0 4px 12px var(--color-shadow);
}

.archive-info {
  flex: 1;
  min-width: 0;
}

.archive-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.archive-code {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  font-family: 'Courier New', monospace;
}

.archive-badge {
  padding: 4px 12px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 600;
}

.archive-meta {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  flex-wrap: wrap;
}

.archive-date,
.archive-downloads {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-subtext);
}

.meta-icon {
  width: 16px;
  height: 16px;
  stroke: var(--color-subtext);
}

.archive-actions {
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid;
  white-space: nowrap;
  flex-shrink: 0;
}

.download-btn {
  background: var(--qual-color);
  color: white;
  border-color: var(--qual-color);
}

.download-btn .btn-icon {
  stroke: white;
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--qual-color);
  opacity: 0.9;
}

.view-btn {
  background: var(--color-bg);
  color: var(--color-text);
  border-color: var(--color-border);
}

.view-btn .btn-icon {
  stroke: var(--color-text);
}

.view-btn:hover {
  background: var(--color-bg-hover);
  border-color: var(--qual-color);
  color: var(--qual-color);
}

.view-btn:hover .btn-icon {
  stroke: var(--qual-color);
}

.download-solution-btn {
  background: var(--color-bg);
  color: var(--qual-color);
  border-color: var(--qual-color);
}

.download-solution-btn .btn-icon {
  stroke: var(--qual-color);
}

.download-solution-btn:hover {
  background: var(--qual-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--qual-color);
}

.download-solution-btn:hover .btn-icon {
  stroke: white;
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: stroke 0.3s ease;
}

@media (max-width: 1024px) {
  .archive-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .archive-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .action-btn {
    flex: 1;
    min-width: 0;
  }
}

@media (max-width: 768px) {
  .archive-item {
    padding: 20px;
  }

  .archive-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .archive-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>