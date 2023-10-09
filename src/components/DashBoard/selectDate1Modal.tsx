// React
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// Store
import {
  hideAddInfoModal,
  hideCancelConfirmationModal,
  hideNextActionModal,
} from '../../../store/reducers/modal';
import { createProspectionAction } from '../../../store/reducers/action';

// Components
import Modal from '../Modal';
import ValidButton from '../../components/SharedComponents/Buttons/ValidButton'
import Input from '../AddInfoModal/Field/Input';

// Utils
import getFormatedFullDate from '../../../utils/getFormatedFullDate';

// Typescript interface
import { Information } from '../../../@types/information';
import { Action } from '../../../@types/action';

dayjs.extend(utc);

function chooseDate1Modal{
    // Hook Execution Order
  const dispatch = useAppDispatch();

  
    dispatch(hideNextActionModal());


  return (
      <Modal>
        <div className="flex flex-col min-w-[300px] max-w-[450px] gap-6 p-2 mt-8">
          <Input
            type="date"
            value={date1}
            onChange={setDate1}
            placeholder="jj / mm / dddd"
            label="Date de départ du calcul :"
            inputName="date1"
            regExp={/^\d{4}-\d{2}-\d{2}$/}
            isRequired
          />
          <ValidButton
            className="block m-auto"
            content="Choisir la deuxième date"
            onClickMethod={closeAllModal}
          />
        </div>
      </Modal>
    );

  }
export default chooseDate1Modal;
