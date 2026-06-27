require("dotenv").config();
const fs = require("fs");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const t = require("./locales");

const TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID ? String(process.env.ADMIN_CHAT_ID) : null;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "mars-admin-secret";

if (!TOKEN) {
  console.error("❌ BOT_TOKEN topilmadi. .env faylga BOT_TOKEN ni qo'shing.");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// ===== JSON ma'lumotlar bazasi (local fallback) =====
const DB_FILE = path.join(__dirname, "data.json");
function loadDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, "utf8")); }
  catch { return { registrations: [], users: {} }; }
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}
let db = loadDB();

const userLang = {};
const userState = {};

for (const [id, u] of Object.entries(db.users || {})) {
  if (u && u.lang) userLang[id] = u.lang;
}

function getLang(chatId) { return userLang[chatId] || "uz"; }
function setLang(chatId, lang) {
  userLang[chatId] = lang;
  db.users = db.users || {};
  db.users[chatId] = { ...(db.users[chatId] || {}), lang };
  saveDB(db);
}

function isAdmin(chatId) {
  return ADMIN_CHAT_ID && String(chatId) === ADMIN_CHAT_ID;
}

// ======================================================
//  BACKEND API CALLS
// ======================================================
async function apiPost(endpoint, data) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (e) {
    console.error("API error:", e.message);
    return null;
  }
}

async function apiGet(endpoint) {
  try {
    const res = await fetch(`${BACKEND_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${ADMIN_API_KEY}` },
    });
    return await res.json();
  } catch (e) {
    console.error("API error:", e.message);
    return null;
  }
}

