<script setup>
import { inject, ref } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import TestNamePromptModal from './TestNamePromptModal.vue'
import rocket from '../assets/rocket.jpg'

const lang = inject('lang')
const { t } = useTranslation(lang)

const showNamePrompt = ref(false)

const itemIcons = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0 text-mars-orange mt-0.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0 text-mars-orange mt-0.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 shrink-0 text-mars-orange mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
]

function stripEmoji(str) {
  return str.replace(/^[\p{Emoji}\s]+/u, '').trim()
}
</script>

<template>
  <section class="py-[100px] bg-white dark:bg-neutral-950">
    <div class="container">
      <div class="reveal scale-in bg-neutral-100 dark:bg-[#181818] rounded-3xl p-[60px] grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[30px] items-center border border-neutral-200 dark:border-white/6 overflow-hidden relative">
        <div>
          <h2 class="display text-[clamp(18px,2vw,26px)] leading-[1.35] mb-[26px] font-black">
            <span class="text-mars-orange">{{ t.rocket.title1 }}</span>{{ t.rocket.title2 }}
          </h2>
          <ul class="list-none mb-[22px] space-y-3">
            <li v-for="(item, i) in t.rocket.items" :key="i" class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-[15px]">
              <span v-html="itemIcons[i]"></span>
              <span>{{ stripEmoji(item) }}</span>
            </li>
          </ul>
          <p class="text-neutral-900 dark:text-white font-semibold mb-6">
            {{ t.rocket.note }}
          </p>
          <button @click="showNamePrompt = true" class="cta-btn" data-skip-modal>{{ t.rocket.cta }}</button>
        </div>
        <img :src="rocket" alt="Rocket" class="max-w-full float" style="transform:rotate(8deg)" loading="lazy" />
      </div>
    </div>
  </section>

  <TestNamePromptModal :open="showNamePrompt" @close="showNamePrompt = false" />
</template>
