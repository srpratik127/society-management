import { createSlice } from "@reduxjs/toolkit";

const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    openMenu: true,
  },
  reducers: {
    ToggleMenu: (state) => {
      state.openMenu = !state.openMenu;
    },
  },
});

export const { ToggleMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
