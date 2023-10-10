// React router
import { Link } from 'react-router-dom';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import {
  hideAddInfoModal,
  hideCancelConfirmationAddInfoModalOpen,
  hideCancelConfirmationModal,
  hideCreateAccountModal,
  hideCreateSectorModal,
} from '../../../store/reducers/modal';

// Components
import Modal from '../Modal';
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';

// Typescript interface
interface CancelModalProps {
  closeModal: () => void;
  content: string;
  redirectPath?: string;
}

function CancelModal({
  closeModal,
  content,
  redirectPath = '/app/prospection',
}: CancelModalProps) {
  const dispatch = useAppDispatch();
  const closeAllModal = () => {
    dispatch(hideAddInfoModal());
    dispatch(hideCancelConfirmationModal());
    dispatch(hideCancelConfirmationAddInfoModalOpen());
    dispatch(hideCreateAccountModal());
    dispatch(hideCreateSectorModal());
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col max-w-[450px] gap-6 p-2">
        <h1 className="text-lg font-semibold text-center ">{content}</h1>
        <div className="flex flex-wrap justify-around gap-2">
          <Link to={redirectPath}>
            <ValidButton content="Confirmer" onClickMethod={closeAllModal} />
          </Link>
          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}

CancelModal.defaultProps = {
  redirectPath: '/app/prospection',
};

export default CancelModal;
