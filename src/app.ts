import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { config } from "./config";
import resSender from "./shared/res.sender";
import { globalErrorHandler } from "./middlewares/global.error.handler";

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
  resSender(res, {
    statusCode: 200,
    success: true,
    message: "Welcome to Doyasoft API Server!",
  });
});

// Global Error handler
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API url path not found",
      },
    ],
  });
  next();
});
