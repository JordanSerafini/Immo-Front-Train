// React
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

import {
  createInformation,
  createInformationAndAction,
  updateInformation,
} from '../../../store/reducers/information';

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
import getFormatedFullDate from '../../../utils/getFormatedFullDate';

// Typescript interface
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

dayjs.extend(utc);

function NextActionModal({
  formData,
  withInfo,
  information,
}: {
  formData?: Information & Action;
  withInfo: boolean;
  information?: Information;
}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local States
  const [nextActionDate, setNextActionDate] = useState<string>(
    getFormatedFullDate()
  );

  // Redux state
  const collaboratorId = useAppSelector((state) => state.collaborator.user.id);

  // Methods
  const closeAllModal = () => {
    const infoData = {
      ...(formData as Information),
      type: formData?.type?.toLowerCase() as string,
      category: formData?.category?.toLowerCase() as string,
      notification_date: dayjs(nextActionDate).utc().toISOString(),
      collaborator_id: collaboratorId as number,
      date: dayjs().toISOString(),
      sector_id: 1,
    };

    // If there's an Information to create AND an action to create
    if (
      withInfo &&
      formData &&
      formData.description &&
      formData.description.length
    ) {
      dispatch(
        createInformationAndAction({
          formData: infoData as Information & Action,
        })
      );
    } else if (withInfo && formData) {
      // Else if there's an Information to create WITHOUT an action to create
      dispatch(createInformation({ formData: infoData }));
    } else if (!withInfo && information) {
      // Else if there's not an Information to create
      const formValues = {
        id: formData?.information_id as number,
        description: formData?.description as string,
        information_id: formData?.information_id as number,
        date: getFormatedFullDate(),
      };
      // Type problem
      dispatch(createProspectionAction({ formData: formValues }));
      dispatch(
        updateInformation({
          ...information,
          notification_date: dayjs(nextActionDate).utc().toISOString(),
        })
      );
    }

    navigate('/app/prospection');

    dispatch(hideAddInfoModal());
    dispatch(hideCancelConfirmationModal());
    dispatch(hideNextActionModal());
  };

  return (
    <Modal>
      <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2 mt-8">
        <Input
          type="date"
          value={nextActionDate}
          onChange={setNextActionDate}
          placeholder="jj / mm / dddd"
          label="*Prochaine action prévue le :"
          inputName="notification_date"
          regExp={/^\d{4}-\d{2}-\d{2}$/}
          isRequired
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
