<script setup>
import { inject } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'
import FlagIcon from './FlagIcon.vue'
import logo from '../assets/mars-logo.png'

const lang = inject('lang')
const { isDark, toggle } = useDarkMode()

function set(v) { lang.value = v }
</script>

<template>
  <div class="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-7 pt-[14px] pointer-events-none">

    <a href="#" class="pointer-events-auto inline-flex items-center px-[14px] py-2 rounded-xl border border-white/10 bg-black/55 dark:bg-black/55 backdrop-blur-[10px] transition-transform duration-[250ms] hover:-translate-y-0.5 hover:border-mars-orange/50">
      <img :src="logo" alt="MARS IT School" class="h-7 w-auto block" />
    </a>

    <div class="pointer-events-auto flex items-center gap-2">
      <div class="inline-flex bg-black/70 dark:bg-black/70 backdrop-blur-[10px] rounded-[10px] p-1 border border-white/10">
        <button
          v-for="l in ['UZ','RU']"
          :key="l"
          @click="set(l)"
          :class="[
            'flex items-center gap-1.5 px-[14px] py-2 rounded-[7px] font-bold text-[13px] cursor-pointer border-0 transition-all duration-[250ms]',
            lang.value === l
              ? 'bg-mars-orange text-white'
              : 'bg-transparent text-[#ddd] hover:text-white'
          ]"
        >
          <FlagIcon :code="l" :size="18" />
          <span>{{ l }}</span>
        </button>
      </div>

      <button
        @click="toggle"
        class="inline-flex items-center justify-center w-[42px] h-[42px] rounded-[10px] border border-white/10 bg-black/70 backdrop-blur-[10px] text-white cursor-pointer transition-all duration-[250ms] hover:border-mars-orange/50 hover:bg-black/90"
        :aria-label="isDark ? 'Kunduzgi rejim' : 'Tungi rejim'"
      >
        <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
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
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
