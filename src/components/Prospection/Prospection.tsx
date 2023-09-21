// Components
import NavBar from '../NavBar/NavBar';
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';

// Assets
import logo from '../../assets/logo.svg';
import search from '../../assets/icons/search.svg';

export default function Prospection() {
  return (
    <div className="flex min-w-full">
      <NavBar />
      <main className="m-5 grow">
        <img src={logo} alt="Logo Immo'Pros" />
        <h1 className="mt-20 text-xl font-semibold text-center font-poppins">
          Informations de prospection
        </h1>
        <fieldset className="relative z-0 block mx-auto my-3 w-fit">
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

        <ProspectionInformation />
        <ProspectionInformation />
        <ProspectionInformation />
      </main>
    </div>
  );
}
