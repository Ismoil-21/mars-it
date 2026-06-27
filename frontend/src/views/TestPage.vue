<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTranslation } from '../composables/useTranslation'
import marsLogo from '../assets/mars-logo.png'

const router = useRouter()
const route  = useRoute()
const lang   = inject('lang')
const { t }  = useTranslation(lang)
const isRU   = computed(() => lang?.value === 'RU')
const childName = computed(() => route.query.name || '')

const questionsUZ = [
  { q: "Bo'sh vaqtingizda nima qilishni yoqtirasiz?",
    opts: ["Chizish yoki dizayn qilish","Matematik masalalar yechish","Do'stlar bilan suhbatlashish","Bir narsani sinchkovlik bilan o'rganish"] },
  { q: "Maktabda qaysi fan eng qiziqarli?",
    opts: ["Tasviriy san'at yoki adabiyot","Matematika yoki fizika","Ijtimoiy fanlar yoki tarix","Kimyo yoki biologiya (eksperiment)"] },
  { q: "Yangi o'yinchoq yoki qurilma olsangiz, birinchi nima qilasiz?",
    opts: ["Uning ko'rinishini chiroyli qilaman","Qanday ishlashini tekshiraman","Do'stlarimga ko'rsataman","Qo'llanmani diqqat bilan o'qiyman"] },
  { q: "Guruh loyihasida qaysi rolni tanlaysiz?",
    opts: ["Dizayner — ko'rinishini chiroyli qilaman","Texnik yechim topuvchi","Jamoani boshqaruvchi","Hujjat va tartibni boshqaruvchi"] },
  { q: "Qanday muammolarni hal qilishni yoqtirasiz?",
    opts: ["Ijodiy va noodatiy muammolar","Mantiq va hisob-kitob talab qiladigan","Odamlar bilan bog'liq muammolar","Aniq va qadamba-qadam hal qilinishi kerak bo'lgan"] },
  { q: "Siz qanday inson ekanligigizni eng yaxshi tavsiflovchi gap?",
    opts: ["Men doim yangi g'oyalar o'ylab topaman","Men hamma narsaning mantiqini izlayman","Men odamlar bilan muloqotni yaxshi ko'raman","Men ishimda aniq va tartibli bo'laman"] },
  { q: "Kino yoki kitobda qaysi qahramon sizga yoqadi?",
    opts: ["San'atkor yoki ixtirochi","Olim yoki detektiv","Lider yoki aloqa o'rnatuvchi","Reja tuzuvchi va aniq harakat qiluvchi"] },
  { q: "Xato qilganda nima qilasiz?",
    opts: ["Boshqacha yo'l bilan qayta urinaman","Xatoni tahlil qilib, nima noto'g'ri ketganini aniqlayman","Boshqalardan yordam so'rayman","Qayta diqqat bilan bosqichma-bosqich tekshiraman"] },
  { q: "Qaysi faoliyat sizga eng ko'p quvvat beradi?",
    opts: ["Biror narsa yaratish yoki bezash","Murakkab jumboq yechish","Yangi odamlar bilan tanishish","Rejani to'liq bajarish"] },
  { q: "Do'stlaringiz siz haqingizda nima deydi?",
    opts: ["\"U juda ijodkor\"","\"U juda aqlli va analitik\"","\"U juda muloqotchan\"","\"U juda tartibli va mas'uliyatli\""] },
  { q: "Kompyuter bilan ishlashda nima qiziqroq?",
    opts: ["Saytning ko'rinishi va dizayni","Dastur qanday ishlashi","Boshqalar bilan ulashish imkoniyati","Fayllar va ma'lumotlarni tartibga solish"] },
  { q: "Hayoliy loyiha qursangiz, nima yaratgan bo'lardingiz?",
    opts: ["Chiroyli mobil ilova interfeysi","Aqlli tizim yoki algoritmik dastur","Odamlarga yordam beradigan platforma","Aniq va tizimli ma'lumotlar bazasi"] },
  { q: "Yangi narsani o'rganishda qaysi usul sizga mos?",
    opts: ["Ko'rgazmali misollar va rasmlar orqali","Nazariya va mantiqiy tushuntirish orqali","Guruhda muhokama qilib","Qadamba-qadam amaliyot orqali"] },
  { q: "Qaysi narsa sizni eng ko'p tashvishlantiradi?",
    opts: ["Ishim chiroyli ko'rinmayapti","Mantiqan to'g'ri emasdir","Boshqalar tushunmayapti","Biror narsa noto'g'ri tartibda"] },
  { q: "Eng yaxshi ish muhiti qanday?",
    opts: ["Ijodiy va erkin, rang-barang muhit","Tinch, mantiqiy fikrlash uchun qulay muhit","Jamoa bilan ishlash, doim muloqot","Aniq qoidalari va tartibi bor muhit"] },
  { q: "Matematika darsida nima yoqadi?",
    opts: ["Grafiklar va vizual tushuntirish","Formulalar va mantiqiy isbotlash","Muammolarni guruhda hal qilish","Misollarni qadamba-qadam yechish"] },
  { q: "Kelajakda o'zingizni qanday ko'rasiz?",
    opts: ["Yaratuvchi — chiroyli ishlar qiluvchi","Muhandis yoki tadqiqotchi","Lider yoki muloqot mutaxassisi","Analist yoki tizim tuzuvchisi"] },
  { q: "Muzey yoki ko'rgazmaga borsangiz, nimaga ko'proq e'tibor berasiz?",
    opts: ["Dizayn va vizual effektlarga","Texnologiya qanday ishlashiga","Odamlar qanday muloqot qilishiga","Hamma narsaning tartibli joylashuviga"] },
  { q: "O'yin yoki test o'ynaganda nima muhimroq?",
    opts: ["O'yinning grafik va ko'rinishi","Strategiya va mantiqiy fikrlash","Do'stlar bilan o'ynash va muloqot","Qoidalarni aniq bajarish"] },
  { q: "Muvaffaqiyatli loyiha tugagach, nimani his qilasiz?",
    opts: ["Ishim chiroyli va ijodiy chiqqanidan quvonch","Muammoni to'g'ri yechganimdan qoniqish","Jamoam bilan birgalikda yaratganimdan baxt","Hammasini rejaga ko'ra bajarganimdan g'urur"] }
]

