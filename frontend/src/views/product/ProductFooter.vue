<script setup>
import { inject } from 'vue'
import { useTranslation } from '../../composables/useTranslation'

import b1 from '../../assets/branch1.jpg'
import b2 from '../../assets/branch2.jpg'
import b3 from '../../assets/branch3.jpg'
import b4 from '../../assets/branch4.jpg'
import b5 from '../../assets/branch5.jpg'
import b6 from '../../assets/branch6.jpg'
import b7 from '../../assets/branch7.jpg'

import filial1 from '../../data/filial1.js'
import filial2 from '../../data/filial2.js'
import filial3 from '../../data/filial3.js'
import filial4 from '../../data/filial4.js'
import filial5 from '../../data/filial5.js'
import filial6 from '../../data/filial6.js'
import filial7 from '../../data/filial7.js'

const lang = inject('lang')
const { t } = useTranslation(lang)
const openBranchModal = inject('openBranchModal')

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
  <footer class="bg-neutral-950 border-t border-neutral-800 pt-10 pb-8">
    <div class="container text-center">
      <p class="text-neutral-500 text-xs font-bold tracking-[.2em] uppercase mb-6">
        {{ t.footer.branchesLabel }}
      </p>
      <nav class="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-8">
        <button
          v-for="(b, idx) in branches"
          :key="b.nameUZ"
          type="button"
          data-skip-modal
          @click="onBranchClick(idx)"
          class="relative text-white text-sm font-bold cursor-pointer group transition-colors hover:text-mars-orange bg-transparent border-0"
        >
          {{ lang?.value === 'RU' ? b.nameRU : b.nameUZ }}
          <span class="absolute left-0 -bottom-0.5 h-[2px] w-full bg-mars-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </button>
      </nav>
      <div class="w-full h-px bg-neutral-800 mb-6"></div>
      <p class="text-neutral-500 text-sm">
        {{ t.footer.copy }}
        &nbsp;·&nbsp;
        <a href="https://marsit.uz" target="_blank" rel="noopener"
          class="text-mars-orange hover:underline font-medium">marsit.uz</a>
      </p>
    </div>
  </footer>
</template>
