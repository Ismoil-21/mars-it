<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-black mb-3 dark:text-white">{{ t.product.whyFuture.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mb-8"></div>
      <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-4">{{ t.product.whyFuture.p1 }}</p>
      <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-6">{{ t.product.whyFuture.p2 }}</p>
      <ul class="space-y-3 mb-8">
        <li v-for="item in t.product.whyFuture.items" :key="item" class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300 text-base">
          <span class="mt-1 w-2 h-2 rounded-full bg-mars-orange flex-shrink-0"></span>
          <span>{{ item }}</span>
        </li>
      </ul>
      <div class="bg-white dark:bg-neutral-800 border-l-4 border-mars-orange rounded-r-xl p-6">
        <p class="text-neutral-700 dark:text-neutral-300 leading-relaxed">{{ t.product.whyFuture.conclusion }}</p>
      </div>
    </div>
  </section>
</template>
