// React
import { useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import {
  hideAddInfoModal,
  hideCancelConfirmationModal,
  hideNextActionModal,
} from '../../../store/reducers/modal';


// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import Input from '../AddInfoModal/Field/Input';

// Utils
import getFullDate from '../../../utils/getFullDate';

// Typescript interface
import { createInformation, createInformationAndAction } from '../../../store/reducers/informations';

export default function NextActionModal({ formData } : {formData: {[k: string]: FormDataEntryValue} | undefined}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local States
  const [nextActionDate, setNextActionDate] = useState<string>(getFullDate());

  // Redux state
  const collaboratorId = useAppSelector((state) => state.user.data.id);

  // Methods
  const closeAllModal = () => {
    const infoData = {
      ...formData,
      notification_date: nextActionDate,
      collaborator_id: collaboratorId,
      date: getFullDate(),
      sector_id: 1
    }

    if (formData && formData.description && formData.description.length){
      dispatch(createInformationAndAction({ formData: infoData }))
    } else {
      dispatch(createInformation({ formData: infoData }))
    }
    
    dispatch(hideAddInfoModal());
    dispatch(hideCancelConfirmationModal());
    dispatch(hideNextActionModal());
  };

  return (
    <Modal>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2">
        <Input
          type="date"
          value={nextActionDate}
          onChange={setNextActionDate}
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
