<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-20 bg-neutral-50 dark:bg-neutral-900">
    <div class="container">
      <h2 class="text-3xl font-black mb-3 text-center dark:text-white">{{ t.product.interns.title }}</h2>
      <div class="w-16 h-1 bg-mars-orange rounded mx-auto mb-6"></div>
      <p class="text-neutral-600 dark:text-neutral-400 text-center max-w-xl mx-auto mb-12 text-lg">{{ t.product.interns.intro }}</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 items-stretch">
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-7 border border-neutral-200 dark:border-neutral-700 h-full flex flex-col">
          <h3 class="text-mars-orange font-black text-sm uppercase tracking-wider mb-4">{{ t.product.interns.who.heading }}</h3>
          <p class="text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.product.interns.who.desc }}</p>
        </div>
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-7 border border-neutral-200 dark:border-neutral-700 h-full flex flex-col">
          <h3 class="text-mars-orange font-black text-sm uppercase tracking-wider mb-4">{{ t.product.interns.what.heading }}</h3>
          <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li v-for="item in t.product.interns.what.items" :key="item" class="flex items-start gap-2">
              <span class="text-mars-orange mt-0.5">•</span>{{ item }}
            </li>
          </ul>
        </div>
        <div class="bg-white dark:bg-neutral-800 rounded-2xl p-7 border border-neutral-200 dark:border-neutral-700 h-full flex flex-col">
          <h3 class="text-mars-orange font-black text-sm uppercase tracking-wider mb-4">{{ t.product.interns.perks.heading }}</h3>
          <ul class="space-y-2 text-neutral-600 dark:text-neutral-400">
            <li v-for="item in t.product.interns.perks.items" :key="item" class="flex items-start gap-2">
              <span class="text-mars-orange mt-0.5">•</span>{{ item }}
            </li>
          </ul>
        </div>
      </div>

      <p class="text-center text-neutral-700 dark:text-neutral-300 font-semibold max-w-2xl mx-auto text-base italic">
        {{ t.product.interns.footer }}
      </p>
    </div>
  </section>
</template>
