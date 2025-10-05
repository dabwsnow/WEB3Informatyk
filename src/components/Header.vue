<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const title = ref('WEB3 INFORMATYK')
const isHovered = ref(false)
const theme = ref('dark')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleHover = () => (isHovered.value = true)
const handleLeave = () => (isHovered.value = false)

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', theme.value)
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
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

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="header-wrapper"
    :class="{ scrolled: isScrolled }"
  >
    <div 
      class="header"
      @mouseover="handleHover"
      @mouseleave="handleLeave"
    >
      <div class="header-glow"></div>
      <div class="header-shine"></div>
      
      <div class="header-content">
        <div class="header-left">
          <div class="logo-group">
            <div class="logo-icon">
              <svg viewBox="0 0 100 100" class="logo-svg">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#764ba2;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#f093fb;stop-opacity:1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <polygon 
                  points="50,10 85,30 85,70 50,90 15,70 15,30"
                  fill="none"
                  stroke="url(#logoGradient)"
                  stroke-width="3"
                  class="logo-hexagon"
                  filter="url(#glow)"
                />
                <circle cx="50" cy="35" r="2" fill="#667eea" opacity="0.6" class="logo-dot dot-1"/>
                <circle cx="65" cy="50" r="2" fill="#764ba2" opacity="0.6" class="logo-dot dot-2"/>
                <circle cx="35" cy="50" r="2" fill="#f093fb" opacity="0.6" class="logo-dot dot-3"/>
                <text x="50" y="62" text-anchor="middle" class="logo-text">W3</text>
              </svg>
            </div>
            <div class="brand-text">
              <h1 class="header-title" :class="{ glow: isHovered }">
                {{ title }}
              </h1>
              <span class="header-subtitle">Platforma edukacyjna</span>
            </div>
          </div>
        </div>

        <button class="mobile-menu-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
          <span class="hamburger" :class="{ open: isMobileMenuOpen }"></span>
        </button>

        <nav class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
          <router-link to="/" class="nav-link" :class="{ active: $route.path === '/' }" @click="isMobileMenuOpen = false">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Główna</span>
            <span class="nav-indicator"></span>
          </router-link>
          
          <router-link to="/tests" class="nav-link" :class="{ active: $route.path === '/tests' }" @click="isMobileMenuOpen = false">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Teoria</span>
            <span class="nav-indicator"></span>
          </router-link>
          
          <router-link to="/courses" class="nav-link" :class="{ active: $route.path === '/courses' }" @click="isMobileMenuOpen = false">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
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

          <router-link to="/login" class="nav-link nav-cta" :class="{ active: $route.path === '/login' }" @click="isMobileMenuOpen = false">
            <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="nav-text">Zaloguj</span>
            <span class="cta-shine"></span>
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.header-wrapper.scrolled {
  padding: 10px 20px;
}

.header {
  position: relative;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: var(--color-bg);
  padding: 18px 40px;
  border-radius: 20px;
  border: 1px solid var(--color-border);
  max-width: 1400px;
  margin: 0 auto;
  height: 80px;
  color: var(--color-text);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 40px var(--color-shadow);
  overflow: hidden;
}

.header-wrapper.scrolled .header {
  height: 70px;
  padding: 14px 36px;
  background: rgba(20, 20, 25, 0.95);
  box-shadow: 0 15px 50px var(--color-shadow);
}

[data-theme="light"] .header-wrapper.scrolled .header {
  background: rgba(255, 255, 255, 0.95);
}

.header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.6), rgba(118, 75, 162, 0.6), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.header:hover::before {
  opacity: 1;
}

.header-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.header:hover .header-glow {
  opacity: 1;
}

.header-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.05) 50%, transparent 70%);
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.8s ease;
  pointer-events: none;
}

.header:hover .header-shine {
  opacity: 1;
  transform: translateX(100%);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 1;
}

.header-left {
  flex: 1;
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo-icon {
  width: 48px;
  height: 48px;
  transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  cursor: pointer;
  flex-shrink: 0;
}

.header:hover .logo-icon {
  transform: rotate(180deg) scale(1.1);
}

.logo-svg {
  width: 100%;
  height: 100%;
}

.logo-hexagon {
  transition: all 0.4s ease;
}

.header:hover .logo-hexagon {
  stroke-width: 4;
}

.logo-dot {
  transition: all 0.4s ease;
}

.header:hover .dot-1 {
  animation: pulse 1.5s ease infinite;
}

.header:hover .dot-2 {
  animation: pulse 1.5s ease 0.2s infinite;
}

.header:hover .dot-3 {
  animation: pulse 1.5s ease 0.4s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.6; r: 2; }
  50% { opacity: 1; r: 3; }
}

.logo-text {
  font-size: 24px;
  font-weight: 900;
  fill: url(#logoGradient);
  font-family: 'Inter', sans-serif;
  letter-spacing: -1px;
}

.brand-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.header-title {
  font-size: 1.7rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
  transition: all 0.4s ease;
  white-space: nowrap;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.header-title.glow {
  filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.5));
  transform: translateY(-2px);
}

