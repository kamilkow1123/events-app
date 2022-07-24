import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
//interfaces
import { Event } from "../../interfaces";
//api
import { eventsApi } from "../../apis";

type InitialState = {
  loading: boolean;
  events: Event[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  events: [],
  error: "",
};

//adds pending, fulfilled and rejected action types
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (data: Event) => {
    const response = await eventsApi.post("event", data);
    return response.data;
  }
);

const eventFormSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createEvent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createEvent.fulfilled,
      (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.push(action.payload);
        state.error = "";
      }
    );
    builder.addCase(createEvent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default eventFormSlice.reducer;
