// === REACT DOM === //
import { createPortal } from 'react-dom';

// === REDUX HOOKS === //
import { useAppSelector, useAppDispatch } from '../../hooks/redux';

// === REDUCERS === //
import { showCreateSectorModal, hideDeleteConfirmationModal } from '../../store/reducers/modal';

// === COMPONENTS === //
import AddButton from '../../components/common/Buttons/AddButton';
import SectorCard from '../../components/layout/Cards/SectorCard';
import CreateSectorModal from '../../components/Modals/CreateSectorModal/CreateSectorModal';
import DeleteModal from '../../components/Modals/DeleteModal/DeleteModal';
import InfoBubble from '../../components/common/Buttons/InfoBubble';

// === ASSETS === //
import loaderSVG from '../../assets/loader/tail-spin.svg';

export default function SectorManager() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const sectorState = useAppSelector((state) => state.sector);
  const { data: sectors, loading } = sectorState;

  const modalState = useAppSelector((state) => state.modal);
  const {
    isCreateSectorModalOpen: createSectorModal,
    isDeleteConfirmationOpen: deleteModal,
  } = modalState;

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-10 mb-5">Sector Manager</h1>

      <section className="min-h-[50vh] p-4 my-5 overflow-x-hidden rounded-lg shadow-custom bg-secondary-50 relative">
        <InfoBubble position='bottom-left' content='Si possible, veillez à ce que chaque négociateur gère un secteur.' containerClassname='absolute top-2 right-2' />
        <h2>Secteurs</h2>

        {/* CREATE SECTOR BUTTON (component possible) */}
        <AddButton onClickMethod={() => dispatch(showCreateSectorModal())} content='Ajouter un secteur' />

        {loading && sectors.length ? (
          <img src={loaderSVG} alt="Loader" className="block m-auto" />
        ) : (
          sectors.map((sector) => <SectorCard key={sector.id} {...sector} />)
        )}

        {!sectors.length && (
          <p className="text-lg font-semibold text-center">
            Pas encore de secteur...
          </p>
        )}
      </section>
      {/* DISPLAY CREATE SECTOR MODAL */}
      {createSectorModal && createPortal(<CreateSectorModal />, document.body)}
            {/* DISPLAY DELETE MODAL */}
            {deleteModal &&
        createPortal(
          <DeleteModal
            deleteSect
            closeModal={() => dispatch(hideDeleteConfirmationModal())}
            content="Vous êtes sur le point de supprimer définitivement un secteur, confirmez-vous la supression ?"
          />,
          document.body
        )}
    </>
  );
}
