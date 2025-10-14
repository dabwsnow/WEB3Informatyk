<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

const stats = ref([
  { icon: '📝', number: '2000+', label: 'Pytań testowych' },
  { icon: '💻', number: '50+', label: 'Arkuszy praktycznych' },
  { icon: '👨‍🎓', number: '10000+', label: 'Zadowolonych uczniów' },
  { icon: '🎯', number: '95%', label: 'Zdawalność' }
])

const features = ref([
  {
    icon: '✅',
    title: 'Darmowy dostęp',
    description: 'Wszystkie materiały i testy są całkowicie bezpłatne dla każdego ucznia.'
  },
  {
    icon: '📚',
    title: 'Oficjalne materiały',
    description: 'Pytania i arkusze pochodzą z rzeczywistych egzaminów zawodowych.'
  },
  {
    icon: '🎓',
    title: 'Kompleksowe przygotowanie',
    description: 'Teoria, praktyka i testy – wszystko czego potrzebujesz w jednym miejscu.'
  },
  {
    icon: '📊',
    title: 'Śledzenie postępów',
    description: 'System statystyk pozwala monitorować Twoje postępy w nauce.'
  },
  {
    icon: '💡',
    title: 'Intuicyjny interfejs',
    description: 'Prosta i przejrzysta nawigacja ułatwia naukę i koncentrację.'
  },
  {
    icon: '🔄',
    title: 'Regularne aktualizacje',
    description: 'Baza pytań i materiałów jest stale rozwijana i aktualizowana.'
  }
])

const team = ref([
  {
    name: 'Zespół developerów',
    role: 'Twórcy platformy',
    description: 'Grupa pasjonatów programowania, którzy tworzą i rozwijają platformę.',
    icon: '👨‍💻'
  },
  {
    name: 'Instruktorzy',
    role: 'Eksperci merytoryczni',
    description: 'Doświadczeni nauczyciele informatyki weryfikujący treści edukacyjne.',
    icon: '👨‍🏫'
  },
  {
    name: 'Społeczność',
    role: 'Użytkownicy platformy',
    description: 'Uczniowie i nauczyciele wspólnie rozwijający projekt poprzez feedback.',
    icon: '👥'
  }
])

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="about-container" :class="{ visible: isVisible }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">💡</span>
          <span class="badge-text">Nasza misja</span>
        </div>
        
        <h1 class="hero-title">
          O projekcie
          <span class="hero-title-accent">WEB3Informatyk</span>
        </h1>
        
        <p class="hero-description">
          Platforma edukacyjna stworzona z myślą o uczniach przygotowujących się do egzaminów zawodowych 
          z kwalifikacji informatycznych. Naszym celem jest zapewnienie darmowego dostępu do wysokiej jakości 
          materiałów edukacyjnych dla każdego, kto chce zdać egzamin zawodowy.
        </p>
      </div>

      <div class="stats-grid">
        <div 
          v-for="(stat, index) in stats" 
          :key="index" 
          class="stat-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <span class="stat-icon">{{ stat.icon }}</span>
          <div class="stat-number">{{ stat.number }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="mission-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">🎯</span>
          Nasza misja
        </h2>
      </div>

      <div class="mission-content">
        <div class="mission-card">
          <div class="mission-icon">🚀</div>
          <h3 class="mission-title">Demokratyzacja edukacji</h3>
          <p class="mission-text">
            Wierzymy, że każdy uczeń zasługuje na dostęp do wysokiej jakości materiałów edukacyjnych, 
            niezależnie od swojej sytuacji finansowej. Dlatego wszystkie nasze zasoby są całkowicie darmowe.
          </p>
        </div>

        <div class="mission-card">
          <div class="mission-icon">💪</div>
          <h3 class="mission-title">Wsparcie w nauce</h3>
          <p class="mission-text">
            Przygotowanie do egzaminu zawodowego może być stresujące. Nasza platforma oferuje kompleksowe 
            wsparcie – od teorii, przez praktykę, aż po testy sprawdzające wiedzę.
          </p>
        </div>

        <div class="mission-card">
          <div class="mission-icon">🌟</div>
          <h3 class="mission-title">Jakość i aktualność</h3>
          <p class="mission-text">
            Wszystkie materiały są regularnie aktualizowane i weryfikowane przez doświadczonych nauczycieli, 
            aby zapewnić zgodność z aktualnymi wymaganiami egzaminacyjnymi.
          </p>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">⭐</span>
          Co nas wyróżnia?
        </h2>
      </div>

      <div class="features-grid">
        <div 
          v-for="(feature, index) in features" 
          :key="index" 
          class="feature-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="section-header">
        <h2 class="section-title">
          <span class="title-icon">👥</span>
          Nasz zespół
        </h2>
        <p class="section-subtitle">
          Projekt tworzony jest przez społeczność pasjonatów edukacji i technologii
        </p>
      </div>

      <div class="team-grid">
        <div 
          v-for="(member, index) in team" 
          :key="index" 
          class="team-card"
        >
          <div class="team-icon">{{ member.icon }}</div>
          <h3 class="team-name">{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <p class="team-description">{{ member.description }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-content">
        <h2 class="cta-title">Gotowy na start?</h2>
        <p class="cta-description">
          Dołącz do tysięcy uczniów, którzy już skorzystali z naszej platformy
        </p>
        <router-link to="/tests" class="cta-btn">
          <span>Rozpocznij naukę teraz</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
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

.about-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.about-container.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Hero Section */
.hero-section {
  padding: 60px 0 40px;
  text-align: center;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto 60px;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  max-width: 1000px;
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

/* Sections */
.mission-section,
.features-section,
.team-section {
  padding: 60px 0;
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
  margin: 0 0 16px;
}

.title-icon {
  font-size: 2.5rem;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--color-subtext);
  margin: 0;
}

/* Mission Section */
.mission-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.mission-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.mission-card:hover {
  transform: translateY(-8px);
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 16px 48px var(--color-shadow);
}

.mission-icon {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.mission-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 16px;
}

.mission-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
}

/* Features Section */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.feature-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 28px 24px;
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
  font-size: 2.5rem;
  margin-bottom: 16px;
  display: block;
}

.feature-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px;
}

.feature-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
}

/* Team Section */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.team-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 36px 28px;
  text-align: center;
  transition: all 0.3s ease;
}

.team-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px var(--color-shadow);
}

.team-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.team-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px;
}

.team-role {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0 0 16px;
}

.team-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
}

/* CTA Section */
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

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 18px 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 12px;
  text-decoration: none;
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(102, 126, 234, 0.5);
}

.cta-btn svg {
  width: 20px;
  height: 20px;
}

/* Responsive */
@media (max-width: 768px) {
  .about-container {
    padding: 0 16px 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.05rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title {
    font-size: 2rem;
  }

  .mission-content,
  .features-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }

  .cta-title {
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

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>