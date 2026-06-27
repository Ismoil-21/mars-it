<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '../../composables/useTranslation'
import { useDarkMode } from '../../composables/useDarkMode'
import FlagIcon from '../../components/FlagIcon.vue'
import logo from '../../assets/mars-logo.png'

const lang = inject('lang')
const { t } = useTranslation(lang)
const router = useRouter()
const { isDark, toggle } = useDarkMode()

function setLang(v) { lang.value = v }
</script>

<template>
  <header class="sticky top-0 z-50 bg-white dark:bg-neutral-950 border-b border-neutral-100 dark:border-neutral-800 shadow-sm">
    <div class="container flex items-center justify-between py-3 gap-4">
      <a href="#" @click.prevent="router.push('/')" class="inline-flex items-center shrink-0">
        <img :src="logo" alt="MARS IT School" class="h-8 w-auto block" />
      </a>

      <div class="flex items-center gap-2">
        <!-- Lang switcher -->
        <div class="inline-flex bg-neutral-100 dark:bg-neutral-800 rounded-[10px] p-1">
          <button
            v-for="l in ['UZ','RU']"
            :key="l"
            @click="setLang(l)"
            :class="[
              'flex items-center gap-1 px-3 py-1.5 rounded-[7px] font-bold text-[12px] cursor-pointer border-0 transition-all duration-[200ms]',
              lang.value === l
                ? 'bg-mars-orange text-white shadow-sm'
                : 'bg-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            ]"
          >
            <FlagIcon :code="l" :size="16" />
            <span>{{ l }}</span>
          </button>
        </div>

        <!-- Dark mode toggle -->
        <button
          @click="toggle"
          class="w-9 h-9 rounded-[8px] border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center cursor-pointer transition-all hover:border-mars-orange/50"
          :aria-label="isDark ? 'Kunduzgi rejim' : 'Tungi rejim'"
        >
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>

        <!-- Back button -->
        <button
          @click="router.push('/')"
          class="text-sm font-semibold text-neutral-500 dark:text-neutral-400 hover:text-mars-orange dark:hover:text-mars-orange transition-colors hidden sm:block"
        >
          {{ t.product.backBtn }}
        </button>
      </div>
    </div>
  </header>
</template>
