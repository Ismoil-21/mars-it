<script setup>
import { inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import hero from '../assets/hero.jpg'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="pt-[120px] pb-[100px] overflow-hidden relative bg-neutral-950 dark:bg-neutral-950">
    <div class="orb orange absolute rounded-full pointer-events-none" style="width:520px;height:520px;top:-160px;left:-140px;filter:blur(80px);opacity:.35;background:#ff6a13"></div>
    <div class="orb blue absolute rounded-full pointer-events-none" style="width:420px;height:420px;bottom:-120px;right:-120px;filter:blur(80px);opacity:.35;background:#2563eb"></div>

    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-[60px] items-center relative z-[2]">
        <div class="reveal fade-right">
          <h1 class="display text-[clamp(34px,4.5vw,58px)] font-black leading-[1.05] text-white">
            {{ t.hero.title1 }}
            <span class="text-mars-orange">{{ t.hero.title2 }}</span>
            {{ t.hero.title3 }}
          </h1>
          <p class="text-neutral-400 mt-6 mb-9 text-[17px] leading-relaxed" style="white-space:pre-line">{{ t.hero.sub }}</p>
          <button class="cta-btn pulse-glow" :data-source="lang?.value === 'RU' ? 'Главная страница' : 'Bosh sahifa'">{{ t.hero.cta }}</button>
        </div>

        <div class="relative flex justify-center reveal scale-in delay-1">
          <div class="spin-slow absolute rounded-full border-2 border-dashed border-mars-orange/35" style="inset:-30px"></div>
          <img :src="hero" alt="MARS IT School VR" class="rounded-3xl max-w-[460px] w-full" style="box-shadow:0 30px 80px -20px rgba(255,106,19,.5)" loading="eager" />
          <span class="badge b1 float absolute top-[8%] left-[-5%] py-2.5 px-[18px] bg-neutral-900 border border-mars-orange/40 rounded-xl font-bold text-sm text-mars-orange" style="box-shadow:0 10px 30px rgba(0,0,0,.5)">HTML5</span>
          <span class="badge b2 float absolute top-[48%] right-[-8%] py-2.5 px-[18px] bg-neutral-900 border border-mars-orange/40 rounded-xl font-bold text-sm text-mars-orange" style="box-shadow:0 10px 30px rgba(0,0,0,.5);animation-delay:.7s">JS</span>
          <span class="badge b3 float absolute bottom-[6%] left-[10%] py-2.5 px-[18px] bg-neutral-900 border border-mars-orange/40 rounded-xl font-bold text-sm text-mars-orange" style="box-shadow:0 10px 30px rgba(0,0,0,.5);animation-delay:1.4s">CSS</span>
        </div>
      </div>
    </div>
  </section>
</template>
