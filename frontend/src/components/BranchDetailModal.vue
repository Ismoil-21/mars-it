<script setup>
import { computed, watch, inject } from 'vue'

const props = defineProps({
  open: Boolean,
  branch: { type: Object, default: null },
  branchImg: { type: String, default: '' }
})
const emit = defineEmits(['close', 'register'])

const lang = inject('lang')
const isRU = computed(() => lang?.value === 'RU')

watch(() => props.open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})

function close() { emit('close') }
function onOverlay(e) { if (e.target === e.currentTarget) close() }
function openRegister() { emit('register') }

const d = computed(() => props.branch)
const title      = computed(() => d.value ? (isRU.value ? d.value.titleRU      : d.value.titleUZ)      : '')
const desc       = computed(() => d.value ? (isRU.value ? d.value.descRU       : d.value.descUZ)       : '')
const addr       = computed(() => d.value ? (isRU.value ? d.value.addrRU       : d.value.addrUZ)       : '')
const landmark   = computed(() => d.value ? (isRU.value ? d.value.landmarkRU   : d.value.landmarkUZ)   : '')
const hours      = computed(() => d.value ? (isRU.value ? d.value.hoursRU      : d.value.hoursUZ)      : '')
const courses    = computed(() => d.value ? (isRU.value ? d.value.coursesRU    : d.value.coursesUZ)    : [])
const advantages = computed(() => d.value ? (isRU.value ? d.value.advantagesRU : d.value.advantagesUZ) : [])
const filialLabel = computed(() => d.value ? (isRU.value ? `${d.value.n}-й ФИЛИАЛ` : `${d.value.n}-FILIAL`) : '')

const mapQuery   = computed(() => d.value?.mapQuery || addr.value || '')
const mapEmbedSrc = computed(() => mapQuery.value
  ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery.value)}&output=embed`
  : '')
const mapDirectionsUrl = computed(() => mapQuery.value
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery.value)}`
  : '')
</script>

