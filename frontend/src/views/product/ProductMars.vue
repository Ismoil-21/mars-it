<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-white dark:bg-neutral-950">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-black mb-3 text-center dark:text-white">{{ t.product.marsWhat.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-10"></div>
      <div class="space-y-5">
        <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">{{ t.product.marsWhat.p1 }}</p>
        <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed">{{ t.product.marsWhat.p2 }}</p>
      </div>
    </div>
  </section>
</template>
