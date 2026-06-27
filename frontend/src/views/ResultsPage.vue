<script setup>
import { computed, ref, onMounted, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import marsLogo from '../assets/mars-logo.png'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

const route  = useRoute()
const router = useRouter()
const lang   = inject('lang')
const isRU   = computed(() => lang?.value === 'RU')

const results = computed(() => {
  try { return JSON.parse(decodeURIComponent(route.query.data || '')) }
  catch { return null }
})
const childName = computed(() => route.query.name || '')

const isFrontend    = computed(() => results.value?.recommendation === 'frontend')
const accent        = computed(() => isFrontend.value ? '#f97316' : '#60a5fa')
const frontendScore = computed(() => results.value?.frontendScore || 0)
const backendScore  = computed(() => results.value?.backendScore  || 0)
const total         = computed(() => (frontendScore.value + backendScore.value) || 1)
const frontPct      = computed(() => Math.round((frontendScore.value / total.value) * 100))
const backPct       = computed(() => 100 - frontPct.value)
const strongAreas   = computed(() => results.value?.strongAreas || [])

/* animated counter */
function useCounter(target) {
  const n = ref(0)
  onMounted(() => {
    let start = 0
    const step = target / 40
    const t = setInterval(() => {
      start += step
      if (start >= target) { n.value = target; clearInterval(t) }
      else n.value = Math.round(start)
    }, 30)
  })
  return n
}

const frontCounter = useCounter(frontPct.value)
const backCounter  = useCounter(backPct.value)
const s1 = useCounter(5000)
const s2 = useCounter(7)
const s3 = useCounter(5)

/* Send test result to backend */
onMounted(() => {
  if (results.value && childName.value) {
    fetch(`${BACKEND_URL}/api/test-result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: childName.value,
        lang: lang?.value?.toLowerCase() || 'uz',
        recommendation: results.value.recommendation,
        frontendScore: results.value.frontendScore,
        backendScore: results.value.backendScore,
        strongAreas: results.value.strongAreas,
      }),
    }).catch(() => {}) // silent fail
  }
})

/* skill keys map raw category names (language-independent) -> display + style */
const skillStyle = {
  creativity:    { color:'#f97316', grad:'from-orange-500 to-amber-400', icon:'brush' },
  logic:         { color:'#6366f1', grad:'from-indigo-500 to-purple-400', icon:'brain' },
  communication: { color:'#ec4899', grad:'from-pink-500 to-rose-400',    icon:'users' },
  patience:      { color:'#10b981', grad:'from-emerald-500 to-teal-400', icon:'heart' },
  detail:        { color:'#3b82f6', grad:'from-blue-500 to-cyan-400',    icon:'shield' },
  math:          { color:'#a855f7', grad:'from-purple-500 to-violet-400',icon:'percent' },
  visual:        { color:'#f59e0b', grad:'from-amber-500 to-yellow-400', icon:'eye' },
  social:        { color:'#06b6d4', grad:'from-cyan-500 to-sky-400',     icon:'zap' },
}

const skillNames = {
  UZ: { creativity:'Ijodkorlik', logic:'Mantiqiy fikrlash', communication:'Muloqot qobiliyati', patience:'Sabr-toqat', detail:'Aniqlik va tartib', math:'Matematik tafakkur', visual:'Vizual idrok', social:'Ijtimoiy faollik' },
  RU: { creativity:'Креативность', logic:'Логическое мышление', communication:'Коммуникабельность', patience:'Терпение', detail:'Точность и порядок', math:'Математическое мышление', visual:'Визуальное восприятие', social:'Социальная активность' }
}

function skillLabel(key) {
  return (isRU.value ? skillNames.RU : skillNames.UZ)[key] || key
}
function skillMetaFor(key) {
  return skillStyle[key] || skillStyle.logic
}

const icons = {
  brush:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="20" x2="4" y2="16" stroke-linecap="round"/></svg>`,
  brain:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-3.14z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-3.14z"/></svg>`,
  users:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  heart:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  shield:  `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  percent: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`,
  eye:     `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  zap:     `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  check:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>`,
  arrow:   `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>`,
  server:  `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6" stroke-linecap="round" stroke-width="3"/><line x1="6" y1="18" x2="6.01" y2="18" stroke-linecap="round" stroke-width="3"/></svg>`,
  lock:    `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  info:    `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-linecap="round" stroke-width="3"/></svg>`,
  code:    `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  rocket:  `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  trophy:  `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 5H4a2 2 0 0 0 0 4h.5M17 5h3a2 2 0 0 1 0 4h-.5"/></svg>`,
  lightbulb: `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v.5h6v-.5c0-.4.1-.8.5-1.1A6 6 0 0 0 12 2z"/></svg>`,
  family:  `<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="8" cy="7" r="3"/><circle cx="17" cy="8" r="2.3"/><circle cx="12.5" cy="4.2" r="1.8"/><path d="M2.5 21v-1.2C2.5 17 5 15 8 15s5.5 2 5.5 4.8V21"/><path d="M13.5 19.5C13.5 17 16 15.3 18 15.3s4 1.5 4 4.2V21"/></svg>`,
}

const medalIcons = ['trophy_gold', 'trophy_silver', 'trophy_bronze']

const T = {
  UZ: {
    notFound: "Natija topilmadi",
    startTest: "Testni boshlash",
    backHome: "Bosh sahifa",
    resultReady: "Natijangiz tayyor",
    importantDirection: "Muhim yo'nalish",
    backendNoticeTitle: "Farzandingiz Backend yo'nalishida — lekin avval Frontenddan boshlaydi!",
    backendNoticeBody1: "Testga ko'ra, farzandingizda ",
    backendNoticeBodyStrong1: "mantiqiy fikrlash, aniqlik va matematik tafakkur",
    backendNoticeBody2: " ustunlik qiladi — bu Backend uchun ideal. Ammo professional Backend dasturchi bo'lish uchun avval ",
    backendNoticeBodyStrong2: "Frontend asoslarini o'zlashtirish shart!",
    step1Title: "Avval Frontend o'rganing",
    step1Body: "HTML, CSS va JavaScript — bu Backend dasturchi uchun ham majburiy asos. Bu bilimlar API ni test qilishda, interfeys bilan bog'lanishda doim kerak bo'ladi.",
    step2Title: "Keyin Backend — qiynalmaydi!",
    step2Body1: "Frontend asoslarini bilgan bola Backend ga o'tganda ",
    step2BodyStrong: "3 baravar tez o'rganadi.",
    step2Body2: " Chunki veb texnologiyalarni tushunadi, mantiqiy bog'liqlikni ko'radi.",
    stage1: "1-bosqich", stage2: "2-bosqich", stageResult: "Natija",
    fullBackendDev: "Full Backend dasturchi",
    whatIsTitle: (d) => d.whatIsTitle,
    parentNoteLabel: "Ota-onalarga muhim xabar:",
    frontendMatch: "Frontend mos kelishi",
    backendMatch: "Backend mos kelishi",
    recommendedDirection: "Tavsiya etilgan yo'nalish",
    backendOrderTitle: "Backend yo'lida to'g'ri tartib",
    backendOrderSub: "Avval Frontend → Keyin Backend — professional yo'l",
    bStep1Title: "Frontend asoslaridan boshlang",
    bStep1Time: "(3–4 oy)",
    bStep1Body: "HTML, CSS va JavaScript o'rganiladi. Farzandingiz brauzerda ko'rinadigan natijani ko'radi — bu motivatsiyani kuchaytiradigan muhim bosqich. Backend ga kirishishdan oldin bu asos bo'lmasa qiynaladi.",
    bStep2TitlePre: "Backend ga o'ting — ",
    bStep2TitleStrong: "qiynalmaydi!",
    bStep2Time: "(4–6 oy)",
    bStep2Body1: "Python, Node.js, SQL va API — Frontend bilgan bola bu bosqichni ",
    bStep2BodyStrong: "2–3 marta tezroq o'zlashtiradi.",
    bStep2Body2: " Chunki veb qanday ishlashini allaqachon tushunadi. Mantiqiy tafakkuri bilan backend dasturlash — farzandingizga juda mos keladi!",
    bStep3Title: "Professional Backend dasturchi!",
    bStep3Body1: "Real loyihalar yaratadi, GitHub portfoliosi bo'ladi. Oyiga ",
    bStep3BodyStrong: "4.000–10.000 USD",
    bStep3Body2: " ga ishlash imkoniyati.",
    insightTitle: "MARS IT da qanday o'rganiladi?",
    insightBody1: "Backend yo'nalishiga yozilgan barcha o'quvchilar ",
    insightBodyStrong: "birinchi modulda Frontend asoslarini o'taydi",
    insightBody2: " — bu maxsus shart. Chunki bizning 5 yillik tajribamiz shuni ko'rsatadi: Frontend bilmay Backend o'rgangan bola ikki baravar qiynaladi. To'g'ri tartibda o'rgangan bola esa — eng zo'r backend dasturchilardan biriga aylanadi!",
    skillsAnalyticsTitle: "Qobiliyat tahlili",
    skillsAnalyticsSub: "Psixologik test asosida aniqlangan ko'nikmalar",
    top3Title: "Eng kuchli 3 ta sohasi",
    places: ["1-o'rin", "2-o'rin", "3-o'rin"],
    roadmapTitlePrefix: (isF) => (isF ? "Frontend" : "Backend") + " yo'lida boshlash uchun reja",
    stepWord: "qadam",
    parentsImportant: "Ota-onalarga — muhim!",
    ctaTitle1: "Farzandingizni bugun MARS IT ga olib keling —",
    ctaTitle2: "1 bepul dars sovg'a!",
    cards: [
      { icon:'zap',    title:'Kelajak hozirdan boshlanadi',   text:"IT sohasi — 2030 yilga kelib 85 million yangi ish o'rni yaratiladi. Farzandingiz shu imkoniyatdan foydalansin!" },
      { icon:'eye',    title:"Eng to'g'ri vaqt — hozir",      text:"9–17 yosh — miyaning dasturlash uchun eng qulay davri. Kechiktirilgan har bir yil — boy berilgan imkoniyat." },
      { icon:'shield', title:'100% natija kafolati',           text:"MARS IT da 5000+ o'quvchi o'qigan. 78% bitiruvchi kurs tugashidan oldin ish yoki freelance topgan." },
      { icon:'heart',  title:'Bepul sinov darsi',             text:"Birinchi dars mutlaqo bepul. Farzandingiz guruhga ko'nikib oladi, o'qituvchilar bilan tanishadi." },
    ],
    statStudents: "O'quvchi", statBranches: "Filial", statYears: "yil tajriba",
    telegramCta: "Telegram orqali yozilish",
    retakeTest: "Testni qaytadan topshirish",
    summaryTitle: "Test natijasi xulosasi",
    summaryDirection: (isF, pct) => `Yo'nalish: ${isF ? 'Frontend' : 'Backend'} dasturlash (${pct}% mos kelishi)`,
    summaryStrong: (name, pct) => `Kuchli soha: ${name} (${pct}%)`,
    summarySecond: (name, pct) => `Ikkinchi kuchli soha: ${name} (${pct}%)`,
    summaryBackendNote: "Eslatma: Backend o'rganuvchi Frontend asoslarini ham o'qishi kerak!",
    summaryFrontendNote: "Tavsiya: Chiroyli interfeyslarga asoslanib o'rganing",
    summaryNextStep: "Keyingi qadam: MARS IT School bilan 1 bepul sinov darsidan boshlash",
    footer: "© 2026 MARS IT School · Toshkent",
    helloName: (name) => name ? `${name}, natijangiz tayyor!` : null,
  },
  RU: {
    notFound: "Результат не найден",
    startTest: "Начать тест",
    backHome: "Главная",
    resultReady: "Ваш результат готов",
    importantDirection: "Важное направление",
    backendNoticeTitle: "Ваш ребёнок — в направлении Backend, но начнёт с Frontend!",
    backendNoticeBody1: "По результатам теста у вашего ребёнка преобладают ",
    backendNoticeBodyStrong1: "логическое мышление, точность и математическое мышление",
    backendNoticeBody2: " — это идеально для Backend. Но чтобы стать профессиональным Backend-разработчиком, сначала нужно ",
    backendNoticeBodyStrong2: "освоить основы Frontend!",
    step1Title: "Сначала изучите Frontend",
    step1Body: "HTML, CSS и JavaScript — это обязательная основа даже для Backend-разработчика. Эти знания всегда нужны при тестировании API и связи с интерфейсом.",
    step2Title: "Затем Backend — будет легко!",
    step2Body1: "Ребёнок, знающий основы Frontend, при переходе к Backend учится ",
    step2BodyStrong: "в 3 раза быстрее.",
    step2Body2: " Потому что он понимает веб-технологии и видит логические связи.",
    stage1: "Этап 1", stage2: "Этап 2", stageResult: "Результат",
    fullBackendDev: "Полноценный Backend-разработчик",
    whatIsTitle: (d) => d.whatIsTitle,
    parentNoteLabel: "Важное сообщение для родителей:",
    frontendMatch: "Совпадение с Frontend",
    backendMatch: "Совпадение с Backend",
    recommendedDirection: "Рекомендованное направление",
    backendOrderTitle: "Правильный порядок на пути Backend",
    backendOrderSub: "Сначала Frontend → потом Backend — профессиональный путь",
    bStep1Title: "Начните с основ Frontend",
    bStep1Time: "(3–4 месяца)",
    bStep1Body: "Изучаются HTML, CSS и JavaScript. Ваш ребёнок сразу видит результат в браузере — это важный этап, усиливающий мотивацию. Без этой базы переход к Backend будет сложным.",
    bStep2TitlePre: "Переходите к Backend — ",
    bStep2TitleStrong: "будет легко!",
    bStep2Time: "(4–6 месяцев)",
    bStep2Body1: "Python, Node.js, SQL и API — ребёнок, знающий Frontend, осваивает этот этап ",
    bStep2BodyStrong: "в 2–3 раза быстрее.",
    bStep2Body2: " Потому что он уже понимает, как работает веб. Логическое мышление отлично подходит для backend-разработки!",
    bStep3Title: "Профессиональный Backend-разработчик!",
    bStep3Body1: "Создаёт реальные проекты, формирует портфолио на GitHub. Возможность зарабатывать ",
    bStep3BodyStrong: "4 000–10 000 USD",
    bStep3Body2: " в месяц.",
    insightTitle: "Как проходит обучение в MARS IT?",
    insightBody1: "Все ученики, записавшиеся на направление Backend, ",
    insightBodyStrong: "проходят основы Frontend в первом модуле",
    insightBody2: " — это обязательное условие. Наш 5-летний опыт показывает: ребёнок, изучивший Backend без Frontend, испытывает трудности вдвое чаще. А ребёнок, прошедший правильный порядок, становится одним из лучших backend-разработчиков!",
    skillsAnalyticsTitle: "Анализ способностей",
    skillsAnalyticsSub: "Навыки, определённые на основе психологического теста",
    top3Title: "3 самые сильные сферы",
    places: ["1-е место", "2-е место", "3-е место"],
    roadmapTitlePrefix: (isF) => "План для старта в " + (isF ? "Frontend" : "Backend"),
    stepWord: "шаг",
    parentsImportant: "Родителям — важно!",
    ctaTitle1: "Приведите ребёнка в MARS IT уже сегодня —",
    ctaTitle2: "1 бесплатный урок в подарок!",
    cards: [
      { icon:'zap',    title:'Будущее начинается уже сейчас',   text:"Сфера IT — к 2030 году будет создано 85 миллионов новых рабочих мест. Пусть ваш ребёнок воспользуется этой возможностью!" },
      { icon:'eye',    title:'Самое подходящее время — сейчас',      text:"9–17 лет — лучший период для развития мозга в программировании. Каждый упущенный год — потерянная возможность." },
      { icon:'shield', title:'100% гарантия результата',           text:"В MARS IT учились более 5000 учеников. 78% выпускников нашли работу или фриланс ещё до завершения курса." },
      { icon:'heart',  title:'Бесплатный пробный урок',             text:"Первый урок совершенно бесплатный. Ваш ребёнок познакомится с группой и преподавателями." },
    ],
    statStudents: "Учеников", statBranches: "Филиалов", statYears: "лет опыта",
    telegramCta: "Записаться через Telegram",
    retakeTest: "Пройти тест заново",
    summaryTitle: "Итог результата теста",
    summaryDirection: (isF, pct) => `Направление: ${isF ? 'Frontend' : 'Backend'}-разработка (совпадение ${pct}%)`,
    summaryStrong: (name, pct) => `Сильная сторона: ${name} (${pct}%)`,
    summarySecond: (name, pct) => `Вторая сильная сторона: ${name} (${pct}%)`,
    summaryBackendNote: "Примечание: изучающему Backend нужно также освоить основы Frontend!",
    summaryFrontendNote: "Рекомендация: развивайтесь на основе создания красивых интерфейсов",
    summaryNextStep: "Следующий шаг: начните с 1 бесплатного пробного урока в MARS IT School",
    footer: "© 2026 MARS IT School · Ташкент",
    helloName: (name) => name ? `${name}, ваш результат готов!` : null,
  }
}

const tr = computed(() => isRU.value ? T.RU : T.UZ)

const frontendDataByLang = {
  UZ: {
    badge: "Frontend Developer yo'nalishi",
    headline: 'Farzandingiz FRONTEND dasturchilikdan boshlashi kerak!',
    intro: "Psixologik tahlil ko'rsatadiki, farzandingizda kuchli IJODKORLIK, VIZUAL IDROK va MULOQOT qobiliyatlari ustunlik qiladi. Bu aynan Frontend dasturchilarga kerak bo'lgan noyob xususiyatlar!",
    whatIsTitle: 'Frontend nima?',
    whatIsDesc: "Frontend dasturchi — siz ko'rgan har bir veb-sayt va ilovaning ko'rinishini yaratuvchi inson. Google, YouTube, Instagram, Telegram — bularning barchasida frontend dasturchi izi bor. Farzandingiz kreatif fikrlay oladi — bu boshqa dasturchilardan ajratib turadigan kuchli afzallik!",
    whyPerfect: [
      { icon:'brush', text:"Chizish va yaratishga qiziquvchi bolalar uchun ideal — kod yozib saytlarni bezaydi" },
      { icon:'eye',   text:"Ranglar, shakllar, animatsiyalar bilan ishlaydi — ijodkorlik to'liq yoqiladi" },
      { icon:'zap',   text:"Birinchi kundan natija ko'rinadi — kodni yozib, brauzerda darhol ko'radi" },
      { icon:'shield',text:"Oyiga 3.000–8.000 USD maosh — O'zbekistondagi eng to'lanadigan kasblardan biri" },
    ],
    parentNote: "Farzandingizning ijodiy iste'dodi — pul topib beradigan ko'nikmaga aylanishi mumkin. Frontend — bu san'at bilan texnologiyaning kesishgan joyi!",
    roadmap: [
      { step:'1', icon:'brush',  color:'#f97316', title:"HTML & CSS o'rganing", desc:"Sahifalar qurish, ranglar va joylashuvni boshqarish — vizual fikrlash kuchi bu yerda yaxshi keladi!" },
      { step:'2', icon:'zap',    color:'#fb923c', title:"JavaScript o'rganing", desc:"Tugmachalar, animatsiyalar, interaktivlik — bola o'z brauzerida real narsa ishlayotganini ko'radi" },
      { step:'3', icon:'brain',  color:'#fcd34d', title:"React Framework",     desc:"Zamonaviy saytlar va ilovalar quriladigan texnologiya. Barcha top kompaniyalar ishlatadi" },
      { step:'4', icon:'shield', color:'#86efac', title:"Portfolio yarating",  desc:"O'z saytini Internetga chiqaradi — bu IT kareraning haqiqiy boshlanishi!" },
    ],
  },
  RU: {
    badge: "Направление Frontend Developer",
    headline: 'Вашему ребёнку стоит начать с FRONTEND-разработки!',
    intro: "Психологический анализ показывает, что у вашего ребёнка преобладают КРЕАТИВНОСТЬ, ВИЗУАЛЬНОЕ ВОСПРИЯТИЕ и КОММУНИКАБЕЛЬНОСТЬ. Это именно те уникальные качества, которые нужны Frontend-разработчикам!",
    whatIsTitle: 'Что такое Frontend?',
    whatIsDesc: "Frontend-разработчик — это человек, создающий внешний вид каждого сайта и приложения, которое вы видите. Google, YouTube, Instagram, Telegram — везде есть след frontend-разработчика. Ваш ребёнок умеет творчески мыслить — это сильное преимущество, отличающее его от других программистов!",
    whyPerfect: [
      { icon:'brush', text:"Идеально для детей, увлечённых рисованием и творчеством — украшает сайты с помощью кода" },
      { icon:'eye',   text:"Работа с цветами, формами, анимациями — креативность раскрывается полностью" },
      { icon:'zap',   text:"Результат виден с первого дня — написал код и сразу увидел его в браузере" },
      { icon:'shield',text:"Зарплата 3 000–8 000 USD в месяц — одна из самых высокооплачиваемых профессий в Узбекистане" },
    ],
    parentNote: "Творческий талант вашего ребёнка может превратиться в навык, приносящий доход. Frontend — это пересечение искусства и технологий!",
    roadmap: [
      { step:'1', icon:'brush',  color:'#f97316', title:"Изучите HTML и CSS", desc:"Создание страниц, управление цветом и расположением — здесь отлично пригодится визуальное мышление!" },
      { step:'2', icon:'zap',    color:'#fb923c', title:"Изучите JavaScript", desc:"Кнопки, анимации, интерактивность — ребёнок видит, как в браузере работает что-то реальное" },
      { step:'3', icon:'brain',  color:'#fcd34d', title:"Фреймворк React",     desc:"Технология для создания современных сайтов и приложений. Используется всеми топовыми компаниями" },
      { step:'4', icon:'shield', color:'#86efac', title:"Создайте портфолио",  desc:"Публикует свой сайт в интернете — это настоящее начало карьеры в IT!" },
    ],
  }
}

const backendDataByLang = {
  UZ: {
    badge: "Backend Developer yo'nalishi",
    headline: 'Farzandingiz BACKEND dasturchilikdan boshlashi kerak!',
    intro: "Psixologik tahlil ko'rsatadiki, farzandingizda kuchli MANTIQIY TAFAKKUR, MATEMATIK KO'NIKMA va ANIQLIKKA INTILISH ustunlik qiladi. Bu aynan Backend dasturchilarga kerak bo'lgan eng noyob xususiyatlar!",
    whatIsTitle: 'Backend nima?',
    whatIsDesc: "Backend dasturchi — texnologiyaning «miyasi». Bank ilovalarining pulni hisoblaydigan qismi, YouTube'ning saqlash tizimi, Payme'ning to'lov mexanizmi — bularning barchasi backend. Farzandingiz aniqlik va mantiq bilan fikrlay oladi — bu kamyob va yuqori baholanadigan qobiliyat!",
    whyPerfect: [
      { icon:'brain',   text:"Murakkab muammolarni bosqichma-bosqich hal qilishni yoqtiruvchi bolalar uchun ideal" },
      { icon:'percent', text:"Matematik va mantiqiy fikrlash to'liq qo'llaniladi — maktab matematikasi asos bo'ladi" },
      { icon:'shield',  text:"Tizimlar va ma'lumotlar bilan ishlaydi — aniqlik va tartib sevuvchilar uchun mukammal" },
      { icon:'zap',     text:"Oyiga 4.000–10.000 USD maosh — backend dasturchilarga talab eng yuqori!" },
    ],
    parentNote: "Farzandingizning analitik qobiliyati — texnologiya sanoatida eng qimmatli resurs. Backend dasturchi bo'lish — kelajakdagi eng barqaror va daromadli kasblardan biri!",
    roadmap: [
      { step:'1', icon:'brain',   color:'#60a5fa', title:"Python yoki Node.js",      desc:"Mantiqiy tafakkur bu yerda asosiy kuch. Kod yozib, muammolarni hal qilish qobiliyati rivojlanadi" },
      { step:'2', icon:'percent', color:'#818cf8', title:"Ma'lumotlar bazasi (SQL)", desc:"Millionlab ma'lumotlarni boshqarish — bu aniqlik va tartibga intilish uchun mukammal soha" },
      { step:'3', icon:'shield',  color:'#a78bfa', title:"API va server logikasi",   desc:"Ilovalarning ichki qismi — boshqalar ko'rmaydigan, lekin hamma narsa ishlaydigan joy" },
      { step:'4', icon:'zap',     color:'#86efac', title:"Real loyiha va GitHub",    desc:"Telegram bot, veb-server yoki AI ilova — employer'lar aynan shuni ko'radi" },
    ],
  },
  RU: {
    badge: "Направление Backend Developer",
    headline: 'Вашему ребёнку стоит начать с BACKEND-разработки!',
    intro: "Психологический анализ показывает, что у вашего ребёнка преобладают ЛОГИЧЕСКОЕ МЫШЛЕНИЕ, МАТЕМАТИЧЕСКИЕ СПОСОБНОСТИ и СТРЕМЛЕНИЕ К ТОЧНОСТИ. Это самые уникальные качества, нужные Backend-разработчикам!",
    whatIsTitle: 'Что такое Backend?',
    whatIsDesc: "Backend-разработчик — это «мозг» технологии. Часть банковских приложений, считающая деньги, система хранения YouTube, платёжный механизм Payme — всё это backend. Ваш ребёнок умеет мыслить точно и логично — это редкое и высоко ценимое качество!",
    whyPerfect: [
      { icon:'brain',   text:"Идеально для детей, любящих решать сложные задачи шаг за шагом" },
      { icon:'percent', text:"Полностью применяется математическое и логическое мышление — школьная математика становится основой" },
      { icon:'shield',  text:"Работа с системами и данными — отлично подходит тем, кто любит точность и порядок" },
      { icon:'zap',     text:"Зарплата 4 000–10 000 USD в месяц — спрос на backend-разработчиков самый высокий!" },
    ],
    parentNote: "Аналитические способности вашего ребёнка — самый ценный ресурс в технологической индустрии. Стать backend-разработчиком — одна из самых стабильных и высокооплачиваемых профессий будущего!",
    roadmap: [
      { step:'1', icon:'brain',   color:'#60a5fa', title:"Python или Node.js",      desc:"Логическое мышление — главная сила здесь. Развивается умение писать код и решать задачи" },
      { step:'2', icon:'percent', color:'#818cf8', title:"База данных (SQL)", desc:"Управление миллионами данных — идеальная сфера для тяги к точности и порядку" },
      { step:'3', icon:'shield',  color:'#a78bfa', title:"API и серверная логика",   desc:"Внутренняя часть приложений — то, что не видят другие, но что заставляет всё работать" },
      { step:'4', icon:'zap',     color:'#86efac', title:"Реальный проект и GitHub",    desc:"Telegram-бот, веб-сервер или AI-приложение — именно это смотрят работодатели" },
    ],
  }
}

const data = computed(() => {
  const byLang = isFrontend.value ? frontendDataByLang : backendDataByLang
  return isRU.value ? byLang.RU : byLang.UZ
})

/* skill bar animation */
const barsVisible = ref(false)
const showBackendNote = ref(false)
onMounted(() => {
  setTimeout(() => { barsVisible.value = true }, 300)
  if (!isFrontend.value) {
    setTimeout(() => { showBackendNote.value = true }, 800)
  }
})
</script>

<template>
  <div v-if="!results" class="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
    <div class="text-center">
      <p class="text-gray-400 mb-4">{{ tr.notFound }}</p>
      <router-link to="/test" class="bg-orange-500 text-black font-bold px-6 py-3 rounded-xl inline-block">{{ tr.startTest }}</router-link>
    </div>
  </div>

  <div v-else class="min-h-screen bg-[#0d0d0f] text-white">
    <!-- Sticky nav -->
    <header class="sticky top-0 z-10 border-b border-white/5 bg-[#0d0d0f]/95 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-sm group">
        <svg class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
        {{ tr.backHome }}
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
        <div class="flex items-center gap-2 text-xs text-gray-500 bg-white/4 px-3 py-1.5 rounded-full border border-white/6">
          <div class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          {{ tr.resultReady }}
        </div>
      </div>
    </header>

    <div class="container mx-auto px-4 py-10 max-w-5xl space-y-6">

      <p v-if="childName" class="text-center text-mars-orange text-sm font-semibold -mb-2">
        {{ tr.helloName(childName) }}
      </p>

      <!-- ── BACKEND NOTICE BANNER ── -->
      <transition name="fade-up">
        <div
          v-if="!isFrontend && showBackendNote"
          class="relative overflow-hidden rounded-2xl border border-orange-500/30 p-6"
          style="background: linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0.03) 100%)"
        >
          <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
          <div class="relative">
            <!-- header -->
            <div class="flex items-center gap-3 mb-4">
              <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center text-orange-400">
                <div class="w-5 h-5" v-html="icons.info" />
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-black text-orange-400 uppercase tracking-wider">{{ tr.importantDirection }}</span>
                  <div class="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                </div>
                <p class="text-white font-black text-base mt-0.5">
                  {{ tr.backendNoticeTitle }}
                </p>
              </div>
            </div>

            <!-- explanation -->
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              {{ tr.backendNoticeBody1 }}<span class="text-orange-300 font-semibold">{{ tr.backendNoticeBodyStrong1 }}</span>{{ tr.backendNoticeBody2 }}<span class="text-white font-bold">{{ tr.backendNoticeBodyStrong2 }}</span>
            </p>

            <!-- 2-col cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              <div class="bg-white/[0.05] rounded-xl p-4 border border-orange-500/15">
                <div class="flex items-center gap-2 mb-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500/20 text-orange-400 text-xs font-black">1</span>
                  <span class="text-white font-bold text-sm">{{ tr.step1Title }}</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  {{ tr.step1Body }}
                </p>
              </div>
              <div class="bg-white/[0.05] rounded-xl p-4 border border-blue-500/15">
                <div class="flex items-center gap-2 mb-2">
                  <span class="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black">2</span>
                  <span class="text-white font-bold text-sm">{{ tr.step2Title }}</span>
                </div>
                <p class="text-gray-400 text-xs leading-relaxed">
                  {{ tr.step2Body1 }}<span class="text-blue-300 font-medium">{{ tr.step2BodyStrong }}</span>{{ tr.step2Body2 }}
                </p>
              </div>
            </div>

            <!-- roadmap mini -->
            <div class="flex items-center gap-2 flex-wrap">
              <div class="flex items-center gap-1.5 bg-orange-500/12 border border-orange-500/20 rounded-lg px-3 py-1.5">
                <span class="text-orange-400 text-xs font-black">{{ tr.stage1 }}</span>
                <span class="text-orange-300 text-xs">HTML · CSS · JS</span>
              </div>
              <svg class="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              <div class="flex items-center gap-1.5 bg-blue-500/12 border border-blue-500/20 rounded-lg px-3 py-1.5">
                <span class="text-blue-400 text-xs font-black">{{ tr.stage2 }}</span>
                <span class="text-blue-300 text-xs">Python · SQL · API</span>
              </div>
              <svg class="w-4 h-4 text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
              <div class="flex items-center gap-1.5 bg-green-500/12 border border-green-500/20 rounded-lg px-3 py-1.5">
                <span class="text-green-400 text-xs font-black">{{ tr.stageResult }}</span>
                <span class="text-green-300 text-xs inline-flex items-center gap-1">
                  {{ tr.fullBackendDev }}
                  <svg class="w-3 h-3" v-html="icons.rocket" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- ── HERO RESULT CARD ── -->
      <div class="relative overflow-hidden rounded-3xl p-8 lg:p-10 border"
        :style="{
          borderColor: accent + '35',
          background: `linear-gradient(135deg, ${accent}10 0%, transparent 55%)`
        }">
        <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          :style="{ background: accent + '14' }" />

        <div class="relative">
          <!-- badge -->
          <div class="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold mb-5 border"
            :style="{ background: accent + '12', color: accent, borderColor: accent + '28' }">
            <div class="w-4 h-4" v-html="isFrontend ? icons.brush : icons.code" />
            {{ data.badge }}
          </div>

          <h1 class="text-2xl lg:text-[2.2rem] font-black leading-tight mb-5 text-white tracking-tight">
            {{ data.headline }}
          </h1>
          <p class="text-gray-300 text-base lg:text-lg leading-relaxed mb-7 max-w-3xl">{{ data.intro }}</p>

          <!-- what is -->
          <div class="bg-white/[0.035] border border-white/8 rounded-2xl p-5 mb-6">
            <h3 class="font-bold text-white mb-2 flex items-center gap-2">
              <span class="text-yellow-400 w-4 h-4 inline-flex" v-html="icons.lightbulb" /> {{ data.whatIsTitle }}
            </h3>
            <p class="text-gray-300 text-sm leading-relaxed">{{ data.whatIsDesc }}</p>
          </div>

          <!-- why perfect grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            <div v-for="(item, i) in data.whyPerfect" :key="i"
              class="flex items-start gap-3 bg-white/[0.025] border border-white/6 rounded-xl p-4 hover:bg-white/[0.04] transition-colors">
              <div class="flex-shrink-0 w-5 h-5 mt-0.5" :style="{ color: accent }" v-html="icons[item.icon]" />
              <p class="text-gray-300 text-sm leading-relaxed">{{ item.text }}</p>
            </div>
          </div>

          <!-- parent note -->
          <div class="flex items-start gap-3 p-4 rounded-2xl border"
            :style="{ background: accent + '0e', borderColor: accent + '22' }">
            <div class="flex-shrink-0 w-5 h-5 mt-0.5" :style="{ color: accent }" v-html="icons.heart" />
            <div>
              <p class="text-sm font-bold mb-0.5" :style="{ color: accent }">{{ tr.parentNoteLabel }}</p>
              <p class="text-gray-200 text-sm leading-relaxed">{{ data.parentNote }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- ── SCORE COMPARISON ── -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="s in [
          { label:tr.frontendMatch, pct:frontPct,  color:'#f97316', grad:'from-orange-600 to-orange-400', tags:'HTML · CSS · JS · React',      active:isFrontend,  counter:frontCounter },
          { label:tr.backendMatch,  pct:backPct,   color:'#60a5fa', grad:'from-blue-600 to-blue-400',     tags:'Python · Node.js · SQL · API',  active:!isFrontend, counter:backCounter  },
        ]" :key="s.label"
          class="rounded-2xl p-6 border transition-all hover:border-white/12"
          :style="{
            borderColor: s.active ? s.color + '38' : 'rgba(255,255,255,0.06)',
            background: s.active ? s.color + '06' : 'rgba(255,255,255,0.02)'
          }">
          <div class="flex items-center justify-between mb-4">
            <div>
              <div class="text-gray-500 text-xs mb-1">{{ s.label }}</div>
              <div class="text-4xl font-black" :style="{ color: s.color }">{{ s.counter }}<span class="text-2xl">%</span></div>
            </div>
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center" :style="{ background: s.color + '14', color: s.color }">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <polyline v-if="s.active" points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                <g v-else><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></g>
              </svg>
            </div>
          </div>
          <div class="h-2.5 rounded-full bg-white/5 overflow-hidden mb-3">
            <div :class="`h-full rounded-full bg-gradient-to-r ${s.grad}`"
              :style="{ width: barsVisible ? s.pct + '%' : '0%', transition:'width 1.3s cubic-bezier(.4,0,.2,1)' }" />
          </div>
          <div v-if="s.active" class="flex items-center gap-1.5 mb-2">
            <div class="w-1.5 h-1.5 rounded-full animate-pulse" :style="{ background: s.color }" />
            <span class="text-xs font-bold" :style="{ color: s.color }">{{ tr.recommendedDirection }}</span>
          </div>
          <div class="text-gray-600 text-xs font-mono">{{ s.tags }}</div>
        </div>
      </div>

      <!-- ── BACKEND "AVVAL FRONTEND" DETAIL CARD ── -->
      <div
        v-if="!isFrontend"
        class="relative overflow-hidden rounded-2xl border border-white/8 p-7"
        style="background: rgba(255,255,255,0.02)"
      >
        <div class="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-orange-500/6 blur-3xl pointer-events-none" />
        <div class="relative">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-orange-500/14 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <div class="w-5 h-5" v-html="icons.code" />
            </div>
            <div>
              <h3 class="font-black text-white text-base">{{ tr.backendOrderTitle }}</h3>
              <p class="text-gray-600 text-xs">{{ tr.backendOrderSub }}</p>
            </div>
          </div>

          <!-- 3-step visual path -->
          <div class="space-y-3 mb-6">
            <div class="flex items-start gap-4 p-4 rounded-xl border border-orange-500/15 bg-orange-500/[0.04]">
              <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-orange-500/15 text-orange-400 flex items-center justify-center font-black text-sm">1</div>
              <div>
                <p class="text-white font-bold text-sm mb-1">{{ tr.bStep1Title }} <span class="text-orange-400">{{ tr.bStep1Time }}</span></p>
                <p class="text-gray-400 text-xs leading-relaxed">{{ tr.bStep1Body }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 px-4">
              <div class="flex-1 h-px bg-gradient-to-r from-orange-500/20 via-white/8 to-blue-500/20" />
              <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              <div class="flex-1 h-px bg-gradient-to-r from-white/8 via-blue-500/20 to-transparent" />
            </div>

            <div class="flex items-start gap-4 p-4 rounded-xl border border-blue-500/15 bg-blue-500/[0.04]">
              <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-black text-sm">2</div>
              <div>
                <p class="text-white font-bold text-sm mb-1">{{ tr.bStep2TitlePre }}<span class="text-blue-400">{{ tr.bStep2TitleStrong }}</span> <span class="text-blue-400">{{ tr.bStep2Time }}</span></p>
                <p class="text-gray-400 text-xs leading-relaxed">{{ tr.bStep2Body1 }}<span class="text-blue-300 font-semibold">{{ tr.bStep2BodyStrong }}</span>{{ tr.bStep2Body2 }}</p>
              </div>
            </div>

            <div class="flex items-center gap-3 px-4">
              <div class="flex-1 h-px bg-gradient-to-r from-blue-500/20 via-white/8 to-green-500/20" />
              <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
              </svg>
              <div class="flex-1 h-px bg-gradient-to-r from-white/8 via-green-500/20 to-transparent" />
            </div>

            <div class="flex items-start gap-4 p-4 rounded-xl border border-green-500/15 bg-green-500/[0.04]">
              <div class="flex-shrink-0 w-9 h-9 rounded-xl bg-green-500/15 text-green-400 flex items-center justify-center">
                <div class="w-4 h-4" v-html="icons.rocket" />
              </div>
              <div>
                <p class="text-white font-bold text-sm mb-1">{{ tr.bStep3Title }}</p>
                <p class="text-gray-400 text-xs leading-relaxed">{{ tr.bStep3Body1 }}<span class="text-green-300 font-semibold">{{ tr.bStep3BodyStrong }}</span>{{ tr.bStep3Body2 }}</p>
              </div>
            </div>
          </div>

          <!-- key insight box -->
          <div class="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/[0.03]">
            <span class="text-yellow-400 w-6 h-6 flex-shrink-0" v-html="icons.lightbulb" />
            <div>
              <p class="text-white font-bold text-sm mb-1">{{ tr.insightTitle }}</p>
              <p class="text-gray-400 text-xs leading-relaxed">
                {{ tr.insightBody1 }}<span class="text-white font-semibold">{{ tr.insightBodyStrong }}</span>{{ tr.insightBody2 }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── SKILLS ANALYTICS ── -->
      <div class="bg-white/[0.025] rounded-2xl p-7 border border-white/7">
        <div class="flex items-center gap-3 mb-7">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" :style="{ background: accent + '14', color: accent }">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-black text-white">{{ tr.skillsAnalyticsTitle }}</h2>
            <p class="text-gray-600 text-xs">{{ tr.skillsAnalyticsSub }}</p>
          </div>
        </div>

        <div class="space-y-5">
          <div v-for="area in strongAreas" :key="area.key" class="flex items-center gap-4">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              :style="{ background: skillMetaFor(area.key).color + '1e', color: skillMetaFor(area.key).color }">
              <div class="w-5 h-5" v-html="icons[skillMetaFor(area.key).icon]" />
            </div>
            <div class="flex-1">
              <div class="flex justify-between items-center mb-1.5">
                <span class="text-sm font-semibold text-gray-200">{{ skillLabel(area.key) }}</span>
                <span class="text-sm font-black" :style="{ color: skillMetaFor(area.key).color }">{{ area.percent }}%</span>
              </div>
              <div class="h-2 rounded-full bg-white/5 overflow-hidden">
                <div :class="`h-full rounded-full bg-gradient-to-r ${skillMetaFor(area.key).grad}`"
                  :style="{ width: barsVisible ? area.percent + '%' : '0%', transition:'width 1.1s cubic-bezier(.4,0,.2,1)' }" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TOP 3 MEDALS ── -->
      <div>
        <h3 class="text-lg font-black text-white mb-4 flex items-center gap-2">
          <span class="text-yellow-400 w-5 h-5 inline-flex" v-html="icons.trophy" /> {{ tr.top3Title }}
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="(area, i) in strongAreas.slice(0,3)" :key="area.key"
            class="relative overflow-hidden rounded-2xl p-6 border border-white/6 bg-white/[0.025] text-center hover:bg-white/[0.04] transition-colors">
            <div class="absolute inset-0 opacity-5 pointer-events-none"
              :style="{ background: `radial-gradient(circle at 50% 0%, ${skillMetaFor(area.key).color} 0%, transparent 70%)` }" />
            <div class="relative">
              <div class="w-9 h-9 mx-auto mb-3 flex items-center justify-center rounded-full"
                :style="{ background: ['#facc15','#cbd5e1','#fb923c'][i] + '22', color: ['#facc15','#cbd5e1','#fb923c'][i] }">
                <svg class="w-5 h-5" v-html="icons.trophy" />
              </div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                :style="{ background: skillMetaFor(area.key).color + '1e', color: skillMetaFor(area.key).color }">
                <div class="w-6 h-6" v-html="icons[skillMetaFor(area.key).icon]" />
              </div>
              <div class="font-bold text-white text-sm mb-2">{{ skillLabel(area.key) }}</div>
              <div class="text-3xl font-black" :style="{ color: skillMetaFor(area.key).color }">{{ area.percent }}<span class="text-lg">%</span></div>
              <div class="mt-2 text-xs text-gray-600 font-medium">{{ tr.places[i] }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── ROADMAP ── -->
      <div class="bg-white/[0.025] rounded-2xl p-7 border border-white/7">
        <h3 class="text-lg font-black text-white mb-6 flex items-center gap-2">
          <span class="text-orange-400 w-5 h-5 inline-flex" v-html="icons.code" />
          {{ tr.roadmapTitlePrefix(isFrontend) }}
        </h3>
        <div class="space-y-3">
          <div v-for="item in data.roadmap" :key="item.step"
            class="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group cursor-default">
            <div class="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
              :style="{ background: item.color + '1a', color: item.color }">
              <div class="w-5 h-5" v-html="icons[item.icon]" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-bold px-2 py-0.5 rounded-full" :style="{ background: item.color + '1a', color: item.color }">{{ item.step }}-{{ tr.stepWord }}</span>
                <span class="font-bold text-white text-sm">{{ item.title }}</span>
              </div>
              <p class="text-gray-500 text-xs leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- ── PARENT PERSUASION ── -->
      <div class="relative overflow-hidden rounded-3xl p-8 border border-blue-500/15"
        style="background:linear-gradient(135deg,rgba(30,58,138,0.12) 0%,transparent 60%)">
        <div class="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-3xl opacity-8 bg-blue-500 pointer-events-none" />
        <div class="relative">
          <div class="inline-flex items-center gap-2 bg-blue-500/12 text-blue-400 border border-blue-500/18 rounded-full px-4 py-1.5 text-sm font-bold mb-5">
            <svg class="w-4 h-4" v-html="icons.family" />
            {{ tr.parentsImportant }}
          </div>
          <h2 class="text-2xl font-black text-white mb-5 tracking-tight">
            {{ tr.ctaTitle1 }}
            <span class="text-orange-500">{{ tr.ctaTitle2 }}</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
            <div v-for="card in tr.cards" :key="card.title"
              class="flex items-start gap-3 bg-white/[0.035] border border-white/6 rounded-xl p-4 hover:bg-white/[0.05] transition-colors">
              <div class="flex-shrink-0 w-9 h-9 rounded-lg bg-orange-500/12 text-orange-500 flex items-center justify-center">
                <div class="w-5 h-5" v-html="icons[card.icon]" />
              </div>
              <div>
                <p class="text-white font-bold text-sm mb-1">{{ card.title }}</p>
                <p class="text-gray-500 text-xs leading-relaxed">{{ card.text }}</p>
              </div>
            </div>
          </div>

          <!-- stats -->
          <div class="grid grid-cols-3 gap-4 mb-7 text-center">
            <div class="bg-white/[0.04] rounded-2xl py-5 border border-white/6">
              <div class="text-2xl font-black text-orange-500">{{ s1 }}+</div>
              <div class="text-xs text-gray-500 mt-1">{{ tr.statStudents }}</div>
            </div>
            <div class="bg-white/[0.04] rounded-2xl py-5 border border-white/6">
              <div class="text-2xl font-black text-orange-500">{{ s2 }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ tr.statBranches }}</div>
            </div>
            <div class="bg-white/[0.04] rounded-2xl py-5 border border-white/6">
              <div class="text-2xl font-black text-orange-500">{{ s3 }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ tr.statYears }}</div>
            </div>
          </div>

          <!-- CTA -->
          <div class="flex flex-col sm:flex-row gap-3">
            <a href="https://t.me/marsitschool" target="_blank" rel="noopener"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 text-black font-black py-4 px-6 rounded-xl transition-all uppercase text-sm hover:-translate-y-0.5"
              style="box-shadow:0 14px 30px -10px rgba(249,115,22,0.45)">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.04 15.47 8.86 19c.26 0 .37-.11.5-.24l1.2-1.15 2.5 1.83c.46.25.78.12.9-.42l1.63-7.66.01-.01c.15-.68-.25-.95-.69-.79L4.6 13.96c-.66.26-.65.63-.11.8l2.45.76 5.69-3.58c.27-.18.51-.08.31.1l-3.9 3.43z"/></svg>
              {{ tr.telegramCta }}
            </a>
            <router-link to="/test"
              class="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-white font-bold py-4 px-6 rounded-xl transition-all border border-white/8 text-sm">
              {{ tr.retakeTest }}
            </router-link>
          </div>
        </div>
      </div>

      <!-- ── SUMMARY CHECKLIST ── -->
      <div class="bg-white/[0.025] rounded-2xl p-6 border border-white/7">
        <h3 class="font-black text-white mb-4 flex items-center gap-2">
          <span class="text-green-400">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
            </svg>
          </span>
          {{ tr.summaryTitle }}
        </h3>
        <div class="space-y-2.5">
          <div v-for="(item,i) in [
            tr.summaryDirection(isFrontend, isFrontend ? frontPct : backPct),
            tr.summaryStrong(skillLabel(strongAreas[0]?.key), strongAreas[0]?.percent),
            tr.summarySecond(skillLabel(strongAreas[1]?.key), strongAreas[1]?.percent),
            !isFrontend ? tr.summaryBackendNote : tr.summaryFrontendNote,
            tr.summaryNextStep,
          ]" :key="i" class="flex items-start gap-3">
            <div class="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
              :class="i === 3 && !isFrontend ? 'bg-blue-500/15 text-blue-400' : 'bg-green-500/15 text-green-400'">
              <svg v-if="!(i === 3 && !isFrontend)" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16" stroke-linecap="round" stroke-width="3"/>
              </svg>
            </div>
            <p class="text-sm" :class="i === 3 && !isFrontend ? 'text-blue-300 font-semibold' : 'text-gray-300'">{{ item }}</p>
          </div>
        </div>
      </div>

      <div class="pb-8 text-center text-xs text-gray-700">{{ tr.footer }}</div>
    </div>
  </div>
</template>

<style scoped>
.fade-up-enter-active { transition: all .5s cubic-bezier(.4,0,.2,1); }
.fade-up-enter-from { opacity: 0; transform: translateY(16px); }
</style>
