const db = require("../config/db");

exports.summary = async (req, res, next) => {
  try {
    const [summaryRows] = await db.execute(
      `SELECT
         COUNT(*) AS total_runs,
         COALESCE(SUM(distance_km), 0) AS total_distance_km,
         COALESCE(SUM(duration_seconds), 0) AS total_duration_seconds,
         COALESCE(AVG(distance_km), 0) AS average_distance_km
       FROM runs
       WHERE user_id = ?`,
      [req.user.id]
    );

    const [recentRuns] = await db.execute(
      `SELECT id, distance_km, duration_seconds, pace, run_date
       FROM runs WHERE user_id = ?
       ORDER BY run_date DESC, id DESC LIMIT 10`,
      [req.user.id]
    );

    res.json({
      summary: summaryRows[0],
      recentRuns
    });
  } catch (error) {
    next(error);
  }
};