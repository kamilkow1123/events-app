import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
//components
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
//hooks
import { useAppSelector, useAppDispatch } from "../../state/hooks";
//actions
import { createEvent } from "./eventFormSlice";
//style
import "./EventForm.scss";
//utils
import { validateEmail } from "./utils";
//interfaces
import { Event } from "../../interfaces";

const EventForm = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Event>();

  const event = useAppSelector((state) => state.event);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Event> = (data) => {
    dispatch(createEvent(data));
  };

  return (
    <div className="form">
      <div className="form__wrapper">
        <h1 className="form__header">Add new event</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form__group">
            <label className="form__label">First name</label>
            <input
              className="form__input"
              type="text"
              role="input"
              aria-label="firstName"
              {...register("firstName", { required: "First name is required" })}
            />
            <p className="form__error">{errors.firstName?.message}</p>
          </div>

          <div className="form__group">
            <label className="form__label">Last name</label>
            <input
              className="form__input"
              type="text"
              role="input"
              aria-label="lastName"
              {...register("lastName", { required: "Last name is required" })}
            />
            <p className="form__error">{errors.lastName?.message}</p>
          </div>

          <div className="form__group">
            <label className="form__label">Email</label>
            <input
              className="form__input"
              type="email"
              role="input"
              aria-label="email"
              {...register("email", {
                required: "Email is required",
                validate: validateEmail,
              })}
            />
            <p className="form__error">{errors.email?.message}</p>
          </div>

          <div className="form__group">
            <label className="form__label">Event date</label>
            <Controller
              control={control}
              name="eventDate"
              rules={{ required: "Event date is required" }}
              render={({ field }) => (
                <DatePicker
                  className="form__input"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select date"
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            <p className="form__error">{errors.eventDate?.message}</p>
          </div>

          <button className="form__button" type="submit">
            {event?.loading ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
