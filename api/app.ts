import express from "express";
import cors from "cors";
import helmet from "helmet";
import { Resend } from "resend";

const FEEDBACK_RECIPIENT = "jsn.benjamin@gmail.com";

const app = express();

// Trust reverse proxy (Vercel/nginx) to extract the correct client IP for rate limiting
app.set("trust proxy", 1);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    frameguard: false,
  })
);

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.post("/api/feedback", async (req, res) => {
  try {
    const { feedback, contact } = req.body;
    if (!feedback || typeof feedback !== "string" || !feedback.trim()) {
      return res.status(400).json({ error: "Feedback content is required" });
    }

    if (feedback.length > 3000) {
      return res.status(400).json({ error: "Feedback is too long (max 3000 characters)" });
    }

    console.log(JSON.stringify({ event: "feedback_received", contact: contact || "anonymous", feedback }));

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const contactStr = typeof contact === "string" ? contact.trim() : "";
      const contactIsEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactStr);
      const { error } = await resend.emails.send({
        from: "Portfolio Feedback <onboarding@resend.dev>",
        to: FEEDBACK_RECIPIENT,
        replyTo: contactIsEmail ? contactStr : undefined,
        subject: "New portfolio feedback",
        text: `From: ${contactStr || "anonymous"}\n\n${feedback}`,
      });
      if (error) {
        console.error("Resend Feedback Error:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not configured — feedback was logged only, not emailed.");
    }

    res.json({ success: true, message: "Thank you for the candid feedback!" });
  } catch (error: any) {
    console.error("Server Feedback Error:", error.message);
    res.status(500).json({ error: error.message || "Failed to record feedback" });
  }
});

export default app;
