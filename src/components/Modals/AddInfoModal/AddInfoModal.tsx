// React
import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import {
  showNextActionModal,
  showCancelConfirmationAddInfoModalOpen,
  hideCancelConfirmationAddInfoModalOpen,
} from '../../../store/reducers/modal';

// Shared Components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Modal Components
import Modal from '../Modal';
import CancelModal from '../CancelModal/CancelModal';
import NextActionModal from '../NextActionModal/NextActionModal';

// Components
import TypeFieldset from './TypeFieldset/TypeFieldset';
import LocationFieldset from './LocationFieldset/LocationFieldset';
import OwnerFieldset from './OwnerFieldset/OwnerFieldset';
import SourceFieldset from './SourceFieldset/SourceFieldset';
import CategoryFieldset from './CategoryFieldset/CategoryFieldset';
import CommentsFieldset from './CommentsFieldset/CommentsFieldset';
import ActionFieldset from './ActionFieldset/ActionFieldset';

// Assets
import plus from '../../../assets/icons/plus.svg';

// Style
import './animation.scss';

export default function AddInfoModal() {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationAddInfoModalOpen
  );
  const nextActionModal = useAppSelector(
    (state) => state.modal.isNextActionModalOpen
  );

  // Local States
  const [formData, setFormData] = useState<{[k: string]: FormDataEntryValue}>()

  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('Appartement');

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationAddInfoModalOpen());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    setFormData(Object.fromEntries(new FormData(form)));

    dispatch(showNextActionModal());
  };

  return (
    <Modal closeModal={handleCancelClick}>
      {/* Temporary style */}
      <button
        onClick={handleCancelClick}
        type="button"
        className="absolute top-2 right-2"
      >
        <img
          className="duration-300 rotate-45 rounded-full bg-primary-300 hover:bg-primary-500"
          src={plus}
          alt="Plus Icon"
        />
      </button>

      <h1 className="my-5 text-2xl font-semibold text-center font-poppins">
        Ajout d&apos;une information
      </h1>

      <em className="italic">*Champs obligatoires</em>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:items-start flex-wrap justify-center sm:w-[500px] lg:flex-row lg:w-[900px] gap-6 mb-4"
      >
        <TypeFieldset
          state={selectedTypeOption}
          setState={setSelectedTypeOption}
        />

        <LocationFieldset typeState={selectedTypeOption} />

        <OwnerFieldset />

        <SourceFieldset />

        <CategoryFieldset />

        <CommentsFieldset />

        <ActionFieldset />

        {/* GROUP BTNS */}
        <div className="flex justify-between w-3/4 gap-4 m-auto mt-5">
          <ValidButton content="Enregistrer" isSubmit />
          <CancelButton content="Annuler" onClickMethod={handleCancelClick} />
        </div>
      </form>
      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() =>
              dispatch(hideCancelConfirmationAddInfoModalOpen())
            }
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
          />,
          document.body
        )}
      {/* NEXT ACTION MODAL */}
      {nextActionModal &&
        createPortal(
          <NextActionModal formData={formData} />,
          document.body
        )}
    </Modal>
  );
}
