// Asset
import appartment from '../../../assets/icons/apartment.svg';

export default function ProspectionInformation() {
  return (
    <article className="p-4 my-10 lg:my-2 rounded-lg shadow-custom bg-secondary-50 lg:w-[49%]">
      
      <div className='flex flex-col gap-2'>
      <img src={appartment} alt="Apartment logo" className='w-8' />
      <p className='font-roboto'>123, rue de Paris 95380 LOUVRES</p>
      <p>Consorts RIOU</p>
      <strong className='text-lg font-bold text-accent-400'>A vendre</strong>
      </div>

      <div className='flex justify-between mt-5'>
        <button type='button' className='px-6 py-2 rounded-lg text-secondary-50 bg-primary-300 font-poppins'>Voir Plus</button>
        <button type='button' className='px-6 py-2 font-semibold border-2 rounded-lg text-secondary-900 border-accent-400 font-poppins'>Supprimer</button>
      </div>
    </article>
  );
}
