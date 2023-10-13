// Redux
import { createAction, createReducer } from '@reduxjs/toolkit';

// Typescript interface
interface InitialState {
  user: {
    [key: string]: RegExp;
  };
  information: {
    [key: string]: RegExp;
  };
  passwordStrength: {
    [key: string]: RegExp;
  };
  sector : {
    [key: string]: RegExp;
  }
}

export const initialState: InitialState = {
  user: {
    firstname: /^[A-Za-z .'-]+$/,
    lastname: /^[A-Za-z .'-]+$/,
    phone: /^\d{10}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    password: /^(?=.*[0-9]).{8,}$/,
  },
  information: {
    address_number: /^[0-9]{1,4}$/,
    address_street: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
    code_zip: /^[0-9]{5}$/,
    address_city: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
    address_info: /^.+$/m,
    owner_name: /^[A-Za-z .'-]+$/,
    phone_1: /^\d{10}$/,
    phone_2: /^\d{10}$/,
    owner_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    comment: /^.+$/m,
    source: /^.+$/m,
    action: /^.+.{5,}$/m,
    description: /^.+.{5,}$/m,
  },
  passwordStrength: {
    // Any char
    weak: /^(?=.*[a-z])/,
    // Any char with number
    medium: /^(?=.*[a-z])(?=.*[0-9])/,
    // Any char, with number, with symbol, between 8 & 20 char
    strong: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
  },
  sector: {
    color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  }
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
