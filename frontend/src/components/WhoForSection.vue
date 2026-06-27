<script setup>
import { inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import kidsPhones from '../assets/kids-phones.jpg'
import programmer from '../assets/programmer.jpg'
import robotics from '../assets/robotics.jpg'
import onlineLesson from '../assets/online-lesson.jpg'

const lang = inject('lang')
const { t } = useTranslation(lang)

const imgs = [kidsPhones, programmer, robotics, onlineLesson]
const icons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
]
</script>

<template>
  <section class="py-[100px] bg-white dark:bg-neutral-950">
    <div class="container">
      <h2 class="section-title reveal fade-up text-neutral-900 dark:text-white">
        {{ t.whoFor.title1 }}<span class="accent">{{ t.whoFor.title2 }}</span>{{ t.whoFor.title3 }}
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mt-10">
        <div
          v-for="(card, i) in t.whoFor.cards" :key="i"
          class="text-center reveal fade-up flex flex-col"
          :class="`delay-${i+1}`"
        >
          <div class="rounded-2xl overflow-hidden shadow-[0_14px_40px_rgba(0,0,0,.08)] dark:shadow-[0_14px_40px_rgba(0,0,0,.6)] transition-transform duration-[400ms] hover:-translate-y-1.5 hover:scale-[1.02]">
            <img :src="imgs[i]" :alt="card" class="h-[210px] w-full object-cover" loading="lazy" />
          </div>
          <div class="w-14 h-14 rounded-full bg-white dark:bg-neutral-900 flex items-center justify-center text-mars-orange border-2 border-mars-orange/30 mx-auto -mt-7 relative z-[2]" v-html="icons[i]"></div>
          <p class="text-neutral-600 dark:text-neutral-300 font-semibold text-[15px] leading-relaxed mt-4 flex-1">{{ card }}</p>
        </div>
      </div>
      <div class="text-center mt-12 reveal fade-up">
        <button class="cta-btn" :data-source="lang?.value === 'RU' ? 'Кому подходит обучение' : 'Kimlar uchun mos'">{{ t.whoFor.cta }}</button>
      </div>
    </div>
  </section>
</template>
