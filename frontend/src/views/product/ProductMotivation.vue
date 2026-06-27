<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-white dark:bg-neutral-950">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-black mb-3 dark:text-white">
        {{ t.product.motivation.title1 }}<span class="text-mars-orange">{{ t.product.motivation.title2 }}</span>
      </h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-8"></div>
      <p class="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed mb-10">{{ t.product.motivation.desc }}</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch">

        <!-- Coin -->
        <div class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 h-full">
          <div class="flex justify-center mb-3">
            <div class="w-14 h-14 rounded-full bg-mars-orange/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-mars-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
                <text x="9" y="15" font-size="8" fill="currentColor" stroke="none" font-weight="bold">$</text>
              </svg>
            </div>
          </div>
          <p class="font-bold dark:text-white text-sm">{{ t.product.motivation.coin }}</p>
        </div>

        <!-- Shop -->
        <div class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 h-full">
          <div class="flex justify-center mb-3">
            <div class="w-14 h-14 rounded-full bg-mars-orange/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-mars-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
          </div>
          <p class="font-bold dark:text-white text-sm">{{ t.product.motivation.shop }}</p>
        </div>

        <!-- Prize / Gamepad -->
        <div class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 h-full">
          <div class="flex justify-center mb-3">
            <div class="w-14 h-14 rounded-full bg-mars-orange/10 flex items-center justify-center">
              <svg class="w-7 h-7 text-mars-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <line x1="6" y1="12" x2="10" y2="12"/>
                <line x1="8" y1="10" x2="8" y2="14"/>
                <circle cx="16" cy="11" r="1" fill="currentColor"/>
                <circle cx="18" cy="13" r="1" fill="currentColor"/>
              </svg>
            </div>
          </div>
          <p class="font-bold dark:text-white text-sm">{{ t.product.motivation.prize }}</p>
        </div>

      </div>
    </div>
  </section>
</template>
