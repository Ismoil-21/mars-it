import { ref } from 'vue'

const isDark = ref(false)
let initialized = false

export function useDarkMode() {
  if (!initialized && typeof window !== 'undefined') {
    initialized = true
    const saved = localStorage.getItem('mars-dark')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    isDark.value = saved !== null ? saved === '1' : prefersDark
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('mars-dark', isDark.value ? '1' : '0')
  }

  return { isDark, toggle }
}
