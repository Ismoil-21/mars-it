require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const https = require("https");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, "data.json");

// ══════════════════════════════════════════════
//  TELEGRAM BOT SETUP
// ══════════════════════════════════════════════
const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID
  ? String(process.env.ADMIN_CHAT_ID)
  : null;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "mars-admin-secret";

let bot = null;
if (BOT_TOKEN) {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log("✅ Telegram bot polling boshlandi");
} else {
  console.warn("⚠️ BOT_TOKEN yo'q — bot ishlamaydi");
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

function adminAuth(req, res, next) {
  const key = req.headers["authorization"];
  if (key !== `Bearer ${ADMIN_API_KEY}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function loadDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {
    return { registrations: [], users: {} };
  }
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

// ══════════════════════════════════════════════
//  TELEGRAM NOTIFY — https (sayt/test uchun)
// ══════════════════════════════════════════════
function sendTelegram(text) {
  if (!BOT_TOKEN || !ADMIN_CHAT_ID) {
    console.warn("⚠️ BOT_TOKEN yoki ADMIN_CHAT_ID .env da yo'q!");
    return;
  }

  const body = JSON.stringify({
    chat_id: ADMIN_CHAT_ID,
    text: text,
    parse_mode: "Markdown",
  });

  const options = {
    hostname: "api.telegram.org",
    path: `/bot${BOT_TOKEN}/sendMessage`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  const req = https.request(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });
    res.on("end", () => {
      try {
        const parsed = JSON.parse(data);
        if (!parsed.ok) {
          console.error("❌ Telegram xato:", parsed.description);
        } else {
          console.log("✅ Telegram bildiruv yuborildi");
        }
      } catch (e) {
        console.error("❌ Telegram javob parse xato:", e.message);
      }
    });
  });

  req.on("error", (e) =>
    console.error("❌ Telegram so'rov xatosi:", e.message),
  );
  req.write(body);
  req.end();
}

function notifyAdminWeb(r) {
  const now = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });
  sendTelegram(
    `🌐 *SAYT ORQALI YANGI ARIZA*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Ism: *${r.name}*\n` +
      `📞 Telefon: ${r.phone}\n` +
      `🎂 Yosh: ${r.age || "—"}\n` +
      `📍 Filial: ${r.branch || "—"}\n` +
      `📚 Kurs: ${r.course || "—"}\n` +
      `🌐 Til: ${r.lang === "uz" ? "O'zbek" : "Rus"}\n` +
      `🕐 Vaqt: ${now}\n` +
      `━━━━━━━━━━━━━━━━━━━━`,
  );
}

function notifyAdminTest(r) {
  const dir = r.recommendation === "frontend" ? "🎨 Frontend" : "⚙️ Backend";
  const now = new Date().toLocaleString("ru-RU", { timeZone: "Asia/Tashkent" });
  sendTelegram(
    `🧠 *TEST NATIJASI*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 Ism: *${r.name}*\n` +
      `${r.phone ? `📞 Telefon: ${r.phone}\n` : ""}` +
      `🎯 Yo'nalish: ${dir}\n` +
      `📊 Frontend: ${r.frontendScore}% | Backend: ${r.backendScore}%\n` +
      `🌐 Til: ${r.lang === "uz" ? "O'zbek" : "Rus"}\n` +
      `🕐 Vaqt: ${now}\n` +
      `━━━━━━━━━━━━━━━━━━━━`,
  );
}

function notifyAdminBot(record) {
  if (!bot || !ADMIN_CHAT_ID) return;
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
  bot
    .sendMessage(ADMIN_CHAT_ID, msg, { parse_mode: "Markdown" })
    .catch((e) => console.error("❌ Admin notify xato:", e.message));
}

// ══════════════════════════════════════════════
//  PUBLIC API
// ══════════════════════════════════════════════

app.post("/api/register", (req, res) => {
  const { name, phone, age, branch, course, lang, source, username } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "name va phone majburiy" });
  }
  const db = loadDB();
  const record = {
    id: Date.now(),
    source: source || "web",
    lang: lang || "uz",
    name,
    phone,
    age,
    branch,
    course,
    username: username || "",
    createdAt: new Date().toISOString(),
  };
  db.registrations.push(record);
  saveDB(db);

  if (record.source === "web") {
    notifyAdminWeb(record);
  } else if (record.source === "bot") {
    notifyAdminBot(record);
  }

  res.json({ success: true, id: record.id });
});

