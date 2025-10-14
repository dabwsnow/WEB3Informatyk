<script setup>
import { ref, onMounted } from 'vue'

const stats = ref([
  { number: '2000+', label: 'Pytań testowych', icon: '📝' },
  { number: '50+', label: 'Arkuszy praktycznych', icon: '💻' },
  { number: '95%', label: 'Zdawalność', icon: '🎯' }
])

const categories = ref([
  {
    title: 'INF.02 / EE.08',
    subtitle: 'Sprzęt, systemy, sieci',
    description: 'Administracja i eksploatacja systemów komputerowych, urządzeń peryferyjnych i lokalnych sieci komputerowych',
    icon: '🖥️',
    link: 'tests/inf02-40'
  },
  {
    title: 'INF.03 / EE.09 / E.14',
    subtitle: 'Programowanie, bazy danych',
    description: 'Tworzenie aplikacji internetowych, baz danych oraz administrowanie bazami danych',
    icon: '💾',
    link: '/tests/inf03-40'
  },
  {
    title: 'INF.04',
    subtitle: 'Projektowanie aplikacji',
    description: 'Projektowanie, programowanie i testowanie aplikacji desktopowych i mobilnych',
    icon: '📱',
    link: '/tests/inf04-40'
  }
])

const features = ref([
  { title: 'Testy Online', description: 'Tysiące pytań z oficjalnych arkuszy egzaminacyjnych', icon: '✍️' },
  { title: 'Arkusze Praktyczne', description: 'Kompletne rozwiązania zadań praktycznych krok po kroku', icon: '🔧' },
  { title: 'Nauka Teorii', description: 'Materiały edukacyjne i dokumentacja techniczna', icon: '📚' },
])

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="home-container" :class="{ visible: isVisible }">
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">🎓</span>
          <span class="badge-text">Przygotowanie do egzaminu zawodowego</span>
        </div>
        
        <h1 class="hero-title">
          Twoja droga do
          <span class="hero-title-accent">sukcesu</span>
        </h1>
        
        <p class="hero-description">
          Kompleksowa platforma do nauki i przygotowania się do egzaminów zawodowych 
          technika informatyka. Bezpłatne testy, arkusze i materiały edukacyjne.
        </p>

        <div class="hero-buttons">
          <router-link to="/tests" class="btn btn-primary">
            <span>Rozpocznij naukę</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>
          
          <router-link to="/courses" class="btn btn-secondary">
            <span>Przeglądaj materiały</span>
          </router-link>
        </div>

        <div class="stats-grid">
          <div v-for="(stat, index) in stats" :key="index" class="stat-card" :style="{ animationDelay: `${index * 0.1}s` }">
            <span class="stat-icon">{{ stat.icon }}</span>
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="hero-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </section>

    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">Główne kwalifikacje</h2>
        <p class="section-subtitle">Wybierz kwalifikację, do której chcesz się przygotować</p>
      </div>

      <div class="categories-grid">
        <div v-for="(category, index) in categories" :key="index" class="category-card" :style="{ animationDelay: `${index * 0.15}s` }">
          <div class="category-icon">{{ category.icon }}</div>
          <h3 class="category-title">{{ category.title }}</h3>
          <p class="category-subtitle">{{ category.subtitle }}</p>
          <p class="category-description">{{ category.description }}</p>
          
          <router-link :to="category.link" class="category-link">
            <span>Rozpocznij</span>
            <svg class="link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </router-link>

          <div class="category-decoration"></div>
        </div>
      </div>
    </section>

    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">Co oferujemy?</h2>
        <p class="section-subtitle">Wszystko czego potrzebujesz w jednym miejscu</p>
      </div>

      <div class="features-grid">
        <div v-for="(feature, index) in features" :key="index" class="feature-card" :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <section class="info-section">
      <div class="info-card">
        <h2 class="info-title">
          <span class="info-icon">❓</span>
          Jak wygląda egzamin?
        </h2>
        <div class="info-content">
          <p>Egzamin zawodowy składa się z <strong>dwóch części</strong>:</p>
          <ul class="info-list">
            <li><strong>Część teoretyczna (60 min)</strong> - 40 pytań wielokrotnego wyboru</li>
            <li><strong>Część praktyczna (240 min)</strong> - wykonanie praktycznych zadań egzaminacyjnych</li>
          </ul>
        </div>
      </div>

      <div class="info-card">
        <h2 class="info-title">
          <span class="info-icon">🎯</span>
          Wymagania do zdania
        </h2>
        <div class="info-content">
          <ul class="info-list">
            <li><strong>Część pisemna:</strong> minimum 50% punktów (20/40)</li>
            <li><strong>Część praktyczna:</strong> minimum 75% punktów</li>
          </ul>
          <p class="info-note">
            💡 Możesz poprawiać tylko jedną część egzaminu, jeśli zdałeś drugą.
          </p>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Gotowy na start?</h2>
        <p class="cta-description">
          Dołącz do tysięcy uczniów, którzy zdali egzamin dzięki naszej platformie
        </p>
        <router-link to="/tests" class="btn btn-cta">
          <span>Zacznij teraz bezpłatnie</span>
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </router-link>
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

