// React
import { FormEvent, useState } from 'react';

// Library
import dayjs from 'dayjs';

// Redux
import { useAppDispatch } from '../../../../../hooks/redux';

// Shared Component
import Input from '../../../../common/Inputs/Input';
import ValidButton from '../../../../common/Buttons/ValidButton';

// Utils
import getFormatedFullDate from '../../../../../utils/getFormatedFullDate';
import { infoWithInterval } from '../../../../../store/reducers/stats';

export default function StatsForm() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local states
  const [firstDate, setFirstDate] = useState<string>(
    dayjs().subtract(6, 'month').format('YYYY-MM-DD')
  );
  const [secondDate, setSecondDate] = useState<string>(getFormatedFullDate());

  // Handler
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      firstDate: dayjs.utc(firstDate).tz('Europe/Paris').toISOString(),
      secondDate: dayjs.utc(secondDate).tz('Europe/Paris').toISOString(),
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
