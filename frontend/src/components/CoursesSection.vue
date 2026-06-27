<script setup>
import { inject, ref, reactive, computed, watch } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import FlagIcon from './FlagIcon.vue'

import marsPlanet from '../assets/mars.png'
import robotics1  from '../assets/robotics.jpg'
import robotics2  from '../assets/robotics3.jpg'
import robotics3  from '../assets/robotics4.jpg'
import kidsImg    from '../assets/kids-phones.jpg'
import prog1      from '../assets/programmer.jpg'
import prog2      from '../assets/programmer2.jpg'
import online1    from '../assets/online-lesson.jpg'
import online2    from '../assets/online-lesson3.jpg'

const lang = inject('lang')
const { t } = useTranslation(lang)

const openInfo    = ref(null)
const openConsult = ref(false)
const consultCourse = ref('') // which course the lead is about, for the modal context line

function goConsult () {
  consultCourse.value = openInfo.value === 'kids'
    ? (isRU() ? 'IT KIDS — курс' : 'IT KIDS kursi')
    : (isRU() ? 'Программирование — курс' : "Dasturlash kursi")
  openInfo.value = null
  openConsult.value = true
}

const form = reactive({ name:'', surname:'', phone:'' })
const sent = ref(false)
const showTelegramSoon = ref(false)
function onTelegramClick () {
  showTelegramSoon.value = true
}
function onPhoneInput (e) {
  form.phone = e.target.value.replace(/\D/g, '').slice(0, 9)
}
function isFormValid () {
  return form.name.trim().length > 1 && form.surname.trim().length > 1 && form.phone.length === 9
}
function submit () {
  if (!isFormValid()) return
  sent.value = true
  // Lead capture only — does NOT navigate to the test.
  setTimeout(() => {
    Object.assign(form, { name:'', surname:'', phone:'' })
    openConsult.value = false
  }, 1800)
}

watch(openConsult, (v) => {
  if (v) { sent.value = false; showTelegramSoon.value = false }
})

const kidsImages  = [robotics1, robotics2, robotics3, kidsImg]
const teensImages = [prog1, prog2, online1, online2]

