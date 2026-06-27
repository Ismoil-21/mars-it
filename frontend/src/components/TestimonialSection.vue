<script setup>
import { ref, computed, inject, onMounted, onBeforeUnmount } from 'vue'
import { useTranslation } from '../composables/useTranslation'

const lang = inject('lang')
const { t } = useTranslation(lang)

const testimonials = [
  { name: 'Munisa Fayzullayeva', videoUrl: 'https://youtu.be/IuKVS0WHQ8w?si=I7Djknz' },
  { name: 'Nazir Rixsiboev', videoUrl: 'https://youtu.be/bSvozmf6YT4?si=PUQzeQLe8IuFe9mJ' },
  { name: 'Baxrom Abduqayumov', videoUrl: 'https://youtu.be/1nBn_aZ2V08?si=8-iIpBcZfy8Nns0X' },
  { name: 'Dilafruz Maksumova', videoUrl: 'https://youtu.be/WlgN0cXc-KM?si=czqkcTosFDMmGJ61' },
  { name: 'Saodat Umarova', videoUrl: 'https://youtu.be/58-8GgClbIs?si=vjvcvZlZH6Nqt_xd' },
  { name: 'Shahnoza Samsakova', videoUrl: 'https://youtu.be/pw4nVnNUmUI?si=9I-F2ysuvyzkyYqY' },
  { name: 'Mohidil Soipova', videoUrl: 'https://youtu.be/6w3TUOHSk4w?si=T_QqRF9nGTcLYGkS' }
]
const quotes = {
  UZ: [
    "Kelajakda farzandim qaysi kasbni tanlamasin, IT'ni bilishi kerak",
    "Bu davrda mening nabiram muvaffaqiyatga erishdi va ko'proq bilimlarni egallashni boshladi",
    "Bu yerda bolalarga alohida e'tibor berilmoqda, farzandlarimni kuchli mutaxassislarga ishonib topshirdim",
    "Farzandim olayotgan bilimlaridan mamnunman",
    "Birinchi darsning o'zidayoq farzandimga bu markaz yoqqan",
    "Barcha bu yerdagi ustozlarning dars berishi bizga yoqdi",
    "O'g'lim Mars ITga kelgandan so'ng, haqiqatdan dasturchi bo'lishni xohlab qoldi"
  ],
  RU: [
    "Какую бы профессию ни выбрал мой ребёнок, знание IT ему необходимо",
    "Мой внук добился успехов и начал осваивать всё больше знаний",
    "Здесь детям уделяют особое внимание, доверяю детей настоящим специалистам",
    "Я доволен знаниями, которые получает мой ребёнок",
    "Уже на первом уроке этот центр понравился моему ребёнку",
    "Нам понравился подход всех преподавателей здесь",
    "После прихода сына в Mars IT он действительно захотел стать программистом"
  ]
}

function getYoutubeId(url) {
  const m = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/)
  return (m && m[2].length === 11) ? m[2] : ''
}
function getYoutubeThumb(url) {
  const id = getYoutubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : ''
}
function handleThumbError(event) {
  const img = event.target
  if (img.src.includes('maxresdefault.jpg')) {
    img.src = `https://img.youtube.com/vi/${img.getAttribute('data-video-id')}/hqdefault.jpg`
  }
}

const playingKey = ref(null)
function playVideo(key) { playingKey.value = key }

const loopedTestimonials = computed(() => [
  ...testimonials.map((t, i) => ({ ...t, _key: `a${i}`, idx: i })),
  ...testimonials.map((t, i) => ({ ...t, _key: `b${i}`, idx: i })),
  ...testimonials.map((t, i) => ({ ...t, _key: `c${i}`, idx: i }))
])

const trackRef = ref(null)
let cardStep = 0
let isJumping = false

function getCardStep() {
  const track = trackRef.value
  if (!track) return 264
  const card = track.querySelector('.testi-card')
  if (!card) return 264
  const gap = parseFloat(getComputedStyle(track).gap || '24px')
  return card.offsetWidth + gap
}
function centerOnMiddleSet() {
  const track = trackRef.value
  if (!track) return
  cardStep = getCardStep()
  track.scrollLeft = cardStep * testimonials.length
}
function handleScroll() {
  const track = trackRef.value
  if (!track || isJumping) return
  cardStep = cardStep || getCardStep()
  const setWidth = cardStep * testimonials.length
  const maxScroll = track.scrollWidth - track.clientWidth
  if (track.scrollLeft <= 5) { isJumping = true; track.scrollLeft += setWidth; requestAnimationFrame(() => { isJumping = false }) }
  else if (track.scrollLeft >= maxScroll - 5) { isJumping = true; track.scrollLeft -= setWidth; requestAnimationFrame(() => { isJumping = false }) }
}
function scrollByCard(dir) {
  const track = trackRef.value
  if (!track) return
  track.scrollBy({ left: dir * (cardStep || getCardStep()), behavior: 'smooth' })
}

