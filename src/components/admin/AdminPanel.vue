<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dane aktualnego admina (pobierz z localStorage/API)
const currentAdmin = ref({
  id: 1,
  username: 'superadmin',
  level: 1, // 1 = Super Admin, 2 = Admin
  firstName: 'Jan',
  lastName: 'Kowalski'
})

const activeTab = ref('questions') // questions, practical, profiles, admins
const isVisible = ref(false)

// ========== ZARZĄDZANIE ADMINAMI ==========
const admins = ref([
  { id: 1, username: 'superadmin', firstName: 'Jan', lastName: 'Kowalski', level: 1, addedDate: '01.01.2024' },
  { id: 2, username: 'admin1', firstName: 'Anna', lastName: 'Nowak', level: 2, addedDate: '15.03.2024' },
])

const showAdminModal = ref(false)
const newAdmin = ref({
  username: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: ''
})

const openAddAdminModal = () => {
  newAdmin.value = {
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  }
  showAdminModal.value = true
}

const addAdmin = () => {
  if (!newAdmin.value.username || !newAdmin.value.firstName || !newAdmin.value.lastName || !newAdmin.value.password) {
    alert('Wypełnij wszystkie pola!')
    return
  }
  
  if (newAdmin.value.password !== newAdmin.value.confirmPassword) {
    alert('Hasła nie są identyczne!')
    return
  }

  // TODO: Wyślij na backend
  const admin = {
    id: admins.value.length + 1,
    username: newAdmin.value.username,
    firstName: newAdmin.value.firstName,
    lastName: newAdmin.value.lastName,
    level: 2,
    addedDate: new Date().toLocaleDateString('pl-PL')
  }
  
  admins.value.push(admin)
  showAdminModal.value = false
  alert('Admin dodany pomyślnie!')
}

const removeAdmin = (adminId) => {
  if (confirm('Czy na pewno chcesz usunąć tego admina?')) {
    admins.value = admins.value.filter(a => a.id !== adminId)
    alert('Admin usunięty!')
  }
}

// ========== DODAWANIE PYTAŃ ==========
const categories = ref(['INF.02', 'INF.03', 'INF.04'])
const selectedCategory = ref('')
const questionForm = ref({
  category: '',
  question: '',
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  correctAnswer: 1,
  image: null,
  imagePreview: null
})

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    questionForm.value.image = file
    const reader = new FileReader()
    reader.onload = (e) => {
      questionForm.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const removeImage = () => {
  questionForm.value.image = null
  questionForm.value.imagePreview = null
}

const addQuestion = () => {
  if (!questionForm.value.category) {
    alert('Wybierz kategorię!')
    return
  }
  
  if (!questionForm.value.question || !questionForm.value.answer1 || !questionForm.value.answer2 || 
      !questionForm.value.answer3 || !questionForm.value.answer4) {
    alert('Wypełnij wszystkie pola!')
    return
  }

  // TODO: Wyślij na backend
  console.log('Nowe pytanie:', {
    category: questionForm.value.category,
    question: questionForm.value.question,
    answers: [
      questionForm.value.answer1,
      questionForm.value.answer2,
      questionForm.value.answer3,
      questionForm.value.answer4
    ],
    correctAnswer: questionForm.value.correctAnswer,
    image: questionForm.value.image
  })

  alert('Pytanie dodane pomyślnie!')
  resetQuestionForm()
}

const resetQuestionForm = () => {
  questionForm.value = {
    category: '',
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 1,
    image: null,
    imagePreview: null
  }
}

// ========== DODAWANIE PRAKTYCZNYCH ==========
const practicalForm = ref({
  category: '',
  name: '',
  month: '',
  year: '',
  pdfFile: null,
  filesArchive: null,
  solutionFiles: null,
  solutionPdf: null
})

const months = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
]

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => currentYear - i)

const handleFileUpload = (event, field) => {
  const file = event.target.files[0]
  if (file) {
    practicalForm.value[field] = file
  }
}

