// Assets
import pencilIcon from '../../../assets/icons/edit-pencil.svg';

// Typescript interface
import { Sector } from '../../../@types/sector';

export default function SectorCard({ city, code_zip, color_code }: Sector) {
  return (
    <article className="grid justify-around grid-cols-4 gap-8 p-5 my-5 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col items-center gap-4">
        <h3>Ville</h3>
        <p>{city.toUpperCase()}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3>Code Postal</h3>
        <p>{code_zip}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="flex gap-2">
          Attribué à <img src={pencilIcon} alt="Pencil Icon" />
        </h3>
        <p>Amandine LEROUX</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="flex gap-2">
          Couleur <img src={pencilIcon} alt="Pencil Icon" />
        </h3>
        <div className='w-[50px] aspect-square rounded-full shadow-custom' style={{ backgroundColor: color_code }}/>
      </div>
    </article>
  );
}
