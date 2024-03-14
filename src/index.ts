import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cors from "cors";
import sequelize from './db'
import bookingRoutes from "./routes/bookings.routes";
import authRoutes from './routes/auth.routes';
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { authenticate } from "./middleware/authMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  try {
      res.status(200).json({
          status: "success",
          data: [],
          message: "Welcome to our Booking API homepage!",
      });
  } catch (err) {
      res.status(500).json({
          status: "error",
          message: "Internal Server Error",
      });
  }
});

// routes
app.use("/api/bookings",authenticate, bookingRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);


const server = http.createServer(app);
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
