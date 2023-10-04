// React Router
import { useLocation, Link } from 'react-router-dom';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';
import { deleteInformation } from '../../../store/reducers/information';

// Typescript interface
interface DeleteModalProps {
  closeModal: () => void;
  content: string;
}

export default function DeleteModal({ closeModal, content }: DeleteModalProps) {
  const dispatch = useAppDispatch();
  // Get the url
  const location = useLocation();
  // Get the if of the information we want to delete
  const id = location.search.slice(1);

  const handleConfirmClick = () => {
    closeModal();
    dispatch(deleteInformation({ id }));
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2">
        <h1 className="text-lg font-semibold text-center ">{content}</h1>
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
