import {
  pgTable, uuid, text, timestamp, boolean, integer, jsonb, date, index, uniqueIndex
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: text("email").notNull().unique(),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

export const schedules = pgTable("schedules", {
  id: uuid("id").defaultRandom().primaryKey(),
  ownerId: uuid("owner_id").notNull(),
  title: text("title").notNull(),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  isActive: boolean("is_active").notNull().default(false),
  version: integer("version").notNull().default(1),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (t) => [
  index("schedules_owner_active_idx").on(t.ownerId, t.isActive),
  index("schedules_owner_updated_idx").on(t.ownerId, t.updatedAt),
]);


export const blocks = pgTable("blocks", {
  id: uuid("id").defaultRandom().primaryKey(),
  scheduleId: uuid("schedule_id").notNull().references(() => schedules.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'task' | 'break' | 'event' (use pgEnum if you want)
  title: text("title").notNull(),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }).notNull(),
  category: text("category"),
  metadata: jsonb("metadata"),
  completed: boolean("completed").notNull().default(false),
  version: integer("version").notNull().default(1),
  deletedAt: timestamp("deleted_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
}, (t) => [
  index("blocks_schedule_start_idx").on(t.scheduleId, t.startAt),
  index("blocks_schedule_updated_idx").on(t.scheduleId, t.updatedAt),
]);

export const preferences = pgTable("preferences", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  uiMode: text("ui_mode").notNull().default("system"), // 'light'|'dark'|'system'
  notificationsEnabled: boolean("notifications_enabled").notNull().default(true),
  leadMinutes: integer("lead_minutes").notNull().default(10),
  minGapMinutes: integer("min_gap_minutes").notNull().default(15),
  maxWorkHoursPerDay: integer("max_work_hours_per_day").notNull().default(8),
  weekendPolicy: text("weekend_policy").notNull().default("allow"),
  nickname: text("nickname"),
  version: integer("version").notNull().default(1),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
