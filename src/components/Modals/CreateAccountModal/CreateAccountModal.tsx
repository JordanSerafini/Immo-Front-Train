// React
import { FormEvent, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import {
  showCancelConfirmationModal,
  hideCancelConfirmationModal,
  
} from '../../../store/reducers/modal';

// Shared Components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Modal Components
import Modal from '../Modal';
import CancelModal from '../CancelModal/CancelModal';

// Assets
import plus from '../../../assets/icons/plus.svg';

// Style
import '../../SharedComponents/ErrorMsg/animation.scss';

// Typescript interface
import { User } from '../../../@types/user';

export default function CreateAccountModal() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // React References
  const modalRef = useRef<HTMLDivElement>(null);

  // Redux States
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );
  const regExps = useAppSelector((state) => state.regexps);

  // Local States
  const [formData, setFormData] = useState<User>();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement: HTMLFormElement = event.currentTarget;
    const formDatas = new FormData(formElement);
    const formEntries = Object.fromEntries(formDatas) as unknown as User;

    // FORM VALIDATION
    // The idea is to push into the wrongValues array to gather all invalid inputs
    const wrongValues: string[] = [];

    // For each entries from formEntries, we iterate to test the regexp from our redux initialState
    Object.keys(formEntries).forEach((fieldName) => {
      const value = formDatas.get(fieldName);

      if (fieldName in regExps && regExps[fieldName] && value?.length) {
        if (!regExps[fieldName].test(value as string)) {
          wrongValues.push(fieldName);
        }
      }
    });

    // If our wrongValues array has at least one element, it means our previous forEach has detected invalid inputs
    if (wrongValues.length) {
      // So we set our errorMessage local state to those values
      setErrorMessage(wrongValues);

      if (modalRef.current) {
        // We also want to force the scroll to the top of our modal
        // UX Choice : We want the user to see what's going on
        modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Otherwise, we set our local react state to formEntries, so we can send it into our <NextActionModal /> component
      setFormData(formEntries);

      console.log('sent form to back-end');
    }
  };

  return (
    <Modal closeModal={handleCancelClick} reference={modalRef}>
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
        Création d&apos;un nouveau compte
      </h1>

      {/* Error Message if there's at least an invalid inputs according to regexps tests */}
      {errorMessage.length > 0 && (
        <p className="font-semibold text-red-500">
          Les champs suivants sont incorrects: {errorMessage.join(' / ')}
        </p>
      )}

      <em className="italic">*Tous les champs sont obligatoires</em>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:items-start flex-wrap justify-center sm:w-[500px] lg:flex-row lg:w-[900px] gap-6 mb-4"
      >
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
            closeModal={() => dispatch(hideCancelConfirmationModal())}
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
            redirectPath='/admin/panel'
          />,
          document.body
        )}
    </Modal>
  );
}
