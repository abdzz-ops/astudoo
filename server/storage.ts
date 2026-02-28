import { db } from "./db";
import {
  previews, faqs, pageStats,
  type InsertPreview, type InsertFaq,
  type Preview, type Faq, type PageStats
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPreviews(): Promise<Preview[]>;
  createPreview(preview: InsertPreview): Promise<Preview>;
  getFaqs(): Promise<Faq[]>;
  createFaq(faq: InsertFaq): Promise<Faq>;
  getStats(): Promise<PageStats>;
  incrementViews(): Promise<PageStats>;
}

export class DatabaseStorage implements IStorage {
  async getPreviews(): Promise<Preview[]> {
    return await db.select().from(previews);
  }

  async createPreview(preview: InsertPreview): Promise<Preview> {
    const [created] = await db.insert(previews).values(preview).returning();
    return created;
  }

  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }
  
  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [created] = await db.insert(faqs).values(faq).returning();
    return created;
  }

  async getStats(): Promise<PageStats> {
    const [stats] = await db.select().from(pageStats).where(eq(pageStats.id, 1));
    if (!stats) {
      const [newStats] = await db.insert(pageStats).values({ views: 0 }).returning();
      return newStats;
    }
    return stats;
  }

  async incrementViews(): Promise<PageStats> {
    const stats = await this.getStats();
    const [updated] = await db.update(pageStats)
      .set({ views: stats.views + 1 })
      .where(eq(pageStats.id, 1))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
