// React
import { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Reducer
import { fetchAvatars } from '../../../store/reducers/avatar';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Typescript interface
interface UpdateAvatarModalProps {
  closeModal: () => void;
  content: string;
}

export default function UpdateAvatarModal({
  closeModal,
  content,
}: UpdateAvatarModalProps) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const avatars = useAppSelector((state) => state.avatar.data);
  const isLoading = useAppSelector((state) => state.avatar.loading);

  // Handlers
  const handleConfirmClick = () => {
    closeModal();
  };

  useEffect(() => {
    dispatch(fetchAvatars());
  }, [dispatch])

  console.log(avatars)

  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col min-w-[300px] max-w-[500px] gap-6 p-2">
        <h1 className='text-2xl'>{content}</h1>

        <div>
            <p>AVATAR INCOMING</p>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          <ValidButton content="Confirmer" onClickMethod={handleConfirmClick} />

          <CancelButton content="Annuler" onClickMethod={closeModal} />
        </div>
      </div>
    </Modal>
  );
}