const addPractical = () => {
  if (!practicalForm.value.category || !practicalForm.value.name || 
      !practicalForm.value.month || !practicalForm.value.year) {
    alert('Wypełnij wszystkie pola podstawowe!')
    return
  }

  if (!practicalForm.value.pdfFile || !practicalForm.value.filesArchive) {
    alert('Załącz wymagane pliki!')
    return
  }

  // TODO: Wyślij na backend z FormData
  const formData = new FormData()
  formData.append('category', practicalForm.value.category)
  formData.append('name', practicalForm.value.name)
  formData.append('month', practicalForm.value.month)
  formData.append('year', practicalForm.value.year)
  formData.append('pdfFile', practicalForm.value.pdfFile)
  formData.append('filesArchive', practicalForm.value.filesArchive)
  if (practicalForm.value.solutionFiles) {
    formData.append('solutionFiles', practicalForm.value.solutionFiles)
  }
  if (practicalForm.value.solutionPdf) {
    formData.append('solutionPdf', practicalForm.value.solutionPdf)
  }

  console.log('Nowy arkusz praktyczny:', {
    category: practicalForm.value.category,
    name: practicalForm.value.name,
    date: `${practicalForm.value.month} ${practicalForm.value.year}`,
    files: {
      pdf: practicalForm.value.pdfFile.name,
      archive: practicalForm.value.filesArchive.name,
      solutionFiles: practicalForm.value.solutionFiles?.name,
      solutionPdf: practicalForm.value.solutionPdf?.name
    }
  })

  alert('Arkusz praktyczny dodany pomyślnie!')
  resetPracticalForm()
}

const resetPracticalForm = () => {
  practicalForm.value = {
    category: '',
    name: '',
    month: '',
    year: '',
    pdfFile: null,
    filesArchive: null,
    solutionFiles: null,
    solutionPdf: null
  }
}

// ========== DODAWANIE PROFILI ==========
const newProfile = ref({
  code: '',
  name: '',
  description: '',
  icon: '📁'
})

const profileIcons = ['🖥️', '💾', '📱', '🌐', '⚙️', '🔧', '📊', '🎯']

const addProfile = () => {
  if (!newProfile.value.code || !newProfile.value.name) {
    alert('Wypełnij wymagane pola!')
    return
  }

  // TODO: Wyślij na backend
  console.log('Nowy profil:', newProfile.value)
  
  categories.value.push(newProfile.value.code)
  alert('Profil dodany pomyślnie!')
  
  newProfile.value = {
    code: '',
    name: '',
    description: '',
    icon: '📁'
  }
}

const isSuperAdmin = computed(() => currentAdmin.value.level === 1)

