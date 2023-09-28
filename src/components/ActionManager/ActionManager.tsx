// React
import { FormEvent, useState } from 'react';

// React Router
import { Link, useParams, Navigate } from 'react-router-dom';

// React dom
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  showCancelConfirmationModal,
  hideCancelConfirmationModal,
} from '../../store/reducers/modal';

// Selectors
import { findInformation } from '../../store/selectors/information';

// Shared Components
import MainSection from '../SharedComponents/MainSection/MainSection';
import ValidButton from '../SharedComponents/Buttons/ValidButton';
import CancelButton from '../SharedComponents/Buttons/CancelButton';
import CancelModal from '../Modals/CancelModal/CancelModal';
import Textarea from '../Modals/AddInfoModal/Field/Textarea';

// Components
import ActionCard from './ActionCard/ActionCard';
import InfoSection from './InfoSection/InfoSection';
import ActionSection from './ActionSection/ActionSection';

export default function ActionManager() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Params
  const { infoId } = useParams();

  // Redux States
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );
  const information = useAppSelector(findInformation(infoId as string));

  // Local States
  const [action, setAction] = useState<string>('');

  if (!information) {
    return <Navigate to="/app/prospection" replace />;
  }


  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
  };

  return (
    <>
      <MainSection>
        <h1>Gestionnaire d&apos;action</h1>

        <div className="2xl:flex">
          <InfoSection {...information} />
          <ActionSection infoId={information.id} />
        </div>

        <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50 mb-5">
          <h2>Nouvelle action</h2>

          <form onSubmit={handleSubmit}>
            <Textarea
              value={action}
              onChange={setAction}
              textareaName="description"
              placeholder="Renseignez votre action"
            />
            <div className="flex mt-5 justify-evenly">
              <ValidButton content="Enregistrer" isSubmit />
              <CancelButton
                content="Annuler"
                onClickMethod={handleCancelClick}
              />
            </div>
          </form>
        </section>
      </MainSection>
      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() => dispatch(hideCancelConfirmationModal())}
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
          />,
          document.body
        )}
    </>
  );
}
