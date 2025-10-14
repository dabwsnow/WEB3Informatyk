<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const lastUpdate = ref('07.10.2025')

const sections = ref([
  {
    id: 1,
    title: 'Informacje ogólne',
    icon: 'ℹ️',
    content: [
      'Administratorem danych osobowych zbieranych za pośrednictwem Platformy WEB3Informatyk jest WEB3Informatyk.',
      'Szanujemy Twoją prywatność i dokładamy wszelkich starań aby Twoje dane osobowe były bezpieczne.',
      'Niniejsza Polityka Prywatności wyjaśnia jak zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.',
      'Korzystanie z Platformy oznacza akceptację zasad opisanych w tej Polityce.'
    ]
  },
  {
    id: 2,
    title: 'Jakie dane zbieramy?',
    icon: '📊',
    content: [
      'Dane podane podczas rejestracji: imię, nazwisko, adres email, nazwa użytkownika.',
      'Dane techniczne: adres IP, typ przeglądarki, system operacyjny, data i godzina wizyty.',
      'Dane dotyczące aktywności: postępy w nauce, wyniki testów, statystyki użytkowania.',
      'Pliki cookies wykorzystywane do prawidłowego działania Platformy i zapamiętywania preferencji.'
    ]
  },
  {
    id: 3,
    title: 'W jakim celu przetwarzamy dane?',
    icon: '🎯',
    content: [
      'Świadczenie usług edukacyjnych i funkcjonalności Platformy.',
      'Tworzenie i zarządzanie kontem użytkownika.',
      'Śledzenie postępów w nauce i generowanie statystyk.',
      'Komunikacja z użytkownikami i odpowiadanie na zapytania.',
      'Ulepszanie działania Platformy i dostosowywanie treści.',
      'Zapewnienie bezpieczeństwa i zapobieganie nadużyciom.'
    ]
  },
  {
    id: 4,
    title: 'Podstawa prawna przetwarzania',
    icon: '⚖️',
    content: [
      'Zgoda użytkownika (art. 6 ust. 1 lit. a RODO) - dla opcjonalnych funkcji wymagających zgody.',
      'Wykonanie umowy (art. 6 ust. 1 lit. b RODO) - świadczenie usług Platformy.',
      'Prawnie uzasadniony interes administratora (art. 6 ust. 1 lit. f RODO) - analiza statystyk, bezpieczeństwo.',
      'Obowiązek prawny (art. 6 ust. 1 lit. c RODO) - gdy wymagane przepisami prawa.'
    ]
  },
  {
    id: 5,
    title: 'Udostępnianie danych osobowych',
    icon: '🔐',
    content: [
      'Nie sprzedajemy, nie wynajmujemy ani nie udostępniamy Twoich danych osobowych podmiotom trzecim w celach marketingowych.',
      'Dane mogą być udostępniane zaufanym dostawcom usług technicznych (hosting, analityka) działającym w naszym imieniu.',
      'Możemy ujawnić dane jeśli będzie to wymagane przez prawo lub organy państwowe.',
      'Wszyscy nasi partnerzy zobowiązani są do ochrony danych zgodnie z RODO.'
    ]
  },
  {
    id: 6,
    title: 'Bezpieczeństwo danych',
    icon: '🛡️',
    content: [
      'Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych.',
      'Dane przesyłane są przy użyciu szyfrowanego połączenia SSL/TLS.',
      'Dostęp do danych osobowych mają tylko upoważnione osoby.',
      'Regularnie aktualizujemy nasze systemy bezpieczeństwa.',
      'W przypadku naruszenia bezpieczeństwa danych niezwłocznie powiadomimy użytkowników i odpowiednie organy.'
    ]
  },
  {
    id: 7,
    title: 'Pliki cookies',
    icon: '🍪',
    content: [
      'Platforma wykorzystuje pliki cookies do zapewnienia prawidłowego działania i zapamiętywania preferencji.',
      'Cookies niezbędne - wymagane do podstawowego działania strony (sesja, bezpieczeństwo).',
      'Cookies funkcjonalne - zapamiętują Twoje preferencje i wybory.',
      'Cookies analityczne - pomagają zrozumieć jak użytkownicy korzystają z Platformy.',
      'Możesz zarządzać cookies w ustawieniach swojej przeglądarki.'
    ]
  },
  {
    id: 8,
    title: 'Twoje prawa',
    icon: '✋',
    content: [
      'Prawo dostępu do swoich danych osobowych.',
      'Prawo do sprostowania (poprawiania) nieprawidłowych danych.',
      'Prawo do usunięcia danych ("prawo do bycia zapomnianym").',
      'Prawo do ograniczenia przetwarzania danych.',
      'Prawo do przenoszenia danych do innego administratora.',
      'Prawo do wniesienia sprzeciwu wobec przetwarzania danych.',
      'Prawo do cofnięcia zgody w dowolnym momencie.',
      'Prawo do wniesienia skargi do organu nadzorczego (UODO).'
    ]
  },
  {
    id: 9,
    title: 'Okres przechowywania danych',
    icon: '⏱️',
    content: [
      'Dane konta użytkownika przechowujemy do momentu usunięcia konta lub wycofania zgody.',
      'Dane dotyczące postępów w nauce przechowujemy przez okres aktywności konta.',
      'Dane techniczne i logi przechowujemy przez okres niezbędny do zapewnienia bezpieczeństwa (maksymalnie 12 miesięcy).',
      'Po zakończeniu okresu przechowywania dane są bezpiecznie usuwane.'
    ]
  },
  {
    id: 10,
    title: 'Zmiany w Polityce Prywatności',
    icon: '🔄',
    content: [
      'Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej Polityce Prywatności.',
      'O wszelkich zmianach poinformujemy użytkowników za pośrednictwem Platformy lub email.',
      'Zmiany wchodzą w życie w terminie wskazanym w powiadomieniu.',
      'Aktualna wersja Polityki jest zawsze dostępna na stronie.'
    ]
  },
  {
    id: 11,
    title: 'Kontakt',
    icon: '📧',
    content: [
      'W przypadku pytań dotyczących przetwarzania danych osobowych skontaktuj się z nami:',
      'Email: kontakt@web3informatyk.pl',
      'Administrator danych: WEB3Informatyk',
      'Masz prawo do kontaktu z Inspektorem Ochrony Danych (jeśli został wyznaczony).'
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
  <div class="privacy-container" :class="{ visible: isVisible }">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">🔒</span>
          <span class="badge-text">RODO</span>
        </div>
        
        <h1 class="hero-title">
          Polityka
          <span class="hero-title-accent">Prywatności</span>
        </h1>
        
        <p class="hero-description">
          Dowiedz się jak chronimy Twoje dane osobowe i jakie masz prawa zgodnie z RODO. 
          Twoja prywatność jest dla nas priorytetem.
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

    <!-- Important Notice -->
    <section class="notice-section">
      <div class="notice-card">
        <svg class="notice-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-width="2"/>
          <line x1="12" y1="9" x2="12" y2="13" stroke-width="2" stroke-linecap="round"/>
          <line x1="12" y1="17" x2="12.01" y2="17" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <div class="notice-content">
          <h3 class="notice-title">Ważne informacje o danych</h3>
          <p class="notice-text">
            Zgodnie z RODO (Rozporządzenie o Ochronie Danych Osobowych) masz pełną kontrolę nad swoimi danymi. 
            Możesz je w każdej chwili przeglądać, modyfikować lub usunąć.
          </p>
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
          <h2 class="section-title">{{ section.id }}. {{ section.title }}</h2>
        </div>
        
        <ul class="section-content">
          <li v-for="(item, index) in section.content" :key="index" class="content-item">
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <!-- Rights Summary -->
    <section class="rights-summary">
      <div class="summary-card">
        <h2 class="summary-title">
          <span class="summary-icon">⚡</span>
          Twoje prawa w skrócie
        </h2>
        <div class="rights-grid">
          <div class="right-item">
            <div class="right-icon">👁️</div>
            <div class="right-title">Dostęp</div>
            <div class="right-text">Sprawdź jakie dane o Tobie posiadamy</div>
          </div>
          <div class="right-item">
            <div class="right-icon">✏️</div>
            <div class="right-title">Poprawienie</div>
            <div class="right-text">Zaktualizuj nieprawidłowe informacje</div>
          </div>
          <div class="right-item">
            <div class="right-icon">🗑️</div>
            <div class="right-title">Usunięcie</div>
            <div class="right-text">Usuń swoje dane z naszej platformy</div>
          </div>
          <div class="right-item">
            <div class="right-icon">📦</div>
            <div class="right-title">Przeniesienie</div>
            <div class="right-text">Pobierz swoje dane w formacie elektronicznym</div>
          </div>
        </div>
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
          <h3 class="note-title">Masz pytania dotyczące swoich danych?</h3>
          <p class="note-text">
            Skontaktuj się z nami poprzez 
            <router-link to="/contact" class="note-link">formularz kontaktowy</router-link>
            a odpowiemy na wszystkie Twoje pytania dotyczące przetwarzania danych osobowych.
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

.privacy-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 60px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}

.privacy-container.visible {
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

/* Notice Section */
.notice-section {
  padding: 20px 0 40px;
}

.notice-card {
  display: flex;
  gap: 20px;
  padding: 28px 32px;
  background: rgba(245, 158, 11, 0.05);
  border: 1px solid rgba(245, 158, 11, 0.2);
  border-left: 4px solid #f59e0b;
  border-radius: 16px;
}

.notice-icon {
  width: 32px;
  height: 32px;
  color: #f59e0b;
  flex-shrink: 0;
}

.notice-content {
  flex: 1;
}

.notice-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 12px;
}

.notice-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin: 0;
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
  list-style: none;
  padding: 0;
}

.content-item {
  position: relative;
  padding-left: 28px;
  margin-bottom: 16px;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--color-text);
}

.content-item::before {
  content: "•";
  position: absolute;
  left: 8px;
  font-weight: 700;
  color: #667eea;
  font-size: 1.5rem;
}

.content-item:last-child {
  margin-bottom: 0;
}

/* Rights Summary */
.rights-summary {
  padding: 40px 0;
}

.summary-card {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 20px;
  padding: 40px 32px;
}

.summary-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 32px;
  text-align: center;
}

.summary-icon {
  font-size: 2rem;
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
}

.right-item {
  text-align: center;
  padding: 24px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.right-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px var(--color-shadow);
}

.right-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.right-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 8px;
}

.right-text {
  font-size: 0.9rem;
  color: var(--color-subtext);
  line-height: 1.5;
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
  .privacy-container {
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

  .notice-card,
  .note-card {
    flex-direction: column;
  }

  .rights-grid {
    grid-template-columns: 1fr;
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
  .note-card,
  .summary-card {
    padding: 20px;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .content-item {
    padding-left: 24px;
    font-size: 0.95rem;
  }
}
</style>