onMounted(() => {
  // Sprawdź czy użytkownik jest adminem
  // TODO: Pobierz dane z localStorage/API
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="admin-container" :class="{ visible: isVisible }">
    <div class="admin-header">
      <div class="header-content">
        <div class="header-info">
          <h1 class="admin-title">
            <span class="title-icon">⚙️</span>
            Panel Administracyjny
          </h1>
          <p class="admin-subtitle">
            Zalogowany jako: <strong>{{ currentAdmin.firstName }} {{ currentAdmin.lastName }}</strong>
            <span class="admin-badge" :class="{ 'super-admin': isSuperAdmin }">
              {{ isSuperAdmin ? 'Super Admin' : 'Admin' }}
            </span>
          </p>
        </div>
        <button @click="router.push('/')" class="back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Strona główna</span>
        </button>
      </div>
    </div>

    <!-- Tabs Navigation -->
    <div class="tabs-navigation">
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'questions' }"
        @click="activeTab = 'questions'"
      >
        <span class="tab-icon">❓</span>
        <span>Pytania testowe</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'practical' }"
        @click="activeTab = 'practical'"
      >
        <span class="tab-icon">💼</span>
        <span>Arkusze praktyczne</span>
      </button>
      <button 
        class="tab-button" 
        :class="{ active: activeTab === 'profiles' }"
        @click="activeTab = 'profiles'"
      >
        <span class="tab-icon">📁</span>
        <span>Profile/Kategorie</span>
      </button>
      <button 
        v-if="isSuperAdmin"
        class="tab-button" 
        :class="{ active: activeTab === 'admins' }"
        @click="activeTab = 'admins'"
      >
        <span class="tab-icon">👥</span>
        <span>Zarządzanie adminami</span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <!-- PYTANIA TESTOWE -->
      <div v-if="activeTab === 'questions'" class="tab-panel">
        <div class="section-card">
          <h2 class="section-title">
            <span class="title-icon">➕</span>
            Dodaj nowe pytanie testowe
          </h2>

          <div class="form-group">
            <label class="form-label">Wybierz kategorię <span class="required">*</span></label>
            <select v-model="questionForm.category" class="form-select">
              <option value="">-- Wybierz kategorię --</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Treść pytania <span class="required">*</span></label>
            <textarea 
              v-model="questionForm.question" 
              class="form-textarea" 
              rows="4"
              placeholder="Wpisz treść pytania..."
            ></textarea>
          </div>

          <div class="answers-grid">
            <div class="form-group">
              <label class="form-label">Odpowiedź A <span class="required">*</span></label>
              <input 
                v-model="questionForm.answer1" 
                type="text" 
                class="form-input"
                placeholder="Odpowiedź A"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Odpowiedź B <span class="required">*</span></label>
              <input 
                v-model="questionForm.answer2" 
                type="text" 
                class="form-input"
                placeholder="Odpowiedź B"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Odpowiedź C <span class="required">*</span></label>
              <input 
                v-model="questionForm.answer3" 
                type="text" 
                class="form-input"
                placeholder="Odpowiedź C"
              />
            </div>
            <div class="form-group">
              <label class="form-label">Odpowiedź D <span class="required">*</span></label>
              <input 
                v-model="questionForm.answer4" 
                type="text" 
                class="form-input"
                placeholder="Odpowiedź D"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Prawidłowa odpowiedź <span class="required">*</span></label>
            <div class="radio-group">
              <label class="radio-label">
                <input type="radio" v-model="questionForm.correctAnswer" :value="1" />
                <span>A</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="questionForm.correctAnswer" :value="2" />
                <span>B</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="questionForm.correctAnswer" :value="3" />
                <span>C</span>
              </label>
              <label class="radio-label">
                <input type="radio" v-model="questionForm.correctAnswer" :value="4" />
                <span>D</span>
              </label>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Obrazek (opcjonalnie)</label>
            <div v-if="!questionForm.imagePreview" class="file-upload">
              <input 
                type="file" 
                id="question-image" 
                @change="handleImageUpload"
                accept="image/*"
                class="file-input"
              />
              <label for="question-image" class="file-label">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke-width="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke-width="2"/>
                  <polyline points="21 15 16 10 5 21" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Wybierz obrazek
              </label>
            </div>
            <div v-else class="image-preview">
              <img :src="questionForm.imagePreview" alt="Podgląd" />
              <button @click="removeImage" class="remove-image-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button @click="addQuestion" class="submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Dodaj pytanie
            </button>
            <button @click="resetQuestionForm" class="cancel-btn">Wyczyść formularz</button>
          </div>
        </div>
      </div>

      <!-- ARKUSZE PRAKTYCZNE -->
      <div v-if="activeTab === 'practical'" class="tab-panel">
        <div class="section-card">
          <h2 class="section-title">
            <span class="title-icon">➕</span>
            Dodaj nowy arkusz praktyczny
          </h2>

          <div class="form-group">
            <label class="form-label">Wybierz kategorię <span class="required">*</span></label>
            <select v-model="practicalForm.category" class="form-select">
              <option value="">-- Wybierz kategorię --</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Nazwa arkusza <span class="required">*</span></label>
            <input 
              v-model="practicalForm.name" 
              type="text" 
              class="form-input"
              placeholder="np. Egzamin główny"
            />
          </div>

          <div class="date-grid">
            <div class="form-group">
              <label class="form-label">Miesiąc <span class="required">*</span></label>
              <select v-model="practicalForm.month" class="form-select">
                <option value="">-- Wybierz miesiąc --</option>
                <option v-for="month in months" :key="month" :value="month">{{ month }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Rok <span class="required">*</span></label>
              <select v-model="practicalForm.year" class="form-select">
                <option value="">-- Wybierz rok --</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
          </div>

          <div class="files-section">
            <h3 class="subsection-title">Pliki wymagane</h3>
            
            <div class="form-group">
              <label class="form-label">Arkusz PDF <span class="required">*</span></label>
              <div class="file-upload">
                <input 
                  type="file" 
                  id="pdf-file" 
                  @change="handleFileUpload($event, 'pdfFile')"
                  accept=".pdf"
                  class="file-input"
                />
                <label for="pdf-file" class="file-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
                    <polyline points="14 2 14 8 20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ practicalForm.pdfFile ? practicalForm.pdfFile.name : 'Wybierz plik PDF' }}
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Archiwum z plikami <span class="required">*</span></label>
              <div class="file-upload">
                <input 
                  type="file" 
                  id="files-archive" 
                  @change="handleFileUpload($event, 'filesArchive')"
                  accept=".zip,.rar,.7z"
                  class="file-input"
                />
                <label for="files-archive" class="file-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="21 8 21 21 3 21 3 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="1" y="3" width="22" height="5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="10" y1="12" x2="14" y2="12" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  {{ practicalForm.filesArchive ? practicalForm.filesArchive.name : 'Wybierz archiwum (ZIP/RAR)' }}
                </label>
              </div>
            </div>
          </div>

          <div class="files-section optional-section">
            <h3 class="subsection-title">Pliki opcjonalne (rozwiązanie)</h3>
            
            <div class="form-group">
              <label class="form-label">Archiwum z rozwiązaniem (opcjonalnie)</label>
              <div class="file-upload">
                <input 
                  type="file" 
                  id="solution-files" 
                  @change="handleFileUpload($event, 'solutionFiles')"
                  accept=".zip,.rar,.7z"
                  class="file-input"
                />
                <label for="solution-files" class="file-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="21 8 21 21 3 21 3 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <rect x="1" y="3" width="22" height="5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <line x1="10" y1="12" x2="14" y2="12" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  {{ practicalForm.solutionFiles ? practicalForm.solutionFiles.name : 'Wybierz archiwum z rozwiązaniem' }}
                </label>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">PDF z rozwiązaniem (opcjonalnie)</label>
              <div class="file-upload">
                <input 
                  type="file" 
                  id="solution-pdf" 
                  @change="handleFileUpload($event, 'solutionPdf')"
                  accept=".pdf"
                  class="file-input"
                />
                <label for="solution-pdf" class="file-label">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke-width="2"/>
                    <polyline points="14 2 14 8 20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ practicalForm.solutionPdf ? practicalForm.solutionPdf.name : 'Wybierz PDF z rozwiązaniem' }}
                </label>
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button @click="addPractical" class="submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Dodaj arkusz
            </button>
            <button @click="resetPracticalForm" class="cancel-btn">Wyczyść formularz</button>
          </div>
        </div>
      </div>

      <!-- PROFILE/KATEGORIE -->
      <div v-if="activeTab === 'profiles'" class="tab-panel">
        <div class="section-card">
          <h2 class="section-title">
            <span class="title-icon">➕</span>
            Dodaj nowy profil/kategorię
          </h2>

          <div class="form-group">
            <label class="form-label">Kod profilu <span class="required">*</span></label>
            <input 
              v-model="newProfile.code" 
              type="text" 
              class="form-input"
              placeholder="np. INF.05"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Nazwa profilu <span class="required">*</span></label>
            <input 
              v-model="newProfile.name" 
              type="text" 
              class="form-input"
              placeholder="np. Tworzenie aplikacji webowych"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Opis (opcjonalnie)</label>
            <textarea 
              v-model="newProfile.description" 
              class="form-textarea" 
              rows="3"
              placeholder="Krótki opis profilu..."
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Ikona</label>
            <div class="icon-grid">
              <button 
                v-for="icon in profileIcons" 
                :key="icon"
                @click="newProfile.icon = icon"
                class="icon-btn"
                :class="{ active: newProfile.icon === icon }"
              >
                {{ icon }}
              </button>
            </div>
          </div>

          <div class="form-actions">
            <button @click="addProfile" class="submit-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Dodaj profil
            </button>
          </div>

          <div class="current-profiles">
            <h3 class="subsection-title">Aktualne profile</h3>
            <div class="profiles-list">
              <div v-for="cat in categories" :key="cat" class="profile-item">
                <span class="profile-code">{{ cat }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ZARZĄDZANIE ADMINAMI (tylko dla Super Admin) -->
      <div v-if="activeTab === 'admins' && isSuperAdmin" class="tab-panel">
        <div class="section-card">
          <div class="section-header">
            <h2 class="section-title">
              <span class="title-icon">👥</span>
              Zarządzanie adminami
            </h2>
            <button @click="openAddAdminModal" class="add-admin-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="12" y1="5" x2="12" y2="19" stroke-width="2" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Dodaj admina
            </button>
          </div>

          <div class="admins-table">
            <div class="table-header">
              <div class="table-cell">Imię i nazwisko</div>
              <div class="table-cell">Nazwa użytkownika</div>
              <div class="table-cell">Poziom</div>
              <div class="table-cell">Data dodania</div>
              <div class="table-cell">Akcje</div>
            </div>
            <div v-for="admin in admins" :key="admin.id" class="table-row">
              <div class="table-cell">{{ admin.firstName }} {{ admin.lastName }}</div>
              <div class="table-cell">@{{ admin.username }}</div>
              <div class="table-cell">
                <span class="level-badge" :class="{ 'level-1': admin.level === 1 }">
                  {{ admin.level === 1 ? 'Super Admin' : 'Admin' }}
                </span>
              </div>
              <div class="table-cell">{{ admin.addedDate }}</div>
              <div class="table-cell">
                <button 
                  v-if="admin.level !== 1"
                  @click="removeAdmin(admin.id)"
                  class="delete-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <polyline points="3 6 5 6 21 6" stroke-width="2" stroke-linecap="round"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal dodawania admina -->
    <div v-if="showAdminModal" class="modal-overlay" @click.self="showAdminModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Dodaj nowego admina</h3>
          <button @click="showAdminModal = false" class="modal-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18" stroke-width="2" stroke-linecap="round"/>
              <line x1="6" y1="6" x2="18" y2="18" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Imię <span class="required">*</span></label>
            <input 
              v-model="newAdmin.firstName" 
              type="text" 
              class="form-input"
              placeholder="Imię"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Nazwisko <span class="required">*</span></label>
            <input 
              v-model="newAdmin.lastName" 
              type="text" 
              class="form-input"
              placeholder="Nazwisko"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Nazwa użytkownika <span class="required">*</span></label>
            <input 
              v-model="newAdmin.username" 
              type="text" 
              class="form-input"
              placeholder="Nazwa użytkownika"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Hasło <span class="required">*</span></label>
            <input 
              v-model="newAdmin.password" 
              type="password" 
              class="form-input"
              placeholder="Minimum 6 znaków"
            />
          </div>

          <div class="form-group">
            <label class="form-label">Potwierdź hasło <span class="required">*</span></label>
            <input 
              v-model="newAdmin.confirmPassword" 
              type="password" 
              class="form-input"
              placeholder="Powtórz hasło"
            />
          </div>
        </div>

        <div class="modal-footer">
          <button @click="addAdmin" class="submit-btn">
            Dodaj admina
          </button>
          <button @click="showAdminModal = false" class="cancel-btn">
            Anuluj
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.admin-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.admin-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.admin-header {
  padding: 40px 0;
  margin-bottom: 32px;
  border-bottom: 2px solid var(--color-border);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.header-info {
  flex: 1;
}

.admin-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 12px;
}

.title-icon {
  font-size: 2.5rem;
}

.admin-subtitle {
  font-size: 1rem;
  color: var(--color-subtext);
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 12px;
}

.admin-badge.super-admin {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-2px);
}

.back-btn svg {
  width: 20px;
  height: 20px;
}

.tabs-navigation {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  padding: 8px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: transparent;
  border: none;
  border-radius: 12px;
  color: var(--color-subtext);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background: rgba(102, 126, 234, 0.1);
  color: var(--color-text);
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.tab-icon {
  font-size: 1.2rem;
}

.tab-content {
  min-height: 500px;
}

.tab-panel {
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 24px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 32px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
}

.subsection-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 32px 0 20px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.form-group {
  margin-bottom: 24px;
}

.form-label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  font-size: 0.95rem;
  color: var(--color-text);
  background: var(--color-bg);
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.answers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.radio-group {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(102, 126, 234, 0.05);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  color: var(--color-text);
}

.radio-label:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.radio-label input[type="radio"] {
  cursor: pointer;
}

.radio-label input[type="radio"]:checked + span {
  color: #667eea;
}

.file-upload {
  position: relative;
}

.file-input {
  display: none;
}

.file-label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(102, 126, 234, 0.05);
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--color-text);
  font-weight: 600;
}

