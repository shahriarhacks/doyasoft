import express from "express";
import cors from "cors";
import { config } from "./config";

export const app = express();

// Middleware calling
app.use(
  cors({
    origin: config.cors_origin,
    credentials: true,
  })
);
app.use(express.json({ limit: "32kb" }));
app.use(express.urlencoded({ extended: true, limit: "32kb" }));
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to Doyasoft API Server!",
  });
});