const kidsContent = {
  UZ: {
    title: 'IT KIDS — Bolalar uchun IT kursi', age: '9–11 yosh',
    intro: 'IT KIDS — MARS IT School ning 9–11 yoshli bolalar uchun maxsus ishlab chiqilgan dasturi. Bu dastur bolalarni IT dunyosiga o\'yin va qiziqarli tajribalar orqali olib kiradi, mantiqiy tafakkurni rivojlantiradi va ijodkorlikni shakllantiradi.',
    sections: [
      { heading: 'Kurs haqida', icon: 'clipboard', text:
`IT KIDS kursi 9 yoshdan 11 yoshgacha bo'lgan bolalar uchun maxsus mo'ljallangan. Har bir dars 1 soat davom etadi va to'liq amaliy mashg'ulotlardan iborat. Kurs jami 12 asosiy darsdan tashkil topgan bo'lib, har oyda 2 ta maxsus loyiha darsi o'tkaziladi. Guruh hajmi 8–12 o'quvchidan iborat bo'lib, har bir bolaga yetarli diqqat qaratiladi. Barcha darslar zamonaviy jihozlangan sinf xonalarida o'tkaziladi.

O'quvchilar Scratch, Python asoslari va Arduino platasi bilan ishlashni o'rganadilar. Har bir darsning 30 daqiqasi nazariya, 30 daqiqasi esa amaliyotga ajratilgan. Bolalar dars oxirida o'z qo'llari bilan yaratgan loyihani ko'rsatadilar. Kurs davomida har bir o'quvchi kamida 6 ta tayyor loyiha yaratadi. Barcha loyihalar o'quvchining shaxsiy portfoliosiga saqlanadi.

Kursni muvaffaqiyatli tugatgan bolalarga MARS IT School rasmiy sertifikati beriladi. Sertifikat bolaning IT sohasidagi birinchi rasmiy yutuqlaridan biri bo'ladi. Demo Kunda ota-onalar ham ishtirok etib, farzandlarining ishlari bilan tanishadi. Kurs boshida bepul sinov darsi mavjud bo'lib, bola muhitga ko'nikib oladi. O'qituvchilar bolalar psixologiyasini yaxshi bilgan va ularga qulay muhit yaratgan mutaxassislardir.` },

      { heading: "Nima o'rganadi", icon: 'rocket', text:
`Robototexnika: bola LEGO Mindstorms va Arduino asosida real robotlar yig'ishni o'rganadi. Robot qanday harakatlanishi, to'siqlardan qochishi va buyruqlarga javob berishini tushunadi. Sensorlar — yorug'lik, masofa va harorat sensorlari bilan amaliy ishlaydi. Motorlar va servo qurilmalar orqali robotning harakatlarini boshqarishni o'zlashtiradi.

Dasturlash: Scratch orqali vizual bloklar yordamida birinchi dasturini yaratadi. Python tilida o'zgaruvchilar, shartlar va tsikllarni o'rganadi. O'z mini-o'yinini va animatsiyasini mustaqil yaratadi. Algoritmik fikrlash — muammoni bosqichlarga bo'lish ko'nikmasini rivojlantiradi.

Elektronika va fizika: LED chiroqlarni yoqish va o'chirish, zumerlar bilan ishlash tajribasi oladi. Elektr zanjirini yig'ish va uning qanday ishlashini tushunadi. Maktab fizika darsidagi bilimlar amalda qanday ishlatilishini ko'radi. Mantiqiy tafakkur: muammoni tahlil qilish, yechim topish va natijani tekshirish ko'nikmalarini rivojlantiradi. Jamoaviy loyihalarda boshqa o'quvchilar bilan birgalikda ishlash va fikrlarini baham ko'rishni o'rganadi.` },

      { heading: 'Nima uchun IT KIDS', icon: 'star', text:
`Dunyo bo'yicha tadqiqotlar shuni ko'rsatadiki, 9–11 yoshda o'rgangan ko'nikmalar bolaning butun hayotiga ta'sir qiladi. MIT universiteti tadqiqotiga ko'ra, Scratch orqali dasturlash o'rgangan bolalar matematikadan 30% ko'proq natija ko'rsatadi. Google ma'lumotlariga ko'ra, 2030 yilga kelib IT mutaxassislariga talab 2 barobarga oshadi. Hozir dasturlash o'rganish — kelajakda eng ko'p ish joyi taklif qiladigan soha uchun poydevor qo'yishdir.

MARS IT School Toshkentda 7 ta filialga ega bo'lib, 2000 dan ortiq o'quvchi ta'lim olmoqda. Bizning o'qituvchilarimizning 90% i faol IT mutaxassislari bo'lib, real ish tajribasiga ega. Space platformasida bola o'z natijalarini kuzatib boradi, MARS Coins yig'adi va ularni sovg'alarga almashtiradi. Har yakshanba MARS o'quvchilari uchun robototexnika bellashuvlari va ilmiy tadbirlar o'tkaziladi. Bu tadbirlar kurs narxiga kiritilgan bo'lib, bolaning har tomonlama rivojlanishiga xizmat qiladi.

Demo Days tadbirida eng yaxshi loyihalar tanlanib, g'oliblar maxsus mukofotlar bilan taqdirlanadilar. Kursni tugatgan bolalar IT TEENS dasturiga o'tib, chuqurroq bilim olish imkoniga ega bo'ladilar. Ota-onalar har oyda farzandining progress hisobotini oladi va o'qituvchi bilan muloqot qiladi. O'qish tartibi maktab jadvaliga moslashtirilgan bo'lib, hafta kunlari va dam olish kunlarida ham mavjud. IT KIDS — bu farzandingizning kelajagi uchun eng to'g'ri qadam!` }
    ]
  },
  RU: {
    title: 'IT KIDS — IT-курс для детей', age: '9–11 лет',
    intro: 'IT KIDS — специально разработанная программа MARS IT School для детей 9–11 лет. Программа вводит детей в мир IT через игру и увлекательные опыты, развивает логическое мышление и формирует творческий потенциал.',
    sections: [
      { heading: 'О курсе', icon: 'clipboard', text:
`Курс IT KIDS разработан специально для детей от 9 до 11 лет. Каждое занятие длится 1 час и полностью построено на практических упражнениях. Курс включает 12 основных занятий и 2 специальных проектных урока каждый месяц. Размер группы — 8–12 учеников, что позволяет уделять достаточно внимания каждому ребёнку. Все занятия проводятся в современно оборудованных учебных классах.

Ученики изучают Scratch, основы Python и работу с платой Arduino. Каждое занятие делится на 30 минут теории и 30 минут практики. К концу занятия каждый ребёнок показывает проект, созданный своими руками. За весь курс каждый ученик создаёт не менее 6 готовых проектов. Все проекты сохраняются в личном портфолио ученика.

По успешному завершении курса дети получают официальный сертификат MARS IT School. Сертификат становится первым официальным достижением ребёнка в сфере IT. На Demo Day родители присутствуют и знакомятся с работами своих детей. В начале курса есть бесплатный пробный урок, чтобы ребёнок освоился в обстановке. Преподаватели — специалисты, хорошо знающие детскую психологию и умеющие создать комфортную атмосферу.` },

      { heading: 'Чему научится', icon: 'rocket', text:
`Робототехника: ребёнок учится собирать настоящих роботов на базе LEGO Mindstorms и Arduino. Понимает, как робот двигается, уклоняется от препятствий и реагирует на команды. Практически работает с датчиками — света, расстояния и температуры. Осваивает управление движениями робота с помощью моторов и сервоприводов.

Программирование: создаёт первую программу с помощью визуальных блоков в Scratch. Изучает переменные, условия и циклы на языке Python. Самостоятельно создаёт мини-игру и анимацию. Развивает алгоритмическое мышление — умение разбивать задачу на шаги.

Электроника и физика: получает практику работы со светодиодами и зуммерами. Собирает электрическую схему и понимает принцип её работы. Видит на практике, как применяются знания из школьного курса физики. Логическое мышление: развивает навыки анализа задачи, поиска решения и проверки результата. Учится работать в команде над совместными проектами и делиться идеями с другими учениками.` },

      { heading: 'Почему IT KIDS', icon: 'star', text:
`Исследования по всему миру показывают, что навыки, усвоенные в возрасте 9–11 лет, влияют на всю дальнейшую жизнь ребёнка. По данным MIT, дети, изучавшие программирование через Scratch, показывают результаты по математике на 30% выше. По данным Google, к 2030 году спрос на IT-специалистов вырастет вдвое. Изучение программирования сейчас — это закладка фундамента для самой востребованной профессии будущего.

MARS IT School имеет 7 филиалов в Ташкенте и обучает более 2000 учеников. 90% наших преподавателей — действующие IT-специалисты с реальным опытом работы. На платформе Space ребёнок отслеживает свои результаты, копит MARS Coins и обменивает их на подарки. Каждое воскресенье для учеников MARS проводятся робототехнические соревнования и научные мероприятия. Эти события включены в стоимость курса и служат всестороннему развитию ребёнка.

На Demo Days лучшие проекты отбираются, а победители награждаются специальными призами. Окончившие курс дети могут перейти в программу IT TEENS для получения более глубоких знаний. Родители ежемесячно получают отчёт об успехах ребёнка и могут общаться с преподавателем. Расписание занятий адаптировано к школьному распорядку и доступно как в будни, так и в выходные дни. IT KIDS — это правильный шаг для будущего вашего ребёнка!` }
    ]
  }
}

