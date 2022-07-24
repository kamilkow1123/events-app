import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
//style
import "./Form.scss";
//utils
import { validateEmail } from "./utils";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date;
};

const Form = () => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
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
              {...register("firstName", { required: "First name is required" })}
            />
            <p className="form__error">{errors.firstName?.message}</p>
          </div>

          <div className="form__group">
            <label className="form__label">Last name</label>
            <input
              className="form__input"
              type="text"
              {...register("lastName", { required: "Last name is required" })}
            />
            <p className="form__error">{errors.lastName?.message}</p>
          </div>

          <div className="form__group">
            <label className="form__label">Email</label>
            <input
              className="form__input"
              type="email"
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
