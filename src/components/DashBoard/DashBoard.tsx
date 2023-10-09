// Component
import DonutInfoCollaborator from './DonutInfoCollaborator/DonutInfoCollaborator';
import DonutInfoSector from './DonutInfoSector/DonutInfoSector';
import StatsForm from './StatsForm/StatsForm';
import BarInfoInterval from './BarInfoInterval/BarInfoInterval';

export default function DashBoard() {

  return (
    <>
      <h1 className="mt-20 mb-2 lg:mt-2">Dashboard</h1>

      <div className="flex flex-col justify-around lg:gap-6 lg:items-start lg:flex-row">
        <section className="p-8 mx-2 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50 lg:w-[30%] xl:w-[25%]">
          <h2 className="mb-4">Nombre d&apos;informations par secteur</h2>

          <DonutInfoSector />
        </section>
        <section className="p-8 mx-2 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50 lg:w-[30%] xl:w-[25%]">
          <h2 className="mb-4">Nombre d&apos;informations par collaborateur</h2>

          <DonutInfoCollaborator />
        </section>
      </div>
      <section className="p-8 mx-2 my-5 rounded-lg bg-secondary-50 shadow-custom">
        <h2>Nombre d&apos;informations par interval et par collaborateur</h2>
        <StatsForm />

        <BarInfoInterval />
        
      </section>
    </>
  );
}
