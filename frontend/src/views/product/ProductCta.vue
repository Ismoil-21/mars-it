<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-neutral-950 text-white">
    <div class="container text-center">
      <h2 class="text-3xl font-black mb-4">{{ t.product.cta.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-6"></div>
      <p class="text-neutral-400 max-w-xl mx-auto mb-8 text-lg leading-relaxed">{{ t.product.cta.sub }}</p>
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button class="cta-btn pulse-glow text-base px-8 py-4">{{ t.product.cta.btn }}</button>
        <a :href="`tel:${t.product.cta.phone}`"
          class="inline-flex items-center gap-2 text-white font-bold text-lg hover:text-mars-orange transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          {{ t.product.cta.phone }}
        </a>
      </div>
    </div>
  </section>
</template>
