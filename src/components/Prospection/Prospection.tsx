// React Router
import { Link } from 'react-router-dom';

// Components
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import NavBar from '../NavBar/NavBar';

// Assets
import logo from '../../assets/logo.svg';
import search from '../../assets/icons/search.svg';
import plus from '../../assets/icons/plus.svg';

export default function Prospection() {
  return (
    <>
      <NavBar />
      <main className="m-5 grow">
        <Link to="/">
          <img src={logo} alt="Logo Immo'Pros" className="sm:hidden" />
        </Link>
        <h1 className="mt-20 text-xl font-semibold text-center font-poppins md:text-3xl">
          Informations de prospection
        </h1>
        <fieldset className="relative z-0 block mx-auto mt-3 mb-6 w-fit">
          <input
            className="py-2 pl-10 rounded-lg w-72 shadow-custom font-poppins"
            type="text"
            placeholder="Effectuer votre recherche..."
          />
          <button
            type="button"
            className="absolute left-2 top-1/2 translate-y-[-50%]"
          >
            <img src={search} alt="Search icon" />
          </button>
        </fieldset>

        <button
          type="button"
          className="fixed flex items-center justify-center w-12 p-1 duration-300 rounded-full aspect-square bg-primary-300 hover:shadow-primary hover:scale-110 bottom-7 right-10 sm:static sm:rounded-lg sm:aspect-auto sm:mb-4 sm:pr-4 sm:w-fit sm:p-2"
        >
          <img src={plus} alt="Add Info Button Icon" className="w-full sm:w-[30px]" />
          <span className="hidden text-secondary-50 font-poppins sm:inline">Ajouter une information</span>
        </button>

        <div className="flex-wrap justify-between pb-2 lg:flex">
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
        </div>
      </main>
    </>
  );
}
