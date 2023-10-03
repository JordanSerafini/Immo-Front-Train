// Assets
import pencilIcon from '../../../assets/icons/edit-pencil.svg';

// Typescript interface
import { Sector } from '../../../@types/sector';

export default function SectorCard({ city, code_zip, color_code }: Sector) {
  return (
    <article className="grid items-center justify-center grid-cols-2 gap-8 p-5 my-5 rounded-lg lg:grid-cols-4 bg-secondary-50 shadow-custom">
      <div className="flex flex-col items-center gap-4">
        <h3>Ville</h3>
        <p className='text-center'>{city.toUpperCase()}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className='text-center'>Code Postal</h3>
        <p className='text-center'>{code_zip}</p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h3 className="flex gap-2 text-center">
          Attribué à <img src={pencilIcon} alt="Pencil Icon" />
        </h3>
        <p className='text-center'>Amandine LEROUX</p>
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
