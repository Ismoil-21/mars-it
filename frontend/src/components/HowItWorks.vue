<script setup>
import { inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import mars from '../assets/mars.png'
import programmer from '../assets/programmer2.jpg'
import rasim from '../assets/rasim.png'
import rasm from '../assets/rasm.png'
import rasim11 from '../assets/rasim11.png'
import kiko from '../assets/kiko.png'
import saaaaa from '../assets/saaaaa.png'
import asa from '../assets/asa.png'
import pul from '../assets/pul.png'

const lang = inject('lang')
const { t } = useTranslation(lang)

const cardImgs = [mars, programmer, rasim, rasm, rasim11, kiko, saaaaa, asa, pul]
</script>

<template>
  <section class="py-[100px] bg-neutral-50 dark:bg-neutral-900">
    <div class="container">
      <h2 class="section-title display reveal fade-up text-neutral-900 dark:text-white">
        <span class="accent">{{ t.howItWorks.title1 }}</span> {{ t.howItWorks.title2 }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div
          v-for="(card, i) in t.howItWorks.cards" :key="i"
          class="bg-white dark:bg-[#111] rounded-[18px] p-8 pb-0 shadow-[0_8px_30px_rgba(0,0,0,.06)] dark:shadow-none border border-neutral-100 dark:border-white/5 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,.12)] transition-all duration-[350ms] reveal fade-up flex flex-col overflow-hidden"
          :class="`delay-${i % 5}`"
        >
          <div class="flex-1 pb-6">
            <h3 :class="i === 0 ? 'text-neutral-900 dark:text-white' : 'text-mars-orange'" class="font-bold text-[20px] mb-3 leading-snug">{{ card.title }}</h3>
            <p class="text-neutral-500 dark:text-neutral-400 text-[14px] leading-[1.65]">{{ card.desc }}</p>
          </div>
          <div class="h-[200px] w-full shrink-0 overflow-hidden rounded-b-[18px]">
            <img
              v-if="cardImgs[i]"
              :src="cardImgs[i]"
              :alt="card.title"
              :class="i === 0 ? 'object-contain bg-neutral-100 dark:bg-neutral-800 p-4' : 'object-cover'"
              class="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <div class="text-center mt-12 reveal fade-up">
        <button class="cta-btn" :data-source="lang?.value === 'RU' ? 'Как проходит обучение' : 'Qanday o\'qitiladi'">{{ t.howItWorks.cta }}</button>
      </div>
    </div>
  </section>
</template>
