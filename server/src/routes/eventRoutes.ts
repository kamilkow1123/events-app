import express, { Router } from "express";
const router: Router = express.Router();
//controllers
import { createEvent } from "../controllers/eventController";

router.route("/").post(createEvent);

export default router;
