const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "กรุณากรอกชื่อ อีเมล และรหัสผ่าน" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร" });
    }

    const [exists] = await db.execute(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (exists.length) {
      return res.status(409).json({ message: "อีเมลนี้ถูกใช้งานแล้ว" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name.trim(), email.trim().toLowerCase(), passwordHash]
    );

    const user = { id: result.insertId, email: email.trim().toLowerCase() };

    res.status(201).json({
      message: "สมัครสมาชิกสำเร็จ",
      token: makeToken(user),
      user: { id: user.id, name: name.trim(), email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "กรุณากรอกอีเมลและรหัสผ่าน" });
    }

    const [rows] = await db.execute(
      "SELECT id, name, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email.trim().toLowerCase()]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(401).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
    }

    res.json({
      message: "เข้าสู่ระบบสำเร็จ",
      token: makeToken(user),
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

exports.me = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, age, height_cm, weight_kg FROM users WHERE id = ?",
      [req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "ไม่พบผู้ใช้งาน" });
    }

    res.json({ user: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, age, heightCm, weightKg } = req.body;

    await db.execute(
      `UPDATE users
       SET name = COALESCE(?, name),
           age = ?,
           height_cm = ?,
           weight_kg = ?
       WHERE id = ?`,
      [
        name?.trim() || null,
        age ?? null,
        heightCm ?? null,
        weightKg ?? null,
        req.user.id
      ]
    );

    const [rows] = await db.execute(
      "SELECT id, name, email, age, height_cm, weight_kg FROM users WHERE id = ?",
      [req.user.id]
    );

    res.json({ message: "บันทึกข้อมูลผู้ใช้งานสำเร็จ", user: rows[0] });
  } catch (error) {
    next(error);
  }
};