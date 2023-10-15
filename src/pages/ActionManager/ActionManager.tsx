// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REACT ROUTER DOM === //
import { useParams, Navigate } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import {
  showCancelConfirmationModal,
  hideCancelConfirmationModal,
  showNextActionModal,
} from '../../store/reducers/modal';

// === SELECTORS === //
import { findInformation } from '../../store/selectors/information';

// === COMPONENTS === //
// Layout
import InfoSection from '../../components/layout/Sections/InfoSection';
import ActionManagerSection from '../../components/layout/Sections/ActionManagerSection';
// Common
import ValidButton from '../../components/common/Buttons/ValidButton';
import CancelButton from '../../components/common/Buttons/CancelButton';
import Textarea from '../../components/common/Textarea/Textarea';
// Modal
import CancelModal from '../../components/Modals/CancelModal/CancelModal';
import NextActionModal from '../../components/Modals/NextActionModal/NextActionModal';

// === TYPESCRIPT === //
import { Information } from '../../@types/information';
import { Action } from '../../@types/action';

// === UTILS === //
import getFormatedFullDate from '../../utils/getFormatedFullDate';
import getFormatedDayjsDate from '../../utils/getFormatedDayjsDate';

export default function ActionManager() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // Params
  const { infoId } = useParams();

  // === REDUX STATES === //
  const modalState = useAppSelector((state) => state.modal);
  const {
    isCancelConfirmationModalOpen: cancelModal,
    isNextActionModalOpen: nextActionModal,
  } = modalState;

  const information = useAppSelector(findInformation(infoId as string));
  const regExps = useAppSelector((state) => state.regexps);

  // === LOCAL STATES === //
  const [formData, setFormData] = useState<Information & Action>();

  // === CONTROLLED INPUT STATES === //
  const [action, setAction] = useState<string>('');

  if (!information) {
    return <Navigate to="/app/prospection" replace />;
  }

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formatedDate = getFormatedDayjsDate(getFormatedFullDate());

    const formValues = {
      information_id: infoId,
      description: action,
      date: formatedDate,
    };

    if (formValues.description.length <= 5) {
      toast.error('Votre action doit comprendre au moins 6 caractères...', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setFormData(formValues as unknown as Information & Action);

      dispatch(showNextActionModal());
    }
  };

  return (
    <>
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
                onClickMethod={() => dispatch(showCancelConfirmationModal())}
              />
            </div>
          </form>
        </section>
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
