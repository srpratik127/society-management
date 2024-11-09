import { configureStore } from "@reduxjs/toolkit";
import authReducer, { addToken } from "./authSlice";
import menuReducer from "./ToggleMenuSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

const token = localStorage.getItem("token");
if (token) {
  appStore.dispatch(addToken(token));
}

export default appStore;
