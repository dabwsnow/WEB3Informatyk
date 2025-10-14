<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const lastUpdate = ref('07.10.2025')

const sections = ref([
  {
    id: 1,
    title: 'Postanowienia ogólne',
    icon: '📋',
    content: [
      'Niniejszy Regulamin określa zasady korzystania z platformy edukacyjnej WEB3Informatyk (dalej: "Platforma").',
      'Administratorem Platformy jest WEB3Informatyk.',
      'Korzystanie z Platformy jest równoznaczne z akceptacją niniejszego Regulaminu.',
      'Platforma jest dostępna bezpłatnie dla wszystkich użytkowników.'
    ]
  },
  {
    id: 2,
    title: 'Definicje',
    icon: '📖',
    content: [
      'Platforma - serwis internetowy WEB3Informatyk dostępny pod adresem [adres strony].',
      'Użytkownik - osoba korzystająca z Platformy.',
      'Konto - indywidualne konto użytkownika umożliwiające dostęp do dodatkowych funkcji Platformy.',
      'Treści - materiały edukacyjne, testy, arkusze i inne zasoby dostępne na Platformie.'
    ]
  },
  {
    id: 3,
    title: 'Zasady korzystania z Platformy',
    icon: '✅',
    content: [
      'Użytkownik zobowiązuje się do korzystania z Platformy zgodnie z obowiązującym prawem i normami społecznymi.',
      'Zabrania się wykorzystywania Platformy w sposób naruszający prawa osób trzecich.',
      'Użytkownik nie może kopiować, modyfikować ani rozpowszechniać treści Platformy bez zgody Administratora.',
      'Zabronione jest próby włamania, naruszenia bezpieczeństwa lub zakłócania działania Platformy.'
    ]
  },
  {
    id: 4,
    title: 'Rejestracja i konto użytkownika',
    icon: '👤',
    content: [
      'Założenie konta jest dobrowolne i bezpłatne.',
      'Podczas rejestracji Użytkownik zobowiązany jest podać prawdziwe dane.',
      'Użytkownik jest odpowiedzialny za zachowanie poufności danych dostępowych do swojego konta.',
      'Użytkownik może w każdej chwili usunąć swoje konto kontaktując się z Administratorem.'
    ]
  },
  {
    id: 5,
    title: 'Prawa autorskie',
    icon: '©️',
    content: [
      'Wszystkie treści dostępne na Platformie są chronione prawem autorskim.',
      'Użytkownik może korzystać z materiałów wyłącznie na własny użytek edukacyjny.',
      'Zabronione jest komercyjne wykorzystywanie treści bez zgody Administratora.',
      'Pytania egzaminacyjne pochodzą z oficjalnych arkuszy i są własnością ich autorów.'
    ]
  },
  {
    id: 6,
    title: 'Odpowiedzialność',
    icon: '⚖️',
    content: [
      'Administrator dokłada wszelkich starań aby treści na Platformie były aktualne i poprawne.',
      'Administrator nie ponosi odpowiedzialności za decyzje podjęte na podstawie informacji z Platformy.',
      'Platforma jest udostępniana w stanie "jak jest" bez żadnych gwarancji.',
      'Administrator nie odpowiada za tymczasowe niedostępności Platformy.'
    ]
  },
  {
    id: 7,
    title: 'Zmiany w Regulaminie',
    icon: '🔄',
    content: [
      'Administrator zastrzega sobie prawo do wprowadzania zmian w Regulaminie.',
      'O zmianach Użytkownicy zostaną poinformowani za pośrednictwem Platformy.',
      'Dalsze korzystanie z Platformy po wprowadzeniu zmian oznacza ich akceptację.',
      'Aktualna wersja Regulaminu jest zawsze dostępna na stronie.'
    ]
  },
  {
    id: 8,
    title: 'Postanowienia końcowe',
    icon: '📝',
    content: [
      'W sprawach nieuregulowanych w niniejszym Regulaminie stosuje się przepisy prawa polskiego.',
      'Wszelkie spory będą rozstrzygane przez właściwy sąd polski.',
      'W przypadku pytań dotyczących Regulaminu prosimy o kontakt: kontakt@web3informatyk.pl',
      'Regulamin wchodzi w życie z dniem publikacji.'
    ]
  }
])

