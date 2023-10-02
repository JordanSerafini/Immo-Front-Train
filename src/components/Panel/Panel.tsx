// React
import { useEffect } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { fetchCollaborators } from '../../store/reducers/collaborator';

// Components
import CollabCard from './CollabCard/CollabCard';
import SectorCard from './SectorCard/SectorCard';

// Assets
import plusIcon from '../../assets/icons/plus.svg';

export default function Panel() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const collaborators = useAppSelector((state) => state.collaborator.data);

  // Handle Methods
  const handleCreateCollaboratorClick = () => {
    console.log('click add collab');
  };

  // Fetch API
  useEffect(() => {
    dispatch(fetchCollaborators());
  }, [dispatch])

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

        {collaborators.map(collaborator => (
          <CollabCard key={collaborator.id} {...collaborator} />
        ))}
      </section>

      <section className="p-4 my-5 overflow-x-hidden overflow-y-auto rounded-lg shadow-custom bg-secondary-50">
        <h2>Secteurs</h2>

        <SectorCard />
      </section>
    </>
  );
}
