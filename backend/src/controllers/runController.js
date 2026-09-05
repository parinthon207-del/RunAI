const db = require("../config/db");

exports.create = async (req, res, next) => {
  try {
    const { distanceKm, durationSeconds, pace, runDate, note } = req.body;

    if (distanceKm === undefined || durationSeconds === undefined || !runDate) {
      return res.status(400).json({
        message: "กรุณาระบุระยะทาง เวลา และวันที่วิ่ง"
      });
    }

    if (Number(distanceKm) < 0 || Number(durationSeconds) < 0) {
      return res.status(400).json({ message: "ระยะทางและเวลาต้องไม่ติดลบ" });
    }

    const [result] = await db.execute(
      `INSERT INTO runs
       (user_id, distance_km, duration_seconds, pace, run_date, note)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        Number(distanceKm),
        Number(durationSeconds),
        pace ?? null,
        runDate,
        note ?? null
      ]
    );

    const [rows] = await db.execute(
      "SELECT * FROM runs WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json({ message: "บันทึกการวิ่งสำเร็จ", run: rows[0] });
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, distance_km, duration_seconds, pace, run_date, note, created_at
       FROM runs WHERE user_id = ? ORDER BY run_date DESC, id DESC`,
      [req.user.id]
    );

    res.json({ runs: rows });
  } catch (error) {
    next(error);
  }
};