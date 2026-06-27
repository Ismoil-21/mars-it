<script setup>
import { inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import astronaut from '../assets/astronaut.png'

const lang = inject('lang')
const { t } = useTranslation(lang)
</script>

<template>
  <section class="py-[60px] pb-5 bg-white dark:bg-neutral-950">
    <div class="container">
      <div class="reveal fade-up relative max-w-[1120px] mx-auto rounded-[28px] p-[54px_56px] min-h-[260px] grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-8 overflow-hidden"
        style="background:linear-gradient(180deg,#1f86ff,#1872e0);box-shadow:0 30px 70px -30px rgba(24,114,224,.55)">
        <div class="z-[2]">
          <h2 class="text-white text-[26px] leading-[1.35] font-extrabold mb-7 max-w-[460px]">
            {{ t.contactCta.title }}
          </h2>
          <a href="https://t.me/marsitschool" target="_blank" rel="noopener" class="inline-flex items-center gap-3 text-white underline underline-offset-4 font-semibold text-[15px]">
            <span class="w-[38px] h-[38px] rounded-full inline-flex items-center justify-center text-white"
              style="background:linear-gradient(180deg,#ff8a3d,#ff6a13);box-shadow:0 10px 24px -8px rgba(255,106,19,.65)">
              <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                <path d="M9.04 15.47 8.86 19c.26 0 .37-.11.5-.24l1.2-1.15 2.5 1.83c.46.25.78.12.9-.42l1.63-7.66.01-.01c.15-.68-.25-.95-.69-.79L4.6 13.96c-.66.26-.65.63-.11.8l2.45.76 5.69-3.58c.27-.18.51-.08.31.1l-3.9 3.43z"/>
              </svg>
            </span>
            {{ t.contactCta.telegram }}
          </a>
        </div>
        <div class="flex justify-end items-start z-[2]">
          <span class="text-white font-bold text-[16px]">{{ t.contactCta.detail }}</span>
        </div>
        <img :src="astronaut" alt="Astronaut" class="absolute pointer-events-none" style="top:-70px;right:32%;width:320px;height:auto;filter:drop-shadow(0 24px 40px rgba(0,0,0,.25))" loading="lazy" />
      </div>
    </div>
  </section>
</template>
