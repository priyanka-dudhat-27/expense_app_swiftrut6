import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export const app = express();

app.use(morgan("dev"))
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes import
import routes from "./routes/index.js";

// Routes declaration
app.use("/", routes);

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
