<script setup>
import { ref, watch, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({ open: Boolean })
const emit = defineEmits(['close'])

const lang = inject('lang')
const isRU = computed(() => lang?.value === 'RU')
const router = useRouter()

const name = ref('')
const surname = ref('')

watch(() => props.open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) { name.value = ''; surname.value = '' }
})

function close() { emit('close') }
function onOverlay(e) { if (e.target === e.currentTarget) close() }

const isValid = () => name.value.trim().length > 1 && surname.value.trim().length > 1

function start() {
  if (!isValid()) return
  const fullName = `${name.value.trim()} ${surname.value.trim()}`
  close()
  router.push({ path: '/test', query: { name: fullName } })
}
</script>

<template>
  <transition name="npm-fade">
    <div v-if="open"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      style="background:rgba(10,12,20,.55);backdrop-filter:blur(4px)"
      @click="onOverlay">
      <div class="relative w-full max-w-[420px] bg-white dark:bg-neutral-900 rounded-[18px] px-8 sm:px-9 pb-8 pt-10 shadow-[0_30px_80px_rgba(0,0,0,.25)]">
        <button @click="close"
          class="absolute top-3.5 right-4 w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-700 border-0 cursor-pointer text-[22px] text-neutral-700 dark:text-white leading-none hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center justify-center transition-colors">×</button>

        <div class="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-mars-orange bg-mars-orange/10">
          <svg viewBox="0 0 24 24" class="w-7 h-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
          </svg>
        </div>

        <h2 class="text-[22px] sm:text-[24px] font-extrabold text-center text-neutral-900 dark:text-white mb-2 leading-[1.2]">
          {{ isRU ? 'Бесплатный тест по профориентации' : 'Bepul proforiyentatsion test' }}
        </h2>
        <p class="text-center text-mars-orange text-sm mb-6">
          {{ isRU ? 'Прежде чем начать, укажите имя и фамилию ребёнка' : "Boshlashdan oldin farzandingizning ismi va familiyasini kiriting" }}
        </p>

        <form class="flex flex-col gap-3" @submit.prevent="start">
          <input v-model="name" type="text" required autocomplete="given-name"
            :placeholder="isRU ? 'Имя ребёнка' : 'Farzandingizning ismi'"
            class="w-full px-[18px] py-4 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl text-[15px] outline-none focus:border-mars-orange transition-colors" />

          <input v-model="surname" type="text" required autocomplete="family-name"
            :placeholder="isRU ? 'Фамилия ребёнка' : 'Farzandingizning familiyasi'"
            class="w-full px-[18px] py-4 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl text-[15px] outline-none focus:border-mars-orange transition-colors" />

          <button type="submit" :disabled="!isValid()"
            class="mt-2 py-4 border-0 rounded-xl bg-mars-orange text-white font-bold text-[15px] cursor-pointer hover:bg-mars-orange-2 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {{ isRU ? 'Начать тест' : 'Testni boshlash' }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
        </form>
      </div>
    </div>
  </transition>
</template>

<style>
.npm-fade-enter-active, .npm-fade-leave-active { transition: opacity .2s; }
.npm-fade-enter-from, .npm-fade-leave-to { opacity: 0; }
</style>
