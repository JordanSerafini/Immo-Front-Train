// === COMPONENTS === //
import DonutInfoCollaborator from '../../components/features/ChartJS/Donuts/DonutInfoCollaborator';
import DonutInfoSector from '../../components/features/ChartJS/Donuts/DonutInfoSector';
import StatsForm from '../../components/features/ChartJS/Bars/Forms/StatsForm';
import BarInfoInterval from '../../components/features/ChartJS/Bars/BarInfoInterval';
import InfoBubble from '../../components/common/Buttons/InfoBubble';

export default function DashBoard() {
  return (
    <>
      <div className="flex flex-col items-center justify-around sm:items-start lg:gap-6 lg:flex-row">
        <section className="p-8 mx-2 my-5 overflow-x-hidden xl:my-0 rounded-lg shadow-custom bg-secondary-50 w-[90vw] sm:w-[60vw] lg:w-[30%] xl:w-[45%]">
          <h2 className="mb-4">Nombre d&apos;informations par secteur</h2>

          <DonutInfoSector />
        </section>
        <section className="p-8 mx-2 my-5 overflow-x-hidden xl:my-0 rounded-lg shadow-custom bg-secondary-50 sm:w-[60vw] w-[90vw] lg:w-[30%] xl:w-[45%] relative">
          <InfoBubble
            position="bottom-left"
            content="Les couleurs sont générées aléatoirement à chaque chargement"
            containerClassname="absolute top-2 right-2"
          />
          <h2 className="mb-4">Nombre d&apos;informations par collaborateur</h2>

          <DonutInfoCollaborator />
        </section>
      </div>
      <section className="p-8 my-5 rounded-lg w-[90vw] md:w-[70vw] bg-secondary-50 shadow-custom mx-auto relative">
        <InfoBubble
          position="bottom-left"
          content="Les couleurs sont générées aléatoirement à chaque chargement"
          containerClassname="absolute top-2 right-2"
        />
        <h2>Nombre d&apos;informations par interval et par collaborateur</h2>
        <StatsForm />

        <BarInfoInterval />
      </section>
    </>
  );
}
