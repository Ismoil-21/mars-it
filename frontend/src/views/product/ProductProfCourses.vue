<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-white dark:bg-neutral-950">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-black mb-3 dark:text-white">{{ t.product.profCourses.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mb-8"></div>
      <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-6">{{ t.product.profCourses.intro }}</p>
      <ul class="space-y-3 mb-8">
        <li v-for="item in t.product.profCourses.items" :key="item" class="flex items-start gap-3 text-neutral-700 dark:text-neutral-300">
          <span class="mt-1 w-2 h-2 rounded-full bg-mars-orange flex-shrink-0"></span>
          <span>{{ item }}</span>
        </li>
      </ul>
      <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.product.profCourses.note }}</p>
    </div>
  </section>
</template>
