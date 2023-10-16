// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import {
  showCreateAccountModal,
  hideDeleteConfirmationModal,
} from '../../store/reducers/modal';

// === COMPONENTS === //
import AddButton from '../../components/common/Buttons/AddButton';
import CollaboratorCard from '../../components/layout/Cards/CollaboratorCard';
import CreateAccountModal from '../../components/Modals/CreateAccountModal/CreateAccountModal';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';
import InfoBubble from '../../components/common/Buttons/InfoBubble';

// === ASSETS === //
import loaderSVG from '../../assets/loader/tail-spin.svg';

export default function CollaboratorManager() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const collaboratorState = useAppSelector((state) => state.collaborator);
  const { data: collaborators, loading } = collaboratorState;

  const modalState = useAppSelector((state) => state.modal);
  const {
    isCreateAccountModalOpen: createAccountModal,
    isDeleteConfirmationOpen: deleteModal,
  } = modalState;

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-10 mb-5">Collaborator Manager</h1>

      <section className="p-4 my-5 overflow-x-hidden rounded-lg min-h-[50vh] shadow-custom bg-secondary-50 relative">
      <InfoBubble position='bottom-left' content="La suppression d'un collaborateur n'est possible que s'il ne dispose d'aucunes informations." containerClassname='absolute top-2 right-2' />
        <h2>Comptes négociateurs</h2>

        {/* CREATE COLLABORATOR BUTTON (component possible) */}
        <AddButton onClickMethod={() => dispatch(showCreateAccountModal())} content='Créer un compte négociateur' />

        {loading && collaborators.length ? (
          <img src={loaderSVG} alt="Loader" className="block m-auto" />
        ) : (
          collaborators.map((collaborator) => (
            <CollaboratorCard key={collaborator.id} {...collaborator} />
          ))
        )}

        {!collaborators.length && (
          <p className="text-lg font-semibold text-center">
            Pas encore de collaborateur...
          </p>
        )}
      </section>

      {/* DISPLAY CREATE ACCOUNT MODAL */}
      {createAccountModal &&
        createPortal(<CreateAccountModal />, document.body)}
      {/* DISPLAY DELETE MODAL */}
      {deleteModal &&
        createPortal(
          <DeleteModal
            deleteUser
            closeModal={() => dispatch(hideDeleteConfirmationModal())}
            content="Vous êtes sur le point de supprimer définitivement un collaborateur, confirmez-vous la suppression ?"
          />,
          document.body
        )}
    </>
  );
}