<template>
  <transition name="bdm-fade">
    <div v-if="open && branch"
      class="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto p-4 sm:p-6"
      style="background:rgba(5,8,18,.75);backdrop-filter:blur(6px)"
      @click="onOverlay">

      <div class="relative w-full max-w-[780px] my-4 rounded-[24px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,.6)]"
        style="background:linear-gradient(180deg,#141414,#0e0e0e);border:1px solid rgba(255,255,255,.07)">

        <!-- Close button -->
        <button @click="close"
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-[22px] cursor-pointer transition-colors hover:bg-white/15"
          style="background:rgba(255,255,255,.09)">×</button>

        <!-- Hero image -->
        <div class="relative h-[200px] sm:h-[250px] overflow-hidden">
          <img v-if="branchImg" :src="branchImg" :alt="title" class="w-full h-full object-cover" />
          <div v-else class="w-full h-full" style="background:linear-gradient(135deg,#1a1a1a,#0e0e0e)"></div>
          <div class="absolute inset-0" style="background:linear-gradient(to bottom,transparent 30%,#141414 100%)"></div>
          <div class="absolute bottom-5 left-6">
            <span class="inline-block px-5 py-2.5 rounded-full text-white font-extrabold text-[13px] tracking-[.1em]"
              style="background:linear-gradient(180deg,#2aa7ff,#1e7ed6);box-shadow:0 10px 24px -10px rgba(30,144,255,.7)">
              {{ filialLabel }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="px-5 sm:px-8 pb-8 pt-5">

          <!-- Title & desc -->
          <h2 class="font-black text-white leading-[1.15] mb-3"
            style="font-size:clamp(20px,3.5vw,30px);font-family:'Russo One','Inter',sans-serif;text-transform:uppercase;letter-spacing:.02em">
            {{ title }}
          </h2>
          <p class="text-neutral-400 text-[14px] leading-[1.65] mb-6">{{ desc }}</p>

          <!-- CTA row -->
          <div class="flex flex-wrap gap-3 mb-8">
            <button @click="openRegister" class="cta-btn text-[11.5px] tracking-[.12em] py-3 px-6">
              {{ isRU ? 'Записаться на экскурсию' : "Ekskursiyaga ro'yxatdan o'ting" }}
            </button>
            <a :href="`tel:${branch.phone}`"
              class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-[14px] font-semibold text-white border border-white/15 hover:border-mars-orange/60 transition-colors"
              style="background:rgba(255,255,255,.05)">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.72 1.18 2 2 0 012.72 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.87-.87a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              {{ branch.phone }}
            </a>
          </div>

          <!-- Info cards -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-7">
            <div class="rounded-[14px] p-3.5 col-span-2 sm:col-span-1" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style="background:rgba(255,106,19,.15)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ff6a13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="text-[9.5px] font-bold text-neutral-500 tracking-[.1em] uppercase mb-1">{{ isRU ? 'Адрес' : 'Manzil' }}</div>
              <div class="text-white text-[12px] font-medium leading-[1.5]">{{ addr }}</div>
              <div class="text-neutral-500 text-[11px] mt-1">{{ landmark }}</div>
            </div>

            <div class="rounded-[14px] p-3.5" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style="background:rgba(42,167,255,.15)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2aa7ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.72 1.18 2 2 0 012.72 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l.87-.87a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <div class="text-[9.5px] font-bold text-neutral-500 tracking-[.1em] uppercase mb-1">{{ isRU ? 'Телефон' : 'Telefon' }}</div>
              <div class="text-white text-[12.5px] font-semibold">{{ branch.phone }}</div>
            </div>

            <div class="rounded-[14px] p-3.5" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style="background:rgba(34,197,94,.15)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="text-[9.5px] font-bold text-neutral-500 tracking-[.1em] uppercase mb-1">{{ isRU ? 'Режим' : 'Ish vaqti' }}</div>
              <div class="text-white text-[12.5px] font-semibold">{{ hours }}</div>
            </div>

            <div class="rounded-[14px] p-3.5" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07)">
              <div class="w-7 h-7 rounded-lg flex items-center justify-center mb-2" style="background:rgba(168,85,247,.15)">
                <svg viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <div class="text-[9.5px] font-bold text-neutral-500 tracking-[.1em] uppercase mb-1">{{ isRU ? 'Филиал' : 'Filial' }}</div>
              <div class="text-white text-[12px] font-semibold leading-[1.5]">
                {{ branch.area }} · {{ branch.classrooms }} {{ isRU ? 'кл.' : 'sinf' }}<br/>{{ branch.computers }} {{ isRU ? 'компьютеров' : 'kompyuter' }}
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="rounded-[14px] overflow-hidden mb-3" style="height:230px;border:1px solid rgba(255,255,255,.07)">
            <iframe v-if="mapEmbedSrc" :src="mapEmbedSrc" width="100%" height="100%" style="border:0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <a v-if="mapDirectionsUrl" :href="mapDirectionsUrl" target="_blank" rel="noopener noreferrer"
            class="inline-flex items-center gap-2 mb-7 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white border border-white/15 hover:border-mars-orange/60 transition-colors"
            style="background:rgba(255,255,255,.05)">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2aa7ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 shrink-0">
              <polygon points="3 11 22 2 13 21 11 13 3 11"/>
            </svg>
            {{ isRU ? "Построить маршрут (Google Maps)" : "Google Maps'da yo'l olish" }}
          </a>

          <!-- Courses -->
          <div class="mb-7">
            <p class="text-[10.5px] font-bold text-mars-orange tracking-[.12em] uppercase mb-1.5">{{ isRU ? 'Курсы' : 'Kurslar' }}</p>
            <h3 class="text-white font-black text-[17px] sm:text-[19px] mb-4" style="font-family:'Russo One','Inter',sans-serif;text-transform:uppercase">
              {{ isRU ? 'Выберите направление для вашего ребёнка' : "Bolangiz uchun yo'nalish tanlang" }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div v-for="c in courses" :key="c.name" class="rounded-[13px] p-3.5 border border-white/7 hover:border-mars-orange/40 transition-colors" style="background:rgba(255,255,255,.03)">
                <span class="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold mb-2.5" style="background:rgba(255,106,19,.18);color:#ff8c42">{{ c.age }}</span>
                <div class="text-white font-bold text-[13.5px] mb-1">{{ c.name }}</div>
                <div class="text-neutral-500 text-[11.5px] leading-[1.55] mb-2.5">{{ c.desc }}</div>
                <div class="text-mars-orange text-[12px] font-bold">{{ c.price }}</div>
              </div>
            </div>
          </div>

          <!-- Advantages -->
          <div class="mb-7">
            <p class="text-[10.5px] font-bold text-mars-orange tracking-[.12em] uppercase mb-1.5">{{ isRU ? 'Преимущества' : "Afzalliklar" }}</p>
            <h3 class="text-white font-black text-[17px] sm:text-[19px] mb-4" style="font-family:'Russo One','Inter',sans-serif;text-transform:uppercase">
              {{ isRU ? `${branch.n}-й филиал афзаллiklari` : `${branch.n}-filial afzalliklari` }}
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div v-for="a in advantages" :key="a.title" class="rounded-[13px] p-3.5 border border-white/7" style="background:rgba(255,255,255,.03)">
                <div class="text-2xl mb-2">{{ a.icon }}</div>
                <div class="text-white font-bold text-[13px] mb-1">{{ a.title }}</div>
                <div class="text-neutral-500 text-[11.5px] leading-[1.5]">{{ a.desc }}</div>
              </div>
            </div>
          </div>

          <!-- Bottom CTA -->
          <div class="pt-5 border-t border-white/7 flex flex-col sm:flex-row items-center gap-4">
            <button @click="openRegister" class="cta-btn w-full sm:w-auto justify-center text-[11.5px] tracking-[.12em] py-3.5 px-8">
              {{ isRU ? 'Записаться на бесплатный пробный урок' : "Bepul sinov darsiga yozilish" }}
            </button>
            <button @click="close" class="text-neutral-500 text-[13px] hover:text-white transition-colors cursor-pointer">
              {{ isRU ? 'Закрыть' : 'Yopish' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.bdm-fade-enter-active,.bdm-fade-leave-active{transition:opacity .25s}
.bdm-fade-enter-from,.bdm-fade-leave-to{opacity:0}
</style>
