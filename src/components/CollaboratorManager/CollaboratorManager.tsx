// React dom
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Reducer
import {
  showCreateAccountModal,
  hideDeleteConfirmationModal,
} from '../../store/reducers/modal';

// Components
import CollabCard from './CollabCard/CollabCard';
import CreateAccountModal from '../Modals/CreateAccountModal/CreateAccountModal';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';

// Assets
import plusIcon from '../../assets/icons/plus.svg';
import loaderSVG from '../../assets/loader/tail-spin.svg';

export default function CollaboratorManager() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const collaborators = useAppSelector((state) => state.collaborator.data);
  const isCollaboratorsLoading = useAppSelector(
    (state) => state.collaborator.loading
  );
  const createAccountModal = useAppSelector(
    (state) => state.modal.isCreateAccountModalOpen
  );
  const deleteModal = useAppSelector(
    (state) => state.modal.isDeleteConfirmationOpen
  );

  // Handle Methods
  const handleCreateCollaboratorClick = () => {
    dispatch(showCreateAccountModal());
  };

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-20 mb-5 lg:mt-10">Administration</h1>

      <section className="min-h-screen p-4 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50">
        <h2>Comptes négociateurs</h2>

        {/* CREATE COLLABORATOR BUTTON (component possible) */}
        <button
          onClick={handleCreateCollaboratorClick}
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2 my-3 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110"
        >
          <img src={plusIcon} alt="Add Info Button Icon" className="w-[30px]" />
          <span className="text-secondary-50 font-poppins">
            Créer un compte négociateur
          </span>
        </button>

        {isCollaboratorsLoading ? (
          <img src={loaderSVG} alt="Loader" className="block m-auto" />
        ) : (
          collaborators.map((collaborator) => (
            <CollabCard key={collaborator.id} {...collaborator} />
          ))
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
            content="Vous êtes sur le point de supprimer définitivement une information de prospection, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
