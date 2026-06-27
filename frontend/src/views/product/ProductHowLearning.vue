<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container max-w-4xl mx-auto">
      <h2 class="text-3xl font-black mb-3 dark:text-white">{{ t.product.howLearning.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mb-8"></div>

      <p class="text-neutral-700 dark:text-neutral-300 text-lg leading-relaxed mb-6">{{ t.product.howLearning.intro }}</p>

      <ol class="space-y-3 mb-10">
        <li v-for="(step, i) in t.product.howLearning.steps" :key="i" class="flex items-start gap-4">
          <span class="flex-shrink-0 w-8 h-8 rounded-full bg-mars-orange text-white font-black text-sm flex items-center justify-center">{{ i + 1 }}</span>
          <span class="text-neutral-700 dark:text-neutral-300 text-base pt-1">{{ step }}</span>
        </li>
      </ol>

      <div class="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
        <h3 class="text-xl font-black mb-4 dark:text-white">{{ t.product.howLearning.monthTitle }}</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-5">{{ t.product.howLearning.monthIntro }}</p>
        <ul class="space-y-3">
          <li v-for="item in t.product.howLearning.monthItems" :key="item.label" class="flex items-start gap-3">
            <span class="mt-1 w-2 h-2 rounded-full bg-mars-orange flex-shrink-0"></span>
            <span class="text-neutral-700 dark:text-neutral-300">
              <strong class="font-bold">{{ item.label }}</strong> — {{ item.desc }}
            </span>
          </li>
        </ul>
      </div>

      <p class="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed">{{ t.product.howLearning.projectNote }}</p>
    </div>
  </section>
</template>
