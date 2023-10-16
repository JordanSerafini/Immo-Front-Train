// === REACT === //
import { useState } from 'react';

// === REACT ROUTER DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import {
  showAddInfoModal,
  hideDeleteConfirmationModal,
} from '../../store/reducers/modal';

// === COMPONENTS === //
// Common
import SearchInput from '../../components/common/Inputs/SearchInput';
import LayoutButton from '../../components/common/Buttons/LayoutButton';
import AddInfoButton from '../../components/common/Buttons/AddInfoButton';
// Layout
import ActionSection from '../../components/layout/Sections/ActionSection';
import InformationCard from '../../components/layout/Cards/InformationCard';
import ActionToDoCard from '../../components/layout/Cards/ActionToDoCard';
import UpcomingActionCard from '../../components/layout/Cards/UpcomingActionCard';
// Modal
import AddInfoModal from '../../components/Modals/AddInfoModal/AddInfoModal';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';

import Loader from '../../components/common/Loader/Loader';

// === ASSETS === //
import { actionToDoIcon, upcomingActionIcon } from '../../assets';

// === TYPESCRIPT === //
import { Information } from '../../@types/information';

// === UTILS === //
import filteredActionToDo from '../../utils/filteredActionToDo';
import filteredUpcomingAction from '../../utils/filteredUpcomingAction';

export default function Prospection() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const informationState = useAppSelector((state) => state.information);
  const {filteredInformations, loading, data: informations} = informationState

  const modalState = useAppSelector((state) => state.modal);
  const {isAddInfoModalOpen, isDeleteConfirmationOpen} = modalState

  // === LOCAL STATES === //
  const [layout, setLayout] = useState<boolean>(false);

  if (loading) {
    return <Loader className="absolute w-[50px] left-1/2 top-1/4 z-30" />;
  }

  // === VARIABLES === //
  const actionToDo = filteredActionToDo(informations);
  const upcomingAction = filteredUpcomingAction(informations);

  return (
    <>
      {/* SECTIONS for ActionToDo & UpcomingAction */}
      <div className="hidden grid-cols-2 lg:grid gap-x-10">
        {/* ACTION TO DO SECTION */}
        <ActionSection
          nbrOfActionsToDo={actionToDo.length}
          icon={actionToDoIcon}
          title="Actions à faire"
        >
          {actionToDo.length ? (
            actionToDo.map((information) => (
              <ActionToDoCard key={information.id} {...information} />
            ))
          ) : (
            <em>
              Il n&apos;y a aucune action à faire pour le moment...
            </em>
          )}
        </ActionSection>

        {/* UPCOMING ACTIONS SECTION */}
        <ActionSection icon={upcomingActionIcon} title="Actions à venir">
          {upcomingAction.length ? (
            upcomingAction.map((information) => (
              <UpcomingActionCard key={information.id} {...information} />
            ))
          ) : (
            <em>
              Il n&apos;y a aucune action à venir pour le moment...
            </em>
          )}
        </ActionSection>
      </div>

      {/* TITLE */}
      <h1 className="mt-10">Informations de prospection</h1>

      <SearchInput />

      {/* BUTTON GROUP */}
      <div className="flex items-center justify-between">
        <AddInfoButton onClickMethod={() => dispatch(showAddInfoModal())} />
        <LayoutButton state={layout} handleMethod={setLayout} />
      </div>

      {/* PROSPECTION INFORMATIONS */}
      <section
        className={`grid gap-x-10 ${
          layout ? 'lg:grid-cols-1' : 'lg:grid-cols-2'
        }`}
      >
        {filteredInformations.map((information: Information) => (
          <InformationCard key={information.id} {...information} />
        ))}

        {!filteredInformations.length && (
          <p className="col-span-2 text-lg font-semibold text-center">
            Pas d&apos;information...
          </p>
        )}
      </section>
      
      {/* DISPLAY ADD INFO MODAL */}
      {isAddInfoModalOpen && createPortal(<AddInfoModal />, document.body)}
      {/* DISPLAY DELETE MODAL */}
      {isDeleteConfirmationOpen &&
        createPortal(
          <DeleteModal
            deleteInfo
            closeModal={() => dispatch(hideDeleteConfirmationModal())}
            content="Vous êtes sur le point de supprimer définitivement une information de prospection, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
