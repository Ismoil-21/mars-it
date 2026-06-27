<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-mars-navy via-mars-navy/90 to-neutral-900 text-white">
    <div class="container max-w-4xl mx-auto text-center">
      <span class="inline-block px-4 py-1 rounded-full bg-mars-orange/20 text-mars-orange text-xs font-black uppercase tracking-widest mb-6">
        {{ t.product.badge }}
      </span>
      <h1 class="text-4xl md:text-5xl font-black mb-2 leading-tight">
        {{ t.product.heroTitle1 }}
      </h1>
      <h2 class="text-3xl md:text-4xl font-black text-mars-orange mb-6">
        {{ t.product.heroTitle2 }}
      </h2>
      <p class="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
        {{ t.product.heroDec }}
      </p>
    </div>
  </section>
</template>
