// Library
import DonutInfoCollaborator from './DonutInfoCollaborator/DonutInfoCollaborator';
import DonutInfoSector from './DonutInfoSector/DonutInfoSector';
import BarChartDateComponent from './ChartsBarDateDashboard';


export default function DashBoard() {
  return (
    <>
      <h1 className="mt-20 mb-5 lg:mt-10">Dashboard</h1>

      <div className='flex flex-col gap-2 lg:flex-row'>
        <section className="p-8 mx-2 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50">
          <h2 className="mb-4">Nombre d&apos;informations par secteur</h2>

          <DonutInfoSector />

        </section>
        <section className="p-8 my-5 mx-2 overflow-x-hidden rounded-lg min-h-[40vh] shadow-custom bg-secondary-50">
          <h2 className="mb-4">Nombre d&apos;informations par collaborateur</h2>

          <DonutInfoCollaborator />

        </section>
      </div>
    </>
  );
}
