<script setup>
import { inject, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import b1 from '../assets/branch1.jpg'
import b2 from '../assets/branch2.jpg'
import b3 from '../assets/branch3.jpg'
import b4 from '../assets/branch4.jpg'
import b5 from '../assets/branch5.jpg'
import b6 from '../assets/branch6.jpg'
import b7 from '../assets/branch7.jpg'

import filial1 from '../data/filial1.js'
import filial2 from '../data/filial2.js'
import filial3 from '../data/filial3.js'
import filial4 from '../data/filial4.js'
import filial5 from '../data/filial5.js'
import filial6 from '../data/filial6.js'
import filial7 from '../data/filial7.js'

const lang = inject('lang')
const { t } = useTranslation(lang)
const openBranchModal = inject('openBranchModal')

const branchImgs  = [b1, b2, b3, b4, b5, b6, b7]
const branchData  = [filial1, filial2, filial3, filial4, filial5, filial6, filial7]

const branchesUZ = [
  { img: b1, n: 1, addr: "Toshkent sh, Beruniy ko'chasi 35A, Tinchlik metro bekati.", land: "Mo'ljal: \"Bursa\" restorani yonida." },
  { img: b2, n: 2, addr: "Toshkent sh, Yunusobod tumani, Yangishahar 10.", land: "Mo'ljal: \"Mega Planet\" yaqinida." },
  { img: b3, n: 3, addr: "Toshkent sh, Chilonzor tumani, 8-kvartal, 2-uy.", land: "Mo'ljal: \"Rayxon\" milliy taomlari yaqinida." },
  { img: b4, n: 4, addr: "Toshkent sh, Mirzo-Ulug'bek tumani, Buyuk Ipak yo'li, 152/1.", land: "Mo'ljal: \"Soul\" cafe, 4-etaj." },
  { img: b5, n: 5, addr: "Toshkent sh, Sergeli tumani, Sug'diyona mahallasi.", land: "Mo'ljal: \"Besh Qozon\" ro'parasida." },
  { img: b6, n: 6, addr: "Toshkent sh, Mirobod tumani, Taras Shevchenko ko'chasi, 24, 1.", land: "Mo'ljal: \"Oybek\" metro bekati yoki 110-maktab yaqinida." },
  { img: b7, n: 7, addr: "Toshkent sh, Yunusobod tumani, Kiyev massivi, 3A.", land: "Mo'ljal: \"Minor\" masjidi yaqinida." }
]
const branchesRU = [
  { img: b1, n: 1, addr: "г. Ташкент, ул. Беруний 35А, ст. м. Тинчлик.", land: "Ориентир: рядом с рестораном «Bursa»." },
  { img: b2, n: 2, addr: "г. Ташкент, Юнусабадский р-н, Янги шаҳар 10.", land: "Ориентир: рядом с «Mega Planet»." },
  { img: b3, n: 3, addr: "г. Ташкент, Чиланзарский р-н, 8 кв., д. 2.", land: "Ориентир: рядом с «Rayxon» национальная кухня." },
  { img: b4, n: 4, addr: "г. Ташкент, Мирзо-Улугбекский р-н, Великий шёлковый путь, 152/1.", land: "Ориентир: кафе «Soul», 4 этаж." },
  { img: b5, n: 5, addr: "г. Ташкент, Сергелийский р-н, мкр. Сугдиёна.", land: "Ориентир: напротив «Беш Козон»." },
  { img: b6, n: 6, addr: "г. Ташкент, Мирабадский р-н, ул. Тараса Шевченко, 24, 1.", land: "Ориентир: рядом со ст. м. Ойбек или школой №110." },
  { img: b7, n: 7, addr: "г. Ташкент, Юнусабадский р-н, Киевский массив, 3А.", land: "Ориентир: рядом с мечетью «Минор»." }
]

const activeBranches = computed(() => lang?.value === 'RU' ? branchesRU : branchesUZ)

function onBtnClick(i) {
  if (openBranchModal) openBranchModal({ branch: branchData[i], img: branchImgs[i] })
}
</script>

<template>
  <section class="py-[110px] relative overflow-hidden bg-neutral-950 dark:bg-neutral-950">
    <div class="absolute rounded-full pointer-events-none" style="width:520px;height:520px;top:-160px;right:-140px;filter:blur(80px);opacity:.18;background:#ff6a13"></div>
    <div class="absolute rounded-full pointer-events-none" style="width:460px;height:460px;bottom:-120px;left:-120px;filter:blur(80px);opacity:.18;background:#2563eb"></div>

    <div class="container">
      <div class="text-center mb-14 reveal fade-up">
        <div class="w-[54px] h-[54px] rounded-full inline-flex items-center justify-center text-white mx-auto mb-[22px]"
          style="background:linear-gradient(180deg,#1e90ff,#0a5fc7);box-shadow:0 14px 36px -10px rgba(30,144,255,.6)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-[26px] h-[26px]">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
        <h2 class="section-title display text-white">
          {{ t.branches.title1 }}<span class="accent">7 ta «MARS IT»</span>
        </h2>
        <p class="text-neutral-400 max-w-[620px] mx-auto mt-[18px] text-[15px] leading-[1.6]">
          {{ t.branches.sub }}
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-[26px]">
        <article v-for="(b, i) in activeBranches" :key="b.n"
          class="w-full sm:w-[calc(50%-13px)] lg:w-[calc(25%-19.5px)] rounded-[22px] overflow-hidden flex flex-col border border-white/6 hover:-translate-y-2 hover:border-mars-orange/40 hover:shadow-[0_24px_60px_-20px_rgba(255,106,19,.35)] transition-all duration-[350ms] reveal fade-up"
          :style="{ transitionDelay: (i * 0.08) + 's', background: 'linear-gradient(180deg,#1c1c1c,#111)' }">
          <div class="aspect-[4/3] overflow-hidden">
            <img :src="b.img" :alt="`MARS IT ${b.n}-filial`" class="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-[1.06]" loading="lazy" />
          </div>
          <div class="px-5 pb-6 pt-[22px] text-center relative flex flex-col items-center flex-1">
            <div class="w-11 h-11 rounded-full border-2 border-mars-orange/35 text-mars-orange inline-flex items-center justify-center -mt-[42px] mb-3.5 bg-[#1c1c1c]">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="w-[22px] h-[22px]">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <span class="inline-block px-[22px] py-[9px] rounded-full text-white font-extrabold text-[13px] tracking-[.08em] mb-4"
              style="background:linear-gradient(180deg,#2aa7ff,#1e7ed6);box-shadow:0 10px 24px -10px rgba(30,144,255,.7)">
              {{ b.n }}-{{ t.branches.filialLabel }}
            </span>
            <p class="text-[#c8c8c8] text-[13.5px] leading-[1.55] mb-[22px] flex-1">{{ b.addr }}<br/>{{ b.land }}</p>
            <button
              data-branch-btn
              @click.stop="onBtnClick(i)"
              class="cta-btn w-full justify-center text-[11.5px] tracking-[.12em] py-3 mt-auto">
              {{ t.branches.ctaBtn }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
