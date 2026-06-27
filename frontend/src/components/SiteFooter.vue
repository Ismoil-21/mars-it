<script setup>
import { inject } from 'vue'
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

// Same order/order-of-truth as BranchesSection.vue, driven by the actual filial data files
const branchImgs = [b1, b2, b3, b4, b5, b6, b7]
const branchData = [filial1, filial2, filial3, filial4, filial5, filial6, filial7]

const branches = branchData.map((f, i) => ({
  nameUZ: f.nameUZ,
  nameRU: f.nameRU,
  img: branchImgs[i]
}))

function onBranchClick(i) {
  if (openBranchModal) openBranchModal({ branch: branchData[i], img: branchImgs[i] })
}
</script>

<template>
  <footer class="py-9 bg-neutral-950 dark:bg-black border-t border-white/5 text-center">
    <div class="container">
      <div class="text-neutral-500 text-[13px] font-semibold tracking-[.14em] uppercase mb-[18px]">{{ t.footer.branchesLabel }}</div>
      <nav class="flex flex-wrap justify-center gap-7 mb-[22px]" :aria-label="t.footer.branchesLabel">
        <button
          v-for="(b, i) in branches" :key="b.nameUZ"
          type="button"
          data-skip-modal
          @click="onBranchClick(i)"
          class="text-white text-sm font-bold relative transition-colors duration-[250ms] hover:text-mars-orange after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-4px] after:h-0.5 after:bg-mars-orange after:scale-x-0 after:transition-transform after:duration-[250ms] after:origin-left hover:after:scale-x-100 cursor-pointer bg-transparent border-0"
        >{{ lang?.value === 'RU' ? b.nameRU : b.nameUZ }}</button>
      </nav>
      <p class="text-neutral-600 text-[13px] mt-2">{{ t.footer.copy }}</p>
    </div>
  </footer>
</template>