app.post("/api/test-result", (req, res) => {
  const {
    name,
    phone,
    lang,
    recommendation,
    frontendScore,
    backendScore,
    strongAreas,
  } = req.body;
  if (!name) return res.status(400).json({ error: "name majburiy" });

  const db = loadDB();
  const record = {
    id: Date.now(),
    source: "test",
    lang: lang || "uz",
    name,
    phone: phone || "",
    recommendation,
    frontendScore,
    backendScore,
    strongAreas,
    createdAt: new Date().toISOString(),
  };
  db.registrations.push(record);
  saveDB(db);

  notifyAdminTest(record);

  res.json({ success: true, id: record.id });
});

// ══════════════════════════════════════════════
//  ADMIN API
// ══════════════════════════════════════════════

app.get("/api/admin/registrations", adminAuth, (req, res) => {
  const db = loadDB();
  const { source } = req.query;
  let list = [...db.registrations].reverse();
  if (source) list = list.filter((r) => r.source === source);
  res.json({ count: list.length, data: list });
});

app.get("/api/admin/stats", adminAuth, (req, res) => {
  const db = loadDB();
  const regs = db.registrations || [];
  const today = new Date().toISOString().split("T")[0];
  const todayCount = regs.filter((r) => r.createdAt?.startsWith(today)).length;
  const bySource = { bot: 0, web: 0, test: 0 };
  const byCourse = {};
  regs.forEach((r) => {
    const src = r.source || "web";
    bySource[src] = (bySource[src] || 0) + 1;
    if (r.course) byCourse[r.course] = (byCourse[r.course] || 0) + 1;
  });
  res.json({ total: regs.length, today: todayCount, bySource, byCourse });
});

app.delete("/api/admin/registrations/:id", adminAuth, (req, res) => {
  const db = loadDB();
  const id = Number(req.params.id);
  const before = db.registrations.length;
  db.registrations = db.registrations.filter((r) => r.id !== id);
  if (db.registrations.length === before)
    return res.status(404).json({ error: "Topilmadi" });
  saveDB(db);
  res.json({ success: true });
});

// Health check
app.get("/", (req, res) =>
  res.json({ status: "ok", service: "Mars IT Backend + Bot" }),
);

app.listen(PORT, () =>
  console.log(`✅ Backend server ishga tushdi: http://localhost:${PORT}`),
);

