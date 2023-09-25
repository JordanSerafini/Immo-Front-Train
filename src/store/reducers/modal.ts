import { createReducer, createAction } from '@reduxjs/toolkit';

// Typescript interface
interface ModalState {
  isAddInfoModalOpen: boolean;
  isCancelConfirmationModalOpen: boolean;
  isCancelConfirmationAddInfoModalOpen: boolean;
  isNextActionModalOpen: boolean;
}

export const initialState: ModalState = {
  isAddInfoModalOpen: false,
  isCancelConfirmationModalOpen: false,
  isCancelConfirmationAddInfoModalOpen: false,
  isNextActionModalOpen: false,
};

export const showAddInfoModal = createAction('addInfo/show');
export const hideAddInfoModal = createAction('addInfo/hide');

export const showCancelConfirmationModal = createAction('cancelModal/show');
export const hideCancelConfirmationModal = createAction('cancelModal/hide');

export const showCancelConfirmationAddInfoModalOpen = createAction('cancelAddInfoModal/show');
export const hideCancelConfirmationAddInfoModalOpen = createAction('cancelAddInfoModal/hide');

export const showNextActionModal = createAction('nextAction/show');
export const hideNextActionModal = createAction('nextAction/hide')

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
    })
    .addCase(showCancelConfirmationAddInfoModalOpen, (state) => {
      state.isCancelConfirmationAddInfoModalOpen = true;
    })
    .addCase(hideCancelConfirmationAddInfoModalOpen, (state) => {
      state.isCancelConfirmationAddInfoModalOpen = false;
    })
    .addCase(showNextActionModal, (state) => {
      state.isNextActionModalOpen = true;
    })
    .addCase(hideNextActionModal, (state) => {
      state.isNextActionModalOpen = false;
    });
});

export default modalReducer;
