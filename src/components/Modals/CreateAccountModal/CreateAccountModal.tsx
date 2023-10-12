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
  hideCreateAccountModal,
} from '../../../store/reducers/modal';
import { createCollaborator } from '../../../store/reducers/collaborator';

// === COMPONENTS === //
import PasswordStrength from '../../features/PasswordStrength/PasswordStrength';
// Common
import ErrorMsg from '../../common/ErrorMsg/ErrorMsg';
import MemoizedInput from '../../common/Inputs/MemoizedInput';
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';
// Modal
import Modal from '../Modal';
import CancelModal from '../CancelModal/CancelModal';

// === TYPESCRIPT === //
import { User } from '../../../@types/user';

export default function CreateAccountModal() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REACT REFS === //
  const modalRef = useRef<HTMLDivElement>(null);

  // === REDUX STATES === //
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );
  const regExps = useAppSelector((state) => state.regexps.user);

  // === LOCAL STATES === //
  const [errorMessage, setErrorMessage] = useState<string[]>([]);

  // === CONTROLLED INPUT STATES === //
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement: HTMLFormElement = event.currentTarget;
    const formDatas = new FormData(formElement);
    // We append default values to the form
    formDatas.append('acces', 'true');
    formDatas.append('role_id', '2');
    formDatas.append('avatar_id', '1');
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

    if (password !== passwordConfirmation) {
      wrongValues.push('Mots de passes différents');
    }

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
      dispatch(createCollaborator({ formData: formEntries }));
      dispatch(hideCreateAccountModal());
    }
  };

  return (
    <Modal closeModal={handleCancelClick} reference={modalRef}>
      <h1 className="block w-3/4 m-auto text-2xl font-semibold my-7 lg:text-3xl font-poppins">
        Création d&apos;un nouveau compte négociateur
      </h1>

      {/* Error Message if there's at least an invalid inputs according to regexps tests */}
      {errorMessage.length > 0 && (
        <ErrorMsg
          content={`Les champs suivants sont incorrects: ${errorMessage.join(
            ' / '
          )}`}
        />
      )}

      <em>*Tous les champs sont obligatoires</em>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 lg:w-[600px] my-5 mx-1 sm:mx-10"
      >
        <MemoizedInput
          placeholder="Nom"
          inputName="lastname"
          label="Nom"
          regExp={regExps.lastname}
          isRequired
          value={lastname}
          onChange={setLastname}
        />

        <MemoizedInput
          placeholder="Prénom"
          inputName="firstname"
          label="Prénom"
          regExp={regExps.firstname}
          isRequired
          value={firstname}
          onChange={setFirstname}
        />

        <MemoizedInput
          placeholder="N° Téléphone"
          inputName="phone"
          label="N° Téléphone"
          type="number"
          regExp={regExps.phone}
          isRequired
          value={phone}
          onChange={setPhone}
        />

        <MemoizedInput
          placeholder="Adresse Email"
          inputName="email"
          label="Adresse Email"
          regExp={regExps.email}
          isRequired
          value={email}
          onChange={setEmail}
        />
        <MemoizedInput
          placeholder="Mot de passe"
          inputName="password"
          label="Mot de passe"
          regExp={regExps.password}
          type="password"
          isRequired
          value={password}
          onChange={setPassword}
        />

        <PasswordStrength inputState={password} />

        <MemoizedInput
          placeholder="Confirmez le mot de passe"
          inputName="password_confirmation"
          label="Confirmez le mot de passe"
          type="password"
          containerClassName="mt-[1.5rem]"
          isRequired
          value={passwordConfirmation}
          onChange={setPasswordConfirmation}
          className={
            passwordConfirmation.length > 8 && password === passwordConfirmation
              ? 'border-primary-300 focus:ring-transparent'
              : ''
          }
        />

        {/* GROUP BTNS */}
        <div className="flex flex-wrap justify-around w-3/4 gap-4 m-auto mt-5">
          <ValidButton content="Créer le compte" isSubmit />
          <CancelButton content="Annuler" onClickMethod={handleCancelClick} />
        </div>
      </form>
      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() => dispatch(hideCancelConfirmationModal())}
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
            redirectPath="/admin/collaborator"
          />,
          document.body
        )}
    </Modal>
  );
}