const questionsRU = [
  { q: "Что вы любите делать в свободное время?",
    opts: ["Рисовать или заниматься дизайном","Решать математические задачи","Общаться с друзьями","Внимательно изучать что-то одно"] },
  { q: "Какой предмет в школе самый интересный?",
    opts: ["Изобразительное искусство или литература","Математика или физика","Общественные науки или история","Химия или биология (эксперименты)"] },
  { q: "Получив новую игрушку или устройство, что вы делаете первым делом?",
    opts: ["Делаю его внешний вид красивым","Проверяю, как оно работает","Показываю друзьям","Внимательно читаю инструкцию"] },
  { q: "Какую роль вы выбираете в групповом проекте?",
    opts: ["Дизайнер — делаю всё красивым","Тот, кто находит техническое решение","Руководитель команды","Тот, кто следит за документацией и порядком"] },
  { q: "Какие проблемы вам нравится решать?",
    opts: ["Творческие и нестандартные","Требующие логики и расчётов","Связанные с людьми","Те, что нужно решать чётко, шаг за шагом"] },
  { q: "Какая фраза лучше всего описывает вас?",
    opts: ["Я всегда придумываю новые идеи","Я ищу логику во всём","Я люблю общаться с людьми","Я точен и организован в своей работе"] },
  { q: "Какой герой фильма или книги вам нравится?",
    opts: ["Художник или изобретатель","Учёный или детектив","Лидер или тот, кто налаживает связи","Тот, кто составляет план и действует точно"] },
  { q: "Что вы делаете, когда совершаете ошибку?",
    opts: ["Пробую снова другим способом","Анализирую ошибку, чтобы понять, что пошло не так","Прошу помощи у других","Снова внимательно проверяю шаг за шагом"] },
  { q: "Какая деятельность даёт вам больше всего энергии?",
    opts: ["Создавать или украшать что-то","Решать сложную головоломку","Знакомиться с новыми людьми","Полностью выполнить план"] },
  { q: "Что говорят о вас друзья?",
    opts: ["\"Он/она очень креативный\"","\"Он/она очень умный и аналитичный\"","\"Он/она очень общительный\"","\"Он/она очень организованный и ответственный\""] },
  { q: "Что интереснее при работе с компьютером?",
    opts: ["Внешний вид и дизайн сайта","Как работает программа","Возможность делиться с другими","Упорядочивание файлов и данных"] },
  { q: "Если бы вы создавали воображаемый проект, что бы вы сделали?",
    opts: ["Красивый интерфейс мобильного приложения","Умную систему или алгоритмическую программу","Платформу, помогающую людям","Точную и структурированную базу данных"] },
  { q: "Какой способ изучения нового вам подходит?",
    opts: ["Через наглядные примеры и изображения","Через теорию и логическое объяснение","Обсуждая в группе","Через пошаговую практику"] },
  { q: "Что вас больше всего беспокоит?",
    opts: ["Моя работа выглядит некрасиво","Что-то нелогично","Другие не понимают","Что-то расположено в неправильном порядке"] },
  { q: "Какая рабочая среда для вас лучшая?",
    opts: ["Творческая, свободная, разноцветная среда","Спокойная среда, удобная для логического мышления","Работа в команде, постоянное общение","Среда с чёткими правилами и порядком"] },
  { q: "Что вам нравится на уроках математики?",
    opts: ["Графики и визуальные объяснения","Формулы и логические доказательства","Решение задач в группе","Решение примеров шаг за шагом"] },
  { q: "Кем вы видите себя в будущем?",
    opts: ["Создателем — тем, кто делает красивые вещи","Инженером или исследователем","Лидером или специалистом по коммуникациям","Аналитиком или системным архитектором"] },
  { q: "На что вы обращаете больше внимания в музее или на выставке?",
    opts: ["На дизайн и визуальные эффекты","На то, как работает технология","На то, как общаются люди","На то, как упорядочено всё вокруг"] },
  { q: "Что важнее при игре или прохождении теста?",
    opts: ["Графика и внешний вид игры","Стратегия и логическое мышление","Игра с друзьями и общение","Точное выполнение правил"] },
  { q: "Что вы чувствуете после успешного завершения проекта?",
    opts: ["Радость от того, что работа вышла красивой и творческой","Удовлетворение от правильного решения проблемы","Счастье от совместного создания с командой","Гордость от того, что всё выполнено по плану"] }
]

