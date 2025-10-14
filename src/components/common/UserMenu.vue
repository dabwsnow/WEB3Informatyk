<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)
const menuRef = ref(null)

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      firstName: '',
      lastName: '',
      username: '',
      avatar: null
    })
  }
})

const emit = defineEmits(['logout'])

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const goToProfile = () => {
  router.push('/profile')
  closeMenu()
}

const goToSettings = () => {
  router.push('/settings')
  closeMenu()
}

const handleLogout = () => {
  emit('logout')
  closeMenu()
}

const handleClickOutside = (e) => {
  if (menuRef.value && !menuRef.value.contains(e.target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const getInitials = () => {
  const first = props.user.firstName?.[0] || ''
  const last = props.user.lastName?.[0] || ''
  return (first + last).toUpperCase()
}
</script>

<template>
  <div ref="menuRef" class="user-menu-container">
    <button @click="toggleMenu" class="user-button" :class="{ active: isMenuOpen }">
      <div class="user-avatar">
        <img v-if="user.avatar" :src="user.avatar" :alt="user.firstName" />
        <span v-else class="user-initials">{{ getInitials() }}</span>
      </div>
      <div class="user-info">
        <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
      </div>
      <svg class="dropdown-icon" :class="{ rotated: isMenuOpen }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M19 9l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>

    <transition name="menu">
      <div v-if="isMenuOpen" class="user-dropdown">
        <div class="dropdown-header">
          <div class="dropdown-avatar">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.firstName" />
            <span v-else class="dropdown-initials">{{ getInitials() }}</span>
          </div>
          <div class="dropdown-info">
            <div class="dropdown-name">{{ user.firstName }} {{ user.lastName }}</div>
            <div class="dropdown-username">@{{ user.username }}</div>
          </div>
        </div>

        <div class="dropdown-divider"></div>

        <div class="dropdown-menu">
          <button @click="goToProfile" class="menu-item">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round"/>
              <circle cx="12" cy="7" r="4" stroke-width="2"/>
            </svg>
            <span>Profil</span>
          </button>

          <button @click="goToSettings" class="menu-item">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3" stroke-width="2"/>
              <path d="M12 1v6m0 6v6m5.196-15.196l-4.242 4.242m0 5.908l-4.242 4.242M23 12h-6m-6 0H1m15.196 5.196l-4.242-4.242m0-5.908l-4.242-4.242" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <span>Ustawienia</span>
          </button>

          <div class="dropdown-divider"></div>

          <button @click="handleLogout" class="menu-item logout-item">
            <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Wyloguj się</span>
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.user-menu-container {
  position: relative;
}

.user-button {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px 8px 8px;
  background: rgba(102, 126, 234, 0.1);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.user-button:hover,
.user-button.active {
  background: rgba(102, 126, 234, 0.15);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-2px);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-initials {
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--color-text, #333);
  white-space: nowrap;
}

.dropdown-icon {
  width: 18px;
  height: 18px;
  color: var(--color-text, #333);
  transition: transform 0.3s ease;
  margin-left: 4px;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.user-dropdown {
  position: absolute;
  top: calc(100% + 12px);
  right: 0;
  min-width: 280px;
  background: var(--color-bg, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: 16px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
}

.dropdown-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 14px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
}

.dropdown-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.dropdown-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dropdown-initials {
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
}

.dropdown-info {
  flex: 1;
  min-width: 0;
}

.dropdown-name {
  font-weight: 700;
  font-size: 1rem;
  color: var(--color-text, #333);
  margin-bottom: 4px;
}

.dropdown-username {
  font-size: 0.85rem;
  color: var(--color-subtext, #666);
}

.dropdown-divider {
  height: 1px;
  background: var(--color-border, #e0e0e0);
  margin: 8px 0;
}

.dropdown-menu {
  padding: 8px;
}

.menu-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: transparent;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-text, #333);
  font-size: 0.95rem;
  font-weight: 600;
  text-align: left;
}

.menu-item:hover {
  background: rgba(102, 126, 234, 0.08);
  transform: translateX(4px);
}

.menu-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.logout-item {
  color: #ef4444;
}

.logout-item:hover {
  background: rgba(239, 68, 68, 0.1);
}

.logout-item .menu-icon {
  stroke: #ef4444;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

@media (max-width: 768px) {
  .user-name {
    display: none;
  }

  .user-button {
    padding: 8px;
  }

  .dropdown-icon {
    display: none;
  }

  .user-dropdown {
    right: -10px;
  }
}
</style>