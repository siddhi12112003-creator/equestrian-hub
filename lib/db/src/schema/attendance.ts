import { pgTable, serial, integer, boolean, timestamp, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { sessionsTable } from "./sessions";
import { ridersTable } from "./riders";

export const attendanceTable = pgTable("attendance", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull().references(() => sessionsTable.id, { onDelete: "cascade" }),
  riderId: integer("rider_id").notNull().references(() => ridersTable.id, { onDelete: "cascade" }),
  present: boolean("present").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => [unique("attendance_session_rider_unique").on(t.sessionId, t.riderId)]);

export const insertAttendanceSchema = createInsertSchema(attendanceTable).omit({ id: true, createdAt: true });
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendanceTable.$inferSelect;
