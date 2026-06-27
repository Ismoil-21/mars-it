<script setup>
import { inject, computed } from 'vue'
import { useTranslation } from '../composables/useTranslation'
import hero2 from '../assets/hero2.jpg'
import hero3 from '../assets/hero3.jpg'
import robotics3 from '../assets/robotics3.jpg'
import robotics4 from '../assets/robotics4.jpg'
import onlineLesson3 from '../assets/online-lesson3.jpg'
import onlineLesson4 from '../assets/online-lesson4.jpg'
import founder1 from '../assets/founder1.jpg'
import founder2 from '../assets/founder2.jpg'
import founder3 from '../assets/founder3.jpg'
import teacher2 from '../assets/teacher2.jpg'
import teacher3 from '../assets/teacher3.jpg'
import teacher4 from '../assets/teacher4.jpg'
import teacher5 from '../assets/teacher5.jpg'

const lang = inject('lang')
const { t } = useTranslation(lang)

const founders = [
  { img: founder1, name: 'Jahongir Pulatov', roles: ['«Cambridge LC» Training Center', 'Modme IT company', 'Mars IT school'] },
  { img: founder2, name: 'Atxam Shaisaev', roles: ['PM "Chopar Pizza"', 'Soosnovatel i CEO Get coffee', 'Soosnovatel i CEO Mars IT'] },
  { img: founder3, name: 'Ruslan Yuldashev', roles: ['Direktor "Mars IT"', 'Asoschi "Modme"', 'Sobiq xodim "Yandex education", Silicon Valley'] }
]

const teachers = [
  { img: teacher2, name: 'Bunyodbek Bekmuxammedov', role: 'Front-End developer' },
  { img: teacher3, name: 'Amirxon Ibaydillayev', role: 'Front-End developer' },
  { img: teacher4, name: "Sharifjon Mo'minov", role: 'Back-End developer' },
  { img: teacher5, name: 'Azamat Azamatov', role: 'Back-End developer' }
]

const reasonsUZ = [
  { n: '01', t: "Eng katta bolalar IT o'quv kursi", d: "«Mars IT» o'quvchilar soni bo'yicha O'zbekistondagi bolalar ta'lim muassasalari orasida yetakchi.", img: robotics3 },
  { n: '02', t: "9 yoshdan 17 yoshgacha bo'lgan bolalar uchun kurslar", d: "Bolada kodlash tajribasi yoki texnik aql bo'lishi shart emas. Dastur noldan boshlayotganlar uchun mo'ljallangan", img: hero2 },
  { n: '03', t: 'Gamefikatsiya tufayli kurslarning yuqori ko\'rsatkichlari', d: "O'quv jarayonidagi o'yin mexanikasi tufayli bizda kurs samaradorligi va talabalarning davomati juda yuqori", img: onlineLesson3 },
  { n: '04', t: "Muntazam ravishda yangilangan o'quv dasturi", d: "Biz ta'limning yuqori standartlarini saqlab turamiz. Bizning kurs dasturimiz noyob xususiy texnikalarni o'z ichiga oladi.", img: onlineLesson4 },
  { n: '05', t: "Kurslarni tugatgandan so'ng beriladigan sertifikat", d: "Sizning bilimingizni tasdiqlaymiz. Sertifikat sohaga tegishli o'qishlarda foydali bo'ladi.", img: hero3 },
  { n: '06', t: 'Amaliy uy vazifalari', d: "O'quvchilarimiz o'rganishning maksimal samaradorligini ta'minlash uchun uy vazifalarini muntazam bajaradilar.", img: robotics4 }
]
const reasonsRU = [
  { n: '01', t: "Крупнейший IT-курс для детей", d: "«Mars IT» — лидер среди детских образовательных учреждений Узбекистана по числу учеников.", img: robotics3 },
  { n: '02', t: "Курсы для детей от 9 до 17 лет", d: "Ребёнку не нужен опыт кодирования или технические знания. Программа разработана с нуля.", img: hero2 },
  { n: '03', t: 'Высокие показатели благодаря геймификации', d: "Благодаря игровой механике в учебном процессе у нас очень высокая эффективность и посещаемость курсов.", img: onlineLesson3 },
  { n: '04', t: "Регулярно обновляемая учебная программа", d: "Мы поддерживаем высокие стандарты обучения. Наша программа включает уникальные авторские техники.", img: onlineLesson4 },
  { n: '05', t: "Сертификат после окончания курса", d: "Подтверждаем ваши знания. Сертификат пригодится при поступлении на смежные специальности.", img: hero3 },
  { n: '06', t: 'Практические домашние задания', d: "Наши ученики регулярно выполняют домашние задания для максимальной эффективности обучения.", img: robotics4 }
]

const activeReasons = computed(() => lang?.value === 'RU' ? reasonsRU : reasonsUZ)
</script>