const teensContent = {
  UZ: {
    title: 'DASTURLASH — Professional IT kursi', age: '12–17 yosh',
    intro: 'DASTURLASH kursi — MARS IT School ning 12–17 yoshli o\'spirinlar uchun mo\'ljallangan chuqur professional dasturlash dasturi. Bu kurs o\'spirinlarni real IT mutaxassislari darajasiga olib chiqadi va karyera imkoniyatlarini kengaytiradi.',
    sections: [
      { heading: 'Kurs haqida', icon: 'clipboard', text:
`DASTURLASH kursi 12 yoshdan 17 yoshgacha bo'lgan o'spirinlar uchun mo'ljallangan professional IT dasturi. Har bir dars 1,5 soat davom etib, nazariy bilimlar va amaliyot birga olib boriladi. Kurs jami 12 darsdan iborat bo'lib, har oyda 2 ta loyiha darsi va 1 ta mentor sessiyasi bo'ladi. Guruh hajmi 10–14 o'quvchidan iborat, har bir o'quvchi mentori bilan yakka ishlash imkoniga ega. Barcha darslar industry-standard muhitlari — VS Code va GitHub orqali o'tkaziladi.

O'quvchilar JavaScript, Python va zamonaviy veb-frameworklarni o'rganadilar. Kurs davomida har bir o'quvchi real veb-sayt, Telegram bot va AI ilova yaratadi. Portfolio — bu kursning eng muhim natijasi bo'lib, ish topishda asosiy vosita bo'ladi. Har bir loyiha GitHub'da joylashtiriladi va real employer'lar ko'rishi mumkin bo'ladi. O'quvchilar kurs davomida kamida 3 ta to'liq tugallangan loyiha portfoliosiga qo'shadi.

Kursni muvaffaqiyatli tugatganlar MARS IT School rasmiy sertifikati va LinkedIn badge oladi. Eng yaxshi o'quvchilar 12 oylik professional kursga tavsiya xati bilan o'tadilar. Demo Days tadbirida loyihalar IT kompaniyalari vakillari va investorlar oldida namoyish etiladi. Kurs boshida bepul test darsi mavjud bo'lib, o'quvchining darajasi aniqlanadi. Ota-onalar har oyda o'quvchining progress hisobotini va o'qituvchi izohlari bilan tanishadilar.` },

      { heading: "Nima o'rganadi", icon: 'code', text:
`Veb-dasturlash: HTML5 va CSS3 bilan zamonaviy responsive veb-saytlar yaratadi. JavaScript yordamida dinamik va interaktiv veb-ilova quradi. React framework bilan komponent asosidagi veb-dasturlashni o'zlashtiradi. Tailwind CSS bilan tez va chiroyli dizayn yaratishni o'rganadi. Veb-saytni hosting'ga joylashtirish va domen ulashni amaliyotda ko'radi.

Backend va server: Python va FastAPI yordamida server tomoni dasturlashni o'rganadi. REST API yaratadi va uni frontend bilan ulaydi. PostgreSQL va SQLite ma'lumotlar bazalari bilan ishlaydi. Foydalanuvchi autentifikatsiyasi — login, parol va JWT tokenlarni qo'llaydi. Telegram Bot API orqali to'liq funksional bot yaratadi.

Sun'iy intellekt va zamonaviy texnologiyalar: OpenAI GPT API bilan o'z chatbotini yaratadi. Rasm tanish va matn tahlili uchun AI modellaridan foydalanadi. Git va GitHub bilan versiyalar nazoratini o'rganadi va jamoaviy loyihalarda ishlaydi. Agile metodologiyasi — sprint, retrospektiv va task management bilan tanishadi. Deploy asoslari: ilovani bulutga joylashtirish va CI/CD pipeline bilan ishlash ko'nikmalarini oladi.` },

      { heading: 'Nega DASTURLASH', icon: 'trophy', text:
`Stack Overflow 2024 tadqiqotiga ko'ra, junior dasturchi o'rtacha oyiga 2 500–4 000 USD maosh oladi. Uzbekistonda IT mutaxassislariga talab oxirgi 3 yilda 340% ga oshdi. Hali o'quvchi bo'lgan yoshlar dasturlash o'rganib, freelance orqali daromad topmoqda. GitHub Portfolio — bu zamonaviy CV bo'lib, IT kompaniyalari diploma emas, portfolioni ko'radi. MARS IT School bitiruvchilarining 78% i kurs tugashidan oldin ish taklifi yoki freelance buyurtma olgan.

MARS IT School 5 yillik tajribaga ega bo'lib, 3 000 dan ortiq o'quvchi tayyorlagan. Bizning mentorlarimiz Uzum, Payme, Click va xalqaro IT kompaniyalarida ishlagan mutaxassislardir. Space platformasida o'quvchi o'z loyihalarini saqlaydi, progressni kuzatadi va MARS Coins to'playdi. Yaxshi natijalar uchun noutbuk, gadjet va kurs chegirmalari shaklida mukofotlar beriladi. Intern dasturi — kursni a'lo tugatgan o'quvchilar MARS IT School'da real ish tajribasini oladilar.

Demo Days — har 3 oyda bir marta o'tkaziladigan, IT kompaniyalari vakillari ishtirokidagi loyiha ko'rgazmasi. Bu tadbir o'quvchi uchun birinchi real networking va ish muloqoti tajriba maydoniga aylanadi. Kurs tugagach o'quvchi 12 oylik professional kursga o'tib, full-stack developer yoki AI mutaxassisi bo'lishi mumkin. Bizning bitiruvchilarimiz Google, Samsung, Yandex, Epam va mahalliy IT kompaniyalarida ishlashmoqda. DASTURLASH kursi — bu karyerangizning haqiqiy boshlanishi!` }
    ]
  },
  RU: {
    title: 'ПРОГРАММИРОВАНИЕ — Профессиональный IT-курс', age: '12–17 лет',
    intro: 'Курс ПРОГРАММИРОВАНИЕ — это углублённая профессиональная программа MARS IT School для подростков 12–17 лет. Курс выводит учеников на уровень реальных IT-специалистов и расширяет карьерные возможности.',
    sections: [
      { heading: 'О курсе', icon: 'clipboard', text:
`Курс ПРОГРАММИРОВАНИЕ разработан для подростков от 12 до 17 лет как профессиональная IT-программа. Каждое занятие длится 1,5 часа, теория и практика идут параллельно. Курс состоит из 12 занятий с 2 проектными уроками и 1 менторской сессией в месяц. Размер группы — 10–14 учеников, каждый имеет возможность работать индивидуально со своим ментором. Все занятия проводятся в industry-standard средах — VS Code, GitHub.

Ученики изучают JavaScript, Python и современные веб-фреймворки. За время курса каждый ученик создаёт реальный сайт, Telegram-бот и AI-приложение. Портфолио — главный результат курса и основной инструмент при поиске работы. Каждый проект публикуется на GitHub и становится доступен реальным работодателям. За курс ученик добавляет в портфолио не менее 3 полностью завершённых проектов.

Успешно завершившие курс получают официальный сертификат MARS IT School и LinkedIn badge. Лучшие ученики получают рекомендательное письмо для перехода на 12-месячный профессиональный курс. На Demo Days проекты представляются перед представителями IT-компаний и инвесторами. В начале курса проводится бесплатный пробный урок для определения уровня ученика. Родители ежемесячно получают отчёт об успехах ученика с комментариями преподавателя.` },

      { heading: 'Чему научится', icon: 'code', text:
`Веб-разработка: создаёт современные адаптивные сайты с помощью HTML5 и CSS3. Строит динамичные и интерактивные веб-приложения на JavaScript. Осваивает компонентную разработку с фреймворком React. Учится быстро и красиво верстать с помощью Tailwind CSS. На практике размещает сайт на хостинге и подключает домен.

Backend и серверная часть: изучает серверное программирование на Python с FastAPI. Создаёт REST API и связывает его с фронтендом. Работает с базами данных PostgreSQL и SQLite. Реализует аутентификацию пользователей — логин, пароль и JWT-токены. Создаёт полнофункциональный бот через Telegram Bot API.

Искусственный интеллект и современные технологии: создаёт собственного чат-бота с помощью OpenAI GPT API. Использует AI-модели для распознавания изображений и анализа текста. Изучает контроль версий с Git и GitHub, работает над командными проектами. Знакомится с Agile-методологией — спринты, ретроспективы и управление задачами. Получает навыки развёртывания приложений в облаке и работы с CI/CD-пайплайнами.` },

      { heading: 'Почему ПРОГРАММИРОВАНИЕ', icon: 'trophy', text:
`По данным Stack Overflow 2024, junior-разработчик зарабатывает в среднем 2 500–4 000 USD в месяц. За последние 3 года спрос на IT-специалистов в Узбекистане вырос на 340%. Ещё будучи учениками, молодые люди зарабатывают через фриланс, освоив программирование. GitHub Portfolio — это современное резюме: IT-компании смотрят на портфолио, а не на диплом. 78% выпускников MARS IT School получили предложение о работе или фриланс-заказ до окончания курса.

MARS IT School имеет 5-летний опыт и подготовила более 3 000 учеников. Наши менторы — специалисты, работавшие в Uzum, Payme, Click и международных IT-компаниях. На платформе Space ученик сохраняет проекты, отслеживает прогресс и накапливает MARS Coins. За хорошие результаты выдаются награды в виде ноутбуков, гаджетов и скидок на курсы. Intern-программа: лучшие выпускники получают реальный опыт работы в MARS IT School.

Demo Days — это выставка проектов с участием представителей IT-компаний, проводимая раз в 3 месяца. Для ученика это становится первым реальным опытом нетворкинга и деловых переговоров. После курса ученик может перейти на 12-месячную профессиональную программу и стать full-stack developer или AI-специалистом. Наши выпускники работают в Google, Samsung, Yandex, Epam и ведущих местных IT-компаниях. Курс ПРОГРАММИРОВАНИЕ — это настоящее начало вашей карьеры!` }
    ]
  }
}