onMounted(() => {
  setTimeout(() => { cardStep = getCardStep(); centerOnMiddleSet() }, 120)
  trackRef.value?.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', centerOnMiddleSet)
})
onBeforeUnmount(() => {
  trackRef.value?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', centerOnMiddleSet)
})
</script>

<template>
  <section class="py-[80px] bg-neutral-50 dark:bg-[#0f172a] relative overflow-hidden">
    <div class="container">
      <div class="text-center mb-[60px]">
        <h2 class="text-[clamp(24px,3.5vw,36px)] font-bold leading-[1.3] mb-4 text-neutral-900 dark:text-white">
          {{ t.testimonials.title1 }}<span class="text-mars-orange">{{ t.testimonials.title2 }}</span>
        </h2>
      </div>

      <div ref="trackRef"
        class="testi-track flex flex-nowrap items-stretch gap-6 overflow-x-auto scroll-smooth"
        style="scroll-snap-type:x mandatory;scrollbar-width:none;padding:12px 4px">
        <div
          v-for="item in loopedTestimonials"
          :key="item._key"
          class="testi-card flex-[0_0_auto] flex flex-col"
          style="width:260px;scroll-snap-align:start"
        >
          <div class="relative w-full aspect-[9/16] rounded-[20px] overflow-hidden bg-black cursor-pointer shadow-[0_10px_30px_-10px_rgba(0,0,0,.15)]"
            @click="playVideo(item._key)">
            <iframe v-if="playingKey === item._key"
              :src="`https://www.youtube.com/embed/${getYoutubeId(item.videoUrl)}?autoplay=1&modestbranding=1&rel=0`"
              title="YouTube video" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen class="w-full h-full block"></iframe>
            <template v-else>
              <img :src="getYoutubeThumb(item.videoUrl)" :data-video-id="getYoutubeId(item.videoUrl)"
                :alt="item.name" loading="lazy" @error="handleThumbError"
                class="w-full h-full object-cover transition-transform duration-[600ms] hover:scale-[1.05]" />
              <div class="absolute inset-0 flex items-center justify-center" style="background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.3))">
                <div class="w-14 h-14 rounded-full flex items-center justify-center border border-white/40"
                  style="background:rgba(255,255,255,.25);backdrop-filter:blur(8px)">
                  <svg viewBox="0 0 24 24" width="28" height="28"><path d="M8 5v14l11-7z" fill="#fff"/></svg>
                </div>
              </div>
            </template>
          </div>
          <div class="mt-4 bg-white dark:bg-neutral-800 rounded-2xl px-5 py-5 shadow-[0_4px_20px_-5px_rgba(0,0,0,.05)] border border-black/[0.03] dark:border-white/5 flex-1">
            <h4 class="font-semibold text-[16px] leading-[1.4] mb-2 text-neutral-900 dark:text-white">{{ item.name }}</h4>
            <p class="text-[13px] leading-[1.6] text-neutral-500 dark:text-neutral-400 italic">"{{ (lang?.value === 'RU' ? quotes.RU : quotes.UZ)[item.idx] }}"</p>
          </div>
        </div>
      </div>

      <div class="flex justify-center gap-4 mt-10">
        <button type="button" :aria-label="t.appSteps.prevAria" @click="scrollByCard(-1)"
          class="w-12 h-12 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800 flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,.05)] transition-all hover:-translate-y-0.5 active:scale-[.95] group">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M15 18l-6-6 6-6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-neutral-900 dark:stroke-white"/></svg>
        </button>
        <button type="button" :aria-label="t.appSteps.nextAria" @click="scrollByCard(1)"
          class="w-12 h-12 rounded-full border border-black/5 dark:border-white/10 bg-white dark:bg-neutral-800 flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,.05)] transition-all hover:-translate-y-0.5 active:scale-[.95] group">
          <svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-neutral-900 dark:stroke-white"/></svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style>
.testi-track::-webkit-scrollbar { display: none; }
@media (max-width: 768px) { .testi-card { width: 240px !important; } }
@media (max-width: 480px) { .testi-card { width: 80vw !important; } }
</style>