<template>
  <section class="py-[100px] bg-neutral-50 dark:bg-neutral-900">
    <div class="container">

      <div class="text-center mb-16 reveal fade-up">
        <span class="inline-flex items-center gap-2.5 text-[18px] font-extrabold text-white px-8 py-3.5 rounded-full"
          style="background:linear-gradient(120deg,#6a3df0 0%,#2f6fed 55%,#00c2ff 100%);box-shadow:0 14px 30px rgba(58,88,240,.35)">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          {{ t.founders.badge }}
        </span>
      </div>

      <h2 class="section-title text-neutral-900 dark:text-white mb-2">
        {{ t.founders.subtitle }}
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-7 mt-9">
        <div v-for="(f,i) in founders" :key="f.name" class="text-center flex flex-col items-center reveal fade-up" :class="`delay-${i+1}`">
          <div class="w-[320px] h-[320px] rounded-full overflow-hidden shrink-0 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1.5 hover:shadow-[0_18px_38px_rgba(20,30,60,.2)]"
            style="box-shadow:0 14px 32px rgba(20,30,60,.16)">
            <img :src="f.img" :alt="f.name" class="w-full h-full object-cover object-top block" loading="lazy" />
          </div>
          <div class="mt-5 flex flex-col items-center">
            <b class="text-[18px] text-neutral-900 dark:text-white">{{ f.name }}</b>
            <ul class="mt-3.5 flex flex-col gap-2 p-0 list-none">
              <li v-for="r in f.roles" :key="r" class="text-sm text-neutral-500 dark:text-neutral-400 leading-[1.4] pl-5 relative text-left before:content-[''] before:absolute before:left-0 before:top-[6px] before:w-2 before:h-2 before:rounded-full before:bg-mars-blue">{{ r }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="text-center mt-[72px] mb-6 reveal fade-up">
        <span class="inline-flex items-center gap-2.5 text-[18px] font-extrabold text-white px-8 py-3.5 rounded-full"
          style="background:linear-gradient(120deg,#6a3df0 0%,#2f6fed 55%,#00c2ff 100%);box-shadow:0 14px 30px rgba(58,88,240,.35)">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          {{ t.founders.teamBadge }}
        </span>
      </div>

      <h3 class="section-title text-neutral-900 dark:text-white mb-2">
        {{ t.founders.teamSubtitle }}
      </h3>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-11 reveal fade-up">
        <div v-for="teacher in teachers" :key="teacher.name"
          class="bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-[18px] px-[18px] pt-[18px] pb-5 text-center flex flex-col items-center shadow-[0_6px_20px_rgba(20,30,60,.04)] dark:shadow-none transition-all duration-[250ms] hover:-translate-y-1.5">
          <div class="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-700">
            <img :src="teacher.img" :alt="teacher.name" class="w-full h-full object-cover object-top block" loading="lazy" />
          </div>
          <b class="mt-4 text-[15px] text-neutral-900 dark:text-white">{{ teacher.name }}</b>
          <small class="mt-2 text-[12px] text-mars-blue uppercase tracking-[.04em]">{{ t.founders.direction }}</small>
          <span class="text-[14px] text-neutral-500 dark:text-neutral-400 mt-0.5">{{ teacher.role }}</span>
        </div>
      </div>

      <div class="text-center mt-[72px] mb-6 reveal fade-up">
        <span class="inline-block px-8 py-3.5 rounded-full text-mars-navy dark:text-white font-extrabold text-lg bg-blue-100 dark:bg-mars-navy/40">
          {{ t.founders.reasonsBadge }}
        </span>
      </div>

      <h3 class="section-title text-neutral-900 dark:text-white mb-2">
        {{ t.founders.reasonsTitle }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
        <div v-for="(r,i) in activeReasons" :key="r.n"
          class="bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-[22px] overflow-hidden flex flex-col shadow-[0_6px_20px_rgba(20,30,60,.04)] dark:shadow-none transition-all duration-[250ms] hover:-translate-y-1.5 reveal fade-up"
          :class="`delay-${i+1}`">
          <div class="relative w-full h-[280px] overflow-hidden">
            <img :src="r.img" :alt="r.t" class="w-full h-full object-cover transition-transform duration-[400ms] hover:scale-[1.06]" loading="lazy" />
            <span class="absolute left-3.5 top-3.5 w-9 h-9 flex items-center justify-center text-sm font-extrabold text-white rounded-full border-2 border-white/85"
              style="background:linear-gradient(135deg,#6a3df0 0%,#2f6fed 60%,#00c2ff 100%);box-shadow:0 6px 14px rgba(47,111,237,.4)">{{ r.n }}</span>
          </div>
          <div class="px-[26px] py-[22px]">
            <b class="block text-[18px] mb-2.5 leading-[1.3] text-mars-orange">{{ r.t }}</b>
            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-[1.6]">{{ r.d }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
