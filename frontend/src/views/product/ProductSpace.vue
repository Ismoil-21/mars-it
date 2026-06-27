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
        {{ t.product.space.title1 }}<span class="text-mars-orange">{{ t.product.space.title2 }}</span>
      </h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-6"></div>
      <p class="text-neutral-600 dark:text-neutral-400 text-center max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
        {{ t.product.space.intro }}
      </p>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10 items-stretch">
        <div
          v-for="item in t.product.space.items"
          :key="item"
          class="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-5 text-center hover:-translate-y-1 transition-transform h-full flex flex-col items-center justify-center"
        >
          <span class="text-mars-orange text-2xl font-black block mb-2">✦</span>
          <span class="text-neutral-700 dark:text-neutral-300 font-semibold text-sm">{{ item }}</span>
        </div>
      </div>

      <div class="max-w-2xl mx-auto bg-mars-navy text-white rounded-2xl p-8">
        <h3 class="text-xl font-black mb-3">{{ t.product.space.motivationTitle }}</h3>
        <p class="text-blue-100 leading-relaxed">{{ t.product.space.motivationDesc }}</p>
      </div>
    </div>
  </section>
</template>
