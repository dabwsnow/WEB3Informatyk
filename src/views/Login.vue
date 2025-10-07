<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentStep = ref('login') // login, register, key
const formData = ref({
  // Login
  username: '',
  password: '',
  key: '',
  // Register
  firstName: '',
  lastName: '',
  registerUsername: '',
  registerPassword: '',
  confirmPassword: ''
})

const generatedKey = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Генерация ключа на основе user agent и IP
const generateKey = () => {
  const userAgent = navigator.userAgent
  const timestamp = Date.now()
  
  // Симуляция IP (в реальности придет с бэкенда)
  const simulatedIP = '192.168.1.' + Math.floor(Math.random() * 255)
  
  // Создаем строку для хэширования
  const dataToHash = `${formData.value.registerUsername}-${userAgent}-${simulatedIP}-${timestamp}`
  
  // Простое шифрование (в продакшене используй crypto API)
  let hash = 0
  for (let i = 0; i < dataToHash.length; i++) {
    const char = dataToHash.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  
  // Генерируем 16-символьный ключ
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let key = ''
  const hashStr = Math.abs(hash).toString()
  
  for (let i = 0; i < 16; i++) {
    const index = parseInt(hashStr[i % hashStr.length]) + i
    key += chars[index % chars.length]
  }
  
  return key.match(/.{1,4}/g).join('-') // Форматируем как XXXX-XXXX-XXXX-XXXX
}

const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = 'Wypełnij wszystkie pola'
    return
  }
  
  isLoading.value = true
  
  // Симуляция запроса к бэкенду
  setTimeout(() => {
    /* 
    // TODO: Uncomment when backend is ready
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.value.username,
          password: formData.value.password,
          key: formData.value.key || null
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        // Zapisz token/session
        localStorage.setItem('userToken', data.token)
        localStorage.setItem('userData', JSON.stringify(data.user))
        router.push('/')
      } else {
        errorMessage.value = data.message || 'Błąd logowania'
      }
    } catch (error) {
      errorMessage.value = 'Błąd połączenia z serwerem'
    }
    */
    
    console.log('Login data:', {
      username: formData.value.username,
      password: formData.value.password,
      key: formData.value.key
    })
    
    // Demo: симулируем успешный вход
    const demoUser = {
      firstName: 'Jan',
      lastName: 'Kowalski',
      username: formData.value.username,
      avatar: null
    }
    
    localStorage.setItem('userToken', 'demo-token-' + Date.now())
    localStorage.setItem('userData', JSON.stringify(demoUser))
    
    isLoading.value = false
    
    // Перезагружаем страницу чтобы хедер обновился
    window.location.href = '/'
  }, 1000)
}

const handleRegisterSubmit = () => {
  errorMessage.value = ''
  
  if (!formData.value.firstName || !formData.value.lastName || 
      !formData.value.registerUsername || !formData.value.registerPassword) {
    errorMessage.value = 'Wypełnij wszystkie pola'
    return
  }
  
  if (formData.value.registerPassword !== formData.value.confirmPassword) {
    errorMessage.value = 'Hasła nie są identyczne'
    return
  }
  
  if (formData.value.registerPassword.length < 6) {
    errorMessage.value = 'Hasło musi mieć minimum 6 znaków'
    return
  }
  
  // Generuj klucz
  generatedKey.value = generateKey()
  currentStep.value = 'key'
}

const copyKey = async () => {
  try {
    await navigator.clipboard.writeText(generatedKey.value)
    alert('Klucz skopiowany do schowka!')
  } catch (err) {
    console.error('Błąd kopiowania:', err)
  }
}

const completeRegistration = async () => {
  isLoading.value = true
  
  // Симуляция запроса к бэкенду
  setTimeout(() => {
    /*
    // TODO: Uncomment when backend is ready
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.value.firstName,
          lastName: formData.value.lastName,
          username: formData.value.registerUsername,
          password: formData.value.registerPassword,
          key: generatedKey.value,
          userAgent: navigator.userAgent
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        alert('Konto utworzone pomyślnie!')
        currentStep.value = 'login'
        resetForm()
      } else {
        errorMessage.value = data.message || 'Błąd rejestracji'
      }
    } catch (error) {
      errorMessage.value = 'Błąd połączenia z serwerem'
    }
    */
    
    console.log('Register data:', {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      username: formData.value.registerUsername,
      password: formData.value.registerPassword,
      key: generatedKey.value,
      userAgent: navigator.userAgent
    })
    
    // Demo: симулируем успешную регистрацию
    const demoUser = {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      username: formData.value.registerUsername,
      avatar: null
    }
    
    localStorage.setItem('userToken', 'demo-token-' + Date.now())
    localStorage.setItem('userData', JSON.stringify(demoUser))
    
    isLoading.value = false
    alert('Konto utworzone pomyślnie!')
    router.push('/')
  }, 1000)
}