.home-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  box-sizing: border-box;
}

.home-container.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-section {
  position: relative;
  padding: 60px 0 40px;
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 900px;
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
  backdrop-filter: blur(12px);
  animation: fadeInUp 0.6s ease forwards;
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
  animation: fadeInUp 0.6s ease 0.1s forwards;
  opacity: 0;
}

.hero-title-accent {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0 0 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  animation: fadeInUp 0.6s ease 0.2s forwards;
  opacity: 0;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 60px;
  animation: fadeInUp 0.6s ease 0.3s forwards;
  opacity: 0;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border: none;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: var(--color-bg);
  color: var(--color-text);
  border: 1.5px solid var(--color-border);
  backdrop-filter: blur(12px);
}

.btn-secondary:hover {
  background: var(--color-bg-hover);
  transform: translateY(-2px);
}

.btn-icon {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.stat-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 8px 24px var(--color-shadow);
}

.stat-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 800;
  color: var(--color-text);
  margin-bottom: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  filter: blur(60px);
}

.circle-1 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  top: -200px;
  left: -100px;
  animation: float 8s ease-in-out infinite;
}

.circle-2 {
  width: 300px;
  height: 300px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  bottom: -150px;
  right: -50px;
  animation: float 10s ease-in-out infinite reverse;
}

.circle-3 {
  width: 250px;
  height: 250px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  top: 50%;
  right: 10%;
  animation: float 12s ease-in-out infinite;
}

.categories-section,
.features-section,
.info-section {
  padding: 60px 0;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 16px;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-subtext);
  margin: 0;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}

.category-card {
  position: relative;
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px 28px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.category-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 16px 48px var(--color-shadow);
}

.category-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
  display: inline-block;
  transition: transform 0.4s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
}

.category-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px;
}

.category-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0 0 16px;
}

.category-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0 0 24px;
}

.category-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.category-link:hover {
  gap: 12px;
}

.link-arrow {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.category-link:hover .link-arrow {
  transform: translateX(4px);
}

.category-decoration {
  position: absolute;
  bottom: -50px;
  right: -50px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  opacity: 0.05;
  background: linear-gradient(135deg, #667eea, #764ba2);
  transition: all 0.4s ease;
}

.category-card:hover .category-decoration {
  transform: scale(1.5);
  opacity: 0.08;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.feature-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease forwards;
  opacity: 0;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px var(--color-shadow);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1);
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px;
}

.feature-description {
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--color-subtext);
  margin: 0;
}

.info-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}

.info-card {
  background: var(--color-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--color-shadow);
}

.info-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 24px;
}

.info-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.info-content p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0 0 16px;
}

.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-list li {
  padding: 12px 0 12px 28px;
  position: relative;
  color: var(--color-text);
  line-height: 1.6;
}

.info-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.info-note {
  margin-top: 20px;
  padding: 16px;
  background: rgba(102, 126, 234, 0.1);
  border-left: 3px solid #667eea;
  border-radius: 8px;
  font-size: 0.95rem;
}

.cta-section {
  padding: 80px 0;
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-text);
  margin: 0 0 20px;
}

.cta-description {
  font-size: 1.2rem;
  color: var(--color-subtext);
  margin: 0 0 40px;
}

.btn-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 18px 48px;
  font-size: 1.1rem;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
}

.btn-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.5);
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

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

@media (max-width: 1024px) {
  .hero-title {
    font-size: 3rem;
  }
  .categories-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 0 16px;
  }
  .hero-section {
    padding: 40px 0 30px;
  }
  .hero-title {
    font-size: 2.2rem;
  }
  .hero-description {
    font-size: 1.05rem;
  }
  .hero-buttons {
    flex-direction: column;
    gap: 12px;
  }
  .btn {
    width: 100%;
    justify-content: center;
  }
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .section-title {
    font-size: 2rem;
  }
  .categories-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }
  .cta-title {
    font-size: 2rem;
  }
  .info-section {
    gap: 20px;
    grid-template-columns: 1fr;
  }
  .info-card {
    padding: 28px 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  .hero-description {
    font-size: 0.95rem;
  }
  .category-card,
  .info-card {
    padding: 24px 20px;
  }
  .btn {
    padding: 12px 24px;
    font-size: 0.95rem;
  }
}
</style>