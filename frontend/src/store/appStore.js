import { configureStore } from "@reduxjs/toolkit";
import authReducer, { addToken } from "./authSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
  },
});

const token = localStorage.getItem("token");
if (token) {
  appStore.dispatch(addToken(token));
}

export default appStore;
