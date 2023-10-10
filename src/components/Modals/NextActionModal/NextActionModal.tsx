// React
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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
import ValidButton from '../../common/Buttons/ValidButton';
import Input from '../AddInfoModal/Field/Input';

// Utils
import getFormatedFullDate from '../../../utils/getFormatedFullDate';

// Typescript interface
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

dayjs.extend(utc);
dayjs.extend(timezone);

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
  const collaborator = useAppSelector((state) => state.collaborator.user);

  // Methods
  const closeAllModal = () => {
    const formatedNotifDate = dayjs
      .utc(nextActionDate)
      .tz('Europe/Paris')
      .toISOString();

    const formatedDate = dayjs
    .utc(getFormatedFullDate())
    .tz("Europe/Paris")
    .toISOString()

    const infoData = {
      ...(formData as Information),
      // We could remove type and category to lowercase
      type: formData?.type?.toLowerCase() as string,
      category: formData?.category?.toLowerCase() as string,
      date: formatedDate,
      notification_date: formatedNotifDate,
      collaborator_id: collaborator.id as number,
      // CHANGE SECTOR
      sector_id: collaborator.sector_id || 3,
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
      dispatch(createProspectionAction({ formData: formValues }));
      dispatch(
        updateInformation({
          ...information,
          notification_date: formatedNotifDate,
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
      <div className="flex flex-col max-w-[450px] gap-6 p-2 mt-8">
        <Input
          type="date"
          value={nextActionDate}
          onChange={setNextActionDate}
          placeholder="jj / mm / dddd"
          label="*Prochaine action prévue le :"
          inputName="notification_date"
          regExp={/^\d{4}-\d{2}-\d{2}$/}
          className="w-full"
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
