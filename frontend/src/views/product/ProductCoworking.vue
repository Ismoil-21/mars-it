<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-white dark:bg-neutral-950">
    <div class="container">
      <h2 class="text-3xl font-black mb-3 text-center dark:text-white">
        {{ t.product.coworking.title1 }}<span class="text-mars-orange">{{ t.product.coworking.title2 }}</span>
      </h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-12"></div>
      <div class="max-w-3xl mx-auto space-y-4">
        <p class="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{{ t.product.coworking.p1 }}</p>
        <p class="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed">{{ t.product.coworking.p2 }}</p>
      </div>
    </div>
  </section>
</template>
