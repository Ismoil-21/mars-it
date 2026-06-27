<script setup>
import { inject, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)

const stepsUZ = [
  { n: '01', t: 'Onlayn platforma', d: "Bizda o'quvchilar uchun Space onlayn platformasi mavjud. Shaxsiy kabinetda bolalar uy vazifalari, darslarini va to'plangan ", link: "coin'lar", after: " sonini ko'rishlari mumkin.", phone: false },
  { n: '02', t: "Ikkinchi o'qituvchi", d: "Professional o'qituvchidan tashqari, yordamchi o'qituvchimiz ham bor. U har doim uy vazifalari, yaxshi tushunilmagan mavzular va o'tkazib yuborilgan darslarda yordam beradi.", link: null, after: '', phone: 'top-right' },
  { n: '03', t: 'Oylik hisobot', d: "Siz har oyda markazimiz o'qituvchilaridan farzandingiz muvaffaqiyati haqida hisobot olasiz. ", link: 'Shaxsiy kabinetni', after: ' ham kuzatib borasiz.', phone: 'floating' },
  { n: '04', t: 'Shaxsiy reja', d: "Har oyda o'qituvchi sizga nima tugatilganligi, o'rganilishi kerak bo'lgan narsalarni aytib beradi va bolangizni yanada rivojlantirish bo'yicha tavsiyalar beradi.", link: null, after: '', phone: false }
]
const stepsRU = [
  { n: '01', t: 'Онлайн-платформа', d: "У нас есть онлайн-платформа Space для учеников. В личном кабинете дети могут видеть домашние задания, уроки и накопленные ", link: "монеты", after: ".", phone: false },
  { n: '02', t: "Второй преподаватель", d: "Помимо профессионального преподавателя, у нас есть помощник-преподаватель. Он всегда поможет с домашними заданиями, непонятыми темами и пропущенными уроками.", link: null, after: '', phone: 'top-right' },
  { n: '03', t: 'Ежемесячный отчёт', d: "Каждый месяц вы будете получать отчёт об успехах вашего ребёнка от преподавателей нашего центра. ", link: 'Личный кабинет', after: ' также всегда доступен.', phone: 'floating' },
  { n: '04', t: 'Индивидуальный план', d: "Каждый месяц преподаватель расскажет вам, что пройдено, что нужно изучить, и даст рекомендации по развитию вашего ребёнка.", link: null, after: '', phone: false }
]

const steps = computed(() => lang?.value === 'RU' ? stepsRU : stepsUZ)
</script>

<template>
  <section class="py-[90px] bg-white dark:bg-neutral-950 relative overflow-hidden">
    <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1521 845" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,790 C150,790 200,500 246,460 C300,410 350,200 400,170 C450,140 700,300 900,420 C1100,540 1300,500 1434,650"
        fill="none" stroke-width="1.5" class="stroke-neutral-200 dark:stroke-neutral-800" />
    </svg>

    <div class="container relative z-[1]">
      <h2 class="section-title text-neutral-900 dark:text-white">
        {{ t.appSteps.title }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-7 mt-16">
        <div v-for="(s, i) in steps" :key="i"
          class="relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-[22px] p-[34px] min-h-[200px] flex flex-col shadow-[0_18px_40px_-22px_rgba(20,20,30,.12)] dark:shadow-none reveal fade-up"
          :class="[`delay-${i+1}`, (s.phone === 'top-right' || s.phone === 'floating') ? 'md:pr-[240px] overflow-visible' : 'overflow-hidden']">

          <div class="w-[46px] h-[46px] rounded-full flex items-center justify-center italic font-semibold text-[18px] text-white mb-[22px] shrink-0"
            style="background:linear-gradient(145deg,#ff6b35,#ff8a5c);font-family:'Georgia',serif;box-shadow:0 8px 18px -6px rgba(255,107,53,.55)">
            {{ s.n }}
          </div>
          <h4 class="text-neutral-900 dark:text-white font-bold text-[19px] mb-3">{{ s.t }}</h4>
          <p class="text-neutral-500 dark:text-neutral-400 text-[15px] leading-[1.65] max-w-[340px]">
            {{ s.d }}<a v-if="s.link" href="#" class="text-blue-500 font-medium no-underline hover:underline">{{ s.link }}</a>{{ s.after }}
          </p>

          <!-- Single phone mockup for top-right and floating -->
          <div
            v-if="s.phone === 'top-right' || s.phone === 'floating'"
            class="absolute top-[-36px] right-[18px] w-[190px] pointer-events-none hidden md:block"
          >
            <div class="relative w-full aspect-[9/19] bg-[#0b0b0d] rounded-[30px] p-2 shadow-[0_24px_60px_-10px_rgba(0,0,0,.5)]">
              <div class="absolute top-1.5 left-1/2 -translate-x-1/2 w-[40%] h-3.5 bg-[#0b0b0d] rounded-lg z-[3]"></div>
              <div class="w-full h-full bg-white rounded-[22px] overflow-hidden flex flex-col">
                <div class="flex justify-between px-3.5 pt-2.5 pb-1 text-[8px] font-semibold text-neutral-900">
                  <span>16:13</span>
                  <span class="flex items-center gap-0.5">
                    <svg class="w-2.5 h-2.5 text-neutral-700" viewBox="0 0 24 24" fill="currentColor"><path d="M1 5l4-4 4 4H7v10H5V5H1zm8 4h14v2H9V9zm0 5h14v2H9v-2zm0-10h14v2H9V4z"/></svg>
                    <svg class="w-2.5 h-2.5 text-neutral-700" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                  </span>
                </div>
                <div class="flex-1 px-3 py-2.5 flex flex-col">
                  <div class="font-black text-[11px] tracking-wider text-[#2b2b66] mb-2.5">MARS</div>
                  <div class="text-[9.5px] font-bold text-mars-orange leading-tight mb-3">Space Platform</div>
                  <div class="bg-neutral-100 rounded-lg h-5 mb-2"></div>
                  <div class="bg-neutral-100 rounded-lg h-5 mb-2"></div>
                  <div class="h-5 mb-2.5 rounded-lg" style="background:linear-gradient(135deg,#ff6b35,#ff8a65)"></div>
                  <div class="bg-neutral-100 rounded-lg h-4 mb-2 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
