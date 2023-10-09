// React
import { useEffect } from 'react';

// Library
import dayjs from 'dayjs';

// Redux
import { useAppDispatch } from '../../hooks/redux';

// reducer
import { infoBySector, infoByCollaborator, infoWithInterval } from '../../store/reducers/stats';

// Component
import DonutInfoCollaborator from './DonutInfoCollaborator/DonutInfoCollaborator';
import DonutInfoSector from './DonutInfoSector/DonutInfoSector';
import StatsForm from './StatsForm/StatsForm';
import BarInfoInterval from './BarInfoInterval/BarInfoInterval';

// Utils
import getFormatedFullDate from '../../utils/getFormatedFullDate';

export default function DashBoard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(infoBySector());
    dispatch(infoByCollaborator());
    dispatch(
      infoWithInterval({
        formValues: {
          firstDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
          secondDate: getFormatedFullDate(),
        },
      })
    );
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-col items-center justify-around sm:items-start lg:gap-6 lg:flex-row">
        <section className="p-8 mx-2 my-5 overflow-x-hidden xl:my-0 rounded-lg shadow-custom bg-secondary-50 w-[90vw] sm:w-[60vw] lg:w-[30%] xl:w-[45%]">
          <h2 className="mb-4">Nombre d&apos;informations par secteur</h2>

          <DonutInfoSector />
        </section>
        <section className="p-8 mx-2 my-5 overflow-x-hidden xl:my-0 rounded-lg shadow-custom bg-secondary-50 sm:w-[60vw] w-[90vw] lg:w-[30%] xl:w-[45%]">
          <h2 className="mb-4">Nombre d&apos;informations par collaborateur</h2>

          <DonutInfoCollaborator />
        </section>
      </div>
      <section className="p-8 my-5 rounded-lg w-[90vw] md:w-[70vw] bg-secondary-50 shadow-custom mx-auto">
        <h2>Nombre d&apos;informations par interval et par collaborateur</h2>
        <StatsForm />

        <BarInfoInterval />
      </section>
    </>
  );
}