// ======================================================
//  ADMIN NOTIFY — chiroyli format
// ======================================================
function notifyAdminBot(record) {
  if (!ADMIN_CHAT_ID) return;
  const now = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });
  const msg =
    `🤖 *BOT ORQALI YANGI ARIZA*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `👤 Ism: *${record.name}*\n` +
    `📞 Telefon: ${record.phone}\n` +
    `🎂 Yosh: ${record.age || "—"}\n` +
    `📍 Filial: ${record.branch || "—"}\n` +
    `📚 Kurs: ${record.course || "—"}\n` +
    `✈️ Username: ${record.username || "—"}\n` +
    `🌐 Til: ${record.lang === "uz" ? "O'zbek" : "Rus"}\n` +
    `🕐 Vaqt: ${now}\n` +
    `━━━━━━━━━━━━━━━━━━━━`;
  bot.sendMessage(ADMIN_CHAT_ID, msg, { parse_mode: "Markdown" });
}

// ======================================================
//  BOT UI FUNCTIONS
// ======================================================
function sendLangMenu(chatId) {
  bot.sendMessage(chatId, t.uz.chooseLang, {
    reply_markup: {
      inline_keyboard: [[
        { text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" },
        { text: "🇷🇺 Русский", callback_data: "lang_ru" },
      ]],
    },
  });
}

function sendMainMenu(chatId) {
  const L = t[getLang(chatId)];
  const keyboard = [
    [{ text: L.menu.courses }, { text: L.menu.register }],
    [{ text: L.menu.address }, { text: L.menu.admin }],
    [{ text: L.menu.changeLang }],
  ];
  if (isAdmin(chatId)) {
    keyboard.push([{ text: "🛡 Admin Panel" }]);
  }
  bot.sendMessage(chatId, L.welcome, {
    reply_markup: { keyboard, resize_keyboard: true },
  });
}

function sendCourses(chatId) {
  const L = t[getLang(chatId)];
  bot.sendMessage(chatId, L.coursesTitle, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: L.courseButtons.it_kids, callback_data: "course_it_kids" }],
        [{ text: L.courseButtons.dasturlash, callback_data: "course_dasturlash" }],
      ],
    },
  });
}

function sendCourseDetail(chatId, key) {
  const L = t[getLang(chatId)];
  bot.sendMessage(chatId, L.courseDetails[key], {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: L.registerForCourse, callback_data: "reg_" + key }],
      ],
    },
  });
}

function startRegistration(chatId, preCourse) {
  const L = t[getLang(chatId)];
  userState[chatId] = { step: "name", data: {} };
  if (preCourse) userState[chatId].data.course = L.courseButtons[preCourse];
  bot.sendMessage(chatId, L.askName, {
    parse_mode: "Markdown",
    reply_markup: { remove_keyboard: true },
  });
}

function askBranch(chatId) {
  const L = t[getLang(chatId)];
  bot.sendMessage(chatId, L.askBranch, {
    reply_markup: {
      keyboard: t.branchNames.map((b) => [{ text: b }]),
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}

function askCourse(chatId) {
  const L = t[getLang(chatId)];
  bot.sendMessage(chatId, L.askCourse, {
    reply_markup: {
      keyboard: [
        [{ text: L.courseButtons.it_kids }],
        [{ text: L.courseButtons.dasturlash }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}

async function finishRegistration(chatId, msg) {
  const L = t[getLang(chatId)];
  const d = userState[chatId].data;
  const record = {
    source: "bot",
    lang: getLang(chatId),
    name: d.name,
    phone: d.phone,
    age: d.age,
    branch: d.branch,
    course: d.course,
    username: msg.from?.username ? "@" + msg.from.username : "",
  };

  // Backend ga yuborish
  const result = await apiPost("/api/register", record);

  // Backend ishlamasa local saqlash + admin bildiruv
  if (!result) {
    const localRecord = { ...record, id: Date.now(), createdAt: new Date().toISOString() };
    db.registrations.push(localRecord);
    saveDB(db);
    notifyAdminBot(record);
  }
  // Backend ishlasa ham admin bildiruv — backend o'zi yubormaydi bot formatida
  else {
    notifyAdminBot(record);
  }

  bot.sendMessage(chatId, L.registerDone);
  delete userState[chatId];
  sendMainMenu(chatId);
}

// ======================================================
//  ADMIN PANEL
// ======================================================
async function sendAdminPanel(chatId) {
  const stats = await apiGet("/api/admin/stats");
  if (!stats) {
    // Fallback: local DB dan hisoblash
    const regs = db.registrations || [];
    const today = new Date().toISOString().split("T")[0];
    const todayCount = regs.filter(r => r.createdAt?.startsWith(today)).length;
    const botCount = regs.filter(r => r.source === "bot").length;
    const webCount = regs.filter(r => r.source === "web" || !r.source).length;
    const testCount = regs.filter(r => r.source === "test").length;

    const text =
      `🛡 *Admin Panel — Mars IT School*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 *Statistika (local):*\n` +
      `• Jami arizalar: *${regs.length}*\n` +
      `• Bugun: *${todayCount}*\n\n` +
      `📌 *Manba bo'yicha:*\n` +
      `🤖 Bot: *${botCount}*\n` +
      `🌐 Sayt: *${webCount}*\n` +
      `🧠 Test: *${testCount}*`;

    bot.sendMessage(chatId, text, {
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [
          [{ text: "📋 Bot arizalari (so'nggi 10)", callback_data: "admin_bot10" }],
          [{ text: "🌐 Sayt arizalari (so'nggi 10)", callback_data: "admin_web10" }],
          [{ text: "🔄 Yangilash", callback_data: "admin_stats" }],
        ],
      },
    });
    return;
  }

  const text =
    `🛡 *Admin Panel — Mars IT School*\n` +
    `━━━━━━━━━━━━━━━━━━━━\n` +
    `📊 *Statistika:*\n` +
    `• Jami arizalar: *${stats.total}*\n` +
    `• Bugun: *${stats.today}*\n\n` +
    `📌 *Manba bo'yicha:*\n` +
    `🤖 Bot: *${stats.bySource?.bot || 0}*\n` +
    `🌐 Sayt: *${stats.bySource?.web || 0}*\n` +
    `🧠 Test: *${stats.bySource?.test || 0}*\n\n` +
    `📚 *Kurs bo'yicha:*\n` +
    Object.entries(stats.byCourse || {}).map(([k, v]) => `• ${k}: *${v}*`).join("\n");

  bot.sendMessage(chatId, text, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [{ text: "🤖 Bot arizalari (so'nggi 10)", callback_data: "admin_bot10" }],
        [{ text: "🌐 Sayt arizalari (so'nggi 10)", callback_data: "admin_web10" }],
        [{ text: "🔄 Yangilash", callback_data: "admin_stats" }],
      ],
    },
  });
}

// Bot arizalari — alohida
async function sendAdminBotList(chatId) {
  const data = await apiGet("/api/admin/registrations");
  const allList = data ? data.data : db.registrations.slice().reverse();

  const list = allList.filter(r => r.source === "bot").slice(0, 10);
  if (list.length === 0) {
    bot.sendMessage(chatId, "🤖 Bot orqali hali ariza yo'q.");
    return;
  }

  const lines = list.map((r, i) => {
    const date = r.createdAt?.substring(0, 10) || "—";
    return (
      `${i + 1}. 👤 *${r.name}*\n` +
      `   📞 ${r.phone} | 🎂 ${r.age || "—"}\n` +
      `   📍 ${r.branch || "—"}\n` +
      `   📚 ${r.course || "—"} | 📅 ${date}`
    );
  });

  bot.sendMessage(
    chatId,
    `🤖 *BOT ARIZALARI (so'nggi ${list.length}):\n━━━━━━━━━━━━━━━━━━━━*\n\n` + lines.join("\n\n"),
    { parse_mode: "Markdown" }
  );
}

