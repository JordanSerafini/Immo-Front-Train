// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import CollabCard from './CollabCard/CollabCard';
import SectorCard from './SectorCard/SectorCard';

// Assets
import plusIcon from '../../assets/icons/plus.svg';
import loaderSVG from '../../assets/loader/tail-spin.svg';

export default function Panel() {
  // Redux states
  const collaborators = useAppSelector((state) => state.collaborator.data);
  const sectors = useAppSelector((state) => state.sector.data);

  const isCollaboratorsLoading = useAppSelector(
    (state) => state.collaborator.loading
  );
  const isSectorsLoading = useAppSelector((state) => state.sector.loading);

  // Handle Methods
  const handleCreateCollaboratorClick = () => {
    console.log('click add collab');
  };

  return (
    <>
      {/* TITLE */}
      <h1 className="mt-20 mb-5 lg:mt-10">Administration</h1>

      <section className="p-4 my-5 overflow-x-hidden overflow-y-auto rounded-lg max-h-[70vh] lg:max-h-[40vh] shadow-custom bg-secondary-50">
        <h2>Comptes négociateurs</h2>

        {/* CREATE COLLABORATOR BUTTON (component possible) */}
        <button
          onClick={handleCreateCollaboratorClick}
          type="button"
          className="flex items-center justify-center gap-2 px-3 py-2 my-3 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110"
        >
          <img src={plusIcon} alt="Add Info Button Icon" className="w-[30px]" />
          <span className="text-secondary-50 font-poppins">
            Créer un compte négociateur
          </span>
        </button>

        {isCollaboratorsLoading ? (
          <img src={loaderSVG} alt="Loader" className="block m-auto" />
        ) : (
          collaborators.map((collaborator) => (
            <CollabCard key={collaborator.id} {...collaborator} />
          ))
        )}
      </section>

      <section className="p-4 my-5 overflow-x-hidden overflow-y-auto rounded-lg shadow-custom bg-secondary-50 max-h-[70vh] lg:max-h-[40vh]">
        <h2>Secteurs</h2>

        {/* CREATE SECTOR BUTTON (component possible) */}
        <button
          onClick={handleCreateCollaboratorClick}
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