const resetForm = () => {
  formData.value = {
    username: '',
    password: '',
    key: '',
    firstName: '',
    lastName: '',
    registerUsername: '',
    registerPassword: '',
    confirmPassword: ''
  }
  errorMessage.value = ''
  generatedKey.value = ''
}

const goToRegister = () => {
  resetForm()
  currentStep.value = 'register'
}

const goToLogin = () => {
  resetForm()
  currentStep.value = 'login'
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>

    <button @click="router.push('/')" class="back-to-home">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Powrót do strony głównej</span>
    </button>

    <div class="auth-container">
      <!-- LOGIN FORM -->
      <div v-if="currentStep === 'login'" class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="auth-title">Zaloguj się</h1>
          <p class="auth-subtitle">Witaj ponownie! Wprowadź swoje dane</p>
        </div>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label class="form-label">
              Nazwa użytkownika <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="7" r="4" stroke-width="2"/>
              </svg>
              <input
                v-model="formData.username"
                type="text"
                placeholder="Wprowadź nazwę użytkownika"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Hasło <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
              </svg>
              <input
                v-model="formData.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Wprowadź hasło"
                class="form-input"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke-width="2"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Klucz <span class="optional">(opcjonalny)</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <input
                v-model="formData.key"
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                class="form-input"
              />
            </div>
            <p class="form-hint">Użyj klucza jeśli zapomniałeś hasła</p>
          </div>

          <div v-if="errorMessage" class="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ errorMessage }}
          </div>

          <button type="submit" class="submit-btn" :disabled="isLoading">
            <span v-if="!isLoading">Zaloguj się</span>
            <span v-else class="loading-spinner"></span>
          </button>

          <div class="auth-footer">
            <p>Nie masz konta?</p>
            <button type="button" @click="goToRegister" class="link-btn">
              Zarejestruj się
            </button>
          </div>
        </form>
      </div>

      <!-- REGISTER FORM -->
      <div v-if="currentStep === 'register'" class="auth-card">
        <div class="auth-header">
          <div class="auth-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round"/>
              <circle cx="8.5" cy="7" r="4" stroke-width="2"/>
              <line x1="20" y1="8" x2="20" y2="14" stroke-width="2" stroke-linecap="round"/>
              <line x1="23" y1="11" x2="17" y2="11" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h1 class="auth-title">Utwórz konto</h1>
          <p class="auth-subtitle">Wypełnij formularz, aby się zarejestrować</p>
        </div>

        <form @submit.prevent="handleRegisterSubmit" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">
                Imię <span class="required">*</span>
              </label>
              <input
                v-model="formData.firstName"
                type="text"
                placeholder="Twoje imię"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">
                Nazwisko <span class="required">*</span>
              </label>
              <input
                v-model="formData.lastName"
                type="text"
                placeholder="Twoje nazwisko"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Nazwa użytkownika <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round"/>
                <circle cx="12" cy="7" r="4" stroke-width="2"/>
              </svg>
              <input
                v-model="formData.registerUsername"
                type="text"
                placeholder="Wybierz nazwę użytkownika"
                class="form-input"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Hasło <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
              </svg>
              <input
                v-model="formData.registerPassword"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Minimum 6 znaków"
                class="form-input"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="password-toggle"
              >
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke-width="2"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">
              Potwierdź hasło <span class="required">*</span>
            </label>
            <div class="input-wrapper">
              <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke-width="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke-width="2"/>
              </svg>
              <input
                v-model="formData.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Powtórz hasło"
                class="form-input"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="password-toggle"
              >
                <svg v-if="!showConfirmPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" stroke-width="2"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="errorMessage" class="error-message">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke-width="2" stroke-linecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ errorMessage }}
          </div>

          <button type="submit" class="submit-btn">
            Dalej
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>

          <div class="auth-footer">
            <p>Masz już konto?</p>
            <button type="button" @click="goToLogin" class="link-btn">
              Zaloguj się
            </button>
          </div>
        </form>
      </div>

      <!-- KEY DISPLAY -->
      <div v-if="currentStep === 'key'" class="auth-card key-card">
        <div class="auth-header">
          <div class="auth-icon success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-width="2" stroke-linecap="round"/>
              <polyline points="22 4 12 14.01 9 11.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h1 class="auth-title">Twój klucz dostępu</h1>
          <p class="auth-subtitle">Zapisz ten klucz w bezpiecznym miejscu</p>
        </div>

        <div class="key-display">
          <div class="key-box">
            <div class="key-label">Klucz odzyskiwania</div>
            <div class="key-value">{{ generatedKey }}</div>
            <button @click="copyKey" class="copy-key-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2"/>
              </svg>
              Skopiuj klucz
            </button>
          </div>

          <div class="key-info">
            <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke-width="2"/>
              <path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </div>

        <button @click="completeRegistration" class="submit-btn" :disabled="isLoading">
          <span v-if="!isLoading">Zakończ rejestrację</span>
          <span v-else class="loading-spinner"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
}

