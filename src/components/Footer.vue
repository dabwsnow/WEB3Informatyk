<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.footer {
  position: relative;
  width: 100%;
  background: var(--color-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  margin-top: 80px;
  overflow: hidden;
  box-sizing: border-box;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 40px 40px;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  margin-bottom: 60px;
  padding-bottom: 50px;
  border-bottom: 1px solid var(--color-border);
}

.footer-brand {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.brand-logo {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.logo-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));
}

.logo-text {
  font-size: 26px;
  font-weight: 800;
  fill: url(#footerLogoGradient);
  font-family: 'Inter', sans-serif;
}

.brand-info {
  flex: 1;
  min-width: 0;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px;
}

.brand-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
  max-width: 400px;
}

.footer-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.stat-item {
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  padding: 20px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  background: rgba(102, 126, 234, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.85rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 50px;
}

.footer-column {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.column-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 24px;
  position: relative;
  padding-bottom: 12px;
}

.column-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-subtext);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 4px 0;
}

.link-icon {
  color: #667eea;
  font-weight: bold;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.footer-link:hover {
  color: var(--color-text);
  padding-left: 8px;
}

.footer-link:hover .link-icon {
  transform: translateX(4px);
}

.newsletter-text {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-subtext);
  margin: 0 0 20px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  min-width: 0;
}

.newsletter-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  background: var(--color-bg);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.newsletter-input::placeholder {
  color: var(--color-subtext);
  opacity: 0.6;
}

.newsletter-btn {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  flex-shrink: 0;
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.made-with {
  font-size: 0.85rem;
  color: var(--color-subtext);
  display: flex;
  align-items: center;
  gap: 6px;
}

.heart {
  color: #f5576c;
  animation: heartbeat 1.5s ease infinite;
  display: inline-block;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  color: var(--color-text);
  transition: all 0.3s ease;
  text-decoration: none;
  flex-shrink: 0;
}

.social-link:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.1;
}

.decoration-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0.1;
  animation: waveMove 20s ease-in-out infinite;
  border-radius: 50% 50% 0 0;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-25%) translateY(-10px); }
}

@media (max-width: 1024px) {
  .footer-container {
    padding: 50px 30px 30px;
  }
  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
  .footer-stats {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 40px 20px 30px;
  }
  .footer-top {
    margin-bottom: 40px;
    padding-bottom: 30px;
  }
  .footer-brand {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
  .brand-description {
    max-width: 100%;
  }
  .footer-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .stat-item {
    padding: 16px 12px;
  }
  .stat-number {
    font-size: 1.5rem;
  }
  .stat-label {
    font-size: 0.8rem;
  }
  .footer-links {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .footer-bottom-content {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  .copyright {
    align-items: center;
  }
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-container {
    padding: 30px 16px 24px;
  }
  .brand-logo {
    width: 50px;
    height: 50px;
  }
  .brand-name {
    font-size: 1.2rem;
  }
  .footer-stats {
    grid-template-columns: 1fr;
  }
  .stat-item {
    padding: 14px;
  }
  .newsletter-form {
    flex-direction: column;
  }
  .newsletter-btn {
    width: 100%;
  }
  .social-link {
    width: 40px;
    height: 40px;
  }
  .social-icon {
    width: 18px;
    height: 18px;
  }
}
</style><script setup>
import { ref } from 'vue'

const currentYear = new Date().getFullYear()

const footerLinks = ref({
  categories: [
    { name: 'INF.02 / EE.08', path: '/tests/inf02' },
    { name: 'INF.03 / EE.09', path: '/tests/inf03' },
    { name: 'INF.04', path: '/tests/inf04' }
  ],
  resources: [
    { name: 'Testy Online', path: '/tests' },
    { name: 'Arkusze Praktyczne', path: '/courses' },
    { name: 'Materiały', path: '/materials' },
    { name: 'Kalkulatory', path: '/tools' }
  ],
  about: [
    { name: 'O projekcie', path: '/about' },
    { name: 'Kontakt', path: '/contact' },
    { name: 'Regulamin', path: '/terms' },
    { name: 'Polityka prywatności', path: '/privacy' }
  ]
})

const socialLinks = ref([
  { 
    name: 'GitHub', 
    url: 'https://github.com',
    viewBox: '0 0 24 24',
    path: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z'
  },
  { 
    name: 'Discord', 
    url: 'https://discord.com',
    viewBox: '0 0 24 24',
    path: 'M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z'
  },
  { 
    name: 'YouTube', 
    url: 'https://youtube.com',
    viewBox: '0 0 24 24',
    path: 'M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'
  },
  { 
    name: 'Twitter', 
    url: 'https://twitter.com',
    viewBox: '0 0 24 24',
    path: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z'
  }
])

const stats = ref([
  { number: '2000+', label: 'Pytań' },
  { number: '50+', label: 'Arkuszy' },
  { number: '10k+', label: 'Użytkowników' },
  { number: '95%', label: 'Zdawalność' }
])
</script>

<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-logo">
            <svg viewBox="0 0 100 100" class="logo-svg">
              <defs>
                <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
              </defs>
              <polygon 
                points="50,10 85,30 85,70 50,90 15,70 15,30"
                fill="none"
                stroke="url(#footerLogoGradient)"
                stroke-width="3"
              />
              <text x="50" y="60" text-anchor="middle" class="logo-text">W3</text>
            </svg>
          </div>
          <div class="brand-info">
            <h3 class="brand-name">WEB3 INFORMATYK</h3>
            <p class="brand-description">
              Kompleksowa platforma do przygotowania się do egzaminów zawodowych technika informatyka
            </p>
          </div>
        </div>

        <div class="footer-stats">
          <div v-for="(stat, index) in stats" :key="index" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <div class="footer-links">
        <div class="footer-column">
          <h4 class="column-title">Kwalifikacje</h4>
          <ul class="link-list">
            <li v-for="link in footerLinks.categories" :key="link.path">
              <router-link :to="link.path" class="footer-link">
                <span class="link-icon">→</span>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Zasoby</h4>
          <ul class="link-list">
            <li v-for="link in footerLinks.resources" :key="link.path">
              <router-link :to="link.path" class="footer-link">
                <span class="link-icon">→</span>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Informacje</h4>
          <ul class="link-list">
            <li v-for="link in footerLinks.about" :key="link.path">
              <router-link :to="link.path" class="footer-link">
                <span class="link-icon">→</span>
                {{ link.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="column-title">Newsletter</h4>
          <p class="newsletter-text">
            Otrzymuj najnowsze materiały i powiadomienia o nowych testach
          </p>
          <div class="newsletter-form">
            <input 
              type="email" 
              placeholder="Twój email" 
              class="newsletter-input"
            />
            <button class="newsletter-btn">
              <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <div class="copyright">
            <p>© {{ currentYear }} WEB3 INFORMATYK. Wszystkie prawa zastrzeżone.</p>
            <p class="made-with">
              Stworzone z <span class="heart">❤️</span> dla przyszłych informatyków
            </p>
          </div>

          <div class="social-links">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              :aria-label="social.name"
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg class="social-icon" :viewBox="social.viewBox" fill="currentColor">
                <path :d="social.path"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-decoration">
      <div class="decoration-wave"></div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: relative;
  width: 100%;
  background: var(--color-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--color-border);
  margin-top: 100px;
  overflow: hidden;
}

.footer-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 40px 40px;
  position: relative;
  z-index: 1;
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  padding-bottom: 60px;
  border-bottom: 1px solid var(--color-border);
}

.footer-brand {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.brand-logo {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.logo-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.3));
}

.logo-text {
  font-size: 26px;
  font-weight: 800;
  fill: url(#footerLogoGradient);
  font-family: 'Inter', sans-serif;
}

.brand-info {
  flex: 1;
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 12px;
}

.brand-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--color-subtext);
  margin: 0;
  max-width: 400px;
}

.footer-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.stat-item {
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
  background: rgba(102, 126, 234, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--color-subtext);
  font-weight: 500;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 48px;
  margin-bottom: 60px;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.column-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 24px;
  position: relative;
  padding-bottom: 12px;
}

.column-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
}