// Sayt arizalari — alohida
async function sendAdminWebList(chatId) {
  const data = await apiGet("/api/admin/registrations");
  const allList = data ? data.data : db.registrations.slice().reverse();

  const list = allList.filter(r => r.source === "web" || !r.source).slice(0, 10);
  if (list.length === 0) {
    bot.sendMessage(chatId, "🌐 Sayt orqali hali ariza yo'q.");
    return;
  }

  const lines = list.map((r, i) => {
    const date = r.createdAt?.substring(0, 10) || "—";
    return (
      `${i + 1}. 👤 *${r.name}*\n` +
      `   📞 ${r.phone} | 🎂 ${r.age || "—"}\n` +
      `   📍 ${r.branch || "—"}\n` +
      `   📚 ${r.course || "—"} | 📅 ${date}`
    );
  });

  bot.sendMessage(
    chatId,
    `🌐 *SAYT ARIZALARI (so'nggi ${list.length}):\n━━━━━━━━━━━━━━━━━━━━*\n\n` + lines.join("\n\n"),
    { parse_mode: "Markdown" }
  );
}

// ======================================================
//  HANDLERS
// ======================================================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  delete userState[chatId];
  sendLangMenu(chatId);
});

bot.onText(/\/admin/, (msg) => {
  const chatId = msg.chat.id;
  if (!isAdmin(chatId)) {
    bot.sendMessage(chatId, "❌ Sizda admin huquqi yo'q.");
    return;
  }
  sendAdminPanel(chatId);
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;
  bot.answerCallbackQuery(query.id);

  if (data === "lang_uz" || data === "lang_ru") {
    setLang(chatId, data === "lang_uz" ? "uz" : "ru");
    sendMainMenu(chatId);
  } else if (data === "course_it_kids") {
    sendCourseDetail(chatId, "it_kids");
  } else if (data === "course_dasturlash") {
    sendCourseDetail(chatId, "dasturlash");
  } else if (data === "reg_it_kids") {
    startRegistration(chatId, "it_kids");
  } else if (data === "reg_dasturlash") {
    startRegistration(chatId, "dasturlash");
  } else if (data === "admin_bot10") {
    if (isAdmin(chatId)) await sendAdminBotList(chatId);
  } else if (data === "admin_web10") {
    if (isAdmin(chatId)) await sendAdminWebList(chatId);
  } else if (data === "admin_stats") {
    if (isAdmin(chatId)) await sendAdminPanel(chatId);
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (text?.startsWith("/")) return;

  const L = t[getLang(chatId)];

  if (text === "🛡 Admin Panel") {
    if (isAdmin(chatId)) {
      await sendAdminPanel(chatId);
    } else {
      bot.sendMessage(chatId, "❌ Ruxsat yo'q.");
    }
    return;
  }

  const state = userState[chatId];
  if (state) {
    if (state.step === "name") {
      if (!text) return;
      state.data.name = text;
      state.step = "phone";
      bot.sendMessage(chatId, L.askPhone, {
        reply_markup: {
          keyboard: [[{ text: L.sharePhone, request_contact: true }]],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      });
      return;
    }
    if (state.step === "phone") {
      state.data.phone = msg.contact ? msg.contact.phone_number : text;
      if (!state.data.phone) return;
      state.step = "age";
      bot.sendMessage(chatId, L.askAge, { reply_markup: { remove_keyboard: true } });
      return;
    }
    if (state.step === "age") {
      if (!text || !/^\d{1,3}$/.test(text.trim())) {
        bot.sendMessage(chatId, L.invalidAge);
        return;
      }
      state.data.age = text.trim();
      state.step = "branch";
      askBranch(chatId);
      return;
    }
    if (state.step === "branch") {
      if (!text) return;
      state.data.branch = text;
      if (state.data.course) {
        await finishRegistration(chatId, msg);
      } else {
        state.step = "course";
        askCourse(chatId);
      }
      return;
    }
    if (state.step === "course") {
      if (!text) return;
      state.data.course = text;
      await finishRegistration(chatId, msg);
      return;
    }
  }

  if (text === t.uz.menu.courses || text === t.ru.menu.courses) {
    sendCourses(chatId);
  } else if (text === t.uz.menu.register || text === t.ru.menu.register) {
    startRegistration(chatId, null);
  } else if (text === t.uz.menu.address || text === t.ru.menu.address) {
    bot.sendMessage(chatId, L.addressTitle + "\n\n" + L.branches.join("\n\n"), { parse_mode: "Markdown" });
  } else if (text === t.uz.menu.admin || text === t.ru.menu.admin) {
    bot.sendMessage(chatId, L.adminContact, { parse_mode: "Markdown" });
  } else if (text === t.uz.menu.changeLang || text === t.ru.menu.changeLang) {
    sendLangMenu(chatId);
  }
});

bot.on("polling_error", (err) => console.error("Polling error:", err.message));
console.log("✅ Mars IT School bot ishga tushdi...");