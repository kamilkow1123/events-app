import { configureStore } from "@reduxjs/toolkit";
import eventFormReducer from "../components/EventForm/eventFormSlice";

const store = configureStore({
  reducer: {
    event: eventFormReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
