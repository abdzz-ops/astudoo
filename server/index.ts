import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // 1. Initialize Routes/Database
    log("Initializing routes and database connection...");
    await registerRoutes(httpServer, app);

    // 2. Error Handling Middleware
    app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      console.error("Internal Server Error details:", err);

      if (res.headersSent) {
        return next(err);
      }

      return res.status(status).json({ message });
    });

    // 3. Static Files / Vite Setup
    if (process.env.NODE_ENV === "production") {
      log("Production detected: Serving static assets.");
      serveStatic(app);
    } else {
      log("Development detected: Starting Vite.");
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // 4. Server Start
    // Railway dynamically assigns PORT. We bind to 0.0.0.0 for external access.
    const port = Number(process.env.PORT || 5000);
    httpServer.listen(port, "0.0.0.0", () => {
      log(`Server successfully started on port ${port}`);
    });

  } catch (error) {
    // This catch block is critical. It ensures errors in 
    // registerRoutes or serveStatic are actually logged.
    console.error("FATAL STARTUP ERROR:", error);
    process.exit(1);
  }
})();
