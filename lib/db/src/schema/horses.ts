import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const horsesTable = pgTable("horses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: integer("age").notNull(),
  healthStatus: text("health_status").notNull().default("healthy"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertHorseSchema = createInsertSchema(horsesTable).omit({ id: true, createdAt: true });
export type InsertHorse = z.infer<typeof insertHorseSchema>;
export type Horse = typeof horsesTable.$inferSelect;
