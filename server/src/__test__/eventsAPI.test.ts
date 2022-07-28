import request from "supertest";
import mongoose from "mongoose";
import app from "../index";
import Event from "../models/eventModel";

describe("POST /api/events", () => {
  beforeEach((done) => {
    mongoose.connect(process.env.MONGO_URI_TEST!, {}, () => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => done());
    });
  });

  it("creates event with valid data", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "valid@email.com",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual(expect.objectContaining(data));

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeTruthy();
    expect(event?.firstName).toBe(data.firstName);
    expect(event?.lastName).toBe(data.lastName);
    expect(event?.email).toBe(data.email);
  });

  it("doesn't create event with no firstName", async () => {
    let data = {
      firstName: "",
      lastName: "Doe",
      email: "valid@email.com",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("First name is required");

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });

  it("doesn't create event with no lastName", async () => {
    let data = {
      firstName: "John",
      lastName: "",
      email: "valid@email.com",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Last name is required");

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });

  it("doesn't create event with no firstName and no lastName", async () => {
    let data = {
      firstName: "",
      lastName: "",
      email: "valid@email.com",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      "First name is required, Last name is required"
    );

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });

  it("doesn't create event with no email", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Email is required");

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });

  it("doesn't create event with invalid email", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "invalidemail.com",
      eventDate: "2022-07-28T21:01:39.302Z",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual(
      "Event validation failed: email: Invalid email"
    );

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });

  it("doesn't create event with no eventDate", async () => {
    let data = {
      firstName: "John",
      lastName: "Doe",
      email: "valid@email.com",
      eventDate: "",
    };
    const response = await request(app).post("/api/events").send(data);

    //check the response
    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual("Event date is required");

    //check the data in the database
    const event = await Event.findOne({ _id: response.body._id });
    expect(event).toBeFalsy();
  });
});
