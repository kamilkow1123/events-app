import { config } from "dotenv";
config();
import express, { Application } from "express";
//middlewares
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { errorHandler } from "./middlewares/errorMiddleware";
//routes
import eventRoutes from "./routes/eventRoutes";
//db
import { connectDB } from "./config/db";
//PORT
const port = process.env.PORT || 5000;

//initialize database
if (process.env.NODE_ENV !== "test") {
  connectDB().then();
}

const app: Application = express();

//middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/events", eventRoutes);

//custom middlewares
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => console.log(`Server started on port ${port}`));
}

export default app;
