import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    user: {},
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);

      try {
        const parts = state.token.split(".");
        if (parts.length === 3) {
          const base64Url = parts[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          state.user = JSON.parse(atob(base64)).user || {};
        } else {
          throw new Error("Invalid token structure");
        }
      } catch (error) {
        console.error("Error decoding token:", error.message);
        // state.user = {};
      }
    },
    removeToken: (state, action) => {
      localStorage.removeItem("token");
      state.token = null;
      state.user = {};
    },
  },
});

export const { addToken, removeToken } = authSlice.actions;

export default authSlice.reducer;
