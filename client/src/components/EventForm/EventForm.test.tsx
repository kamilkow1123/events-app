import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import EventForm from "./EventForm";
//redux mocks
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

describe("Event Form component", () => {
  const initialState = {
    event: {
      loading: false,
      events: [] as any,
      error: "",
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <EventForm />
      </Provider>
    );
  });

  it("renders component with header", () => {
    expect(screen.getByText("Add new event")).not.toBeNull();
  });

  it("renders button with Submit text", () => {
    expect(screen.getByRole("button")).toHaveTextContent(/submit/i);
  });

  it("displays info that every field is required", async () => {
    expect(screen.queryByText("First name is required")).toBeNull();
    expect(screen.queryByText("Last name is required")).toBeNull();
    expect(screen.queryByText("Email is required")).toBeNull();
    expect(screen.queryByText("Event date is required")).toBeNull();

    //rtl bug requires dblClick to wait for click effect
    await userEvent.dblClick(screen.getByRole("button"));

    expect(screen.queryByText("First name is required")).not.toBeNull();
    expect(screen.queryByText("Last name is required")).not.toBeNull();
    expect(screen.queryByText("Email is required")).not.toBeNull();
    expect(screen.queryByText("Event date is required")).not.toBeNull();
  });

  it("checks that required fields are filled", async () => {
    //rtl bug requires dblClick to wait for click effect
    await userEvent.dblClick(screen.getByText(/submit/i));

    expect(screen.queryByText("First name is required")).not.toBeNull();
    expect(screen.queryByText("Last name is required")).not.toBeNull();
    expect(screen.queryByText("Email is required")).not.toBeNull();
    expect(screen.queryByText("Event date is required")).not.toBeNull();

    await userEvent.type(
      screen.getByRole("input", { name: /firstName/i }),
      "John"
    );
    await userEvent.type(
      screen.getByRole("input", { name: /lastName/i }),
      "Doe"
    );
    await userEvent.type(
      screen.getByRole("input", { name: /email/i }),
      "john@doe.com"
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Select date/i),
      "21/10/2022"
    );

    expect(screen.queryByText("First name is required")).toBeNull();
    expect(screen.queryByText("Last name is required")).toBeNull();
    expect(screen.queryByText("Email is required")).toBeNull();
    expect(screen.queryByText("Event date is required")).toBeNull();
  });
});
