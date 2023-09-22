// Components
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

// Asset
import appartment from '../../../assets/icons/apartment.svg';

export default function ProspectionInformation({deleteHandler}: {deleteHandler: () => void}) {
  return (
    <article className="p-4 mb-5 rounded-lg lg:my-2 shadow-custom bg-secondary-50 lg:w-[48%]">
      <div className="flex flex-col gap-2">
        <img src={appartment} alt="Apartment logo" className="w-8" />
        <p className="font-bold">123, rue de Paris 95380 LOUVRES</p>
        <p className="font-bold">Consorts RIOU</p>
        <strong className="text-lg font-bold md:text-xl text-accent-400">
          A vendre
        </strong>
      </div>

      <div className="flex justify-between mt-5">
        <ValidButton content="Voir plus" />
        <CancelButton content="Supprimer" onClickMethod={deleteHandler}/>
      </div>
    </article>
  );
}
