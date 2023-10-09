// React
import { useState } from 'react';

// React Dom
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  showAddInfoModal,
  hideDeleteConfirmationModal,
} from '../../store/reducers/modal';

// Components
import ProspectionInformation from './ProspectionInformation/ProspectionInformation';
import ActionSection from './ActionSection/ActionSection';
import SearchInput from './SearchInput/SearchInput';
import AddInfoModal from '../Modals/AddInfoModal/AddInfoModal';
import DeleteModal from '../Modals/DeleteModal/DeleteModal';
import LayoutButton from './LayoutButton/LayoutButton';

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

  // Local State
  const [layout, setLayout] = useState<boolean>(false);

  // Redux States
  const informations = useAppSelector((state) => state.information.data);
  const filteredInformations = useAppSelector(
    (state) => state.information.filteredInformations
  );
  const isLoading = useAppSelector((state) => state.information.loading);
  const addInfoModal = useAppSelector(
    (state) => state.modal.isAddInfoModalOpen
  );
  const deleteModal = useAppSelector(
    (state) => state.modal.isDeleteConfirmationOpen
  );

  // Methods
  const handleAddInfoClick = () => {
    dispatch(showAddInfoModal());
  };

  // Temporary, I think we could make it cleaner
  if (isLoading) {
    return (
      <img
        className="absolute w-[50px] left-1/2 top-1/4 z-30"
        src={loader}
        alt="Loader"
      />
    );
  }

  const actionToDo = filteredActionToDo(informations);

  const upcomingAction = filteredUpcomingAction(informations);

  return (
    <>
      {/* SECTIONS for ActionToDo & UpcomingAction */}
      <div className="hidden grid-cols-2 lg:grid gap-x-10">
        <ActionSection
          nbrOfActionsToDo={actionToDo.length}
          icon={actionToDoIcon}
          title="Actions à faire"
        >
          {actionToDo.length  ? (
            actionToDo.map((information) => (
              <CardActionToDo key={information.id} {...information} />
            ))
          ) : (
            <p className="italic">
              Il n&apos;y a aucune action à faire pour le moment...
            </p>
          )}
        </ActionSection>

        <ActionSection icon={upcomingActionIcon} title="Actions à venir">
          {upcomingAction.length ? (
            upcomingAction.map((information) => (
              <CardUpcomingAction key={information.id} {...information} />
            ))
          ) : (
            <p className="italic">
              Il n&apos;y a aucune action à venir pour le moment...
            </p>
          )}
        </ActionSection>
      </div>

      {/* TITLE */}
      <h1 className="mt-10">Informations de prospection</h1>

      <SearchInput />

      {/* ADD INFO BUTTON (component possible) */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleAddInfoClick}
          type="button"
          className="fixed z-20 flex items-center justify-center w-12 p-1 duration-300 rounded-full aspect-square bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110 bottom-[10vh] right-5 sm:static sm:rounded-lg sm:aspect-auto sm:mb-4 sm:pr-4 sm:w-fit sm:p-2"
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

        <LayoutButton state={layout} handleMethod={setLayout} />
      </div>

      {/* PROSPECTION INFORMATIONS */}
      <section className={`grid gap-x-10 ${layout ? "lg:grid-cols-1" : "lg:grid-cols-2"}`}>
        {filteredInformations.map((information: Information) => (
          <ProspectionInformation key={information.id} {...information} />
        ))}

        {!filteredInformations.length && (
          <p className="col-span-2 text-lg font-semibold text-center">
            Pas d&apos;information...
          </p>
        )}
      </section>
      {/* DISPLAY ADD INFO MODAL */}
      {addInfoModal && createPortal(<AddInfoModal />, document.body)}
      {/* DISPLAY DELETE MODAL */}
      {deleteModal &&
        createPortal(
          <DeleteModal
            deleteUser={false}
            closeModal={() => dispatch(hideDeleteConfirmationModal())}
            content="Vous êtes sur le point de supprimer définitivement une information de prospection, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
