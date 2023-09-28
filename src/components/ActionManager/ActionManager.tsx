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
  showNextActionModal,
} from '../../store/reducers/modal';
import { createProspectionAction } from '../../store/reducers/action';


// Selectors
import { findInformation } from '../../store/selectors/information';

// Shared Components
import MainSection from '../SharedComponents/MainSection/MainSection';
import ValidButton from '../SharedComponents/Buttons/ValidButton';
import CancelButton from '../SharedComponents/Buttons/CancelButton';
import CancelModal from '../Modals/CancelModal/CancelModal';
import Textarea from '../Modals/AddInfoModal/Field/Textarea';

// Components
import InfoSection from './InfoSection/InfoSection';
import ActionSection from './ActionSection/ActionSection';
import NextActionModal from '../Modals/NextActionModal/NextActionModal';

// Typescript interface
import { Action } from '../../@types/action';

// Utils
import getFullDate from '../../utils/getFullDate';

export default function ActionManager() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Params
  const { infoId } = useParams();

  // Redux States
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );
  const nextActionModal = useAppSelector(
    (state) => state.modal.isNextActionModalOpen
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

    const formData = {
      information_id: infoId,
      description: action,
      date: getFullDate(),
    }

    dispatch(createProspectionAction({formData}))
    dispatch(showNextActionModal());
  };

  return (
    <>
      <MainSection>
        <h1>Gestionnaire d&apos;action</h1>

        <div className="2xl:grid-cols-2 2xl:grid">
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
      {/* NEXT ACTION MODAL */}
      {nextActionModal &&
        createPortal(
          <NextActionModal withInfo={false} information={information} />,
          document.body
        )}
    </>
  );
}