.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-subtext);
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 4px 0;
}

.link-icon {
  color: #667eea;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.footer-link:hover {
  color: var(--color-text);
  padding-left: 8px;
}

.footer-link:hover .link-icon {
  transform: translateX(4px);
}

.newsletter-text {
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--color-subtext);
  margin: 0 0 20px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  background: var(--color-bg-hover);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  color: var(--color-text);
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
}

.newsletter-input:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.5);
  background: var(--color-bg);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.newsletter-input::placeholder {
  color: var(--color-subtext);
  opacity: 0.6;
}

.newsletter-btn {
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.newsletter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  padding-top: 40px;
  border-top: 1px solid var(--color-border);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.copyright {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright p {
  margin: 0;
  font-size: 0.9rem;
  color: var(--color-subtext);
}

.made-with {
  font-size: 0.85rem;
  color: var(--color-subtext);
  display: flex;
  align-items: center;
  gap: 6px;
}

.heart {
  color: #f5576c;
  animation: heartbeat 1.5s ease infinite;
  display: inline-block;
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1); }
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 12px;
  color: var(--color-text);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.2);
}

.social-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.social-link:hover .social-icon {
  transform: scale(1.1);
}

.footer-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  pointer-events: none;
  overflow: hidden;
  opacity: 0.1;
}

.decoration-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  opacity: 0.1;
  animation: waveMove 20s ease-in-out infinite;
  border-radius: 50% 50% 0 0;
}

@keyframes waveMove {
  0%, 100% { transform: translateX(0) translateY(0); }
  50% { transform: translateX(-25%) translateY(-10px); }
}

@media (max-width: 1024px) {
  .footer-container {
    padding: 60px 30px 30px;
  }

  .footer-top {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }

  .footer-stats {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .footer-container {
    padding: 50px 20px 30px;
  }

  .footer-top {
    margin-bottom: 50px;
    padding-bottom: 40px;
  }

  .footer-brand {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .brand-description {
    max-width: 100%;
  }

  .footer-stats {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .stat-item {
    padding: 20px 16px;
  }

  .stat-number {
    font-size: 1.6rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 24px;
    text-align: center;
  }

  .copyright {
    align-items: center;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .brand-logo {
    width: 50px;
    height: 50px;
  }

  .brand-name {
    font-size: 1.2rem;
  }

  .footer-stats {
    grid-template-columns: 1fr;
  }

  .stat-item {
    padding: 16px;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-btn {
    width: 100%;
  }

  .social-link {
    width: 40px;
    height: 40px;
  }

  .social-icon {
    width: 18px;
    height: 18px;
  }
}
</style>