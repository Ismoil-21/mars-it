<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container">
      <h2 class="text-3xl font-black mb-3 text-center dark:text-white">
        {{ t.product.ages.title1 }}<span class="text-mars-orange">{{ t.product.ages.title2 }}</span>
      </h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-12"></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:-translate-y-1 transition-transform h-full">
          <div class="inline-flex px-4 py-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-bold text-sm mb-5">
            {{ t.product.ages.kids.age }}
          </div>
          <h3 class="text-2xl font-black mb-4 dark:text-white">{{ t.product.ages.kids.name }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">{{ t.product.ages.kids.intro }}</p>
          <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li v-for="item in t.product.ages.kids.items" :key="item" class="flex items-start gap-2">
              <span class="text-mars-orange mt-0.5">•</span>{{ item }}
            </li>
          </ul>
        </div>
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-8 border border-neutral-200 dark:border-neutral-700 hover:-translate-y-1 transition-transform h-full">
          <div class="inline-flex px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-sm mb-5">
            {{ t.product.ages.teens.age }}
          </div>
          <h3 class="text-2xl font-black mb-4 dark:text-white">{{ t.product.ages.teens.name }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">{{ t.product.ages.teens.intro }}</p>
          <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li v-for="item in t.product.ages.teens.items" :key="item" class="flex items-start gap-2">
              <span class="text-mars-orange mt-0.5">•</span>{{ item }}
            </li>
          </ul>
          <p class="mt-5 text-neutral-700 dark:text-neutral-300 font-semibold text-sm">
            {{ t.product.ages.teens.extra }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
