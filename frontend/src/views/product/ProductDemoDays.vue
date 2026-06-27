<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-gradient-to-br from-mars-navy to-mars-navy/80 text-white">
    <div class="container text-center">
      <h2 class="text-3xl font-black mb-4">{{ t.product.demoDays.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-8"></div>
      <p class="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed mb-4">{{ t.product.demoDays.desc }}</p>
      <p class="text-white/80 max-w-xl mx-auto font-semibold">{{ t.product.demoDays.note }}</p>
    </div>
  </section>
</template>
