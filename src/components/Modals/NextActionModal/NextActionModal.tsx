// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import {
  hideAddInfoModal,
  hideCancelConfirmationModal,
  hideNextActionModal
} from '../../../store/reducers/modal';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import Input from '../AddInfoModal/Field/Input';

// Typescript interface
interface NextActionModalProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function NextActionModal({
  state,
  setState,
}: NextActionModalProps) {
  const dispatch = useAppDispatch();
  const closeAllModal = () => {
    dispatch(hideAddInfoModal());
    dispatch(hideCancelConfirmationModal());
    dispatch(hideNextActionModal());
    console.log(state)
  };

  return (
    <Modal>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2">
        <Input
          type="date"
          value={state}
          onChange={setState}
          placeholder="jj / mm / dddd"
          label='*Prochaine action prévue le :'
          inputName='notification_date'
        />
        <ValidButton
          className="block m-auto"
          content="Finaliser"
          onClickMethod={closeAllModal}
        />
      </div>
    </Modal>
  );
}
