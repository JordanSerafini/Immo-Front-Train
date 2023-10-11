// === REACT === //
import { FormEvent, useState, useRef } from 'react';

// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import {
  showCancelConfirmationModal,
  hideCancelConfirmationModal,
  hideCreateSectorModal,
} from '../../../store/reducers/modal';
import { createSector } from '../../../store/reducers/sector';

// === COMPONENTS === //
import Modal from '../Modal';
import MemoizedInput from '../../common/Inputs/MemoizedInput';
import CancelModal from '../CancelModal/CancelModal';
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';

// === ASSETS === //
import { plusIcon } from '../../../assets';

// === TYPESCRIPT === //
import { Sector } from '../../../@types/sector';

export default function CreateSectorModal() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REACT REFS === //
  const modalRef = useRef<HTMLDivElement>(null);

  // === SELECTOR === //
  const collaborators = useAppSelector((state) => state.collaborator.data);

  // === REDUX STATES === //
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );
  const regExps = useAppSelector((state) => state.regexps.information);

  // === LOCAL STATES === //
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // === CONTROLLED INPUT STATES === //
  const [city, setCity] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [color, setColor] = useState<string>('#FF00FF');
  const [collaboratorOption, setCollaboratorOption] = useState<string>('');

  // === HANDLERS === //
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement: HTMLFormElement = event.currentTarget;
    const formDatas = new FormData(formElement);
    formDatas.append('label', city);
    formDatas.append('collaborator_id', collaboratorOption);

    const formEntries = Object.fromEntries(formDatas) as unknown as Sector;

    // !!! MISSING INPUTS VALIDATION !!! //
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
      dispatch(createSector({ formData: formEntries }));
      dispatch(hideCreateSectorModal());
    }
  };

  return (
    <Modal closeModal={handleCancelClick} reference={modalRef}>
      {/* Temporary style - COMPONENT REFACTO POSSIBLE ! */}
      <button
        onClick={handleCancelClick}
        type="button"
        className="absolute top-2 right-2"
      >
        <img
          className="duration-300 rotate-45 rounded-full bg-primary-300 hover:bg-primary-500"
          src={plusIcon}
          alt="Plus Icon"
        />
      </button>

      <h1 className="block w-3/4 m-auto text-2xl font-semibold my-7 lg:text-3xl font-poppins">
        Création d&apos;un nouveau secteur
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
        className="flex flex-col gap-8 lg:w-[600px] my-5 mx-1 sm:mx-10"
      >
        <MemoizedInput
          placeholder="Ville"
          inputName="city"
          label="Ville"
          regExp={regExps.address_city}
          value={city}
          onChange={setCity}
          isRequired
        />

        <MemoizedInput
          placeholder="Code Postal"
          onChange={setZipCode}
          value={zipCode}
          type="number"
          inputName="code_zip"
          label="Code Postal"
          regExp={regExps.code_zip}
          isRequired
        />

        <label className="relative m-auto font-semibold font-poppins">
          Choisissez une couleur
          <input
            type="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
            name="color_code"
            className="block mx-auto mt-2 opacity-0"
          />
          <div
            className="absolute top-7 left-1/2 -translate-x-1/2 bg-slate-500 w-[50px] aspect-square rounded-full shadow-custom"
            style={{ backgroundColor: color }}
          />
        </label>

        <label className="font-semibold font-poppins">
          Affecter à :
          <select
            value={collaboratorOption}
            onChange={(event) => setCollaboratorOption(event.target.value)}
            className="w-full p-2 my-2 font-normal border-2 border-solid rounded-md border-accent-300"
          >
            <option disabled> Sélectionnez...</option>
            {collaborators.map((collab) => (
              <option key={collab.id} value={collab.id}>
                {collab.firstname} {collab.lastname?.toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        {/* GROUP BTNS */}
        <div className="flex flex-wrap justify-around w-3/4 gap-4 m-auto mt-5">
          <ValidButton content="Créer le secteur" isSubmit />
          <CancelButton content="Annuler" onClickMethod={handleCancelClick} />
        </div>
      </form>
      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() => dispatch(hideCancelConfirmationModal())}
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
            redirectPath="/admin/sector"
          />,
          document.body
        )}
    </Modal>
  );
}
