<script setup>
import { ref } from 'vue'

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

// Состояние открытых dropdown меню
const openDropdowns = ref({})

const toggleDropdown = (archiveId) => {
  openDropdowns.value[archiveId] = !openDropdowns.value[archiveId]
}

const closeDropdown = (archiveId) => {
  openDropdowns.value[archiveId] = false
}

const downloadFile = (url, filename) => {
  if (!url) {
    alert('Plik niedostępny')
    return
  }
  
  const fullUrl = `http://localhost:8000${url}`
  const a = document.createElement('a')
  a.href = fullUrl
  a.download = filename || 'download'
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

// Проверяем есть ли решения на разных языках (для INF.04)
const hasMultipleSolutions = (files) => {
  return files?.rozwiazanie_cs || files?.rozwiazanie_cpp || 
         files?.rozwiazanie_java || files?.rozwiazanie_python
}

// Получаем список доступных языков
const getAvailableLanguages = (files) => {
  const languages = []
  
  if (files?.rozwiazanie_cs) {
    languages.push({ name: 'C#', icon: '🔷', url: files.rozwiazanie_cs, code: 'cs' })
  }
  if (files?.rozwiazanie_cpp) {
    languages.push({ name: 'C++', icon: '⚙️', url: files.rozwiazanie_cpp, code: 'cpp' })
  }
  if (files?.rozwiazanie_java) {
    languages.push({ name: 'Java', icon: '☕', url: files.rozwiazanie_java, code: 'java' })
  }
  if (files?.rozwiazanie_python) {
    languages.push({ name: 'Python', icon: '🐍', url: files.rozwiazanie_python, code: 'python' })
  }
  
  return languages
}

const downloadSolution = (archive, languageCode) => {
  const filename = `${archive.code}_rozwiazanie_${languageCode}.zip`
  const url = archive.files[`rozwiazanie_${languageCode}`]
  downloadFile(url, filename)
  closeDropdown(archive.id)
}
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
        <!-- Arkusz -->
        <button 
          v-if="archive.files?.arkusz" 
          class="action-btn download-btn"
          @click="downloadFile(archive.files.arkusz, `${archive.code}_arkusz.pdf`)"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz arkusz
        </button>
        
        <!-- Pliki -->
        <button 
          v-if="archive.files?.pliki" 
          class="action-btn view-btn"
          @click="downloadFile(archive.files.pliki, `${archive.code}_pliki.zip`)"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Pobierz pliki
        </button>

        <!-- Klucz odpowiedzi (tylko для INF.04) -->
        <button 
          v-if="archive.files?.klucz_odpowiedzi" 
          class="action-btn key-btn"
          @click="downloadFile(archive.files.klucz_odpowiedzi, `${archive.code}_klucz.pdf`)"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Klucz odpowiedzi
        </button>

        <!-- Materiały (tylko для INF.04) -->
        <button 
          v-if="archive.files?.materialy" 
          class="action-btn materials-btn"
          @click="downloadFile(archive.files.materialy, `${archive.code}_materialy.zip`)"
        >
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Materiały
        </button>
        
        <!-- Rozwiązanie z dropdown dla INF.04 -->
        <div v-if="hasMultipleSolutions(archive.files)" class="dropdown-wrapper">
          <button 
            class="action-btn download-solution-btn"
            @click="toggleDropdown(archive.id)"
          >
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Pobierz rozwiązanie
            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <!-- Dropdown menu -->
          <div v-if="openDropdowns[archive.id]" class="dropdown-menu">
            <div 
              v-for="lang in getAvailableLanguages(archive.files)"
              :key="lang.code"
              class="dropdown-item"
              @click="downloadSolution(archive, lang.code)"
            >
              <span class="lang-icon">{{ lang.icon }}</span>
              <span class="lang-name">{{ lang.name }}</span>
            </div>
          </div>
        </div>

        <!-- Обычное rozwiązanie для других профилей -->
        <button 
          v-else-if="archive.files?.rozwiazanie" 
          class="action-btn download-solution-btn"
          @click="downloadFile(archive.files.rozwiazanie, `${archive.code}_rozwiazanie.zip`)"
        >
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
.dropdown-wrapper {
  position: relative;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  stroke-width: 2;
  margin-left: 0.25rem;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 10;
  min-width: 200px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.lang-icon {
  font-size: 1.25rem;
}

.lang-name {
  font-weight: 600;
  color: #374151;
}

.key-btn {
  background: #f59e0b;
  border: none;
  color: white;
}

.key-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.materials-btn {
  background: #8b5cf6;
  color: white;
}

.materials-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .dropdown-menu {
    left: 0;
    right: 0;
  }
}

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