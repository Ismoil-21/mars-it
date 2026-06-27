<script setup>
import { ref, inject } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)

const open = ref(0)
function toggle(i) { open.value = open.value === i ? -1 : i }
</script>

<template>
  <section class="py-[110px] pb-[130px] relative overflow-hidden bg-neutral-950 dark:bg-neutral-950">
    <div class="absolute rounded-full pointer-events-none" style="width:480px;height:480px;top:-140px;left:-140px;filter:blur(80px);opacity:.15;background:#ff6a13"></div>
    <div class="absolute rounded-full pointer-events-none" style="width:520px;height:520px;bottom:-180px;right:-160px;filter:blur(80px);opacity:.15;background:#2563eb"></div>

    <div class="container">
      <h2 class="section-title display reveal fade-up text-center text-white">
        {{ t.faq.title1 }}<span class="accent">{{ t.faq.title2 }}</span>
      </h2>

      <div class="max-w-[820px] mx-auto mt-14 flex flex-col gap-3.5 reveal fade-up">
        <div
          v-for="(f, i) in t.faq.items" :key="i"
          class="rounded-[18px] overflow-hidden transition-[border-color,box-shadow] duration-[300ms] border"
          :class="open === i ? 'border-mars-orange/50 shadow-[0_18px_50px_-20px_rgba(255,106,19,.35)]' : 'border-white/6'"
          style="background:linear-gradient(180deg,#1a1a1a,#121212)"
        >
          <button
            class="w-full flex items-center justify-between gap-4 px-[26px] py-[22px] bg-transparent border-0 cursor-pointer text-left font-bold text-[16.5px] transition-colors"
            :class="f.highlight ? 'text-mars-orange' : 'text-white'"
            @click="toggle(i)"
          >
            <span>{{ f.q }}</span>
            <span class="shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center transition-all duration-[300ms]"
              :class="open === i ? 'bg-gradient-to-b from-mars-orange-2 to-mars-orange' : 'bg-white/5 text-white'">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" class="w-4 h-4 transition-transform duration-[300ms]" :style="open === i ? 'transform:rotate(0deg)' : 'transform:rotate(45deg)'">
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </span>
          </button>
          <div v-show="open === i" class="px-[26px] pb-6 text-[14.5px] leading-[1.7]" :class="f.highlight ? 'text-[#ffb98a]' : 'text-[#bcbcbc]'">
            <p v-for="(line, j) in f.a.split('\n\n')" :key="j" :class="j > 0 ? 'mt-3' : ''">{{ line }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