.file-label:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.file-label svg {
  width: 24px;
  height: 24px;
  color: #667eea;
  flex-shrink: 0;
}

.image-preview {
  position: relative;
  display: inline-block;
  border-radius: 12px;
  overflow: hidden;
}

.image-preview img {
  max-width: 100%;
  max-height: 300px;
  display: block;
  border-radius: 12px;
}

.remove-image-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-image-btn:hover {
  background: #ef4444;
  transform: scale(1.1);
}

.remove-image-btn svg {
  width: 20px;
  height: 20px;
  color: white;
}

.date-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.files-section {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.optional-section {
  background: rgba(102, 126, 234, 0.03);
  padding: 24px;
  border-radius: 12px;
  border: 1px dashed var(--color-border);
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 12px;
}

.icon-btn {
  width: 100%;
  aspect-ratio: 1;
  font-size: 2rem;
  background: rgba(102, 126, 234, 0.05);
  border: 2px solid var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.icon-btn:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: #667eea;
  transform: scale(1.05);
}

.icon-btn.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-color: #667eea;
  transform: scale(1.1);
}

.current-profiles {
  margin-top: 32px;
}

.profiles-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.profile-item {
  padding: 12px 24px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 12px;
  font-weight: 700;
  color: #667eea;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 32px;
  flex-wrap: wrap;
}

