import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const previews = pgTable("previews", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  description: text("description").notNull(),
  size: text("size").notNull().default("Mid"), // Huge, Big, Mid, Small
  blur: boolean("blur").notNull().default(false),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
});

export const pageStats = pgTable("page_stats", {
  id: serial("id").primaryKey(),
  views: integer("views").notNull().default(0),
});

export const insertPreviewSchema = createInsertSchema(previews).omit({ id: true });
export const insertFaqSchema = createInsertSchema(faqs).omit({ id: true });

export type Preview = typeof previews.$inferSelect;
export type InsertPreview = z.infer<typeof insertPreviewSchema>;
export type Faq = typeof faqs.$inferSelect;
export type InsertFaq = z.infer<typeof insertFaqSchema>;
export type PageStats = typeof pageStats.$inferSelect;
