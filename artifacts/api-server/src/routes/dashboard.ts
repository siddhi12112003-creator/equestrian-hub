import { Router, type IRouter } from "express";
import { eq, sql, and, gte, lte } from "drizzle-orm";
import { db, horsesTable, ridersTable, sessionsTable, attendanceTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/dashboard/summary", async (_req, res): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [{ totalHorses }] = await db.select({ totalHorses: sql<number>`count(*)::int` }).from(horsesTable);
  const [{ totalRiders }] = await db.select({ totalRiders: sql<number>`count(*)::int` }).from(ridersTable);
  const [{ totalSessions }] = await db.select({ totalSessions: sql<number>`count(*)::int` }).from(sessionsTable);

  const [{ upcomingSessionsCount }] = await db
    .select({ upcomingSessionsCount: sql<number>`count(*)::int` })
    .from(sessionsTable)
    .where(and(gte(sessionsTable.sessionDate, today), lte(sessionsTable.sessionDate, nextWeek)));

  const [{ presentToday }] = await db
    .select({ presentToday: sql<number>`count(*)::int` })
    .from(attendanceTable)
    .leftJoin(sessionsTable, eq(attendanceTable.sessionId, sessionsTable.id))
    .where(and(eq(attendanceTable.present, true), eq(sessionsTable.sessionDate, today)));

  const [{ totalAttendance }] = await db
    .select({ totalAttendance: sql<number>`count(*)::int` })
    .from(attendanceTable);

  const [{ presentAttendance }] = await db
    .select({ presentAttendance: sql<number>`count(*)::int` })
    .from(attendanceTable)
    .where(eq(attendanceTable.present, true));

  const attendanceRate = totalAttendance > 0 ? (presentAttendance / totalAttendance) * 100 : 0;

  res.json({
    totalHorses,
    totalRiders,
    totalSessions,
    upcomingSessionsCount,
    presentToday,
    attendanceRate: Math.round(attendanceRate * 10) / 10,
  });
});

router.get("/dashboard/upcoming-sessions", async (_req, res): Promise<void> => {
  const today = new Date().toISOString().split("T")[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const rows = await db
    .select({
      id: sessionsTable.id,
      riderId: sessionsTable.riderId,
      horseId: sessionsTable.horseId,
      sessionDate: sessionsTable.sessionDate,
      sessionTime: sessionsTable.sessionTime,
      notes: sessionsTable.notes,
      createdAt: sessionsTable.createdAt,
      riderName: ridersTable.name,
      horseName: horsesTable.name,
    })
    .from(sessionsTable)
    .leftJoin(ridersTable, eq(sessionsTable.riderId, ridersTable.id))
    .leftJoin(horsesTable, eq(sessionsTable.horseId, horsesTable.id))
    .where(and(gte(sessionsTable.sessionDate, today), lte(sessionsTable.sessionDate, nextWeek)))
    .orderBy(sessionsTable.sessionDate, sessionsTable.sessionTime)
    .limit(10);

  res.json(rows.map((r) => ({
    ...r,
    riderName: r.riderName ?? "",
    horseName: r.horseName ?? "",
    createdAt: r.createdAt.toISOString(),
  })));
});

router.get("/dashboard/health-breakdown", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      status: horsesTable.healthStatus,
      count: sql<number>`count(*)::int`,
    })
    .from(horsesTable)
    .groupBy(horsesTable.healthStatus);

  res.json(rows);
});

export default router;