.submit-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.submit-btn svg {
  width: 20px;
  height: 20px;
}

.cancel-btn {
  padding: 16px 32px;
  background: transparent;
  border: 2px solid var(--color-border);
  border-radius: 12px;
  color: var(--color-text);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
  color: #ef4444;
}

.add-admin-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-admin-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.add-admin-btn svg {
  width: 18px;
  height: 18px;
}

.admins-table {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
  background: rgba(102, 126, 234, 0.05);
  padding: 16px;
  font-weight: 700;
  color: var(--color-text);
  border-bottom: 2px solid var(--color-border);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1fr 1fr;
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.table-row:hover {
  background: rgba(102, 126, 234, 0.03);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.level-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 12px;
}

.level-badge.level-1 {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}

.delete-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #ef4444;
  border-radius: 8px;
  color: #ef4444;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
}

.delete-btn svg {
  width: 16px;
  height: 16px;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: var(--color-bg);
  border-radius: 20px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--color-border);
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
}

.modal-close {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.1);
}

.modal-close svg {
  width: 20px;
  height: 20px;
  color: var(--color-text);
}

.modal-body {
  padding: 32px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  padding: 24px 32px;
  border-top: 1px solid var(--color-border);
}

/* Responsive */
@media (max-width: 1024px) {
  .table-header,
  .table-row {
    grid-template-columns: 1.5fr 1fr 1fr 0.8fr 0.8fr;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .admin-container {
    padding: 0 16px 40px;
  }

  .admin-title {
    font-size: 2rem;
  }

  .header-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .tabs-navigation {
    padding: 6px;
  }

  .tab-button {
    padding: 10px 16px;
    font-size: 0.85rem;
  }

  .section-card {
    padding: 20px;
  }

  .answers-grid {
    grid-template-columns: 1fr;
  }

  .form-actions {
    flex-direction: column;
  }

  .admins-table {
    overflow-x: auto;
  }

  .table-header,
  .table-row {
    min-width: 600px;
  }

  .date-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .admin-title {
    font-size: 1.6rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .modal-content {
    margin: 0;
    border-radius: 16px;
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: 20px;
  }

  .icon-grid {
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  }

  .icon-btn {
    font-size: 1.5rem;
  }

  .back-btn span {
    display: none;
  }

  .back-btn {
    padding: 12px;
  }

  .admin-subtitle {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>