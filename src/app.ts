import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import mainRoute from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import envconfig from "./config/envconfig";
import passport from "passport";
import passportConfig from "./config/passport.config";
import session from "express-session";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", `${envconfig.client_url}`],
    // envconfig.node_env !== "development"
    //   ? "http://localhost:3000"
    //   : envconfig.client_url,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

// app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  session({
    secret: envconfig.secrect_token_key!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use("/api/v1", mainRoute);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: "Travel Point  backend server is running...",
  });
});

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
