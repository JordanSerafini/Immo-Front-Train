// === REACT ROUTER DOM === //
import { useLocation, Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../hooks/redux';

// === COMPONENTS === //
import Modal from '../Modal';
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';

// === REDUCERS === //
import { deleteInformation } from '../../../store/reducers/information';
import { deleteCollaborator } from '../../../store/reducers/collaborator';

// === TYPESCRIPT === //
interface DeleteModalProps {
  closeModal: () => void;
  content: string;
  deleteUser?: boolean;
  deleteInfo?: boolean;
}

function DeleteModal({
  closeModal,
  content,
  deleteUser,
  deleteInfo,
}: DeleteModalProps) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const location = useLocation();

  // Get the id of the information we want to delete
  const id = location.search.slice(1);

  const handleConfirmClick = () => {
    closeModal();

    if (deleteUser) {
      dispatch(deleteCollaborator({ id }));
    } else if (deleteInfo) {
      dispatch(deleteInformation({ id }));
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2">
        <h1 className="text-lg">{content}</h1>
        <div className="flex flex-wrap justify-center gap-10">
          <Link to={{ search: '' }}>
            <ValidButton
              content="Confirmer"
              onClickMethod={handleConfirmClick}
            />
          </Link>

          <Link to={{ search: '' }}>
            <CancelButton content="Annuler" onClickMethod={closeModal} />
          </Link>
        </div>
      </div>
    </Modal>
  );
}

DeleteModal.defaultProps = {
  deleteUser: false,
  deleteInfo: false,
};

export default DeleteModal;