const questions = computed(() => isRU.value ? questionsRU : questionsUZ)

const categoryMap = [
  ['creativity','logic','communication','patience'],
  ['visual','math','social','detail'],
  ['visual','logic','social','detail'],
  ['visual','logic','communication','detail'],
  ['creativity','math','social','patience'],
  ['creativity','logic','communication','detail'],
  ['creativity','logic','social','patience'],
  ['creativity','logic','social','detail'],
  ['creativity','logic','social','patience'],
  ['creativity','logic','communication','patience'],
  ['visual','logic','social','detail'],
  ['visual','logic','social','detail'],
  ['visual','logic','communication','patience'],
  ['visual','logic','communication','detail'],
  ['creativity','logic','communication','detail'],
  ['visual','math','social','patience'],
  ['creativity','logic','communication','detail'],
  ['visual','logic','social','detail'],
  ['visual','logic','social','patience'],
  ['creativity','logic','communication','patience'],
]

const current  = ref(0)
const answers  = ref([])
const selected = ref(null)
const step     = ref(0) // 0=idle, 1=leaving, 2=entering

const progress = computed(() => Math.round((current.value / questions.value.length) * 100))
const isLast   = computed(() => current.value + 1 === questions.value.length)

function select(idx) {
  selected.value = idx
}

function next() {
  if (selected.value === null || step.value !== 0) return

  answers.value.push(selected.value)

  if (current.value + 1 >= questions.value.length) {
    finish()
    return
  }

  // leave animation
  step.value = 1
  setTimeout(() => {
    current.value++
    selected.value = null
    step.value = 2   // enter animation
    setTimeout(() => {
      step.value = 0
    }, 320)
  }, 260)
}

function finish() {
  const scores = { creativity:0, logic:0, communication:0, patience:0, detail:0, math:0, visual:0, social:0 }
  answers.value.forEach((ansIdx, qIdx) => {
    const cat = categoryMap[qIdx][ansIdx]
    scores[cat]++
  })

  const frontendScore = scores.creativity * 1.5 + scores.visual * 1.5 + scores.communication + scores.social * 0.8
  const backendScore  = scores.logic * 1.5 + scores.math * 1.5 + scores.detail + scores.patience * 0.8
  const recommendation = frontendScore >= backendScore ? 'frontend' : 'backend'

  const areas = Object.entries(scores)
    .map(([key, val]) => ({ key, raw: val }))
    .sort((a, b) => b.raw - a.raw)

  const maxRaw = areas[0].raw || 1
  const areasWithPct = areas.map(a => ({ ...a, percent: Math.round((a.raw / maxRaw) * 100) }))

  const payload = JSON.stringify({
    recommendation,
    frontendScore: Math.round(frontendScore * 10),
    backendScore: Math.round(backendScore * 10),
    strongAreas: areasWithPct
  })

  router.push({
    path: '/natija',
    query: { data: encodeURIComponent(payload), name: childName.value }
  })
}

// computed card classes
const cardClass = computed(() => {
  if (step.value === 1) return 'q-leave'
  if (step.value === 2) return 'q-enter'
  return 'q-idle'
})
</script>

