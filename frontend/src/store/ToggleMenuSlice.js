import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    openMenu: false,
  },
  reducers: {
    ToggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
    removeMenu: (state) => {
      state.openMenu = false;
    },
  },
});

export const { ToggleMenu, removeMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
