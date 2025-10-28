const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.web-informatyk.lol'

export const api = {
  // Получить список категорий
  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/api/categories`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить категории')
    }
    return await response.json()
  },
  
  // Получить тест по категории
  async getTest(categoryCode) {
    const response = await fetch(`${API_BASE_URL}/api/tests/${categoryCode}`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить тест')
    }
    return await response.json()
  },
  
  // Получить базу вопросов (все вопросы категории с ответами)
  async getQuestionDatabase(categoryCode) {
    const response = await fetch(`${API_BASE_URL}/api/tests/${categoryCode}`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить базу вопросов')
    }
    return await response.json()
  },
  
  // Отправить результаты теста
  async submitTest(categoryCode, answers) {
    const response = await fetch(`${API_BASE_URL}/api/tests/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category_code: categoryCode,
        answers: answers
      })
    })
    if (!response.ok) {
      throw new Error('Не удалось отправить результаты')
    }
    return await response.json()
  },
  
  async search(query) {
  if (!query || query.trim().length < 2) {
    return { questions: [], tests: [], practices: [] }  // ← Добавь practices
  }
  
  const response = await fetch(`${API_BASE_URL}/api/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error('Ошибка поиска')
  }
  return await response.json()
},

  // === ПРАКТИКА API ===
  
  // Получить все профили практики
  async getPracticeProfiles() {
    const response = await fetch(`${API_BASE_URL}/api/practice/profiles`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить профили практики')
    }
    return await response.json()
  },

  // Получить детали профиля с архивами
  async getPracticeProfile(profileId) {
    const response = await fetch(`${API_BASE_URL}/api/practice/profile/${profileId}`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить профиль')
    }
    return await response.json()
  },

  // Получить детали конкретного архива
  async getPracticeArchive(profileId, archiveId) {
    const response = await fetch(`${API_BASE_URL}/api/practice/archive/${profileId}/${archiveId}`)
    if (!response.ok) {
      throw new Error('Не удалось загрузить архив')
    }
    return await response.json()
  }
}