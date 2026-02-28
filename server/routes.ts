import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { setupBot } from "./bot";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.previews.list.path, async (req, res) => {
    const data = await storage.getPreviews();
    res.json(data);
  });

  app.post(api.previews.create.path, async (req, res) => {
    try {
      const input = api.previews.create.input.parse(req.body);
      const created = await storage.createPreview(input);
      res.status(201).json(created);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.faqs.list.path, async (req, res) => {
    const data = await storage.getFaqs();
    res.json(data);
  });

  app.get(api.stats.get.path, async (req, res) => {
    const data = await storage.getStats();
    res.json(data);
  });

  app.post(api.stats.increment.path, async (req, res) => {
    const data = await storage.incrementViews();
    res.json(data);
  });

  // Start discord bot in the background
  setupBot().catch(console.error);

  return httpServer;
}
