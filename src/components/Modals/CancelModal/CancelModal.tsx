// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../hooks/redux';

// === REDUCERS === //
import { hideAllModals } from '../../../store/reducers/modal';

// === COMPONENTS === //
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
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === HANDLERS === //
  const closeAllModal = () => {
    dispatch(hideAllModals());
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col max-w-[450px] gap-6 p-2">
        <h1 className="text-lg font-semibold text-center ">{content}</h1>
        <div className="flex flex-wrap justify-around gap-2">
          <Link to={redirectPath} onClick={closeAllModal}>
            <ValidButton isNotFocusable content="Confirmer" />
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
