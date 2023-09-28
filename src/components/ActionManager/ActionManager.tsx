// React
import { FormEvent, useState } from 'react';


// React Router
import { Link } from 'react-router-dom';

// React dom
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  showCancelConfirmationModal,
  hideCancelConfirmationModal,
} from '../../store/reducers/modal';

// Shared Components
import MainSection from '../SharedComponents/MainSection/MainSection';
import ValidButton from '../SharedComponents/Buttons/ValidButton';
import CancelButton from '../SharedComponents/Buttons/CancelButton';
import CancelModal from '../Modals/CancelModal/CancelModal';
import Textarea from '../Modals/AddInfoModal/Field/Textarea';

// Components
import ActionCard from './ActionCard/ActionCard';

// Assets
import houseIcon from '../../assets/icons/house.svg';
import apartmentIcon from '../../assets/icons/apartment.svg';
import landIcon from '../../assets/icons/land.svg';

export default function ActionManager() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux States
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );

  // Local States
  const [action, setAction] = useState<string>("");

  // let icon: string;
  // switch (type) {
  //   case 'Maison':
  //     icon = houseIcon;
  //     break;
  //   case 'Appartement':
  //     icon = apartmentIcon;
  //     break;
  //   case 'Terrain':
  //     icon = landIcon;
  //     break;
  //   default:
  //     icon = '';
  // }

  // HANDLERS
  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;


  }

  return (
    <>
      <MainSection>
        <h1>Gestionnaire d&apos;action</h1>

        <div className='2xl:flex'>

        <section className="relative max-w-[600px] 2xl:min-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
          <h2>Information</h2>

          <div className="flex flex-col gap-2 mx-2 my-4">
            <img
              src={houseIcon}
              alt="house Icon"
              className="w-[25px] md:w-[30px]"
            />
            <p className="font-bold md:text-md xl:text-lg">
              5, rue de la Fraternité 95190 GOUSSAINVILLE
            </p>
            <p className="font-bold md:text-md xl:text-lg">Mr DUPONT</p>
            <strong className="text-lg font-bold md:text-xl text-accent-400">
              A VENDRE
            </strong>
          </div>

          <Link
            to="/app/detail/1"
            className="absolute -right-4 -top-5 sm:top-2 sm:right-2"
          >
            <ValidButton content="Voir plus" />
          </Link>
          <div className="flex justify-between">
            <p>
              <em className="italic">Gérée par Jean DUPONT</em>
            </p>
            <p>
              <em className="italic">Créée le xx/xx/2023</em>
            </p>
          </div>
        </section>

        <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
          <h2>Historique des actions</h2>

          <ul className="flex flex-col gap-4 mx-2 my-4">
            <ActionCard />
            <ActionCard />
          </ul>
        </section>
        </div>

        <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50 mb-5">
          <h2>Nouvelle action</h2>

          <form onSubmit={handleSubmit}>
            <Textarea value={action} onChange={setAction} textareaName='description' placeholder="Renseignez votre action"  />
            <div className="flex mt-5 justify-evenly">
              <ValidButton content="Enregistrer" isSubmit />
              <CancelButton content="Annuler" onClickMethod={handleCancelClick} />
            </div>
          </form>

        </section>
      </MainSection>
      {/* CANCEL CONFIRMATION MODAL */}
      {cancelModal &&
        createPortal(
          <CancelModal
            closeModal={() => dispatch(hideCancelConfirmationModal())}
            content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
          />,
          document.body
        )}
    </>
  );
}