.header-subtitle {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-subtext);
  opacity: 0.8;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;
  position: relative;
}

.hamburger {
  display: block;
  width: 28px;
  height: 2px;
  background: var(--color-text);
  position: relative;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 28px;
  height: 2px;
  background: var(--color-text);
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger::before {
  top: -8px;
}

.hamburger::after {
  bottom: -8px;
}

.hamburger.open {
  background: transparent;
}

.hamburger.open::before {
  top: 0;
  transform: rotate(45deg);
}

.hamburger.open::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  position: relative;
  padding: 12px 20px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 14px;
  text-decoration: none;
  color: var(--color-subtext);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
  overflow: hidden;
}

.nav-icon {
  width: 18px;
  height: 18px;
  stroke-width: 2;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.nav-text {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-indicator {
  position: absolute;
  bottom: 6px;
  left: 20px;
  right: 20px;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  background-size: 200% 100%;
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: gradientMove 2s ease infinite;
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 0%; }
  50% { background-position: 100% 0%; }
}

.nav-link:hover {
  color: var(--color-text);
  background: rgba(102, 126, 234, 0.12);
  transform: translateY(-2px);
}

.nav-link:hover .nav-icon {
  transform: scale(1.1);
  stroke: #667eea;
}

.nav-link:hover .nav-indicator {
  transform: scaleX(1);
}

.nav-link.active {
  color: var(--color-text);
  background: rgba(102, 126, 234, 0.18);
}

.nav-link.active .nav-icon {
  stroke: #667eea;
}

.nav-link.active .nav-indicator {
  transform: scaleX(1);
}

.nav-cta {
  border: 2px solid rgba(102, 126, 234, 0.5);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15));
  font-weight: 700;
  margin-left: 8px;
}

.nav-cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.4), transparent);
  transition: left 0.6s ease;
}

.nav-cta:hover::before {
  left: 100%;
}

.nav-cta:hover {
  border-color: rgba(102, 126, 234, 0.8);
  background: rgba(102, 126, 234, 0.25);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  transform: translateY(-3px);
}

.cta-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transform: skewX(-20deg);
  transition: left 0.7s ease;
}

.nav-cta:hover .cta-shine {
  left: 120%;
}

.theme-toggle {
  background: rgba(102, 126, 234, 0.1);
  border: 1.5px solid rgba(102, 126, 234, 0.3);
  cursor: pointer;
  padding: 12px;
}

.theme-toggle:hover {
  background: rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.5);
  transform: rotate(180deg) translateY(-2px);
}

.theme-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 20px;
  height: 20px;
}

.moon-icon {
  animation: moonAppear 0.5s ease;
}

.sun-icon {
  animation: sunAppear 0.5s ease;
}

@keyframes moonAppear {
  from {
    transform: rotate(-180deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

@keyframes sunAppear {
  from {
    transform: rotate(180deg) scale(0);
    opacity: 0;
  }
  to {
    transform: rotate(0deg) scale(1);
    opacity: 1;
  }
}

/* Desktop - 1024px+ */
@media (max-width: 1024px) {
  .header {
    padding: 16px 32px;
  }

  .nav-menu {
    gap: 4px;
  }

  .nav-link {
    padding: 10px 16px;
    font-size: 0.85rem;
  }

  .header-title {
    font-size: 1.4rem;
  }
}

/* Tablet - 768px */
@media (max-width: 768px) {
  .header-wrapper {
    padding: 12px;
  }

  .header {
    height: auto;
    padding: 16px 20px;
    border-radius: 16px;
  }

  .header-wrapper.scrolled {
    padding: 8px 12px;
  }

  .header-wrapper.scrolled .header {
    padding: 14px 18px;
  }

  .mobile-menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  .header-title {
    font-size: 1.2rem;
  }

  .header-subtitle {
    font-size: 0.65rem;
  }

  .nav-menu {
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--color-bg);
    backdrop-filter: blur(20px);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 16px;
    gap: 8px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 12px 40px var(--color-shadow);
    max-height: 70vh;
    overflow-y: auto;
  }

  .nav-menu.mobile-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .nav-link {
    width: 100%;
    justify-content: flex-start;
    padding: 14px 18px;
    font-size: 0.95rem;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
  }

  .nav-indicator {
    left: 18px;
    right: 18px;
    bottom: 10px;
  }

  .nav-cta {
    margin-left: 0;
  }
}

/* Mobile - 480px */
@media (max-width: 480px) {
  .header-title {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }

  .header-subtitle {
    font-size: 0.6rem;
    letter-spacing: 1px;
  }

  .logo-icon {
    width: 36px;
    height: 36px;
  }

  .logo-group {
    gap: 12px;
  }

  .nav-link {
    padding: 12px 16px;
    font-size: 0.9rem;
  }

  .nav-icon {
    width: 18px;
    height: 18px;
  }
}

/* Very small mobile - 375px */
@media (max-width: 375px) {
  .header-title {
    font-size: 0.9rem;
  }

  .header-subtitle {
    display: none;
  }

  .brand-text {
    gap: 0;
  }
}
</style>