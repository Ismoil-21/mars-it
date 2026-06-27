<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-mars-navy text-white">
    <div class="container max-w-3xl mx-auto text-center">
      <h2 class="text-3xl font-black mb-3">{{ t.product.outsideLife.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-8"></div>
      <p class="text-blue-100 text-lg leading-relaxed">{{ t.product.outsideLife.desc }}</p>
    </div>
  </section>
</template>
