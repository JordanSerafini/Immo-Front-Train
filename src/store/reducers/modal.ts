import { createReducer, createAction } from '@reduxjs/toolkit';

// Typescript interface
interface ModalState {
  isAddInfoModalOpen: boolean;
  isCancelConfirmationModalOpen: boolean;
  isCancelConfirmationAddInfoModalOpen: boolean;
  isNextActionModalOpen: boolean;
  isDeleteConfirmationOpen: boolean;
  informationToDelete: number | null;
}

export const initialState: ModalState = {
  isAddInfoModalOpen: false,
  isCancelConfirmationModalOpen: false,
  isCancelConfirmationAddInfoModalOpen: false,
  isNextActionModalOpen: false,
  isDeleteConfirmationOpen: false,
  informationToDelete: null,
};

export const showAddInfoModal = createAction('addInfo/show');
export const hideAddInfoModal = createAction('addInfo/hide');

export const showCancelConfirmationModal = createAction('cancelModal/show');
export const hideCancelConfirmationModal = createAction('cancelModal/hide');

export const showCancelConfirmationAddInfoModalOpen = createAction(
  'cancelAddInfoModal/show'
);
export const hideCancelConfirmationAddInfoModalOpen = createAction(
  'cancelAddInfoModal/hide'
);

export const showNextActionModal = createAction('nextAction/show');
export const hideNextActionModal = createAction('nextAction/hide');

export const showDeleteConfirmationModal = createAction('deleteModal/show');
export const hideDeleteConfirmationModal = createAction('deleteModal/hide');

const modalReducer = createReducer(initialState, (builder) => {
  builder
    // Add Info Modal
    .addCase(showAddInfoModal, (state) => {
      state.isAddInfoModalOpen = true;
    })
    .addCase(hideAddInfoModal, (state) => {
      state.isAddInfoModalOpen = false;
    })
    // CancelConfirmation Modal
    .addCase(showCancelConfirmationModal, (state) => {
      state.isCancelConfirmationModalOpen = true;
    })
    .addCase(hideCancelConfirmationModal, (state) => {
      state.isCancelConfirmationModalOpen = false;
    })
    // Cancel Confirmation Add Info Modal
    .addCase(showCancelConfirmationAddInfoModalOpen, (state) => {
      state.isCancelConfirmationAddInfoModalOpen = true;
    })
    .addCase(hideCancelConfirmationAddInfoModalOpen, (state) => {
      state.isCancelConfirmationAddInfoModalOpen = false;
    })
    // Next Action Modal
    .addCase(showNextActionModal, (state) => {
      state.isNextActionModalOpen = true;
    })
    .addCase(hideNextActionModal, (state) => {
      state.isNextActionModalOpen = false;
    })
    // Delete Confirmation Modal
    .addCase(showDeleteConfirmationModal, (state, action) => {
      state.isDeleteConfirmationOpen = true;
    })
    .addCase(hideDeleteConfirmationModal, (state) => {
      state.isDeleteConfirmationOpen = false;
    });
});

export default modalReducer;
