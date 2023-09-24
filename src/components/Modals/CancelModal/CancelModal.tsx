// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { hideAddInfoModal, hideCancelConfirmationModal } from '../../../store/reducers/modal';

// Components
import Modal from '../Modal';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

// Typescript interface
interface CancelModalProps {
  closeModal: () => void;
  content?: string;
}

function CancelModal({ closeModal, content }: CancelModalProps) {
  const dispatch = useAppDispatch();
  const closeAllModal = () => {
    dispatch(hideAddInfoModal())
    dispatch(hideCancelConfirmationModal())
  }

  return (
    <Modal closeModal={closeModal}>
      <div className="p-2 flex flex-col gap-6 min-w-[200px] max-w-[300px]">
        <h1 className="text-lg font-semibold text-center ">{content}</h1>
        <div className="flex flex-wrap justify-center gap-3">
          <ValidButton content="Enregistrer" onClickMethod={closeAllModal} />
          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}

CancelModal.defaultProps = {
  content:
    'Vous êtes sur le point de supprimer définitivement une information de prospection, confirmez-vous la supression ?',
};

export default CancelModal;
