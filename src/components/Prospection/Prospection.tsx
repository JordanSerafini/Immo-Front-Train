// React Router
import { Link } from 'react-router-dom';

// Components
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import NavBar from '../NavBar/NavBar';

// Assets
import logo from '../../assets/logo.svg';
import search from '../../assets/icons/search.svg';

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
        <div className="flex-wrap justify-between lg:flex">
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
