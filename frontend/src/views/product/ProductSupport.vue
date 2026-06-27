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
        {{ t.product.support.title1 }}<span class="text-mars-orange">{{ t.product.support.title2 }}</span>
      </h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-12"></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto items-stretch">
        <div class="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform h-full">
          <div class="w-14 h-14 rounded-full bg-mars-orange/10 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-mars-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <h3 class="text-xl font-black mb-3 dark:text-white">{{ t.product.support.mentor.name }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.product.support.mentor.desc }}</p>
        </div>
        <div class="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform h-full">
          <div class="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-black mb-3 dark:text-white">{{ t.product.support.curator.name }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.product.support.curator.desc }}</p>
        </div>
        <div class="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform h-full">
          <div class="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
            <svg class="w-7 h-7 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-xl font-black mb-3 dark:text-white">{{ t.product.support.admin.name }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.product.support.admin.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
