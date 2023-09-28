// React
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import {
  hideAddInfoModal,
  hideCancelConfirmationModal,
  hideNextActionModal,
} from '../../../store/reducers/modal';
import { createProspectionAction } from '../../../store/reducers/action';

// Components
import Modal from '../Modal';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import Input from '../AddInfoModal/Field/Input';

// Utils
import getFullDate from '../../../utils/getFullDate';

// Typescript interface
import {
  createInformation,
  createInformationAndAction,
  updateInformation,
} from '../../../store/reducers/informations';
import { Information } from '../../../@types/information';

function NextActionModal({
  formData,
  withInfo,
  information,
}: {
  formData?: { [k: string]: FormDataEntryValue } | undefined;
  withInfo: boolean;
  information?: Information;
}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local States
  const [nextActionDate, setNextActionDate] = useState<string>(getFullDate());

  // Redux state
  const collaboratorId = useAppSelector((state) => state.user.data.id);

  // Methods
  const closeAllModal = () => {
    const date = new Date(nextActionDate);
    date.setUTCHours(0, 0, 0, 0);
    const ISONotifDate = date.toISOString();

    const infoData = {
      ...formData,
      notification_date: ISONotifDate,
      collaborator_id: collaboratorId,
      date: getFullDate(),
      sector_id: 1,
    };

    // If there's an Information to create AND an action to create
    if (
      withInfo &&
      formData &&
      formData.description &&
      formData.description.length
    ) {
      dispatch(createInformationAndAction({ formData: infoData }));
    } else if (withInfo && formData) {
      // Else if there's an Information to create WITHOUT an action to create
      dispatch(createInformation({ formData: infoData }));
    } else if (!withInfo && information) {
      // Else if there's not an Information to create
      const formValues = {
        description: formData?.description as string,
        information_id: formData?.information_id as string,
        date: getFullDate(),
      };
      // Type problem
      dispatch(createProspectionAction({ formData: formValues }));
      dispatch(
        updateInformation({ ...information, notification_date: ISONotifDate })
      );
    }

    navigate('/app/prospection');

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
          label="*Prochaine action prévue le :"
          inputName="notification_date"
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

NextActionModal.defaultProps = {
  formData: [],
  information: [],
};

export default NextActionModal;