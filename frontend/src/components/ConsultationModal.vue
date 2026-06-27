<script setup>
import { ref, watch, inject, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import FlagIcon from './FlagIcon.vue'

const props = defineProps({
  open: Boolean,
  context: { type: String, default: '' }
})
const emit = defineEmits(['close'])

const lang = inject('lang')
const { t } = useTranslation(lang)
const isRU = computed(() => lang?.value === 'RU')

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const name = ref('')
const surname = ref('')
const phone = ref('')
const sent = ref(false)
const loading = ref(false)
const showTelegramSoon = ref(false)

function onTelegramClick() {
  showTelegramSoon.value = true
}

watch(() => props.open, (v) => {
  if (v) {
    sent.value = false
    loading.value = false
    showTelegramSoon.value = false
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function close() { emit('close') }
function onOverlay(e) { if (e.target === e.currentTarget) close() }

function onPhoneInput(e) {
  const digits = e.target.value.replace(/\D/g, '').slice(0, 9)
  phone.value = digits
}

const isValid = () => name.value.trim().length > 1 && surname.value.trim().length > 1 && phone.value.length === 9

async function submit() {
  if (!isValid() || loading.value) return
  loading.value = true

  try {
    await fetch(`${BACKEND_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'web',
        lang: lang?.value?.toLowerCase() || 'uz',
        name: name.value.trim() + ' ' + surname.value.trim(),
        phone: '+998' + phone.value,
        course: props.context || '',
      }),
    })
  } catch (e) {
    console.error('Register error:', e)
  } finally {
    loading.value = false
  }

  sent.value = true
  setTimeout(() => {
    name.value = ''
    surname.value = ''
    phone.value = ''
    close()
  }, 1800)
}
</script>

<template>
  <transition name="cm-fade">
    <div v-if="open"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-5"
      style="background:rgba(10,12,20,.55);backdrop-filter:blur(4px)"
      @click="onOverlay">
      <div class="relative w-full max-w-[480px] bg-white dark:bg-neutral-900 rounded-[18px] px-8 sm:px-9 pb-8 pt-10 shadow-[0_30px_80px_rgba(0,0,0,.25)]">
        <button @click="close"
          class="absolute top-3.5 right-4 w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-700 border-0 cursor-pointer text-[22px] text-neutral-700 dark:text-white leading-none hover:bg-neutral-200 dark:hover:bg-neutral-600 flex items-center justify-center transition-colors">×</button>

        <h2 class="text-[24px] sm:text-[26px] font-extrabold text-center text-neutral-900 dark:text-white mb-3 leading-[1.2]">{{ t.modal.title }}</h2>

        <p v-if="context" class="text-center text-sm font-semibold mb-1.5"
          :style="{ color: '#ff6a13' }">{{ context }}</p>
        <p class="text-center text-mars-orange text-sm mb-[22px]">{{ t.modal.subtitle }}</p>

        <form v-if="!sent" class="flex flex-col gap-3" @submit.prevent="submit">
          <input v-model="name" type="text" :placeholder="t.modal.namePlaceholder" required autocomplete="given-name"
            class="w-full px-[18px] py-4 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl text-[15px] outline-none focus:border-mars-orange transition-colors" />

          <input v-model="surname" type="text" :placeholder="t.modal.surnamePlaceholder" required autocomplete="family-name"
            class="w-full px-[18px] py-4 border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl text-[15px] outline-none focus:border-mars-orange transition-colors" />

          <div>
            <label class="block text-xs font-semibold text-neutral-500 dark:text-neutral-400 mb-1.5 ml-1">{{ t.modal.parentPhoneLabel }}</label>
            <div class="relative flex items-center w-full border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-800 rounded-xl focus-within:border-mars-orange transition-colors overflow-hidden">
              <span class="flex items-center gap-1.5 pl-4 pr-2.5 py-4 text-neutral-900 dark:text-white text-[15px] font-medium shrink-0 select-none">
                <FlagIcon code="UZ" :size="18" />
                +998
              </span>
              <span class="w-px h-6 bg-neutral-200 dark:bg-neutral-600 shrink-0"></span>
              <input
                :value="phone"
                @input="onPhoneInput"
                type="tel"
                inputmode="numeric"
                :placeholder="t.modal.phonePlaceholder"
                required
                maxlength="9"
                class="w-full pl-2.5 pr-4 py-4 bg-transparent text-neutral-900 dark:text-white text-[15px] outline-none placeholder-neutral-400" />
            </div>
          </div>

          <button type="submit" :disabled="!isValid() || loading"
            class="mt-2 py-4 border-0 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-[15px] cursor-pointer hover:bg-mars-orange dark:hover:bg-mars-orange dark:hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900 dark:disabled:hover:bg-white">
            {{ loading ? '...' : t.modal.submit }}
          </button>
        </form>

        <template v-if="!sent">
          <div class="flex items-center gap-3 my-5">
            <span class="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></span>
            <span class="text-neutral-400 dark:text-neutral-500 text-xs font-semibold uppercase tracking-wide">{{ t.modal.orDivider }}</span>
            <span class="flex-1 h-px bg-neutral-200 dark:bg-neutral-700"></span>
          </div>

          <button type="button" @click="onTelegramClick"
            class="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl border-0 bg-[#27A7E7] text-white font-bold text-[15px] cursor-pointer hover:bg-[#1f8fc7] transition-colors">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.05 3.76L17.86 19.6c-.24 1.07-.87 1.33-1.76.83l-4.86-3.58-2.34 2.25c-.26.26-.48.48-.97.48l.35-4.94 9-8.13c.39-.35-.09-.55-.6-.2L6.2 12.62l-4.83-1.51c-1.05-.33-1.07-1.05.22-1.55L19.7 2.4c.87-.32 1.64.21 1.35 1.36z"/></svg>
            {{ t.modal.telegramBtn }}
          </button>

          <transition name="cm-fade">
            <div v-if="showTelegramSoon"
              class="mt-3 px-4 py-3.5 rounded-xl flex items-start gap-2.5"
              style="background:rgba(39,167,231,.1);border:1px solid rgba(39,167,231,.3)">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#27A7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <p class="text-[13.5px] font-bold text-neutral-900 dark:text-white">{{ t.modal.telegramSoonTitle }}</p>
                <p class="text-[12.5px] text-neutral-500 dark:text-neutral-400 mt-0.5 leading-[1.5]">{{ t.modal.telegramSoonDesc }}</p>
              </div>
            </div>
          </transition>
        </template>

        <div v-else class="text-center py-5">
          <div class="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-3.5"
            style="background:linear-gradient(135deg,#ff6a13,#ff8c42)">
            <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p class="text-neutral-900 dark:text-white font-semibold mb-1">{{ t.modal.thanksTitle }}</p>
          <p class="text-neutral-500 dark:text-neutral-400 text-sm">{{ t.modal.thanksDesc }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.cm-fade-enter-active, .cm-fade-leave-active { transition: opacity .2s; }
.cm-fade-enter-from, .cm-fade-leave-to { opacity: 0; }
</style>
