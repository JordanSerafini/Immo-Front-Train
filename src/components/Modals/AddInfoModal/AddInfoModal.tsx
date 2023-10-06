// React
import { FormEvent, useState, useRef } from 'react';
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
import '../../SharedComponents/ErrorMsg/animation.scss';

// Typescript interface
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

export default function AddInfoModal() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // React References
  const modalRef = useRef<HTMLDivElement>(null);

  // Redux States
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationAddInfoModalOpen
  );
  const nextActionModal = useAppSelector(
    (state) => state.modal.isNextActionModalOpen
  );
  const regExps = useAppSelector((state) => state.regexps.information);

  // Local States
  const [formData, setFormData] = useState<Information & Action>();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('Maison');

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationAddInfoModalOpen());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement: HTMLFormElement = event.currentTarget;
    const formDatas = new FormData(formElement);
    const formEntries = Object.fromEntries(
      formDatas
    ) as unknown as Information & Action;

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
      dispatch(showNextActionModal());
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
        Ajout d&apos;une information
      </h1>

      {/* Error Message if there's at least an invalid inputs according to regexps tests */}
      {errorMessage.length > 0 && (
        <p className="font-semibold text-red-500">
          Les champs suivants sont incorrects: {errorMessage.join(' / ')}
        </p>
      )}

      <em className="italic">*Champs obligatoires</em>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:items-start flex-wrap justify-center sm:w-[500px] lg:flex-row lg:w-[900px] gap-6 mb-4"
      >
        <TypeFieldset
          state={selectedTypeOption}
          setState={setSelectedTypeOption}
        />

        <LocationFieldset typeState={selectedTypeOption} regExps={regExps} />

        <OwnerFieldset {...regExps} />

        <SourceFieldset {...regExps} />

        <CategoryFieldset />

        <CommentsFieldset {...regExps} />

        <ActionFieldset {...regExps} />

        {/* GROUP BTNS */}
        <div className="flex justify-around w-3/4 gap-2 m-auto mt-5 mb-20 sm:mb-0">
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
          <NextActionModal withInfo formData={formData} />,
          document.body
        )}
    </Modal>
  );
}
