// React Router
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { showAddInfoModal, hideAddInfoModal } from '../../store/reducers/modal';

// Components
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import NavBar from '../NavBar/NavBar';
import ActionSection from './ActionSection/ActionSection';
import SearchInput from './SearchInput/SearchInput';
import AddInfoModal from '../Modals/AddInfoModal/AddInfoModal';

// Assets
import logo from '../../assets/logo.svg';
import plus from '../../assets/icons/plus.svg';
import actionToDo from '../../assets/icons/action-to-do.svg';
import upcomingAction from '../../assets/icons/upcoming-action.svg';

export default function Prospection() {
  const dispatch = useAppDispatch();
  const infoModal = useAppSelector((state) => state.modal.isAddInfoModalOpen)

  const handleAddInfoClick = () => {
    dispatch(showAddInfoModal())
  }

  return (
    <>
      <NavBar />
      <main className="m-10 grow">
        {infoModal && <p>Coucou</p>}
        <Link to="/app/prospection">
          <img src={logo} alt="Logo Immo'Pros" className="sm:hidden" />
        </Link>

        <div className="justify-between hidden lg:flex">
          <ActionSection icon={actionToDo} title="Actions à faire" />
          <ActionSection icon={upcomingAction} title="Actions à venir" />
        </div>

        <h1 className="mt-20 text-xl font-semibold text-center font-poppins md:text-3xl lg:mt-10">
          Informations de prospection
        </h1>
        
        <SearchInput />

        <button
          onClick={handleAddInfoClick}
          type="button"
          className="fixed flex items-center justify-center w-12 p-1 duration-300 rounded-full aspect-square bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110 bottom-7 right-10 sm:static sm:rounded-lg sm:aspect-auto sm:mb-4 sm:pr-4 sm:w-fit sm:p-2"
        >
          <img
            src={plus}
            alt="Add Info Button Icon"
            className="w-full sm:w-[30px]"
          />
          <span className="hidden text-secondary-50 font-poppins sm:inline">
            Ajouter une information
          </span>
        </button>

        <section className="flex-wrap justify-between pb-2 lg:flex">
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
          <ProspectionInformation />
        </section>
      </main>
      {infoModal && createPortal(
        <AddInfoModal closeModal={() => dispatch(hideAddInfoModal())}/>,
        document.body
      )}
    </>
  );
}
