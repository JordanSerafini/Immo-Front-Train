// === REACT === //
import { FormEvent, useState, useRef } from 'react';

// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import {
  showNextActionModal,
  showCancelConfirmationAddInfoModalOpen,
  hideCancelConfirmationAddInfoModalOpen,
} from '../../../store/reducers/modal';

// === COMPONENTS === //
// Common
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';
// Modal
import Modal from '../Modal';
import CancelModal from '../CancelModal/CancelModal';
import NextActionModal from '../NextActionModal/NextActionModal';
import {
  TypeFieldset,
  LocationFieldset,
  OwnerFieldset,
  SourceFieldset,
  CategoryFieldset,
  CommentsFieldset,
  ActionFieldset,
} from './FieldSets';

// === STYLES === //
import '../../common/ErrorMsg/styles/animation.scss';

// === TYPESCRIPT === //
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

export default function AddInfoModal() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REACT REFS === //
  const modalRef = useRef<HTMLDivElement>(null);

  // === REDUX STATES === //
  const modalState = useAppSelector((state) => state.modal);
  const {
    isCancelConfirmationAddInfoModalOpen: cancelModal,
    isNextActionModalOpen: nextActionModal,
  } = modalState;

  const regExps = useAppSelector((state) => state.regexps.information);

  // === LOCAL STATES === //
  const [formData, setFormData] = useState<Information & Action>();
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('Maison');

  // === HANDLERS === //
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
        // If the regexp don't pass the test, it'll add the fieldName into the wrongValues array so we'll be able to display all wrong values
        if (!regExps[fieldName].test(value as string)) {
          wrongValues.push(fieldName);
        }
      }
    });

    // If our wrongValues array has at least one element :
    if (wrongValues.length) {
      // We set our errorMessage local state to those values
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
      <h1 className="my-5 text-2xl font-semibold text-center font-poppins">
        Ajout d&apos;une information
      </h1>

      {/* Error Message if there's at least an invalid inputs according to regexps tests */}
      {errorMessage.length > 0 && (
        <ErrorMsg
          content={`Les champs suivants sont incorrects: ${errorMessage.join(
            ' / '
          )}`}
        />
      )}

      <em>*Champs obligatoires</em>

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
        <div className="flex justify-around w-3/4 gap-2 m-auto mt-5">
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
