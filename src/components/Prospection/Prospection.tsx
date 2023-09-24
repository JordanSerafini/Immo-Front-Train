// React Router
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  showAddInfoModal,
  hideAddInfoModal,
  hideCancelConfirmationModal,
} from '../../store/reducers/modal';

// Components
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import NavBar from '../NavBar/NavBar';
import ActionSection from './ActionSection/ActionSection';
import SearchInput from './SearchInput/SearchInput';
import AddInfoModal from '../Modals/AddInfoModal/AddInfoModal';
import CancelModal from '../Modals/CancelModal/CancelModal';

import CardActionToDo from '../ActionToDo/CardActionToDo/CardActionToDo';
import CardUpcomingAction from '../UpcomingAction/CardUpcomingAction/CardUpcomingAction';

// Assets
import logo from '../../assets/logo.svg';
import plus from '../../assets/icons/plus.svg';
import actionToDo from '../../assets/icons/action-to-do.svg';
import upcomingAction from '../../assets/icons/upcoming-action.svg';

export default function Prospection() {
  const dispatch = useAppDispatch();
  const infoModal = useAppSelector((state) => state.modal.isAddInfoModalOpen);
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );

  const handleAddInfoClick = () => {
    dispatch(showAddInfoModal());
  };

  return (
    <>
      <NavBar />
      <main className="m-10 grow">
        {/* LOGO */}
        <Link to="/app/prospection">
          <img src={logo} alt="Logo Immo'Pros" className="sm:hidden" />
        </Link>

        {/* SECTIONS for ActionToDo & UpcomingAction */}
        <div className="hidden grid-cols-2 lg:grid gap-x-10">
          <ActionSection icon={actionToDo} title="Actions à faire">
            <>
              <CardActionToDo
                address="5, rue de la Liberté 95190 GOUSSAINVILLE"
                owner="Mr et Mme AKHTAR"
                type="maison"
              />
              <CardActionToDo
                address="25, boulevard Roger Salengro 95190 GOUSSAINVILLE"
                owner="Mr et Mme DUCHAUFFOUR"
                type="maison"
              />
              <CardActionToDo
                address="12, rue du Montoir Saint-Nicolas 95190 FONTENAY-EN-PARISIS"
                owner="Mr VIFFRY"
                type="appartement"
              />
              <CardActionToDo
                address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
                owner="Mr ALCARAZ"
                type="terrain"
              />
            </>
          </ActionSection>

          <ActionSection icon={upcomingAction} title="Actions à venir">
            <>
              <CardUpcomingAction
                address="5, rue de la Liberté 95190 GOUSSAINVILLE"
                owner="Mr et Mme AKHTAR"
                type="maison"
                notificationDate="20/02/2023"
              />
              <CardUpcomingAction
                address="25, boulevard Roger Salengro 95190 GOUSSAINVILLE"
                owner="Mr et Mme DUCHAUFFOUR"
                type="maison"
                notificationDate="22/02/2023"
              />
              <CardUpcomingAction
                address="12, rue du Montoir Saint-Nicolas 95190 FONTENAY-EN-PARISIS"
                owner="Mr VIFFRY"
                type="appartement"
                notificationDate="25/02/2023"
              />
              <CardUpcomingAction
                address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
                owner="Mr ALCARAZ"
                type="terrain"
                notificationDate="02/03/2023"
              />
              <CardUpcomingAction
                address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
                owner="Mr ALCARAZ"
                type="terrain"
                notificationDate="02/03/2023"
              />
              <CardUpcomingAction
                address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
                owner="Mr ALCARAZ"
                type="terrain"
                notificationDate="02/03/2023"
              />
            </>
          </ActionSection>
        </div>

        {/* TITLE */}
        <h1 className="mt-20 text-xl font-semibold text-center font-poppins md:text-3xl lg:mt-10">
          Informations de prospection
        </h1>

        <SearchInput />

        {/* ADD INFO BUTTON (component possible) */}
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

        <section className="grid gap-x-10 lg:grid-cols-2">
          <ProspectionInformation
            address="123, rue de Paris 95380 LOUVRES"
            owner="Consorts RIOU"
            type="appartement"
            category="à vendre"
          />
          <ProspectionInformation
            address="5, rue de la liberté 95190 GOUSSAINVILLE"
            owner="Mr ELHOU"
            type="maison"
            category="potentiellement à vendre"
          />
          <ProspectionInformation
            address="5, rue Aubin Olivier 95700 ROISSY-EN-FRANCE"
            owner="Consorts COTTIN"
            type="terrain"
            category="succession en cours"
          />
          <ProspectionInformation
            address="28, rue du Fromager 95500 LE THILLAY"
            owner="Mr ALVES"
            type="terrain"
            category="à vendre"
          />
          <ProspectionInformation
            address="198, avenue de la mer 95500 GONESSE"
            owner="Mr MOUSTILLON"
            type="maison"
            category="à vendre"
          />
          <ProspectionInformation
            address="19, rue du Pont 95380 LOUVRES"
            owner="Mr & Mme FLUTIER"
            type="appartement"
            category="potentiellement à vendre"
          />
        </section>
      </main>
      {infoModal &&
        createPortal(
          <AddInfoModal closeModal={() => dispatch(hideAddInfoModal())} />,
          document.body
        )}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() => dispatch(hideCancelConfirmationModal())}
          />,
          document.body
        )}
    </>
  );
}
