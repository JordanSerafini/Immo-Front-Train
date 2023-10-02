// Redux
import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState: { [key: string]: RegExp } = {
  firstname: /^[A-Za-z .'-]+$/,
  lastname: /^[A-Za-z .'-]+$/,
  address_number: /^[0-9]{1,4}$/,
  address_street: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
  code_zip: /^[0-9]{5}$/,
  address_city: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
  address_info: /^.+$/m,
  owner_name: /^[A-Za-z .'-]+$/,
  phone: /^\d{10}$/,
  phone_1: /^\d{10}$/,
  phone_2: /^\d{10}$/,
  owner_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  comment: /^.+$/m,
  source: /^.+$/m,
  action: /^.+.{5,}$/m,
  description: /^.+.{5,}$/m,
  password: /^(?=.*[0-9]).{8,}$/
};

const getRegexps = createAction('regexp/get');

const regexpValidationReducer = createReducer(initialState, (builder) => {
  builder
    // There isn't a specific action to do here, we just want to create a reducer to export it
    .addCase(getRegexps, () => {
      return initialState;
    });
});

export default regexpValidationReducer;
