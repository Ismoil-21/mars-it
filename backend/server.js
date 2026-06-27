require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const https = require("https");

const app = express();
const PORT = process.env.PORT || 3001;
const DB_FILE = path.join(__dirname, "data.json");

app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json());

function adminAuth(req, res, next) {
  const key = req.headers["authorization"];
  if (key !== `Bearer ${process.env.ADMIN_API_KEY || "mars-admin-secret"}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function loadDB() {
  try { return JSON.parse(fs.readFileSync(DB_FILE, "utf8")); }
  catch { return { registrations: [], users: {} }; }
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

// ══════════════════════════════════════════════
//  TELEGRAM NOTIFY — node-fetch o'rniga https
// ══════════════════════════════════════════════
function sendTelegram(text) {
  const BOT_TOKEN = process.env.BOT_TOKEN;
  const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

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
    res.on("data", (chunk) => { data += chunk; });
    res.on("end", () => {
      const parsed = JSON.parse(data);
      if (!parsed.ok) {
        console.error("❌ Telegram xato:", parsed.description);
      } else {
        console.log("✅ Telegram bildiruv yuborildi");
      }
    });
  });

  req.on("error", (e) => console.error("❌ Telegram so'rov xatosi:", e.message));
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
    `━━━━━━━━━━━━━━━━━━━━`
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
    `━━━━━━━━━━━━━━━━━━━━`
  );
}

// ══════════════════════════════════════════════
//  PUBLIC API
// ══════════════════════════════════════════════

app.post("/api/register", (req, res) => {
  const { name, phone, age, branch, course, lang, source } = req.body;
  if (!name || !phone) {
    return res.status(400).json({ error: "name va phone majburiy" });
  }
  const db = loadDB();
  const record = {
    id: Date.now(),
    source: source || "web",
    lang: lang || "uz",
    name, phone, age, branch, course,
    createdAt: new Date().toISOString(),
  };
  db.registrations.push(record);
  saveDB(db);

  // Sayt yoki bot — har ikkalasida ham bildiruv
  if (record.source === "web") {
    notifyAdminWeb(record);
  }

  res.json({ success: true, id: record.id });
});

app.post("/api/test-result", (req, res) => {
  const { name, phone, lang, recommendation, frontendScore, backendScore, strongAreas } = req.body;
  if (!name) return res.status(400).json({ error: "name majburiy" });

  const db = loadDB();
  const record = {
    id: Date.now(),
    source: "test",
    lang: lang || "uz",
    name, phone: phone || "",
    recommendation, frontendScore, backendScore,
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
  if (source) list = list.filter(r => r.source === source);
  res.json({ count: list.length, data: list });
});

app.get("/api/admin/stats", adminAuth, (req, res) => {
  const db = loadDB();
  const regs = db.registrations || [];
  const today = new Date().toISOString().split("T")[0];
  const todayCount = regs.filter(r => r.createdAt?.startsWith(today)).length;
  const bySource = { bot: 0, web: 0, test: 0 };
  const byCourse = {};
  regs.forEach(r => {
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
  db.registrations = db.registrations.filter(r => r.id !== id);
  if (db.registrations.length === before) return res.status(404).json({ error: "Topilmadi" });
  saveDB(db);
  res.json({ success: true });
});

// Health check
app.get("/", (req, res) => res.json({ status: "ok", service: "Mars IT Backend" }));

app.listen(PORT, () => console.log(`✅ Backend server ishga tushdi: http://localhost:${PORT}`));