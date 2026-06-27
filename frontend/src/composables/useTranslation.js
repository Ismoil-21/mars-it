import { computed } from 'vue'

const translations = {
  UZ: {
    nav: { consult: 'Maslahat olish' },

    hero: {
      title1: "Farzandingizni chaqir, IT'da",
      title2: "o'z yo'nalishini",
      title3: "topsin",
      sub: "MARS IT — 9–17 yoshli bolalar uchun zamonaviy IT maktab.\nRobototexnika, dasturlash, sun'iy intellekt.",
      cta: "Maslahat olish"
    },

    whoFor: {
      title1: "BU ILOVA ",
      title2: "SIZ UCHUN",
      title3: ", AGAR…",
      cards: [
        "Farzandingiz vaqtini bekorga sarflamasin — uni IT darslariga yo'naltiring.",
        "Kelajak kasblarini egallashi uchun farzandingizni IT bilan tanishtiring.",
        "21-asrda muvaffaqiyatli bo'lishi — IT sohasidan boshlanadi.",
        "Oddiy darslardan charchaganlar uchun — qiziqarli va real natijali IT ta'lim."
      ],
      cta: "Maslahat olish"
    },

    courses: {
      title1: "BIZDA YAGONA,\nQULAY VA SAMARALI\nTA'LIM ",
      title2: "KURSI MAVJUD",
      kids: {
        age: "9–11 yosh",
        name: "IT KIDS",
        sub: "Robototexnika orqali IT olamiga ilk qadamlar",
        desc: "Farzandingiz IT'ni o'yin orqali o'rganadi — robotlar yig'adi, dasturlaydi va aqlli uylar yaratadi. C++ va Python dasturlash tillarini o'zlashtiradi, Arduino bilan ishlashni o'rganadi.",
        btn: "Ko'proq ma'lumot"
      },
      teens: {
        age: "12–17 yosh",
        name: "DASTURLASH",
        sub: "Saytlar, botlar va sun'iy intellekt — barchasi bitta kursda",
        desc: "Farzandingiz veb-saytlar yaratishni, Telegram botlar tuzishni, ma'lumotlar bazasi bilan ishlashni va AI'dan foydalanishni o'rganadi. JavaScript va Python bilan mustahkam dasturlash bazasini shakllantiradi.",
        btn: "Ko'proq ma'lumot"
      }
    },

    rocket: {
      title1: "BEPUL PROFORIYENTATSION TESTDAN O'TING",
      title2: " VA FARZANDINGIZ AYNAN QAYSI IT YO'NALISHIDA O'Z QOBILIYATLARINI OCHIB BERA OLISHINI ANIQLANG!",
      items: [
        "Farzandingizning yashirin iste'dodlari va qiziqishlarini bilib oling",
        "Unga aynan qaysi yo'nalish mos kelishini tushunib yetasiz",
        "Natija kafolati: mutaxassislarimiz kasb tanlash bo'yicha maslahat beradi"
      ],
      note: "Hoziroq yoziling — bu farzandingiz kelajagi sari ilk qadam!",
      cta: "Bepul testga yoziling"
    },

    howItWorks: {
      title1: "ILOVAMIZ",
      title2: "QANDAY ISHLAYDI",
      cards: [
        { title: "Bola o'z darajasiga mos topshiriqlarni bajaradi", desc: "Ba'zida bola IT sohasiga qiziqadi, lekin asosiy bilimlarida bo'shliqlar bo'lishi mumkin. Bizning yechimimiz bu bo'shliqlarni to'ldirishga va har qanday tayyorgarlik darajasida vazifalarni oson bajarishga yordam beradi." },
        { title: "Kasb tanlash testi", desc: "Ilova bolaga IT sohasidagi qaysi yo'nalishlar qiziqarli va mosligini aniqlashga yordam beradi." },
        { title: "Shaxsiy o'quv rejasi", desc: "Test natijalari va bolaning hozirgi bilim darajasiga asoslanib, tizim aynan sizning farzandingiz uchun mos individual o'quv rejasini tuzadi." },
        { title: "Video darslar va topshiriqlarning tushuntirishlari", desc: "Agar oyda topshiriqni tushunmasa, darsni har bir vazifa yoki mavzu bo'yicha batafsil tushuntirishlar video darsni ko'rish mumkin." },
        { title: "Mentor yordami", desc: "Agar video darsdan keyin ham savollar bo'lsa, bola har doim ichki onlayn-mentorga murojaat qilib, izlagan savolini olishi mumkin." },
        { title: "Mentorlarimiz bog'lanishga tayyor", desc: "Mentorlar har kuni Toshkent vaqti bilan 10:00 dan 22:00 gacha ishlaydi." },
        { title: "Har kungi vositalari", desc: "Har kuni bola o'z ta'lim darajasiga mos bo'lgan 10–15 ta topshiriqni bajarib oladi." },
        { title: "Ichki ballar tizimi", desc: "Bajarilgan har kungi vazifalarni bolaga ichki ballar bilan rag'batlantiramiz. Bu ballarni keyinchalik ichki do'konimizda foydali narsalarga almashtirish mumkin." },
        { title: "Ichki do'kon", desc: "Yig'ilgan ballarni bola bizning ichki do'konimizda foydali va qiziqarli narsalarga sarflashi mumkin. Masalan, gadjetlar, aksessuarlar yoki hattoki PlayStation 5 sotib olish imkoniyati mavjud." }
      ],
      cta: "Maslahat olish"
    },

    appSteps: {
      title: "Farzandingizning rivojlanayotganini istalgan vaqtda ko'rishingiz mumkin",
      prevAria: "Oldingi",
      nextAria: "Keyingi"
    },

    stats: {
      title1: "Nega aynan ",
      title2: "MARS IT School",
      title3: " —\nraqamli kelajak maktabi?",
      sub: "4 yil ichida minglab o'quvchilarni tayyorladik, Toshkent bo'ylab filiallar ochdik va kuchli o'qituvchilar jamoasini yig'dik.",
      items: [
        { num: "5.000+ o'quvchi", desc: "Haqiqiy loyihalar, izohlar va erta yoshdanoq kasbiy o'sish" },
        { num: "2.400+ bola", desc: "hozirda o'qimoqda. Har hafta — yangi ko'nikmalar, loyihalar va o'sish." },
        { num: "7 ta filial", desc: "Toshkent bo'ylab qulay joylashuvda: zamonaviy sinflar va texnika" },
        { num: "30+ professional o'qituvchi", desc: "Mentorlar, kuratorlar va ustozlar — tanlov va tayyorgarlikdan o'tgan tajribali jamoa." }
      ]
    },

    testimonials: {
      title1: "O'quvchilarimiz ",
      title2: "nima deydi"
    },

    founders: {
      title1: "Bizning ",
      title2: "Asoschilar",
      badge: "O'quv markazimiz asoschilari",
      subtitle: "O'quv maktabimiz asoschilari ta'lim sohasidagi tajribali tadbirkorlardir.",
      teamBadge: "Jamoa",
      teamSubtitle: "Darslarni esa kamida 5 yillik tajribaga ega yirik kompaniyalarning hozirgi mutaxassislari olib boradilar.",
      direction: "Yo'nalish:",
      reasonsBadge: "6 sabab",
      reasonsTitle: "Nima uchun «Mars IT»da o'qishni boshlashingiz kerak?"
    },

    branches: {
      title1: "Bizning ",
      title2: "Filiallar",
      sub: "Toshkentning qulay nuqtalarida 7 ta filialimiz mavjud",
      filialLabel: "FILIAL",
      ctaBtn: "Ekskursiyaga ro'yxatdan o'ting"
    },

    faq: {
      title1: "Ko'p so'raladigan ",
      title2: "savollar",
      items: [
        { q: "O'qish narxi qancha?", a: "Kurslarimiz narxi 1.090.000 so'm. Bu mablag' ichiga 12 ta dars, o'quvchilar uchun onlayn platforma, bepul Wi-Fi'li co-working zonasi, yordamchi o'qituvchi, yakshanba kungi qiziqarli tadbirlar va dars payti beriladigan noutbuk kiradi.", highlight: true },
        { q: "Darslar uchun nima talab qilinadi?", a: "O'quvchiga noutbuk kerak bo'ladi. Birinchi darsda o'qituvchi kerakli dasturlarni o'rnatishga yordam beradi." },
        { q: "Farzandimning noutbuki bo'lmasa-chi?", a: "Muammo yo'q, o'quv markazimiz tomonidan noutbuk taqdim etiladi." },
        { q: "Darslar yozda bo'ladimi?", a: "«Mars IT»da darslar yil davomida bo'ladi." },
        { q: "Bola bir haftada hamma narsani tashlab qo'ymaydimi?", a: "Yo'q, chunki biz dasturlashni tez va aniq natijalarga ega interaktiv o'yinga aylantirdik." },
        { q: "Kurs oxirida farzandim dasturchi bo'ladimi?", a: "Bola o'zi xohlagan kasb egasiga aylanadi. Biz IT sohasida muvaffaqiyatli faoliyat boshlash uchun barcha bilim va ko'nikmalarni taqdim etamiz.\n\n«Mars IT»da dasturlash va dizayn kurslari o'quvchilarda mantiqiy fikrlash, ijodkorlik va muloqot ko'nikmalarini rivojlantirishga yordam beradi. *O'quv kursimiz ishga joylashishni kafolatlamaydi.", highlight: false },
        { q: "Kursni tugatgandan keyin sertifikat berasizmi?", a: "Ha, biz kursni muvaffaqiyatli tamomlaganlik uchun sertifikat beramiz.", highlight: true }
      ]
    },

    contactCta: {
      title: "Hali ham savollaringiz bormi? Biz sizga to'g'ri dasturni tanlashda yordam bera olamiz",
      telegram: "Telegram orqali savol bering",
      detail: "Tafsilotlaringizni qoldiring"
    },

    aboutMars: {
      label: "MARS HAQIDA",
      title: "Bolalarni dasturlash, AI va loyihalarga o'rgatamiz",
      sub: "MARS Kids va MARS Teens, Space platformasi, Demo Days, kovorking, internlik dasturi va kasbiy kurslar — to'liq mahsulot tavsifi.",
      btn: "Mahsulot haqida batafsil →"
    },

    footer: {
      branchesLabel: "BIZNING FILIALLAR",
      copy: "© 2026 MARS IT School. Toshkent."
    },

    modal: {
      title: "Bepul konsultatsiya",
      subtitle: "Bizning mutaxassislarimiz siz bilan bog'lanadi va farzandingiz uchun eng mos IT yo'nalishni tavsiya qiladi",
      namePlaceholder: "Farzandingizning ismi",
      surnamePlaceholder: "Farzandingizning familiyasi",
      phonePlaceholder: "__ ___ __ __",
      parentPhoneLabel: "Aloqa uchun telefon raqamingiz",
      submit: "Yuborish",
      thanks: "Rahmat! Tez orada siz bilan bog'lanamiz.",
      thanksTitle: "Rahmat!",
      thanksDesc: "Tez orada siz bilan bog'lanamiz.",
      orDivider: "yoki",
      telegramBtn: "Telegram orqali ro'yxatdan o'ting",
      telegramSoonTitle: "Tez orada ishga tushadi",
      telegramSoonDesc: "Telegram bot hozircha ulanmagan. Iltimos, hozircha yuqoridagi forma orqali ro'yxatdan o'ting — tez orada bot orqali ham ro'yxatdan o'tish imkoni qo'shiladi."
    },

    test: {
      backHome: "Bosh sahifa",
      next: "Keyingisi",
      seeResult: "Natijani ko'rish",
      hello: (name) => `Salom, ${name}!`
    },

    product: {
      badge: "MAHSULOT",
      heroTitle1: "MARS IT SCHOOL",
      heroTitle2: "mahsuloti",
      heroDec: "9–17 yoshli bolalar uchun zamonaviy texnologiyalar maktabi. Robototexnika, dasturlash va sun'iy intellekt yo'nalishlari.",
      backBtn: "← Bosh sahifa",

      marsWhat: {
        title: "MARS nima",
        p1: "MARS IT SCHOOL — bolalar uchun zamonaviy texnologiyalar maktabi. Bu dastur doirasida bolalar, kompyuter bilan ishlash, robototexnika va sun'iy intellekt sohasidagi ko'nikmalarni egallaydi.",
        p2: "Maqsadimiz — bolalarni yetakchi texnologik iqtidorlar ro'yxatiga kiritish va ularni texnologiya sohasidagi mutaxassislarga tayyorlash."
      },

      whyFuture: {
        title: "Nega bu kelajak uchun muhim",
        p1: "Hozir ham deyarli har qanday kasbda kompyuter siz ishlash mumkin emas. Kelajakda esa bu talablar yanada o'sadi. Kompyuter bilan ishlashdan tashqari quyidagi ko'nikmalar talab qilinadi:",
        p2: "",
        items: [
          "sun'iy intellekt bilan ishlash;",
          "turli dasturlar va xizmatlar bilan ishlash;",
          "o'z dasturlari va loyihalarini yaratish;",
          "masalalarni hal qilishda tanqidiy va mantiqiy fikrlash."
        ],
        conclusion: "MARSda o'qigandan keyin bola texnologiyalardan nafaqat foydalanishni, balki ularni yaratishni ham biladi. MARSdagi ta'lim — IT har qanday kasbning kalit vositasi bo'ladigan hayotga tayyorlikdir."
      },

      impact: {
        title: "Ta'limning bolaga ta'siri",
        intro: "Bolalar IT va AI'ni o'rganganda, ularda tizimli va tanqidiy tafakkur rivojlanadi:",
        items: [
          "Bola harakatlar ketma-ketligini qurishni, masalalarni mantiqiy hal qilishni va qadamlar orasidagi bog'liqlikni ko'rishni o'rganadi.",
          "Boshqa fanlarda — matematika, fizika, aniq fanlarda natijalar yaxshilanadi.",
          "Loyihalar ustida ishlash haqiqiy jarayonlarni tushunishga yordam beradi: mijoz, moliya, sotuv, foydalanuvchi tajribasi."
        ],
        conclusion: "Kelajakda bola yangi mavzularni tezroq o'zlashtiradi, loyihalar yarata oladi, murakkab vaziyatlarni tahlil qiladi va barcha jarayonlarni tushungan holda qarorlar qabul qiladi."
      },

      howLearning: {
        title: "Ta'lim qanday o'tadi",
        intro: "Har bir dars 1 soat davom etadi va o'z ichiga oladi:",
        steps: [
          "Uy vazifalari va loyihalarni tekshirish",
          "Yangi mavzuni tushuntirish",
          "Darsda amaliyot"
        ],
        monthTitle: "Oy tuzilmasi",
        monthIntro: "Har oy 12 ta darsdan iborat:",
        monthItems: [
          { label: "1–5 darslar", desc: "yangi mavzularni o'rganish" },
          { label: "6-dars", desc: "loyiha ishi" },
          { label: "7–11 darslar", desc: "yangi mavzularni o'rganish" },
          { label: "12-dars", desc: "loyiha ishi" }
        ],
        projectNote: "Loyiha darslarida o'quvchilar o'z loyihalarini yaratadi va himoya qiladi."
      },

      ages: {
        title1: "Yosh ",
        title2: "yo'nalishlari",
        kids: {
          age: "8–12 yosh",
          name: "MARS Kids",
          intro: "Bolalar texnologik iqtidorlarni mashqlari va topshiriqlar orqali egallaydi. Bu modulda:",
          items: ["mantiq;", "algoritmik tafakkur;", "robotika;", "dasturlash asoslarini bilib olinadi."]
        },
        teens: {
          age: "12–17 yosh",
          name: "MARS Teens",
          intro: "O'spirinlar uchun chuqurroq dasturlash va IT yo'nalishi. Ular o'rganadilar:",
          items: ["telefon/kompyuter o'yinlari yaratishni;", "dasturlar tuzishni;", "ma'lumotlardan foydalanish asoslarini;", "robototexnika foydalanishni."],
          extra: "Ularga 5 asosiy yo'nalish taklif qilinadi: kompyuter ko'rinishi, raqamli iqtisod, AI va boshqalar."
        }
      },

      space: {
        title1: "Space ",
        title2: "platformasi",
        intro: "Space — MARSning o'quvchilarni o'qitish va motivatsiya qilish uchun ichki platformasi. Unda mavjud:",
        items: [
          "uy vazifalari;",
          "loyihalar;",
          "ishlarni tekshirish tizimi;",
          "MARS Coins va sovg'alar do'koni;",
          "loyihalarni e'lon qilish uchun lenta;",
          "videokurslar;",
          "mantiqni rivojlantiruvchi o'yinlar;",
          "ranglar va reytinglar."
        ],
        motivationTitle: "Motivatsiya tizimi",
        motivationDesc: "Faollik va yaxshi natijalar uchun o'quvchilar MARS Coins oladi. Ularni ichki do'konda haqiqiy sovg'alarga almashtirish mumkin."
      },

      motivation: {
        title1: "Motivasiya ",
        title2: "tizimi",
        desc: "Faollik va yutuqlar uchun bolalar MARS Coins topishi mumkin. Bu tangalar ichki do'konda sovg'alarga, gadjetlarga yoki PlayStation 5 ga almashtirilishi mumkin. Bu bolalarni motivatsiyalashning kuchli usuli hisoblanadi.",
        coin: "Faollik uchun MARS Coins topasiz",
        shop: "Ichki do'konda sovg'alarga almashtirasiz",
        prize: "Gadjetlar yoki PlayStation 5 yutuq sifatida"
      },

      coworking: {
        title1: "Kovorking va o'quvchilarga ",
        title2: "yordam",
        p1: "Kovorking va o'quvchilarga yordam berishning maqsadi — bolalarning o'rganish jarayonini samarali va qiziqarli qilish. O'quvchilar hamkorlikda ishlaydi, muammolarni birgalikda hal qiladi va o'z iqtidorlarini rivojlantiradi.",
        p2: "Kovorking zamonaviy jihozlangan bo'lib, o'quvchilar erkin va ijodiy muhitda ishlashi mumkin. Turli tadbirlar, hackathon va musobaqalar muntazam o'tkaziladi."
      },

      outsideLife: {
        title: "O'quvdan tashqari hayot",
        desc: "Har yakshanba MARS o'quvchilar uchun tadbirlar o'tkazadi: o'yinlar va turnirlar, kino tomoshalari, hakatonlar, musobaqalar va boshqa faoliyatlar. Bularning barchasi o'qish narxiga kiradi."
      },

      profCourses: {
        title: "Kasbiy kurslar",
        intro: "Asosiy dasturdan keyin o'quvchilar 12 oylik kasbiy kursga o'tishi mumkin. Unda murakkab mavzular o'rganiladi:",
        items: [
          "serverlar bilan ishlash;",
          "Node.js;",
          "Docker;",
          "dasturlar arxitekturasi;",
          "kengaytirilgan dasturlash ko'nikmalari."
        ],
        note: "Asosiy diqqat — murakkab loyihalar yaratish va kuchli portfolio yig'ish."
      },

      values: {
        title: "MARSning asosiy qadriyati",
        intro: "MARS — shunchaki dasturlashni o'rgatish emas. Biz:",
        items: [
          "tafakkur va mantiqni rivojlantiramiz;",
          "loyihalar yaratishni o'rgatamiz;",
          "amaliy ko'nikmalarni shaklllantiramiz;",
          "bolalarni kelajakka tayyorlaymiz."
        ],
        tagline: "Biz shunchaki darslar o'tmaymiz — biz bolalarga texnologiyalar dunyosida kuchliroq bo'lishga yordam beramiz."
      },

      interns: {
        title: "Internlar",
        intro: "Eng yaxshi o'quvchilar Intern bo'lishi mumkin.",
        who: {
          heading: "KIM INTERN BO'LA OLADI",
          desc: "Bizda kamida bir yil o'qigan, ariza topshirgan, suhbatlardan o'tgan va texnik hamda soft skills imtihonlarini topshirgan o'quvchilar."
        },
        what: {
          heading: "INTERNLAR NIMA QILADI",
          items: ["darslarda mentorlarga yordam beradi;", "orqada qolayotgan o'quvchilarga yordam beradi;", "filial hayotida ishtirok etadi."]
        },
        perks: {
          heading: "INTERNLARNING IMTIYOZLARI",
          items: ["maxsus beyj;", "o'qituvchilar zonasiga kirish;", "qo'shimcha o'qish uchun istalgan darsga borish imkoniyati;", "xodimlar uchun ichki tadbirlarda ishtirok etish;", "timbildinglarda ishtirok etish."]
        },
        footer: "Intern Program o'quvchilarda yetakchilikni rivojlantiradi, MARSning bo'lajak xodimlarini tayyorlaydi va maktab ichidagi hamjamiyatni mustahkamlaydi."
      },

      support: {
        title1: "Qo'llab-quvvatlash ",
        title2: "jamoasi",
        mentor: { name: "Mentor", desc: "Guruhning asosiy o'qituvchisi, o'qituv va o'quvchilar natijasi uchun javobgar." },
        curator: { name: "Kurator", desc: "Ota-onalarga bola rivoji haqida ma'lumot beradi." },
        admin: { name: "Administrator", desc: "Tashkiliy masalalarda yordam beradi." }
      },

      cta: {
        title: "Farzandingizni MARS IT ga yozilishga tayyormisiz?",
        sub: "Bepul maslahat oling va farzandingiz uchun eng mos yo'nalishni tanlang.",
        btn: "Bepul maslahat olish",
        phone: "+998 78 777 77 53"
      },

      demoDays: {
        title: "Demo Days",
        desc: "Har 2–3 oyda o'tkaziladigan Demo Day tadbirida o'quvchilar o'z loyihalarini namoyish qiladilar, ota-onalarga ko'rsatadilar va sanoat mutaxassislaridan baholanadilar.",
        note: "Yiliga 4 ta katta Demo Day o'tkaziladi."
      }
    }
  },

  RU: {
    nav: { consult: 'Получить консультацию' },

    hero: {
      title1: "Позови ребёнка, пусть найдёт",
      title2: "своё направление",
      title3: "в IT",
      sub: "MARS IT — современная IT-школа для детей 9–17 лет.\nРобототехника, программирование, искусственный интеллект.",
      cta: "Получить консультацию"
    },

    whoFor: {
      title1: "ЭТО ПРИЛОЖЕНИЕ ",
      title2: "ДЛЯ ВАС",
      title3: ", ЕСЛИ…",
      cards: [
        "Пусть ребёнок тратит время с пользой — направьте его на IT-занятия.",
        "Познакомьте ребёнка с IT, чтобы он освоил профессии будущего.",
        "Успех в 21 веке начинается с IT-образования.",
        "Для тех, кто устал от обычных уроков — увлекательное IT с реальными результатами."
      ],
      cta: "Получить консультацию"
    },

    courses: {
      title1: "У НАС ЕДИНЫЙ,\nУДОБНЫЙ И ЭФФЕКТИВНЫЙ\nОБРАЗОВАТЕЛЬНЫЙ ",
      title2: "КУРС",
      kids: {
        age: "9–11 лет",
        name: "IT KIDS",
        sub: "Первые шаги в мир IT через робототехнику",
        desc: "Ребёнок изучает IT через игру — собирает роботов, программирует и создаёт умные дома. Осваивает C++ и Python, работает с Arduino.",
        btn: "Подробнее"
      },
      teens: {
        age: "12–17 лет",
        name: "ПРОГРАММИРОВАНИЕ",
        sub: "Сайты, боты и ИИ — всё в одном курсе",
        desc: "Ребёнок научится создавать сайты, Telegram-боты, работать с базами данных и использовать ИИ. Формирует прочную базу программирования на JavaScript и Python.",
        btn: "Подробнее"
      }
    },

    rocket: {
      title1: "ПРОЙДИТЕ БЕСПЛАТНЫЙ ПРОФОРИЕНТАЦИОННЫЙ ТЕСТ",
      title2: " И УЗНАЙТЕ, В КАКОМ IT-НАПРАВЛЕНИИ РАСКРОЕТСЯ ТАЛАНТ ВАШЕГО РЕБЁНКА!",
      items: [
        "Узнайте скрытые таланты и интересы вашего ребёнка",
        "Поймите, какое направление подходит именно ему",
        "Гарантия результата: наши специалисты дадут совет по выбору профессии"
      ],
      note: "Запишитесь прямо сейчас — это первый шаг к будущему вашего ребёнка!",
      cta: "Записаться на бесплатный тест"
    },

    howItWorks: {
      title1: "КАК РАБОТАЕТ",
      title2: "НАШЕ ПРИЛОЖЕНИЕ",
      cards: [
        { title: "Ребёнок выполняет задания по своему уровню", desc: "Иногда ребёнок интересуется IT, но в базовых знаниях есть пробелы. Наше решение помогает закрыть эти пробелы и легко выполнять задания при любом уровне подготовки." },
        { title: "Тест на выбор профессии", desc: "Приложение помогает ребёнку определить, какие направления в IT ему интересны и подходят." },
        { title: "Личный учебный план", desc: "На основе результатов теста и текущего уровня знаний система составляет индивидуальный учебный план именно для вашего ребёнка." },
        { title: "Видеоуроки и объяснения заданий", desc: "Если ребёнок не понял задание, можно посмотреть видеоурок с подробными объяснениями по каждой задаче или теме." },
        { title: "Помощь ментора", desc: "Если после видеоурока остались вопросы, ребёнок всегда может обратиться к онлайн-ментору и получить ответ." },
        { title: "Наши менторы готовы к общению", desc: "Менторы работают ежедневно с 10:00 до 22:00 по времени Ташкента." },
        { title: "Ежедневные инструменты", desc: "Каждый день ребёнок выполняет 10–15 заданий, соответствующих его уровню обучения." },
        { title: "Система внутренних баллов", desc: "За выполненные ежедневные задания ребёнок получает внутренние баллы. Их можно обменять в нашем внутреннем магазине на полезные вещи." },
        { title: "Внутренний магазин", desc: "Накопленные баллы ребёнок может потратить в нашем магазине на полезные и интересные вещи: гаджеты, аксессуары или даже PlayStation 5." }
      ],
      cta: "Получить консультацию"
    },

    appSteps: {
      title: "Вы можете видеть развитие ребёнка в любое время",
      prevAria: "Предыдущий",
      nextAria: "Следующий"
    },

    stats: {
      title1: "Почему именно ",
      title2: "MARS IT School",
      title3: " —\nшкола цифрового будущего?",
      sub: "За 4 года подготовили тысячи учеников, открыли филиалы по всему Ташкенту и собрали сильную команду преподавателей.",
      items: [
        { num: "5.000+ учеников", desc: "Реальные проекты, отзывы и профессиональный рост с раннего возраста" },
        { num: "2.400+ детей", desc: "учатся прямо сейчас. Каждую неделю — новые навыки, проекты и рост." },
        { num: "7 филиалов", desc: "В удобных точках Ташкента: современные классы и оборудование" },
        { num: "30+ профессиональных преподавателей", desc: "Менторы, кураторы и наставники — опытная команда, прошедшая отбор." }
      ]
    },

    testimonials: {
      title1: "Что говорят ",
      title2: "наши ученики"
    },

    founders: {
      title1: "Наши ",
      title2: "Основатели",
      badge: "Основатели учебного центра",
      subtitle: "Основатели нашей школы — опытные предприниматели в сфере образования.",
      teamBadge: "Команда",
      teamSubtitle: "Занятия ведут действующие специалисты крупных компаний с опытом не менее 5 лет.",
      direction: "Направление:",
      reasonsBadge: "6 причин",
      reasonsTitle: "Почему стоит начать учиться в «Mars IT»?"
    },

    branches: {
      title1: "Наши ",
      title2: "Филиалы",
      sub: "7 филиалов в удобных точках Ташкента",
      filialLabel: "ФИЛИАЛ",
      ctaBtn: "Записаться на экскурсию"
    },

    faq: {
      title1: "Часто задаваемые ",
      title2: "вопросы",
      items: [
        { q: "Сколько стоит обучение?", a: "Стоимость курса — 1 090 000 сум. Включает 12 уроков, онлайн-платформу, бесплатный коворкинг с Wi-Fi, помощника-преподавателя, воскресные мероприятия и ноутбук на время урока.", highlight: true },
        { q: "Что требуется для занятий?", a: "Ученику понадобится ноутбук. На первом уроке преподаватель поможет установить необходимые программы." },
        { q: "Что если у ребёнка нет ноутбука?", a: "Не проблема — учебный центр предоставит ноутбук." },
        { q: "Проводятся ли занятия летом?", a: "В «Mars IT» занятия проводятся круглый год." },
        { q: "Не бросит ли ребёнок всё через неделю?", a: "Нет, потому что мы превратили программирование в интерактивную игру с быстрыми и чёткими результатами." },
        { q: "Станет ли мой ребёнок программистом после курса?", a: "Ребёнок сможет стать специалистом в выбранной профессии. Мы даём все знания и навыки для успешного старта в IT.\n\nКурсы программирования и дизайна помогают развить логическое мышление, творчество и коммуникативные навыки. *Курс не гарантирует трудоустройство.", highlight: false },
        { q: "Выдаёте ли сертификат после окончания курса?", a: "Да, мы выдаём сертификат об успешном прохождении курса.", highlight: true }
      ]
    },

    contactCta: {
      title: "Ещё есть вопросы? Мы поможем выбрать правильную программу",
      telegram: "Задать вопрос в Telegram",
      detail: "Оставьте свои данные"
    },

    aboutMars: {
      label: "О МАРС",
      title: "Обучаем детей программированию, ИИ и проектной работе",
      sub: "MARS Kids и MARS Teens, платформа Space, Demo Days, коворкинг, программа стажировок и профессиональные курсы — полное описание продукта.",
      btn: "Подробнее о продукте →"
    },

    footer: {
      branchesLabel: "НАШИ ФИЛИАЛЫ",
      copy: "© 2026 MARS IT School. Ташкент."
    },

    modal: {
      title: "Бесплатная консультация",
      subtitle: "Наши специалисты свяжутся с вами и порекомендуют наиболее подходящее IT-направление для вашего ребёнка",
      namePlaceholder: "Имя ребёнка",
      surnamePlaceholder: "Фамилия ребёнка",
      phonePlaceholder: "__ ___ __ __",
      parentPhoneLabel: "Ваш номер телефона для связи",
      submit: "Отправить",
      thanks: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      thanksTitle: "Спасибо!",
      thanksDesc: "Мы свяжемся с вами в ближайшее время.",
      orDivider: "или",
      telegramBtn: "Зарегистрироваться через Telegram",
      telegramSoonTitle: "Скоро заработает",
      telegramSoonDesc: "Telegram-бот пока не подключён. Пожалуйста, зарегистрируйтесь через форму выше — регистрация через бота появится совсем скоро."
    },

    test: {
      backHome: "Главная",
      next: "Далее",
      seeResult: "Посмотреть результат",
      hello: (name) => `Привет, ${name}!`
    },

    product: {
      badge: "ПРОДУКТ",
      heroTitle1: "MARS IT SCHOOL",
      heroTitle2: "продукт",
      heroDec: "Современная школа технологий для детей 9–17 лет. Направления: робототехника, программирование и искусственный интеллект.",
      backBtn: "← Главная",

      marsWhat: {
        title: "Что такое MARS",
        p1: "MARS IT SCHOOL — современная школа технологий для детей. В рамках этой программы дети осваивают навыки работы с компьютером, робототехнику и искусственный интеллект.",
        p2: "Наша цель — включить детей в список ведущих технологических талантов и подготовить их к карьере в сфере технологий."
      },

      whyFuture: {
        title: "Почему это важно для будущего",
        p1: "Сегодня практически в любой профессии невозможно работать без компьютера. В будущем эти требования только возрастут. Помимо работы с компьютером, потребуются следующие навыки:",
        p2: "",
        items: [
          "работа с искусственным интеллектом;",
          "работа с различными программами и сервисами;",
          "создание собственных программ и проектов;",
          "критическое и логическое мышление при решении задач."
        ],
        conclusion: "После обучения в MARS ребёнок умеет не только пользоваться технологиями, но и создавать их. Образование в MARS — это подготовка к жизни, где IT является ключевым инструментом любой профессии."
      },

      impact: {
        title: "Влияние обучения на ребёнка",
        intro: "Когда дети изучают IT и ИИ, у них развивается системное и критическое мышление:",
        items: [
          "Ребёнок учится выстраивать последовательность действий, логически решать задачи и видеть взаимосвязи между шагами.",
          "Улучшаются результаты в других предметах — математике, физике, точных науках.",
          "Работа над проектами помогает понять реальные процессы: клиент, финансы, продажи, пользовательский опыт."
        ],
        conclusion: "В будущем ребёнок быстрее усваивает новые темы, создаёт проекты, анализирует сложные ситуации и принимает решения, понимая все процессы."
      },

      howLearning: {
        title: "Как проходит обучение",
        intro: "Каждый урок длится 1 час и включает:",
        steps: [
          "Проверка домашних заданий и проектов",
          "Объяснение новой темы",
          "Практика на уроке"
        ],
        monthTitle: "Структура месяца",
        monthIntro: "Каждый месяц состоит из 12 уроков:",
        monthItems: [
          { label: "1–5 уроки", desc: "изучение новых тем" },
          { label: "6-й урок", desc: "работа над проектом" },
          { label: "7–11 уроки", desc: "изучение новых тем" },
          { label: "12-й урок", desc: "работа над проектом" }
        ],
        projectNote: "На проектных уроках ученики создают и защищают собственные проекты."
      },

      ages: {
        title1: "Возрастные ",
        title2: "направления",
        kids: {
          age: "8–12 лет",
          name: "MARS Kids",
          intro: "Дети осваивают технологические таланты через упражнения и задания. В этом модуле:",
          items: ["логика;", "алгоритмическое мышление;", "робототехника;", "основы программирования."]
        },
        teens: {
          age: "12–17 лет",
          name: "MARS Teens",
          intro: "Более глубокое программирование и IT для подростков. Они учатся:",
          items: ["создавать игры для телефона/компьютера;", "разрабатывать программы;", "основам работы с данными;", "использовать робототехнику."],
          extra: "Им предлагается 5 основных направлений: компьютерное зрение, цифровая экономика, ИИ и другие."
        }
      },

      space: {
        title1: "Платформа ",
        title2: "Space",
        intro: "Space — внутренняя платформа MARS для обучения и мотивации учеников. В ней доступно:",
        items: [
          "домашние задания;",
          "проекты;",
          "система проверки работ;",
          "MARS Coins и магазин подарков;",
          "лента для публикации проектов;",
          "видеокурсы;",
          "игры для развития логики;",
          "рейтинги и баллы."
        ],
        motivationTitle: "Система мотивации",
        motivationDesc: "За активность и хорошие результаты ученики получают MARS Coins. Их можно обменять во внутреннем магазине на реальные подарки."
      },

      motivation: {
        title1: "Система ",
        title2: "мотивации",
        desc: "За активность и достижения дети могут получать MARS Coins. Эти монеты можно обменять во внутреннем магазине на подарки, гаджеты или PlayStation 5. Это мощный способ мотивации детей.",
        coin: "Зарабатывайте MARS Coins за активность",
        shop: "Обменивайте в магазине на подарки",
        prize: "Гаджеты или PlayStation 5 в качестве приза"
      },

      coworking: {
        title1: "Коворкинг и помощь ",
        title2: "ученикам",
        p1: "Цель коворкинга и поддержки учеников — сделать процесс обучения эффективным и увлекательным. Ученики работают совместно, решают проблемы вместе и развивают свои таланты.",
        p2: "Коворкинг оснащён современным оборудованием, ученики могут работать в свободной и творческой обстановке. Регулярно проводятся различные мероприятия, хакатоны и соревнования."
      },

      outsideLife: {
        title: "Жизнь вне учёбы",
        desc: "Каждое воскресенье для учеников MARS проводятся мероприятия: игры и турниры, кинопоказы, хакатоны, соревнования и другие активности. Всё это входит в стоимость обучения."
      },

      profCourses: {
        title: "Профессиональные курсы",
        intro: "После основной программы ученики могут перейти на 12-месячный профессиональный курс. В нём изучаются более сложные темы:",
        items: [
          "работа с серверами;",
          "Node.js;",
          "Docker;",
          "архитектура программ;",
          "расширенные навыки программирования."
        ],
        note: "Основной акцент — создание сложных проектов и формирование сильного портфолио."
      },

      values: {
        title: "Основные ценности MARS",
        intro: "MARS — это не просто обучение программированию. Мы:",
        items: [
          "развиваем мышление и логику;",
          "учим создавать проекты;",
          "формируем практические навыки;",
          "готовим детей к будущему."
        ],
        tagline: "Мы не просто проводим уроки — мы помогаем детям стать сильнее в мире технологий."
      },

      interns: {
        title: "Стажёры",
        intro: "Лучшие ученики могут стать стажёрами.",
        who: {
          heading: "КТО МОЖЕТ СТАТЬ СТАЖЁРОМ",
          desc: "Ученики, обучавшиеся у нас не менее одного года, подавшие заявку, прошедшие собеседования и сдавшие технические и soft skills экзамены."
        },
        what: {
          heading: "ЧТО ДЕЛАЮТ СТАЖЁРЫ",
          items: ["помогают менторам на занятиях;", "помогают отстающим ученикам;", "участвуют в жизни филиала."]
        },
        perks: {
          heading: "ПРИВИЛЕГИИ СТАЖЁРОВ",
          items: ["специальный бейдж;", "доступ в зону преподавателей;", "возможность посещать любой урок для дополнительного обучения;", "участие во внутренних мероприятиях для сотрудников;", "участие в тимбилдингах."]
        },
        footer: "Программа стажировки развивает лидерские качества учеников, готовит будущих сотрудников MARS и укрепляет внутреннее сообщество школы."
      },

      support: {
        title1: "Команда ",
        title2: "поддержки",
        mentor: { name: "Ментор", desc: "Основной преподаватель группы, отвечает за обучение и результаты учеников." },
        curator: { name: "Куратор", desc: "Информирует родителей о развитии ребёнка." },
        admin: { name: "Администратор", desc: "Помогает в организационных вопросах." }
      },

      cta: {
        title: "Готовы записать ребёнка в MARS IT?",
        sub: "Получите бесплатную консультацию и выберите подходящее направление для вашего ребёнка.",
        btn: "Получить бесплатную консультацию",
        phone: "+998 78 777 77 53"
      },

      demoDays: {
        title: "Demo Days",
        desc: "На Demo Day, который проводится каждые 2–3 месяца, ученики демонстрируют свои проекты, показывают родителям и получают оценку от отраслевых специалистов.",
        note: "В год проводится 4 больших Demo Day."
      }
    }
  }
}

export function useTranslation(lang) {
  const t = computed(() => translations[lang?.value || 'UZ'])
  return { t }
}
