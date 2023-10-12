// === REACT === //
import { FormEvent, useEffect, useRef, useState } from 'react';

// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import {
  createInformation,
  createInformationAndAction,
  updateInformation,
} from '../../../store/reducers/information';
import { hideAllModals } from '../../../store/reducers/modal';
import { createProspectionAction } from '../../../store/reducers/action';

// === COMPONENTS === //
import Modal from '../Modal';
import ValidButton from '../../common/Buttons/ValidButton';
import Input from '../../common/Inputs/Input';

// === TYPESCRIPT === //
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

// === UTILS === //
import getFormatedFullDate from '../../../utils/getFormatedFullDate';
import getFormatedDayjsDate from '../../../utils/getFormatedDayjsDate';

function NextActionModal({
  formData,
  withInfo,
  information,
}: {
  formData?: Information & Action;
  withInfo: boolean;
  information?: Information;
}) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // === REDUX STATES === //
  const collaborator = useAppSelector((state) => state.collaborator.user);

  // === CONTROLLED INPUT STATES === //
  const [nextActionDate, setNextActionDate] = useState<string>(
    getFormatedFullDate()
  );

    // === REACT REFS === //
    const focusRef = useRef<HTMLInputElement>(null);

  // === EFFECTS === //
  useEffect(() => {
    // We want to force the focus on the addressNumber input once the user opens the modal
    focusRef.current?.focus();
  }, []);

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formatedNotifDate = getFormatedDayjsDate(nextActionDate);
    const formatedDate = getFormatedDayjsDate(getFormatedFullDate());

    const infoData = {
      ...(formData as Information),
      date: formatedDate,
      notification_date: formatedNotifDate,
      collaborator_id: collaborator.id as number,
      // If the collaborator doesn't have a sector, we'll set it to 1.
      // We should think about setting a "Free sector" or "Other sectors" with its id to make it cleaner and logic
      sector_id: collaborator.sector_id || 1,
    };

    // If there's an Information to create AND an action to create (formData.description)
    if (withInfo && formData && formData.description) {
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
        date: formatedDate,
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
    dispatch(hideAllModals());
  };

  return (
    <Modal notClosable>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-[450px] gap-6 p-2 mt-8"
      >
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
          inputRef={focusRef}
        />
        <ValidButton className="block m-auto" content="Finaliser" isSubmit />
      </form>
    </Modal>
  );
}

NextActionModal.defaultProps = {
  formData: [],
  information: [],
};

export default NextActionModal;
