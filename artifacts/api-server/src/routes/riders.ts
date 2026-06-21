import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, ridersTable } from "@workspace/db";
import {
  CreateRiderBody,
  UpdateRiderBody,
  GetRiderParams,
  UpdateRiderParams,
  DeleteRiderParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/riders", async (_req, res): Promise<void> => {
  const riders = await db.select().from(ridersTable).orderBy(ridersTable.createdAt);
  res.json(riders.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() })));
});

router.post("/riders", async (req, res): Promise<void> => {
  const parsed = CreateRiderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [rider] = await db.insert(ridersTable).values(parsed.data).returning();
  res.status(201).json({ ...rider, createdAt: rider.createdAt.toISOString() });
});

router.get("/riders/:id", async (req, res): Promise<void> => {
  const params = GetRiderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [rider] = await db.select().from(ridersTable).where(eq(ridersTable.id, params.data.id));
  if (!rider) {
    res.status(404).json({ error: "Rider not found" });
    return;
  }
  res.json({ ...rider, createdAt: rider.createdAt.toISOString() });
});

router.patch("/riders/:id", async (req, res): Promise<void> => {
  const params = UpdateRiderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateRiderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [rider] = await db.update(ridersTable).set(parsed.data).where(eq(ridersTable.id, params.data.id)).returning();
  if (!rider) {
    res.status(404).json({ error: "Rider not found" });
    return;
  }
  res.json({ ...rider, createdAt: rider.createdAt.toISOString() });
});

router.delete("/riders/:id", async (req, res): Promise<void> => {
  const params = DeleteRiderParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [rider] = await db.delete(ridersTable).where(eq(ridersTable.id, params.data.id)).returning();
  if (!rider) {
    res.status(404).json({ error: "Rider not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
