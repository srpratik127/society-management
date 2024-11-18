import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notification: [],
  },
  reducers: {
    initialNotification: (state, action) => {
      state.notification = action.payload;
    },
    AddNotification: (state, action) => {
      state.notification = [...state.notification, action.payload];
    },
    // removeNotification: (state, action) => {
    //   state.notification = state.notification.filter(
    //     (notification) => notification.id !== action.payload
    //   );
    // },
  },
});

export const { initialNotification, AddNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
