<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'
import { useTranslation } from '../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)
const router = useRouter()
</script>

<template>
  <section class="py-[60px] pb-[80px] bg-white dark:bg-neutral-950">
    <div class="container">
      <div class="max-w-[720px] mx-auto bg-[#f3f1ec] dark:bg-neutral-800 rounded-3xl p-[56px] text-center reveal fade-up" style="box-shadow:0 18px 50px -28px rgba(0,0,0,.25)">
        <div class="text-mars-orange text-xs font-bold tracking-[.22em] mb-4 uppercase">{{ t.aboutMars.label }}</div>
        <h2 class="text-neutral-900 dark:text-white text-[26px] font-extrabold leading-[1.3] mb-4">
          {{ t.aboutMars.title }}
        </h2>
        <p class="text-neutral-500 dark:text-neutral-400 text-[15px] leading-[1.65] max-w-[540px] mx-auto mb-7">
          {{ t.aboutMars.sub }}
        </p>
        <button
          @click.prevent="router.push('/mahsulot')"
          class="inline-block bg-gradient-to-b from-mars-orange-2 to-mars-orange text-white font-bold text-[15px] px-[30px] py-3.5 rounded-full cursor-pointer border-0 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-0.5"
          style="box-shadow:0 14px 32px -10px rgba(255,106,19,.55)"
        >
          {{ t.aboutMars.btn }}
        </button>
      </div>
    </div>
  </section>
</template>
