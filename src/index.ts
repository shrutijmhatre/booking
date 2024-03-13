import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import http from 'http';
import bodyParser from 'body-parser';
import cors from "cors";
import sequelize from './db'
import bookingRoutes from "./routes/bookings.routes";

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

app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Booking app APIs are running'
  });
});

// routes
app.use("/api/bookings", bookingRoutes);

/* // connect to the "src/routers" directory
const routersPath = path.join(__dirname, "routes");
console.log(routersPath);
// read all files in the "/src/routers" directory
fs.readdirSync(routersPath).forEach((file: string) => {
  if (file.endsWith(".ts")) {
    // dynamically import the router module
    const routerModule = require(path.join(routersPath, file));

    // get the "router" object exported by the router module
    const router = routerModule.router;

    // register the router
    app.use(router);
  }
}); */

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
