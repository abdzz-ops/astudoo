import { z } from 'zod';
import { insertPreviewSchema, insertFaqSchema, previews, faqs, pageStats } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  previews: {
    list: {
      method: 'GET' as const,
      path: '/api/previews' as const,
      responses: {
        200: z.array(z.custom<typeof previews.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/previews' as const,
      input: insertPreviewSchema,
      responses: {
        201: z.custom<typeof previews.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  faqs: {
    list: {
      method: 'GET' as const,
      path: '/api/faqs' as const,
      responses: {
        200: z.array(z.custom<typeof faqs.$inferSelect>()),
      },
    },
  },
  stats: {
    get: {
      method: 'GET' as const,
      path: '/api/stats' as const,
      responses: {
        200: z.custom<typeof pageStats.$inferSelect>(),
      },
    },
    increment: {
      method: 'POST' as const,
      path: '/api/stats/increment' as const,
      responses: {
        200: z.custom<typeof pageStats.$inferSelect>(),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type PreviewResponse = z.infer<typeof api.previews.list.responses[200]>;
export type FaqResponse = z.infer<typeof api.faqs.list.responses[200]>;
export type StatsResponse = z.infer<typeof api.stats.get.responses[200]>;
