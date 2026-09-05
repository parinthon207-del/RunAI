require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const authRoutes = require("./routes/auth");
const goalRoutes = require("./routes/goals");
const runRoutes = require("./routes/runs");
const historyRoutes = require("./routes/history");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(500).json({ status: "error", database: "disconnected" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/runs", runRoutes);
app.use("/api/history", historyRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "ไม่พบ API นี้" });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์" });
});

const PORT = Number(process.env.PORT || 5000);

app.listen(PORT, () => {
  console.log(`RunAI Backend running at http://localhost:${PORT}`);
});