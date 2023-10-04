// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Reducer
import {
  showCreateAccountModal,
} from '../../store/reducers/modal';

// Components
import SectorCard from './SectorCard/SectorCard';

// Assets
import plusIcon from '../../assets/icons/plus.svg';
import loaderSVG from '../../assets/loader/tail-spin.svg';

export default function SectorManager() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const sectors = useAppSelector((state) => state.sector.data);
  const isSectorsLoading = useAppSelector((state) => state.sector.loading);


  // Handle Methods
  const handleCreateSectorrClick = () => {
    dispatch(showCreateAccountModal());
  };

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-20 mb-5 lg:mt-10">Sector Manager</h1>

      <section className="min-h-screen p-4 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50">
        <h2>Secteurs</h2>

        {/* CREATE SECTOR BUTTON (component possible) */}
        <button
          onClick={handleCreateSectorrClick}
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2 my-3 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110"
        >
          <img src={plusIcon} alt="Add Info Button Icon" className="w-[30px]" />
          <span className="text-secondary-50 font-poppins">
            Ajouter un secteur
          </span>
        </button>

        {isSectorsLoading ? (
          <img src={loaderSVG} alt="Loader" className="block m-auto" />
        ) : (
          sectors.map((sector) => <SectorCard key={sector.id} {...sector} />)
        )}
      </section>

    </>
  );
}
