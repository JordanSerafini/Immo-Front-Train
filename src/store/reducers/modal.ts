import { createReducer, createAction } from '@reduxjs/toolkit';

// Typescript interface
interface ModalState {
  isAddInfoModalOpen: boolean;
  isCancelConfirmationModalOpen: boolean;
}

export const initialState: ModalState = {
  isAddInfoModalOpen: false,
  isCancelConfirmationModalOpen: false,
};

export const showAddInfoModal = createAction('modal/show');
export const hideAddInfoModal = createAction('modal/hide');

const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showAddInfoModal, (state) => {
      state.isAddInfoModalOpen = true;
    })
    .addCase(hideAddInfoModal, (state) => {
      state.isAddInfoModalOpen = false;
    });
});

export default modalReducer;