const scrollToSection = (sectionId) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    const offset = 100 // offset od góry
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <div class="terms-container" :class="{ visible: isVisible }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">📜</span>
          <span class="badge-text">Dokumenty prawne</span>
        </div>
        
        <h1 class="hero-title">
          Regulamin
          <span class="hero-title-accent">WEB3Informatyk</span>
        </h1>
        
        <p class="hero-description">
          Zapoznaj się z zasadami korzystania z naszej platformy edukacyjnej. 
          Korzystając z serwisu akceptujesz poniższe warunki.
        </p>

        <div class="update-info">
          <svg class="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <polyline points="12 6 12 12 16 14" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>Ostatnia aktualizacja: <strong>{{ lastUpdate }}</strong></span>
        </div>
      </div>
    </section>

    <!-- Table of Contents -->
    <section class="toc-section">
      <div class="toc-card">
        <h2 class="toc-title">Spis treści</h2>
        <ul class="toc-list">
          <li v-for="section in sections" :key="section.id" class="toc-item">
            <button 
              @click="scrollToSection(section.id)" 
              class="toc-link"
            >
              <span class="toc-icon">{{ section.icon }}</span>
              <span>{{ section.title }}</span>
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- Sections -->
    <section class="content-section">
      <div 
        v-for="section in sections" 
        :key="section.id" 
        :id="`section-${section.id}`"
        class="content-card"
      >
        <div class="section-header">
          <span class="section-icon">{{ section.icon }}</span>
          <h2 class="section-title">§{{ section.id }}. {{ section.title }}</h2>
        </div>
        
        <ol class="section-content">
          <li v-for="(item, index) in section.content" :key="index" class="content-item">
            {{ item }}
          </li>
        </ol>
      </div>
    </section>

    <!-- Footer Note -->
    <section class="footer-note">
      <div class="note-card">
        <svg class="note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="10" stroke-width="2"/>
          <path d="M12 16v-4M12 8h.01" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <div class="note-content">
          <h3 class="note-title">Masz pytania?</h3>
          <p class="note-text">
            Jeśli masz jakiekolwiek pytania dotyczące Regulaminu, skontaktuj się z nami poprzez 
            <router-link to="/contact" class="note-link">formularz kontaktowy</router-link>.
          </p>
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

.terms-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.terms-container.visible {
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
  margin: 0 0 32px;
}

.update-info {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  font-size: 0.95rem;
  color: var(--color-text);
}

.info-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

/* Table of Contents */
.toc-section {
  padding: 40px 0;
}

.toc-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
}

.toc-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 24px;
}

.toc-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 12px;
}

.toc-item {
  margin: 0;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  text-align: left;
  color: var(--color-text);
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toc-link:hover {
  background: rgba(102, 126, 234, 0.1);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateX(4px);
}

.toc-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
}

/* Content Section */
.content-section {
  padding: 40px 0;
}

.content-card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  scroll-margin-top: 100px;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--color-border);
}

.section-icon {
  font-size: 2.5rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.section-content {
  counter-reset: item;
  list-style: none;
  padding: 0;
}

.content-item {
  position: relative;
  padding-left: 40px;
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
  counter-increment: item;
}

.content-item::before {
  content: counter(item) ".";
  position: absolute;
  left: 0;
  font-weight: 700;
  color: #667eea;
  font-size: 1.1rem;
}

.content-item:last-child {
  margin-bottom: 0;
}

/* Footer Note */
.footer-note {
  padding: 40px 0;
}

.note-card {
  display: flex;
  gap: 20px;
  padding: 32px;
  background: rgba(102, 126, 234, 0.05);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-left: 4px solid #667eea;
  border-radius: 16px;
}

.note-icon {
  width: 32px;
  height: 32px;
  color: #667eea;
  flex-shrink: 0;
}

.note-content {
  flex: 1;
}

.note-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px;
}

.note-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
}

.note-link {
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.note-link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 768px) {
  .terms-container {
    padding: 0 16px 40px;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1.05rem;
  }

  .toc-list {
    grid-template-columns: 1fr;
  }

  .content-card {
    padding: 24px;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .note-card {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 0.95rem;
  }

  .toc-card,
  .content-card,
  .note-card {
    padding: 20px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .content-item {
    padding-left: 32px;
    font-size: 0.95rem;
  }
}
</style>