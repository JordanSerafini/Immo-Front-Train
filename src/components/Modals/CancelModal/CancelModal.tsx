// React router
import { Link } from 'react-router-dom';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { hideAddInfoModal, hideCancelConfirmationAddInfoModalOpen, hideCancelConfirmationModal } from '../../../store/reducers/modal';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Typescript interface
interface CancelModalProps {
  closeModal: () => void;
  content: string;
}

export default function CancelModal({ closeModal, content }: CancelModalProps) {
  const dispatch = useAppDispatch();
  const closeAllModal = () => {
    dispatch(hideAddInfoModal())
    dispatch(hideCancelConfirmationModal())
    dispatch(hideCancelConfirmationAddInfoModalOpen())
  }

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2">
        <h1 className="text-lg font-semibold text-center ">{content}</h1>
        <div className="flex flex-wrap justify-center gap-10">
          <Link to="/app/prospection">
          <ValidButton content="Confirmer" onClickMethod={closeAllModal} />
          </Link>
          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}