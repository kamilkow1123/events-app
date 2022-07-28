import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
//models
import Event from "../models/eventModel";

// @desc Create event
// @route POST /api/event
// @access Public
export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const { firstName, lastName, email, eventDate } = req.body;

  let errors: string[] = [];
  if (!firstName) errors.push("First name is required");
  if (!lastName) errors.push("Last name is required");
  if (!email) errors.push("Email is required");
  if (!eventDate) errors.push("Event date is required");

  res.status(400);
  if (errors.length) {
    throw new Error(errors.join(", "));
  }

  const event = new Event({ firstName, lastName, email, eventDate });
  let savedEvent = await event.save();

  res.status(201).json(savedEvent);
});
