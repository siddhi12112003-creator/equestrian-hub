import { Router, type IRouter } from "express";
import { eq, and } from "drizzle-orm";
import { db, attendanceTable, ridersTable, sessionsTable } from "@workspace/db";
import {
  UpsertAttendanceBody,
  GetSessionAttendanceParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/attendance", async (_req, res): Promise<void> => {
  const rows = await db
    .select({
      id: attendanceTable.id,
      sessionId: attendanceTable.sessionId,
      riderId: attendanceTable.riderId,
      present: attendanceTable.present,
      riderName: ridersTable.name,
      sessionDate: sessionsTable.sessionDate,
    })
    .from(attendanceTable)
    .leftJoin(ridersTable, eq(attendanceTable.riderId, ridersTable.id))
    .leftJoin(sessionsTable, eq(attendanceTable.sessionId, sessionsTable.id))
    .orderBy(sessionsTable.sessionDate);
  res.json(rows.map((r) => ({
    ...r,
    riderName: r.riderName ?? "",
    sessionDate: r.sessionDate ?? "",
  })));
});

router.get("/sessions/:id/attendance", async (req, res): Promise<void> => {
  const params = GetSessionAttendanceParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const rows = await db
    .select({
      id: attendanceTable.id,
      sessionId: attendanceTable.sessionId,
      riderId: attendanceTable.riderId,
      present: attendanceTable.present,
      riderName: ridersTable.name,
      sessionDate: sessionsTable.sessionDate,
    })
    .from(attendanceTable)
    .leftJoin(ridersTable, eq(attendanceTable.riderId, ridersTable.id))
    .leftJoin(sessionsTable, eq(attendanceTable.sessionId, sessionsTable.id))
    .where(eq(attendanceTable.sessionId, params.data.id));
  res.json(rows.map((r) => ({
    ...r,
    riderName: r.riderName ?? "",
    sessionDate: r.sessionDate ?? "",
  })));
});

router.post("/attendance", async (req, res): Promise<void> => {
  const parsed = UpsertAttendanceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db
    .select()
    .from(attendanceTable)
    .where(
      and(
        eq(attendanceTable.sessionId, parsed.data.sessionId),
        eq(attendanceTable.riderId, parsed.data.riderId),
      ),
    );

  let record;
  if (existing.length > 0) {
    [record] = await db
      .update(attendanceTable)
      .set({ present: parsed.data.present })
      .where(
        and(
          eq(attendanceTable.sessionId, parsed.data.sessionId),
          eq(attendanceTable.riderId, parsed.data.riderId),
        ),
      )
      .returning();
  } else {
    [record] = await db.insert(attendanceTable).values(parsed.data).returning();
  }

  const [full] = await db
    .select({
      id: attendanceTable.id,
      sessionId: attendanceTable.sessionId,
      riderId: attendanceTable.riderId,
      present: attendanceTable.present,
      riderName: ridersTable.name,
      sessionDate: sessionsTable.sessionDate,
    })
    .from(attendanceTable)
    .leftJoin(ridersTable, eq(attendanceTable.riderId, ridersTable.id))
    .leftJoin(sessionsTable, eq(attendanceTable.sessionId, sessionsTable.id))
    .where(eq(attendanceTable.id, record.id));

  res.json({
    ...full,
    riderName: full?.riderName ?? "",
    sessionDate: full?.sessionDate ?? "",
  });
});

export default router;
