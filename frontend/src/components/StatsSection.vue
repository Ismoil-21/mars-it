<script setup>
import { inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)

const icons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z"/></svg>`,
]
</script>

<template>
  <section class="py-[100px] bg-neutral-50 dark:bg-neutral-900">
    <div class="container">
      <h2 class="section-title text-neutral-900 dark:text-white">
        {{ t.stats.title1 }}<span class="accent">{{ t.stats.title2 }}</span>{{ t.stats.title3 }}
      </h2>
      <p class="section-sub">{{ t.stats.sub }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px] mt-10">
        <div
          v-for="(item, i) in t.stats.items" :key="i"
          class="reveal scale-in"
          :class="`delay-${i}`"
        >
          <div v-if="i === 1"
            class="bg-mars-orange rounded-2xl p-7 shadow-[0_6px_24px_rgba(255,106,19,.25)] hover:-translate-y-1.5 transition-transform duration-[350ms] h-full">
            <div class="w-[52px] h-[52px] rounded-[14px] bg-white/20 flex items-center justify-center text-white mb-4" v-html="icons[i]"></div>
            <b class="text-white text-xl block mb-2.5">{{ item.num }}</b>
            <span class="text-white text-sm leading-relaxed">{{ item.desc }}</span>
          </div>
          <div v-else
            class="bg-white dark:bg-neutral-800 rounded-2xl p-7 shadow-[0_6px_24px_rgba(0,0,0,.06)] dark:shadow-none border border-neutral-100 dark:border-neutral-700 hover:-translate-y-1.5 transition-transform duration-[350ms] h-full">
            <div class="w-[52px] h-[52px] rounded-[14px] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-mars-orange mb-4" v-html="icons[i]"></div>
            <b class="text-neutral-900 dark:text-white text-xl block mb-2.5">{{ item.num }}</b>
            <span class="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
