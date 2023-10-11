// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import dayjs from 'dayjs';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../../hooks/redux';

// === COMPONENTS === //
import Input from '../../../../common/Inputs/Input';
import ValidButton from '../../../../common/Buttons/ValidButton';

// === UTILS === //
import getFormatedFullDate from '../../../../../utils/getFormatedFullDate';
import getFormatedDayjsDate from '../../../../../utils/getFormatedDayjsDate';
import { infoWithInterval } from '../../../../../store/reducers/stats';

export default function StatsForm() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === CONTROLLED INPUT STATES === //
  const [firstDate, setFirstDate] = useState<string>(
    dayjs().subtract(6, 'month').format('YYYY-MM-DD')
  );
  const [secondDate, setSecondDate] = useState<string>(getFormatedFullDate());

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      firstDate: getFormatedDayjsDate(firstDate),
      secondDate: getFormatedDayjsDate(secondDate),
    };

    dispatch(infoWithInterval({ formValues }));
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 mt-8">
      <Input
        type="date"
        value={firstDate}
        onChange={setFirstDate}
        placeholder="jj / mm / dddd"
        label="Du :"
        inputName="date1"
        containerClassName="col-span-2"
        isRequired
      />

      <Input
        type="date"
        value={secondDate}
        onChange={setSecondDate}
        placeholder="jj / mm / dddd"
        label="Au :"
        inputName="date2"
        containerClassName="col-span-2"
        isRequired
      />
      <ValidButton
        className="col-start-5 col-end-7 xl:col-start-6"
        content="Calculer"
        isSubmit
      />
    </form>
  );
}
