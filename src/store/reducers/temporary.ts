import { createReducer, createAction } from '@reduxjs/toolkit';

interface Temporary {
  toggler: boolean;
}

export const initialState: Temporary = {
    toggler: false,
  };
  
  export const toggle = createAction('app/toggle');

  const temporaryReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(toggle, (state) => {
        state.toggler = !state.toggler;
      })
  });
  
  export default temporaryReducer;