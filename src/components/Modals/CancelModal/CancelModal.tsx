// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { hideAddInfoModal, hideCancelConfirmationAddInfoModalOpen, hideCancelConfirmationModal } from '../../../store/reducers/modal';

// Components
import Modal from '../Modal';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

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
          <ValidButton content="Confirmer" onClickMethod={closeAllModal} />
          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}