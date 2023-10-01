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
import './animation.scss';
import '../../SharedComponents/ErrorMsg/animation.scss';

// Typescript interface
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

export default function AddInfoModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationAddInfoModalOpen
  );
  const nextActionModal = useAppSelector(
    (state) => state.modal.isNextActionModalOpen
  );

  // Local States
  const [formData, setFormData] = useState<Information & Action>();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('Maison');

  // RegExps
  const regExps: { [key: string]: RegExp } = {
    address_number: /^[0-9]{1,4}$/,
    address_street: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
    code_zip: /^[0-9]{5}$/,
    address_city: /^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/,
    address_info: /^.+$/m,
    owner_name: /^[A-Za-z .'-]+$/,
    phone_1: /^\d{10}$/,
    phone_2: /^\d{10}$/,
    owner_email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    comment: /^.+$/m,
    source: /^.+$/m,
    action: /^.+.{5,}$/m,
    description: /^.+.{5,}$/m
  };

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

    const wrongValues: string[] = [];

    Object.keys(formEntries).forEach((fieldName) => {
      const value = formDatas.get(fieldName);

      if (fieldName in regExps && regExps[fieldName] && value?.length) {
        if (!regExps[fieldName].test(value as string)) {
          wrongValues.push(fieldName);
        }
      }
    });

    if (wrongValues.length) {
      setErrorMessage(wrongValues);

      if(modalRef.current) {
        modalRef.current.scrollTo({top: 0, behavior: "smooth"})
      }
    } else {
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
          <NextActionModal withInfo formData={formData} />,
          document.body
        )}
    </Modal>
  );
}
