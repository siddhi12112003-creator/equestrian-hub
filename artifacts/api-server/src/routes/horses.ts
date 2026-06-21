import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, horsesTable } from "@workspace/db";
import {
  CreateHorseBody,
  UpdateHorseBody,
  GetHorseParams,
  UpdateHorseParams,
  DeleteHorseParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/horses", async (_req, res): Promise<void> => {
  const horses = await db.select().from(horsesTable).orderBy(horsesTable.createdAt);
  res.json(horses.map((h) => ({
    ...h,
    createdAt: h.createdAt.toISOString(),
  })));
});

router.post("/horses", async (req, res): Promise<void> => {
  const parsed = CreateHorseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [horse] = await db.insert(horsesTable).values(parsed.data).returning();
  res.status(201).json({ ...horse, createdAt: horse.createdAt.toISOString() });
});

router.get("/horses/:id", async (req, res): Promise<void> => {
  const params = GetHorseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [horse] = await db.select().from(horsesTable).where(eq(horsesTable.id, params.data.id));
  if (!horse) {
    res.status(404).json({ error: "Horse not found" });
    return;
  }
  res.json({ ...horse, createdAt: horse.createdAt.toISOString() });
});

router.patch("/horses/:id", async (req, res): Promise<void> => {
  const params = UpdateHorseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = UpdateHorseBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [horse] = await db.update(horsesTable).set(parsed.data).where(eq(horsesTable.id, params.data.id)).returning();
  if (!horse) {
    res.status(404).json({ error: "Horse not found" });
    return;
  }
  res.json({ ...horse, createdAt: horse.createdAt.toISOString() });
});

router.delete("/horses/:id", async (req, res): Promise<void> => {
  const params = DeleteHorseParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [horse] = await db.delete(horsesTable).where(eq(horsesTable.id, params.data.id)).returning();
  if (!horse) {
    res.status(404).json({ error: "Horse not found" });
    return;
  }
  res.sendStatus(204);
});

export default router;
