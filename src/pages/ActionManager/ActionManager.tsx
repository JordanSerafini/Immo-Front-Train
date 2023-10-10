// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React
import { FormEvent, useState } from 'react';

// React Router
import { useParams, Navigate } from 'react-router-dom';

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

// Selectors
import { findInformation } from '../../store/selectors/information';

// Shared Components
import MainSection from '../../components/SharedComponents/MainSection/MainSection';
import ValidButton from '../../components/SharedComponents/Buttons/ValidButton';
import CancelButton from '../../components/SharedComponents/Buttons/CancelButton';
import CancelModal from '../../components/Modals/CancelModal/CancelModal';
import Textarea from '../../components/Modals/AddInfoModal/Field/Textarea';

// Components
import InfoSection from '../../components/layout/Sections/InfoSection';
import ActionManagerSection from '../../components/layout/Sections/ActionManagerSection';
import NextActionModal from '../../components/Modals/NextActionModal/NextActionModal';

// Typescript interface
import { Information } from '../../@types/information';
import { Action } from '../../@types/action';

// Utils
import getFullDate from '../../utils/getFormatedFullDate';

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
  const regExps = useAppSelector((state) => state.regexps);

  // Local States
  const [action, setAction] = useState<string>('');
  const [formData, setFormData] = useState<Information & Action>();

  if (!information) {
    return <Navigate to="/app/prospection" replace />;
  }

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      information_id: infoId,
      description: action,
      date: getFullDate(),
    };

    if (formValues.description.length <= 5) {
      toast.error('Votre action doit comprendre au moins 6 caractères...', {position: toast.POSITION.BOTTOM_CENTER});
    } else {
      setFormData(formValues as unknown as Information & Action);

      dispatch(showNextActionModal());
    }
  };

  return (
    <>
      <MainSection>
        <h1>Gestionnaire d&apos;action</h1>

        <div className="2xl:grid-cols-2 2xl:grid">
          <InfoSection {...information} />
          <ActionManagerSection infoId={information.id} />
        </div>

        <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50 mb-5">
          <h2>Nouvelle action</h2>

          <form onSubmit={handleSubmit}>
            <Textarea
              value={action}
              onChange={setAction}
              textareaName="description"
              placeholder="Renseignez votre action"
              regExp={regExps.information.description}
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
          <NextActionModal
            withInfo={false}
            information={information}
            formData={formData}
          />,
          document.body
        )}
    </>
  );
}