.auth-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  opacity: 0.05;
}

.back-to-home {
  position: fixed;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-bg, #fff);
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  color: var(--color-text, #333);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.back-to-home:hover {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateX(-4px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.back-to-home svg {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.back-to-home:hover svg {
  transform: translateX(-4px);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.3;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -250px;
  right: -250px;
  animation-delay: -7s;
}

.orb-3 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  top: 50%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-50px, 50px) scale(0.9);
  }
}

.auth-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 500px;
}

.auth-card {
  background: var(--color-bg, #fff);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border, #e0e0e0);
  backdrop-filter: blur(20px);
}

.key-card {
  max-width: 600px;
}

.auth-header {
  text-align: center;
  margin-bottom: 40px;
}

.auth-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-icon svg {
  width: 40px;
  height: 40px;
  stroke: #667eea;
  stroke-width: 2;
}

.success-icon {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1));
}

.success-icon svg {
  stroke: #22c55e;
}

.auth-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-text, #333);
  margin-bottom: 12px;
}

.auth-subtitle {
  font-size: 1rem;
  color: var(--color-subtext, #666);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text, #333);
}

.required {
  color: #ef4444;
}

.optional {
  color: var(--color-subtext, #666);
  font-weight: 400;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  color: var(--color-subtext, #666);
  pointer-events: none;
}

.form-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid var(--color-border, #e0e0e0);
  border-radius: 12px;
  font-size: 0.95rem;
  color: var(--color-text, #333);
  background: var(--color-bg, #fff);
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.password-toggle {
  position: absolute;
  right: 12px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  background: rgba(102, 126, 234, 0.1);
}

.password-toggle svg {
  width: 20px;
  height: 20px;
  color: var(--color-subtext, #666);
}

.form-hint {
  font-size: 0.85rem;
  color: var(--color-subtext, #666);
  margin-top: 4px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
  font-size: 0.9rem;
  font-weight: 600;
}

.error-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
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

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.submit-btn:hover .btn-arrow {
  transform: translateX(4px);
}

.loading-spinner {
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

.auth-footer {
  text-align: center;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.auth-footer p {
  color: var(--color-subtext, #666);
  font-size: 0.95rem;
}

.link-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
}

.link-btn:hover {
  color: #764ba2;
  text-decoration: underline;
}

.key-display {
  margin-bottom: 32px;
}

.key-box {
  padding: 32px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 2px dashed rgba(102, 126, 234, 0.3);
  border-radius: 16px;
  text-align: center;
  margin-bottom: 24px;
}

.key-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-subtext, #666);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.key-value {
  font-size: 1.8rem;
  font-weight: 800;
  font-family: 'Courier New', monospace;
  color: #667eea;
  letter-spacing: 2px;
  margin-bottom: 20px;
  word-break: break-all;
}

.copy-key-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-key-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.4);
}

.copy-key-btn svg {
  width: 18px;
  height: 18px;
}

.key-info {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: rgba(102, 126, 234, 0.05);
  border-left: 4px solid #667eea;
  border-radius: 12px;
}

.info-icon {
  width: 24px;
  height: 24px;
  color: #667eea;
  flex-shrink: 0;
}

.key-info p {
  font-size: 0.9rem;
  color: var(--color-text, #333);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .back-to-home {
    top: 16px;
    left: 16px;
    padding: 10px 16px;
    font-size: 0.85rem;
  }

  .back-to-home svg {
    width: 18px;
    height: 18px;
  }

  .auth-card {
    padding: 32px 24px;
  }

  .auth-title {
    font-size: 1.6rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .key-value {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .back-to-home span {
    display: none;
  }

  .back-to-home {
    padding: 10px;
  }

  .auth-page {
    padding: 20px 16px;
  }

  .auth-card {
    padding: 24px 20px;
  }

  .auth-title {
    font-size: 1.4rem;
  }

  .auth-icon {
    width: 60px;
    height: 60px;
  }

  .auth-icon svg {
    width: 30px;
    height: 30px;
  }

  .key-box {
    padding: 24px 16px;
  }

  .key-value {
    font-size: 1.2rem;
    letter-spacing: 1px;
  }
}
</style>