<script setup>
import { ref, onMounted } from 'vue'

const title = ref('WEB3 INFORMATYK')
const isHovered = ref(false)
const theme = ref('dark')
const isScrolled = ref(false)

const handleHover = () => (isHovered.value = true)
const handleLeave = () => (isHovered.value = false)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  const savedTheme = 'dark'
  theme.value = savedTheme
  document.documentElement.setAttribute('data-theme', savedTheme)
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="header"
    :class="{ scrolled: isScrolled }"
    @mouseover="handleHover"
    @mouseleave="handleLeave"
  >
    <div class="header-glow"></div>
    
    <div class="header-content">
      <div class="header-left">
        <div class="logo-group">
          <div class="logo-icon">
            <svg viewBox="0 0 100 100" class="logo-svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
              </defs>
              <polygon 
                points="50,10 85,30 85,70 50,90 15,70 15,30"
                fill="none"
                stroke="url(#logoGradient)"
                stroke-width="3"
                class="logo-hexagon"
              />
              <text x="50" y="60" text-anchor="middle" class="logo-text">W3</text>
            </svg>
          </div>
          <h1 class="header-title" :class="{ glow: isHovered }">
            {{ title }}
          </h1>
        </div>
      </div>

      <nav class="nav-menu">
        <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }">
          <span class="nav-text">Strona główna</span>
          <span class="nav-indicator"></span>
        </router-link>
        
        <router-link to="/tests" class="nav-link" :class="{ active: $route.path === '/tests' }">
          <span class="nav-text">Teoria</span>
          <span class="nav-indicator"></span>
        </router-link>
        
        <router-link to="/courses" class="nav-link" :class="{ active: $route.path === '/courses' }">
          <span class="nav-text">Praktyka</span>
          <span class="nav-indicator"></span>
        </router-link>

        <button class="nav-link theme-toggle" @click="toggleTheme" aria-label="Przełącz motyw">
          <div class="theme-icon-wrapper">
            <svg v-if="theme === 'dark'" class="icon moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <svg v-else class="icon sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="5" stroke-width="2"/>
              <line x1="12" y1="1" x2="12" y2="3" stroke-width="2" stroke-linecap="round"/>
              <line x1="12" y1="21" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke-width="2" stroke-linecap="round"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke-width="2" stroke-linecap="round"/>
              <line x1="1" y1="12" x2="3" y2="12" stroke-width="2" stroke-linecap="round"/>
              <line x1="21" y1="12" x2="23" y2="12" stroke-width="2" stroke-linecap="round"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke-width="2" stroke-linecap="round"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
        </button>

        <router-link to="/login" class="nav-link nav-cta" :class="{ active: $route.path === '/login' }">
          <span class="nav-text">Zaloguj się</span>
          <span class="cta-shine"></span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: var(--color-bg);
  padding: 16px 32px;
  border-radius: 16px;
  border: 1px solid var(--color-border);
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1300px;
  height: 75px;
  z-index: 1000;
  color: var(--color-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px var(--color-shadow);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.header:hover::before {
  opacity: 1;
}

.header.scrolled {
  top: 10px;
  height: 65px;
  padding: 12px 28px;
  box-shadow: 0 12px 48px var(--color-shadow);
  background: rgba(30, 30, 30, 0.85);
}

[data-theme="light"] .header.scrolled {
  background: rgba(255, 255, 255, 0.85);
}

.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.header:hover .header-glow {
  opacity: 1;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  z-index: 1;
}

.header-left {
  flex: 1;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  cursor: pointer;
}

.header:hover .logo-icon {
  transform: rotate(120deg) scale(1.05);
}

.logo-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
}

.logo-hexagon {
  transition: all 0.4s ease;
}

.header:hover .logo-hexagon {
  stroke-width: 4;
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.5));
}

.logo-text {
  font-size: 22px;
  font-weight: 800;
  fill: url(#logoGradient);
  font-family: 'Inter', sans-serif;
}

.header-title {
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin: 0;
  background: linear-gradient(135deg, var(--color-text), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.4s ease;
  position: relative;
}

.header-title.glow {
  filter: drop-shadow(0 0 15px rgba(102, 126, 234, 0.4));
  transform: translateY(-1px);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-link {
  position: relative;
  padding: 10px 18px;
  font-weight: 500;
  font-size: 0.95rem;
  border-radius: 12px;
  text-decoration: none;
  color: var(--color-subtext);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-text {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.nav-indicator {
  position: absolute;
  bottom: 8px;
  left: 18px;
  right: 18px;
  height: 2px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover {
  color: var(--color-text);
  background: rgba(102, 126, 234, 0.1);
  transform: translateY(-1px);
}

.nav-link:hover .nav-indicator {
  transform: scaleX(1);
}

.nav-link.active {
  color: var(--color-text);
  background: rgba(102, 126, 234, 0.15);
}

.nav-link.active .nav-indicator {
  transform: scaleX(1);
}

.nav-cta {
  border: 1.5px solid rgba(102, 126, 234, 0.4);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  font-weight: 600;
  margin-left: 4px;
  position: relative;
  overflow: hidden;
}

.nav-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
  transition: left 0.5s ease;
}

.nav-cta:hover::before {
  left: 100%;
}

.nav-cta:hover {
  border-color: rgba(102, 126, 234, 0.6);
  background: rgba(102, 126, 234, 0.2);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.3);
  transform: translateY(-2px);
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 30%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: skewX(-20deg);
  transition: left 0.6s ease;
}

.nav-cta:hover .cta-shine {
  left: 120%;
}

.theme-toggle {
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  cursor: pointer;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.3);
  transform: rotate(20deg) translateY(-1px);
}

.theme-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
  transition: all 0.3s ease;
}

.moon-icon {
  animation: moonAppear 0.5s ease;
}

.sun-icon {
  animation: sunAppear 0.5s ease;
}

@keyframes moonAppear {
  from {
    transform: rotate(-90deg) scale(0.5);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

@keyframes sunAppear {
  from {
    transform: rotate(90deg) scale(0.5);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

/* Адаптивность */
@media (max-width: 1024px) {
  .header {
    width: calc(100% - 40px);
    padding: 14px 24px;
  }

  .nav-menu {
    gap: 6px;
  }

  .nav-link {
    padding: 8px 14px;
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .header {
    width: calc(100% - 30px);
    height: auto;
    padding: 12px 20px;
    top: 12px;
    border-radius: 12px;
  }

  .header.scrolled {
    top: 8px;
    padding: 10px 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .logo-group {
    gap: 10px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .header-title {
    font-size: 1.2rem;
    letter-spacing: 2px;
  }

  .nav-menu {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .nav-link {
    font-size: 0.85rem;
    padding: 8px 14px;
  }

  .nav-indicator {
    bottom: 6px;
    left: 14px;
    right: 14px;
  }
}

@media (max-width: 480px) {
  .header-title {
    font-size: 1rem;
    letter-spacing: 1.5px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .nav-link {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
}
</style>