import { pgTable, serial, integer, text, date, time, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { ridersTable } from "./riders";
import { horsesTable } from "./horses";

export const sessionsTable = pgTable("sessions", {
  id: serial("id").primaryKey(),
  riderId: integer("rider_id").notNull().references(() => ridersTable.id, { onDelete: "cascade" }),
  horseId: integer("horse_id").notNull().references(() => horsesTable.id, { onDelete: "cascade" }),
  sessionDate: date("session_date").notNull(),
  sessionTime: time("session_time").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertSessionSchema = createInsertSchema(sessionsTable).omit({ id: true, createdAt: true });
export type InsertSession = z.infer<typeof insertSessionSchema>;
export type Session = typeof sessionsTable.$inferSelect;