const isRU = () => lang?.value === 'RU'

const sectionIcons = {
  clipboard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  rocket: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  code: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  trophy: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M7 5H4a2 2 0 0 0 0 4h.5M17 5h3a2 2 0 0 1 0 4h-.5"/></svg>`,
}
</script>

<template>
  <section class="py-[100px] relative bg-neutral-950 dark:bg-neutral-950 overflow-hidden">
    <div class="orb orange absolute rounded-full pointer-events-none"
      style="width:600px;height:600px;top:-100px;left:50%;transform:translateX(-50%);filter:blur(80px);opacity:.18;background:#ff6a13"></div>

    <div class="container relative z-[2]">
      <h2 class="section-title display reveal fade-up text-white" style="white-space:pre-line">
        {{ t.courses.title1 }}<span class="accent">{{ t.courses.title2 }}</span>
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-[30px] mt-8 items-stretch">
        <!-- IT KIDS card -->
        <div class="bg-gradient-to-b from-[#1c1c1c] to-[#111] border border-white/5 rounded-[22px] p-[42px] relative overflow-hidden reveal fade-left transition-transform duration-[350ms] hover:-translate-y-1.5 hover:border-mars-orange/35 flex flex-col">
          <span class="inline-block px-4 py-2 rounded-lg text-sm font-bold mb-[22px] self-start" style="background:#b39bff33;color:#b39bff">{{ t.courses.kids.age }}</span>
          <h3 class="display text-[48px] text-white mb-3">{{ t.courses.kids.name }}</h3>
          <p class="text-neutral-300 mb-5 text-[15px]">{{ t.courses.kids.sub }}</p>
          <p class="text-neutral-400 text-[14.5px] leading-[1.65] mb-7 flex-1">{{ t.courses.kids.desc }}</p>
          <button class="cta-btn self-start mt-auto" data-skip-modal @click="openInfo = 'kids'">{{ t.courses.kids.btn }}</button>
          <img :src="marsPlanet" alt="Mars" class="absolute top-[20px] right-[20px] w-[140px] h-[140px] object-contain opacity-60 spin-slow pointer-events-none select-none" />
        </div>

        <!-- DASTURLASH card -->
        <div class="bg-gradient-to-b from-[#1c1c1c] to-[#111] border border-white/5 rounded-[22px] p-[42px] relative overflow-hidden reveal fade-right delay-1 transition-transform duration-[350ms] hover:-translate-y-1.5 hover:border-mars-orange/35 flex flex-col">
          <span class="inline-block px-4 py-2 rounded-lg text-sm font-bold mb-[22px] self-start" style="background:#5dd6ff33;color:#5dd6ff">{{ t.courses.teens.age }}</span>
          <h3 class="display text-[48px] text-white mb-3">{{ t.courses.teens.name }}</h3>
          <p class="text-neutral-300 mb-5 text-[15px]">{{ t.courses.teens.sub }}</p>
          <p class="text-neutral-400 text-[14.5px] leading-[1.65] mb-7 flex-1">{{ t.courses.teens.desc }}</p>
          <button class="cta-btn self-start mt-auto" data-skip-modal @click="openInfo = 'teens'">{{ t.courses.teens.btn }}</button>
          <img :src="marsPlanet" alt="Mars" class="absolute top-[20px] right-[20px] w-[140px] h-[140px] object-contain opacity-60 spin-slow pointer-events-none select-none" style="animation-direction:reverse" />
        </div>
      </div>
    </div>

    <!-- INFO MODAL -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="openInfo"
          class="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto py-6 px-4"
          style="background:rgba(0,0,0,.78);backdrop-filter:blur(7px)"
          @click.self="openInfo = null">

          <div class="relative bg-white dark:bg-neutral-900 rounded-[24px] w-full max-w-3xl shadow-2xl my-auto">
            <!-- Close -->
            <button @click="openInfo = null"
              class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-mars-orange transition-colors">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <!-- Header -->
            <div class="bg-gradient-to-r from-neutral-950 to-neutral-800 rounded-t-[24px] px-8 pt-10 pb-8 text-white relative overflow-hidden">
              <img :src="marsPlanet" class="absolute right-[-16px] top-[-16px] w-36 h-36 opacity-20 spin-slow pointer-events-none" alt="" />
              <span class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
                :style="openInfo === 'kids' ? 'background:#b39bff33;color:#b39bff' : 'background:#5dd6ff33;color:#5dd6ff'">
                {{ openInfo === 'kids' ? (isRU() ? kidsContent.RU.age : kidsContent.UZ.age) : (isRU() ? teensContent.RU.age : teensContent.UZ.age) }}
              </span>
              <h2 class="text-2xl sm:text-3xl font-black mb-3">
                {{ openInfo === 'kids' ? (isRU() ? kidsContent.RU.title : kidsContent.UZ.title) : (isRU() ? teensContent.RU.title : teensContent.UZ.title) }}
              </h2>
              <p class="text-neutral-300 text-sm leading-relaxed max-w-xl">
                {{ openInfo === 'kids' ? (isRU() ? kidsContent.RU.intro : kidsContent.UZ.intro) : (isRU() ? teensContent.RU.intro : teensContent.UZ.intro) }}
              </p>
            </div>

            <!-- 4 Photos -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 pt-6">
              <img v-for="(img, i) in (openInfo === 'kids' ? kidsImages : teensImages)"
                :key="i" :src="img" :alt="`photo ${i+1}`"
                class="w-full h-[110px] object-cover rounded-xl" loading="lazy" />
            </div>

            <!-- Sections -->
            <div class="px-6 sm:px-8 py-6 space-y-6">
              <div v-for="(sec, i) in (openInfo === 'kids' ? (isRU() ? kidsContent.RU.sections : kidsContent.UZ.sections) : (isRU() ? teensContent.RU.sections : teensContent.UZ.sections))"
                :key="i"
                class="pb-6 border-b border-neutral-100 dark:border-neutral-800 last:border-0 last:pb-0">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-7 h-7 rounded-lg bg-mars-orange/12 text-mars-orange flex items-center justify-center flex-shrink-0" v-html="sectionIcons[sec.icon]"></div>
                  <h3 class="font-black text-[15px] text-neutral-900 dark:text-white">{{ sec.heading }}</h3>
                </div>
                <p class="text-neutral-600 dark:text-neutral-400 text-[14px] leading-[1.85] whitespace-pre-line">{{ sec.text }}</p>
              </div>
            </div>

            <!-- Footer CTA -->
            <div class="px-6 sm:px-8 pb-8 flex flex-col sm:flex-row items-center gap-3">
              <button class="cta-btn w-full sm:w-auto" data-skip-modal @click="goConsult">
                {{ isRU() ? 'Получить консультацию' : 'Maslahat olish' }}
              </button>
              <button @click="openInfo = null"
                class="text-sm text-neutral-400 hover:text-mars-orange transition-colors">
                {{ isRU() ? 'Закрыть' : 'Yopish' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- CONSULTATION MODAL -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div v-if="openConsult"
          class="fixed inset-0 z-[210] flex items-center justify-center px-4"
          style="background:rgba(0,0,0,.82);backdrop-filter:blur(8px)"
          @click.self="openConsult = false">

          <div class="relative bg-neutral-900 rounded-[24px] w-full max-w-[480px] shadow-2xl overflow-hidden">
            <!-- Close -->
            <button @click="openConsult = false"
              class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <div class="px-8 pt-10 pb-8">
              <h2 class="text-2xl font-black text-white text-center mb-2">
                {{ t.modal.title }}
              </h2>
              <p v-if="consultCourse" class="text-orange-400 text-sm font-semibold text-center mb-1.5">
                {{ consultCourse }}
              </p>
              <p class="text-mars-orange text-sm text-center leading-relaxed mb-7">
                {{ t.modal.subtitle }}
              </p>

              <form v-if="!sent" @submit.prevent="submit" class="space-y-4">
                <input v-model="form.name" type="text" required autocomplete="given-name"
                  :placeholder="t.modal.namePlaceholder"
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-[15px] focus:outline-none focus:border-mars-orange transition-colors" />

                <input v-model="form.surname" type="text" required autocomplete="family-name"
                  :placeholder="t.modal.surnamePlaceholder"
                  class="w-full bg-neutral-800 border border-neutral-700 rounded-2xl px-5 py-4 text-white placeholder-neutral-500 text-[15px] focus:outline-none focus:border-mars-orange transition-colors" />

                <div>
                  <label class="block text-xs font-semibold text-neutral-400 mb-1.5 ml-1">
                    {{ t.modal.parentPhoneLabel }}
                  </label>
                  <div class="relative flex items-center w-full bg-neutral-800 border border-neutral-700 rounded-2xl focus-within:border-mars-orange transition-colors overflow-hidden">
                    <span class="flex items-center gap-1.5 pl-5 pr-2.5 py-4 text-white text-[15px] font-medium shrink-0 select-none">
                      <FlagIcon code="UZ" :size="18" />
                      +998
                    </span>
                    <span class="w-px h-6 bg-neutral-700 shrink-0"></span>
                    <input
                      :value="form.phone"
                      @input="onPhoneInput"
                      type="tel" inputmode="numeric" required maxlength="9"
                      placeholder="__ ___ __ __"
                      class="w-full pl-2.5 pr-5 py-4 bg-transparent text-white placeholder-neutral-500 text-[15px] focus:outline-none" />
                  </div>
                </div>

                <button type="submit" :disabled="!isFormValid()"
                  class="w-full bg-white text-neutral-900 font-black text-[16px] rounded-2xl py-4 mt-2 hover:bg-neutral-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white">
                  {{ t.modal.submit }}
                </button>
              </form>

              <template v-if="!sent">
                <div class="flex items-center gap-3 my-5">
                  <span class="flex-1 h-px bg-white/10"></span>
                  <span class="text-neutral-500 text-xs font-semibold uppercase tracking-wide">{{ t.modal.orDivider }}</span>
                  <span class="flex-1 h-px bg-white/10"></span>
                </div>

                <button type="button" @click="onTelegramClick"
                  class="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl border-0 bg-[#27A7E7] text-white font-bold text-[15px] cursor-pointer hover:bg-[#1f8fc7] transition-colors">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21.05 3.76L17.86 19.6c-.24 1.07-.87 1.33-1.76.83l-4.86-3.58-2.34 2.25c-.26.26-.48.48-.97.48l.35-4.94 9-8.13c.39-.35-.09-.55-.6-.2L6.2 12.62l-4.83-1.51c-1.05-.33-1.07-1.05.22-1.55L19.7 2.4c.87-.32 1.64.21 1.35 1.36z"/></svg>
                  {{ t.modal.telegramBtn }}
                </button>

                <Transition name="modal-fade">
                  <div v-if="showTelegramSoon"
                    class="mt-3 px-4 py-3.5 rounded-xl flex items-start gap-2.5"
                    style="background:rgba(39,167,231,.12);border:1px solid rgba(39,167,231,.3)">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#27A7E7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 mt-0.5">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <div>
                      <p class="text-[13.5px] font-bold text-white">{{ t.modal.telegramSoonTitle }}</p>
                      <p class="text-[12.5px] text-neutral-400 mt-0.5 leading-[1.5]">{{ t.modal.telegramSoonDesc }}</p>
                    </div>
                  </div>
                </Transition>
              </template>

              <div v-else class="text-center py-6">
                <div class="w-16 h-16 rounded-full flex items-center justify-center text-white mx-auto mb-4"
                  style="background:linear-gradient(135deg,#ff6a13,#ff8c42)">
                  <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <p class="text-white font-bold text-lg mb-1">
                  {{ t.modal.thanksTitle }}
                </p>
                <p class="text-neutral-400 text-sm">
                  {{ t.modal.thanksDesc }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity .25s ease, transform .25s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to    { opacity: 0; transform: scale(.97); }
</style>
