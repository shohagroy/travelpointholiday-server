import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import mainRoute from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import envconfig from "./config/envconfig";

const app = express();

app.use(
  cors({
    origin:
      envconfig.node_env === "development"
        ? "http://localhost:3000"
        : envconfig.client_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Travel Point  backend server is running...",
  });
});

app.use("/api/v1", mainRoute);
app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: "API Not Found",
      },
    ],
  });
  next();
});

export default app;
