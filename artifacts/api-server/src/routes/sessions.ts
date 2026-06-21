import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, sessionsTable, ridersTable, horsesTable } from "@workspace/db";
import {
  CreateSessionBody,
  UpdateSessionBody,
  GetSessionParams,
  UpdateSessionParams,
  DeleteSessionParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

async function getSessionWithNames(id: number) {
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
    .where(eq(sessionsTable.id, id));
  return rows[0];
}

router.get("/sessions", async (_req, res): Promise<void> => {
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
    .orderBy(sessionsTable.sessionDate, sessionsTable.sessionTime);
  res.json(rows.map((r) => ({
    ...r,
    riderName: r.riderName ?? "",
    horseName: r.horseName ?? "",
    createdAt: r.createdAt.toISOString(),
  })));
});

router.post("/sessions", async (req, res): Promise<void> => {
  const parsed = CreateSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [session] = await db.insert(sessionsTable).values(parsed.data).returning();
  const full = await getSessionWithNames(session.id);
  res.status(201).json({
    ...full,
    riderName: full?.riderName ?? "",
    horseName: full?.horseName ?? "",
    createdAt: full?.createdAt.toISOString() ?? "",
  });
});

router.get("/sessions/:id", async (req, res): Promise<void> => {
  const params = GetSessionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const full = await getSessionWithNames(params.data.id);
  if (!full) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  res.json({
    ...full,
    riderName: full.riderName ?? "",
    horseName: full.horseName ?? "",
    createdAt: full.createdAt.toISOString(),
  });
});

router.patch("/sessions/:id", async (req, res): Promise<void> => {
  const params = UpdateSessionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateSessionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [session] = await db.update(sessionsTable).set(parsed.data).where(eq(sessionsTable.id, params.data.id)).returning();
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  const full = await getSessionWithNames(session.id);
  res.json({
    ...full,
    riderName: full?.riderName ?? "",
    horseName: full?.horseName ?? "",
    createdAt: full?.createdAt.toISOString() ?? "",
  });
});

router.delete("/sessions/:id", async (req, res): Promise<void> => {
  const params = DeleteSessionParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [session] = await db.delete(sessionsTable).where(eq(sessionsTable.id, params.data.id)).returning();
  if (!session) {
    res.status(404).json({ error: "Session not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
