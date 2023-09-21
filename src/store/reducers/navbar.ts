import { createReducer, createAction } from '@reduxjs/toolkit';

interface NavBarState {
  isNavBarOpen: boolean;
}

export const initialState: NavBarState = {
  isNavBarOpen: false,
};

export const toggleNavBar = createAction('navbar/toggle');
export const hideNavBar = createAction('navbar/hide');

const navbarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleNavBar, (state) => {
      state.isNavBarOpen = !state.isNavBarOpen;
    })
    .addCase(hideNavBar, (state) => {
      state.isNavBarOpen = false;
    });
});

export default navbarReducer;