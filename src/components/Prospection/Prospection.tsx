// React
import { useEffect } from 'react';

// React Dom
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  showAddInfoModal,
  hideDeleteConfirmationModal,
} from '../../store/reducers/modal';
import { fetchInformations } from '../../store/reducers/informations';

// Components
import MainSection from '../SharedComponents/MainSection/MainSection';
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import ActionSection from './ActionSection/ActionSection';
import SearchInput from './SearchInput/SearchInput';
import AddInfoModal from '../Modals/AddInfoModal/AddInfoModal';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';

import CardActionToDo from '../ActionToDo/CardActionToDo/CardActionToDo';
import CardUpcomingAction from '../UpcomingAction/CardUpcomingAction/CardUpcomingAction';

// Assets
import plus from '../../assets/icons/plus.svg';
import actionToDoIcon from '../../assets/icons/action-to-do.svg';
import upcomingActionIcon from '../../assets/icons/upcoming-action.svg';
import loader from '../../assets/loader/tail-spin.svg';

// Typescript interface
import { Information } from '../../@types/information';

// utils
import filteredActionToDo from '../../utils/filteredActionToDo';
import filteredUpcomingAction from '../../utils/filteredUpcomingAction';

export default function Prospection() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux States
  const informations = useAppSelector(
    (state) => state.information.informations
  );
  const filteredInformations = useAppSelector((state) => state.information.filteredInformations)
  const isLoading = useAppSelector((state) => state.information.loading);
  const addInfoModal = useAppSelector(
    (state) => state.modal.isAddInfoModalOpen
  );
  const deleteModal = useAppSelector(
    (state) => state.modal.isDeleteConfirmationOpen
  );

  // UseEffects
  useEffect(() => {
    dispatch(fetchInformations());
  }, [dispatch]);

  // Methods
  const handleAddInfoClick = () => {
    dispatch(showAddInfoModal());
  };

  // Temporary, I think we could make it cleaner
  if (isLoading) {
    return (
      <MainSection>
        <img
          className="relative w-[50px] -left-1/2 -top-1/2"
          src={loader}
          alt="Loader"
        />
      </MainSection>
    );
  }

  const actionToDo = filteredActionToDo(informations);

  const upcomingAction = filteredUpcomingAction(informations);

  return (
    <>
      <MainSection>
        {/* SECTIONS for ActionToDo & UpcomingAction */}
        <div className="hidden grid-cols-2 lg:grid gap-x-10">
          <ActionSection icon={actionToDoIcon} title="Actions à faire">
            {actionToDo.map((information) => (
              <CardActionToDo key={information.id} {...information} />
            ))}
          </ActionSection>

          <ActionSection icon={upcomingActionIcon} title="Actions à venir">
            {upcomingAction.map((information) => (
              <CardUpcomingAction key={information.id} {...information} />
            ))}
          </ActionSection>
        </div>

        {/* TITLE */}
        <h1 className="mt-20 lg:mt-10">Informations de prospection</h1>

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

        {/* PROSPECTION INFORMATIONS */}
        <section className="grid gap-x-10 lg:grid-cols-2">
          {filteredInformations.map((information: Information) => (
            <ProspectionInformation key={information.id} {...information} />
          ))}
        </section>
      </MainSection>
      {/* DISPLAY ADD INFO MODAL */}
      {addInfoModal && createPortal(<AddInfoModal />, document.body)}
      {/* DISPLAY DELETE MODAL */}
      {deleteModal &&
        createPortal(
          <DeleteModal
            closeModal={() => dispatch(hideDeleteConfirmationModal())}
            content="Vous êtes sur le point de supprimer définitivement une information de prospection, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