<template>
  <div class="min-h-screen bg-[#0d0d0f] text-white flex flex-col">
    <!-- Nav -->
    <header class="border-b border-white/5 bg-[#0d0d0f]/95 backdrop-blur-xl px-6 py-4 flex items-center justify-between sticky top-0 z-20">
      <router-link to="/" class="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        {{ t.test.backHome }}
      </router-link>
      <img :src="marsLogo" alt="MARS IT" class="h-8 w-auto" />
      <div class="flex items-center gap-3">
        <div class="inline-flex bg-white/5 rounded-[10px] p-1">
          <button
            v-for="l in ['UZ','RU']"
            :key="l"
            @click="lang.value = l"
            :class="[
              'flex items-center gap-1 px-2.5 py-1 rounded-[7px] font-bold text-[11px] cursor-pointer border-0 transition-all duration-200',
              lang.value === l ? 'bg-mars-orange text-white shadow-sm' : 'bg-transparent text-gray-500 hover:text-white'
            ]"
          >{{ l }}</button>
        </div>
        <div class="text-xs text-gray-600 font-mono bg-white/5 px-3 py-1.5 rounded-full">
          {{ current + 1 }}<span class="text-gray-700"> / {{ questions.length }}</span>
        </div>
      </div>
    </header>

    <!-- Progress bar -->
    <div class="h-0.5 bg-white/[0.04] relative overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 transition-all duration-700 ease-out relative"
        :style="{ width: progress + '%' }"
      >
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_2px_rgba(251,191,36,0.6)]" />
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-2xl">

        <p v-if="childName && current === 0" class="text-center text-mars-orange text-sm font-semibold mb-4">
          {{ t.test.hello(childName) }}
        </p>

        <!-- Question card with CSS animation -->
        <div :class="['question-card mb-6', cardClass]">

          <!-- Step indicator row -->
          <div class="flex items-center gap-3 mb-8">
            <div class="relative">
              <div class="w-12 h-12 rounded-2xl bg-orange-500/12 border border-orange-500/20 flex items-center justify-center">
                <span class="text-orange-400 font-black text-sm">{{ current + 1 }}</span>
              </div>
              <div class="absolute inset-0 rounded-2xl bg-orange-500/8 blur-lg -z-10" />
            </div>
            <div class="flex-1">
              <div class="h-px bg-gradient-to-r from-orange-500/20 to-transparent" />
            </div>
            <div class="flex items-center gap-2">
              <svg class="w-3.5 h-3.5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
              <span class="text-xs font-bold text-orange-500">{{ progress }}%</span>
            </div>
          </div>

          <h2 class="text-[1.35rem] md:text-2xl font-black text-white mb-7 leading-tight tracking-tight">
            {{ questions[current].q }}
          </h2>

          <div class="space-y-2.5">
            <button
              v-for="(opt, idx) in questions[current].opts"
              :key="idx"
              @click="select(idx)"
              class="w-full text-left rounded-2xl border transition-all duration-200 flex items-center gap-4 group overflow-hidden"
              :class="selected === idx
                ? 'border-orange-500/50 bg-gradient-to-r from-orange-500/12 to-orange-500/5 text-white'
                : 'border-white/6 bg-white/[0.025] text-gray-300 hover:border-white/15 hover:bg-white/[0.05]'"
            >
              <div class="flex items-center gap-4 w-full p-4 md:p-5">
                <div
                  class="w-8 h-8 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-200 text-xs font-black"
                  :class="selected === idx
                    ? 'bg-orange-500 border-orange-500 text-black'
                    : 'border-white/15 text-gray-600 group-hover:border-white/25'"
                >
                  <svg v-if="selected === idx" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span v-else>{{ ['A','B','C','D'][idx] }}</span>
                </div>
                <span class="text-sm md:text-base leading-snug font-medium">{{ opt }}</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Next button -->
        <button
          @click="next"
          :disabled="selected === null || step !== 0"
          class="w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          :class="selected !== null && step === 0
            ? 'bg-orange-500 hover:bg-orange-400 text-black cursor-pointer shadow-[0_8px_24px_-8px_rgba(249,115,22,0.5)] hover:shadow-[0_12px_32px_-8px_rgba(249,115,22,0.6)] hover:-translate-y-0.5'
            : 'bg-white/4 text-gray-700 cursor-not-allowed'"
        >
          <span>{{ isLast ? t.test.seeResult : t.test.next }}</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
          </svg>
        </button>

        <!-- Dots progress -->
        <div class="flex items-center justify-center gap-1 mt-6 flex-wrap">
          <div
            v-for="i in questions.length"
            :key="i"
            class="rounded-full transition-all duration-300"
            :class="i - 1 < current
              ? 'w-1.5 h-1.5 bg-orange-500'
              : i - 1 === current
                ? 'w-4 h-1.5 bg-orange-400'
                : 'w-1.5 h-1.5 bg-white/10'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.question-card {
  will-change: transform, opacity;
}

/* idle — fully visible */
.q-idle {
  opacity: 1;
  transform: translateX(0);
  transition: none;
}

/* leaving — slide out to left */
.q-leave {
  opacity: 0;
  transform: translateX(-28px);
  transition: opacity 0.24s ease-in, transform 0.24s ease-in;
}

/* entering — slide in from right, then settle */
.q-enter {
  opacity: 0;
  transform: translateX(28px);
  transition: opacity 0.30s ease-out, transform 0.30s ease-out;
}
</style>
