const db = require("../config/db");

exports.create = async (req, res, next) => {
  try {
    const { goalType, targetDistanceKm, targetDate } = req.body;

    if (!goalType) {
      return res.status(400).json({ message: "กรุณาระบุเป้าหมายการวิ่ง" });
    }

    const [result] = await db.execute(
      `INSERT INTO goals (user_id, goal_type, target_distance_km, target_date)
       VALUES (?, ?, ?, ?)`,
      [req.user.id, goalType, targetDistanceKm ?? null, targetDate ?? null]
    );

    const [rows] = await db.execute(
      "SELECT * FROM goals WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({ message: "สร้าง Goal สำเร็จ", goal: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, goal_type, target_distance_km, target_date, created_at
       FROM goals WHERE user_id = ? ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({ goals: rows });
  } catch (error) {
    next(error);
  }
};