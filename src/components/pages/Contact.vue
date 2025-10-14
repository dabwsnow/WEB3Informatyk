<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const isLoading = ref(false)

const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const contactMethods = ref([
  {
    icon: '📧',
    title: 'Email',
    value: 'kontakt@web3informatyk.pl',
    description: 'Odpowiadamy w ciągu 24h'
  },
  {
    icon: '💬',
    title: 'Discord',
    value: 'WEB3Informatyk Community',
    description: 'Dołącz do naszej społeczności'
  },
  {
    icon: '📱',
    title: 'Telegram',
    value: '@web3informatyk',
    description: 'Szybki kontakt'
  }
])

const faqItems = ref([
  {
    question: 'Czy platforma jest całkowicie darmowa?',
    answer: 'Tak! Wszystkie materiały, testy i arkusze są dostępne całkowicie za darmo dla każdego użytkownika.'
  },
  {
    question: 'Czy mogę używać materiałów do nauki offline?',
    answer: 'Tak, możesz pobierać arkusze PDF i inne materiały do użytku offline.'
  },
  {
    question: 'Jak często dodawane są nowe pytania?',
    answer: 'Baza pytań jest regularnie aktualizowana. Nowe pytania dodawane są co najmniej raz w miesiącu.'
  },
  {
    question: 'Czy mogę zgłosić błąd w pytaniu?',
    answer: 'Tak! Skorzystaj z formularza kontaktowego lub napisz do nas bezpośrednio. Każdy zgłoszony błąd jest weryfikowany.'
  }
])

const handleSubmit = async () => {
  if (!formData.value.name || !formData.value.email || !formData.value.message) {
    alert('Wypełnij wszystkie wymagane pola!')
    return
  }

  isLoading.value = true

  // TODO: Wyślij na backend
  setTimeout(() => {
    console.log('Form data:', formData.value)
    alert('Wiadomość wysłana! Odpowiemy najszybciej jak to możliwe.')
    
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    isLoading.value = false
  }, 1500)
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="contact-container" :class="{ visible: isVisible }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">💬</span>
          <span class="badge-text">Skontaktuj się z nami</span>
        </div>
        
        <h1 class="hero-title">
          Masz pytania?
          <span class="hero-title-accent">Jesteśmy tutaj dla Ciebie</span>
        </h1>
        
        <p class="hero-description">
          Chętnie odpowiemy na Twoje pytania, wysłuchamy sugestii lub pomożemy rozwiązać problem. 
          Skorzystaj z formularza kontaktowego lub wybierz preferowany kanał komunikacji.
        </p>
      </div>
    </section>

    <!-- Contact Methods -->
    <section class="contact-methods-section">
      <div class="methods-grid">
        <div 
          v-for="(method, index) in contactMethods" 
          :key="index" 
          class="method-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="method-icon">{{ method.icon }}</div>
          <h3 class="method-title">{{ method.title }}</h3>
          <p class="method-value">{{ method.value }}</p>
          <p class="method-description">{{ method.description }}</p>
        </div>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="form-section">
      <div class="form-wrapper">
        <div class="form-header">
          <h2 class="form-title">
            <span class="title-icon">✉️</span>
            Formularz kontaktowy
          </h2>
          <p class="form-subtitle">Wypełnij formularz, a odezwiemy się najszybciej jak to możliwe</p>
        </div>

        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                Imię i nazwisko <span class="required">*</span>
              </label>
              <input 
                v-model="formData.name"
                type="text" 
                class="form-input"
                placeholder="Jan Kowalski"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Email <span class="required">*</span>
              </label>
              <input 
                v-model="formData.email"
                type="email" 
                class="form-input"
                placeholder="jan@example.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Temat (opcjonalnie)
            </label>
            <input 
              v-model="formData.subject"
              type="text" 
              class="form-input"
              placeholder="Tytuł wiadomości"
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Wiadomość <span class="required">*</span>
            </label>
            <textarea 
              v-model="formData.message"
              class="form-textarea"
              rows="6"
              placeholder="Opisz swoje pytanie lub problem..."
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="!isLoading">Wyślij wiadomość</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">❓</span>
          Najczęściej zadawane pytania
        </h2>
      </div>

      <div class="faq-list">
        <div 
          v-for="(item, index) in faqItems" 
          :key="index" 
          class="faq-item"
        >
          <div class="faq-question">
            <span class="faq-icon">Q</span>
            <h3>{{ item.question }}</h3>
          </div>
          <div class="faq-answer">
            <span class="faq-icon answer">A</span>
            <p>{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.contact-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.contact-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.hero-section {
  padding: 60px 0 40px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 50px;
  margin-bottom: 30px;
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 24px;
  color: var(--color-text);
}

.hero-title-accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--color-subtext);
  margin: 0;
}

/* Contact Methods */
.contact-methods-section {
  padding: 40px 0 60px;
}

.methods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.method-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.method-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px var(--color-shadow);
}

.method-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.method-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px;
}

.method-value {
  font-size: 1rem;
  font-weight: 600;
  color: #667eea;
  margin: 0 0 8px;
}

.method-description {
  font-size: 0.9rem;
  color: var(--color-subtext);
  margin: 0;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Form Section */
.form-section {
  padding: 40px 0 60px;
}

.form-wrapper {
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 40px;
}

.form-header {
  text-align: center;
  margin-bottom: 40px;
}

.form-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px;
}

.title-icon {
  font-size: 2rem;
}

.form-subtitle {
  font-size: 1rem;
  color: var(--color-subtext);
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.required {
  color: #ef4444;
}

.form-input,
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
.form-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 150px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* FAQ Section */
.faq-section {
  padding: 40px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0;
}

.faq-list {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.faq-item {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 4px 16px var(--color-shadow);
}

.faq-question,
.faq-answer {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.faq-question {
  margin-bottom: 16px;
}

.faq-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 800;
  font-size: 1rem;
  border-radius: 8px;
  flex-shrink: 0;
}

.faq-icon.answer {
  background: linear-gradient(135deg, #10b981, #059669);
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
  padding-top: 6px;
}

.faq-answer p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
  padding-top: 6px;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-container {
    padding: 0 16px 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.05rem;
  }

  .methods-grid {
    grid-template-columns: 1fr;
  }

  .form-wrapper {
    padding: 28px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .form-title {
    font-size: 1.5rem;
  }

  .faq-item {
    padding: 20px;
  }
}
</style>