// ══════════════════════════════════════════════
//  BOT LOGIC (faqat bot mavjud bo'lsa)
// ══════════════════════════════════════════════
if (bot) {
  // Locales — inline (bot/locales.js dan ko'chirilgan asosiy qismlar)
  const t = require("./locales");

  const userLang = {};
  const userState = {};

  // DB dan tillarni yuklash
  const initialDb = loadDB();
  for (const [id, u] of Object.entries(initialDb.users || {})) {
    if (u && u.lang) userLang[id] = u.lang;
  }

  function getLang(chatId) {
    return userLang[chatId] || "uz";
  }
  function setLang(chatId, lang) {
    userLang[chatId] = lang;
    const db = loadDB();
    db.users = db.users || {};
    db.users[chatId] = { ...(db.users[chatId] || {}), lang };
    saveDB(db);
  }

  function isAdmin(chatId) {
    return ADMIN_CHAT_ID && String(chatId) === ADMIN_CHAT_ID;
  }

  function sendLangMenu(chatId) {
    bot
      .sendMessage(chatId, t.uz.chooseLang, {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🇺🇿 O'zbekcha", callback_data: "lang_uz" },
              { text: "🇷🇺 Русский", callback_data: "lang_ru" },
            ],
          ],
        },
      })
      .catch((e) => console.error("sendLangMenu error:", e.message));
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
    bot
      .sendMessage(chatId, L.welcome, {
        reply_markup: { keyboard, resize_keyboard: true },
      })
      .catch((e) => console.error("sendMainMenu error:", e.message));
  }

  function sendCourses(chatId) {
    const L = t[getLang(chatId)];
    bot
      .sendMessage(chatId, L.coursesTitle, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: L.courseButtons.it_kids,
                callback_data: "course_it_kids",
              },
            ],
            [
              {
                text: L.courseButtons.dasturlash,
                callback_data: "course_dasturlash",
              },
            ],
          ],
        },
      })
      .catch((e) => console.error("sendCourses error:", e.message));
  }

  function sendCourseDetail(chatId, key) {
    const L = t[getLang(chatId)];
    bot
      .sendMessage(chatId, L.courseDetails[key], {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [{ text: L.registerForCourse, callback_data: "reg_" + key }],
          ],
        },
      })
      .catch((e) => console.error("sendCourseDetail error:", e.message));
  }

  function startRegistration(chatId, preCourse) {
    const L = t[getLang(chatId)];
    userState[chatId] = { step: "name", data: {} };
    if (preCourse) userState[chatId].data.course = L.courseButtons[preCourse];
    bot
      .sendMessage(chatId, L.askName, {
        parse_mode: "Markdown",
        reply_markup: { remove_keyboard: true },
      })
      .catch((e) => console.error("startRegistration error:", e.message));
  }

  function askBranch(chatId) {
    const L = t[getLang(chatId)];
    bot
      .sendMessage(chatId, L.askBranch, {
        reply_markup: {
          keyboard: t.branchNames.map((b) => [{ text: b }]),
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      })
      .catch((e) => console.error("askBranch error:", e.message));
  }

  function askCourse(chatId) {
    const L = t[getLang(chatId)];
    bot
      .sendMessage(chatId, L.askCourse, {
        reply_markup: {
          keyboard: [
            [{ text: L.courseButtons.it_kids }],
            [{ text: L.courseButtons.dasturlash }],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      })
      .catch((e) => console.error("askCourse error:", e.message));
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

    const db = loadDB();
    const fullRecord = {
      ...record,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    db.registrations.push(fullRecord);
    saveDB(db);
    notifyAdminBot(record);

    bot
      .sendMessage(chatId, L.registerDone)
      .catch((e) => console.error("finishRegistration error:", e.message));
    delete userState[chatId];
    sendMainMenu(chatId);
  }

  async function sendAdminPanel(chatId) {
    const db = loadDB();
    const regs = db.registrations || [];
    const today = new Date().toISOString().split("T")[0];
    const todayCount = regs.filter((r) =>
      r.createdAt?.startsWith(today),
    ).length;
    const bySource = { bot: 0, web: 0, test: 0 };
    const byCourse = {};
    regs.forEach((r) => {
      const src = r.source || "web";
      bySource[src] = (bySource[src] || 0) + 1;
      if (r.course) byCourse[r.course] = (byCourse[r.course] || 0) + 1;
    });

    const text =
      `🛡 *Admin Panel — Mars IT School*\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `📊 *Statistika:*\n` +
      `• Jami arizalar: *${regs.length}*\n` +
      `• Bugun: *${todayCount}*\n\n` +
      `📌 *Manba bo'yicha:*\n` +
      `🤖 Bot: *${bySource.bot}*\n` +
      `🌐 Sayt: *${bySource.web}*\n` +
      `🧠 Test: *${bySource.test}*\n\n` +
      `📚 *Kurs bo'yicha:*\n` +
      Object.entries(byCourse)
        .map(([k, v]) => `• ${k}: *${v}*`)
        .join("\n");

    bot
      .sendMessage(chatId, text, {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "🤖 Bot arizalari (so'nggi 10)",
                callback_data: "admin_bot10",
              },
            ],
            [
              {
                text: "🌐 Sayt arizalari (so'nggi 10)",
                callback_data: "admin_web10",
              },
            ],
            [{ text: "🔄 Yangilash", callback_data: "admin_stats" }],
          ],
        },
      })
      .catch((e) => console.error("sendAdminPanel error:", e.message));
  }

  async function sendAdminBotList(chatId) {
    const db = loadDB();
    const list = [...db.registrations]
      .reverse()
      .filter((r) => r.source === "bot")
      .slice(0, 10);
    if (list.length === 0) {
      bot.sendMessage(chatId, "🤖 Bot orqali hali ariza yo'q.").catch(() => {});
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
    bot
      .sendMessage(
        chatId,
        `🤖 *BOT ARIZALARI (so'nggi ${list.length}):\n━━━━━━━━━━━━━━━━━━━━*\n\n` +
          lines.join("\n\n"),
        { parse_mode: "Markdown" },
      )
      .catch((e) => console.error("sendAdminBotList error:", e.message));
  }

  async function sendAdminWebList(chatId) {
    const db = loadDB();
    const list = [...db.registrations]
      .reverse()
      .filter((r) => r.source === "web" || !r.source)
      .slice(0, 10);
    if (list.length === 0) {
      bot
        .sendMessage(chatId, "🌐 Sayt orqali hali ariza yo'q.")
        .catch(() => {});
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
    bot
      .sendMessage(
        chatId,
        `🌐 *SAYT ARIZALARI (so'nggi ${list.length}):\n━━━━━━━━━━━━━━━━━━━━*\n\n` +
          lines.join("\n\n"),
        { parse_mode: "Markdown" },
      )
      .catch((e) => console.error("sendAdminWebList error:", e.message));
  }

  // ── HANDLERS ──
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    delete userState[chatId];
    sendLangMenu(chatId);
  });

  bot.onText(/\/admin/, (msg) => {
    const chatId = msg.chat.id;
    if (!isAdmin(chatId)) {
      bot.sendMessage(chatId, "❌ Sizda admin huquqi yo'q.").catch(() => {});
      return;
    }
    sendAdminPanel(chatId);
  });

  bot.on("callback_query", async (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;
    bot.answerCallbackQuery(query.id).catch(() => {});

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
        bot.sendMessage(chatId, "❌ Ruxsat yo'q.").catch(() => {});
      }
      return;
    }

    const state = userState[chatId];
    if (state) {
      if (state.step === "name") {
        if (!text) return;
        state.data.name = text;
        state.step = "phone";
        bot
          .sendMessage(chatId, L.askPhone, {
            reply_markup: {
              keyboard: [[{ text: L.sharePhone, request_contact: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          })
          .catch(() => {});
        return;
      }
      if (state.step === "phone") {
        state.data.phone = msg.contact ? msg.contact.phone_number : text;
        if (!state.data.phone) return;
        state.step = "age";
        bot
          .sendMessage(chatId, L.askAge, {
            reply_markup: { remove_keyboard: true },
          })
          .catch(() => {});
        return;
      }
      if (state.step === "age") {
        if (!text || !/^\d{1,3}$/.test(text.trim())) {
          bot.sendMessage(chatId, L.invalidAge).catch(() => {});
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
      bot
        .sendMessage(
          chatId,
          L.addressTitle + "\n\n" + L.branches.join("\n\n"),
          { parse_mode: "Markdown" },
        )
        .catch(() => {});
    } else if (text === t.uz.menu.admin || text === t.ru.menu.admin) {
      bot
        .sendMessage(chatId, L.adminContact, { parse_mode: "Markdown" })
        .catch(() => {});
    } else if (text === t.uz.menu.changeLang || text === t.ru.menu.changeLang) {
      sendLangMenu(chatId);
    }
  });

  bot.on("polling_error", (err) => {
    console.error("Polling error:", err.message);
    // 409 Conflict — boshqa instance ishlab turibdi degan ma'no
    if (err.message && err.message.includes("409")) {
      console.error(
        "⚠️ 409 Conflict: Boshqa bot instance ishlab turibdi! Render'da faqat bitta instance bo'lishi kerak.",
      );
    }
  });
}
