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

export const showCancelConfirmationModal = createAction('cancelModal/show');
export const hideCancelConfirmationModal = createAction('cancelModal/hide');

const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showAddInfoModal, (state) => {
      state.isAddInfoModalOpen = true;
    })
    .addCase(hideAddInfoModal, (state) => {
      state.isAddInfoModalOpen = false;
    })
    .addCase(showCancelConfirmationModal, (state) => {
      state.isCancelConfirmationModalOpen = true;
    })
    .addCase(hideCancelConfirmationModal, (state) => {
      state.isCancelConfirmationModalOpen = false;
    });
});

export default modalReducer;
