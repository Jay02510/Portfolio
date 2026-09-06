import path from "path";
import express from "express";
import app from "./api/app.ts";

const isProd = process.env.NODE_ENV === "production";
const PORT = 3000;

// Standalone server initialization (only run when not on Vercel serverless platform)
if (!process.env.VERCEL) {
  const startStandalone = async () => {
    // Vite Integration for dev or static server for production
    if (!isProd) {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(process.cwd(), "dist");
      app.use(express.static(distPath));
      app.get("*", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on http://0.0.0.0:${PORT}`);
    });
  };

  startStandalone().catch((err) => {
    console.error("FAILED TO START SERVER:", err);
    process.exit(1);
  });
}

export default app;
