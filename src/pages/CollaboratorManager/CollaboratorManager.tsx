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
import CollaboratorCard from '../../components/layout/Cards/CollaboratorCard';
import CreateAccountModal from '../../components/Modals/CreateAccountModal/CreateAccountModal';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';

// === ASSETS === //
import { plusIcon } from '../../assets';
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
      <h1 className="mt-20 mb-5 lg:mt-10">Collaborator Manager</h1>

      <section className="p-4 my-5 overflow-x-hidden rounded-lg min-h-[50vh] shadow-custom bg-secondary-50">
        <h2>Comptes négociateurs</h2>

        {/* CREATE COLLABORATOR BUTTON (component possible) */}
        <button
          onClick={() => dispatch(showCreateAccountModal())}
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2 my-3 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110"
        >
          <img src={plusIcon} alt="Add Info Button Icon" className="w-[30px]" />
          <span className="text-secondary-50 font-poppins">
            Créer un compte négociateur
          </span>
        </button>

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
            content="Vous êtes sur le point de supprimer définitivement un collaborateur, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
