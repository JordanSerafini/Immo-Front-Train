// Components
import NavBar from '../NavBar/NavBar';

// Assets
import logo from '../../assets/logo.svg';
import search from '../../assets/icons/search.svg';

export default function Prospection() {
  return (
    <div className="flex w-screen h-screen">
      <NavBar />
      <main className="m-5 grow">
        <img src={logo} alt="Logo Immo'Pros" />
        <h1 className="mt-20 text-xl font-semibold text-center font-poppins">
          Informations de prospection
        </h1>
        <fieldset className='relative'>
          <input type="text" placeholder="Effectuer votre recherche..." />
        </fieldset>
      </main>
    </div>
  );
}
