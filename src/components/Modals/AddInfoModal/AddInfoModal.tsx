// React
import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import {
  hideAddInfoModal,
  showNextActionModal,
  showCancelConfirmationAddInfoModalOpen,
  hideCancelConfirmationAddInfoModalOpen,
} from '../../../store/reducers/modal';
import { createInformation } from '../../../store/reducers/informations';

// Components
import Fieldset from '../Form/Fieldset';
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';
import RadioButton from './Field/RadioButton';
import AddButton from '../../SharedComponents/Buttons/AddButton';
import Modal from '../Modal';
import Input from './Field/Input';
import Textarea from './Field/Textarea';
import CancelModal from '../CancelModal/CancelModal';
import NextActionModal from '../NextActionModal/NextActionModal';

// Assets
import plus from '../../../assets/icons/plus.svg';
import house from '../../../assets/icons/house.svg';
import whiteHouse from '../../../assets/icons/white_house.svg';
import apartment from '../../../assets/icons/apartment.svg';
import whiteApartment from '../../../assets/icons/white_apartment.svg';
import land from '../../../assets/icons/land.svg';
import whiteLand from '../../../assets/icons/white_land.svg';

// Utils
import getFullDate from '../../../utils/getFullDate';

// Style
import './animation.scss';

// Typescript Interface
import { CreateInformation } from '../../../@types/information';

export default function AddInfoModal() {
  const dispatch = useAppDispatch();
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationAddInfoModalOpen
  );
  const nextActionModal = useAppSelector(
    (state) => state.modal.isNextActionModalOpen
  );

  const handleCancelClick = () => {
    dispatch(showCancelConfirmationAddInfoModalOpen());
  };

  // Type Local State
  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('Maison');

  // Localisation Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('');

  // Owner Local States
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  // Info Source Local State
  const [sourceInfo, setSourceInfo] = useState<string>('');

  // Category Local State
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>('à vendre');

  // Comments Local State
  const [comment, setComment] = useState<string>('');

  // Action Local State
  const [actionTextarea, setActionTextarea] = useState<boolean>(false);
  const [action, setAction] = useState<string>('');

  // Next Action / Notification state
  const [nextAction, setNextAction] = useState<string>('');


  const collaboratorId = useAppSelector((state) => state.user.data.id);

  // HANDLERS
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: CreateInformation = {
      type: selectedTypeOption, 
      owner_name: ownerName, 
      owner_email: ownerEmail, 
      address_number: streetNumber, 
      address_street: streetName, 
      code_zip: zipCode, 
      address_city: city,
      address_info: appartmentInfo, 
      source: sourceInfo, 
      category: selectedCategoryOption, 
      comment, 
      date: getFullDate(), 
      collaborator_id: collaboratorId, 
      sector_id: 1
    }

    // If there's an action, show the next action modal ELSE hide add info modal and send form
    // For the first case, the form will be send once the show next action modal is valid. So please, think to give a formData props to next action modal
    if (actionTextarea && action.length) {
      dispatch(showNextActionModal());
    } else {
      dispatch(hideAddInfoModal());
      dispatch(createInformation({formData}))
    }
  };

  const handleAddPhoneClick = () => {
    console.log('Ajouter un numéro de téléphone');
  };

  const handleAddActionClick = () => {
    setActionTextarea(true);
  };

  return (
    <Modal closeModal={handleCancelClick}>
        {/* Temporary style */}
        <button
          onClick={handleCancelClick}
          type="button"
          className="absolute top-2 right-2"
        >
          <img
            className="duration-300 rotate-45 rounded-full bg-primary-300 hover:bg-primary-500"
            src={plus}
            alt="Plus Icon"
          />
        </button>

        <h1 className="my-5 text-2xl font-semibold text-center font-poppins">
          Ajout d&apos;une information
        </h1>

        <em className="italic">*Champs obligatoires</em>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col lg:items-start flex-wrap justify-center sm:w-[500px] lg:flex-row lg:w-[900px] gap-6 mb-4"
        >
          <Fieldset title="*Type de bien">
            <div className="flex flex-wrap items-center justify-center gap-6 my-5">
              <RadioButton
                value="Maison"
                state={selectedTypeOption}
                whiteIcon={whiteHouse}
                blackIcon={house}
                onChange={setSelectedTypeOption}
              />

              <RadioButton
                value="Appartement"
                state={selectedTypeOption}
                whiteIcon={whiteApartment}
                blackIcon={apartment}
                onChange={setSelectedTypeOption}
              />

              <RadioButton
                value="Terrain"
                state={selectedTypeOption}
                whiteIcon={whiteLand}
                blackIcon={land}
                onChange={setSelectedTypeOption}
              />
            </div>
          </Fieldset>

          <Fieldset title="*Localisation">
            <div className="flex flex-col gap-4 my-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Input
                  placeholder="N°"
                  onChange={setStreetNumber}
                  value={streetNumber}
                  className="w-[3.5rem]"
                  type="number"
                />
                <Input
                  placeholder="Rue"
                  onChange={setStreetName}
                  value={streetName}
                  className="w-full sm:w-[300px]"
                />
              </div>

              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Input
                  placeholder="Code Postal"
                  onChange={setZipCode}
                  value={zipCode}
                  type="number"
                  className="w-[80px]"
                />
                <Input
                  placeholder="Ville"
                  onChange={setCity}
                  value={city}
                  className="w-full md:w-[260px]"
                />
              </div>
              {selectedTypeOption === 'Appartement' && (
                <Textarea
                  label="*Si l'information concerne un appartement :"
                  value={appartmentInfo}
                  onChange={setAppartmentInfo}
                  placeholder="Informations complémentaires..."
                />
              )}
            </div>
          </Fieldset>

          <Fieldset title="*Propriétaires">
            <div className="flex flex-col gap-4 my-5">
              <Input
                placeholder="Nom des propriétaires"
                value={ownerName}
                onChange={setOwnerName}
                className="w-full"
              />
              <Input
                placeholder="N° Tel."
                value={ownerPhoneNumber}
                onChange={setOwnerPhoneNumber}
                className="w-1/2"
                type="number"
              />

              {/* ADD Phone Number BUTTON */}
              <AddButton
                onClickMethod={handleAddPhoneClick}
                content="Ajouter un n° de tel."
              />

              <Input
                placeholder="Adresse email"
                value={ownerEmail}
                onChange={setOwnerEmail}
                className="w-3/4"
                type="email"
              />
            </div>
          </Fieldset>

          <Fieldset title="*Source de l'information">
            <div className="mb-5">
              <Textarea
                value={sourceInfo}
                onChange={setSourceInfo}
                placeholder="Renseignez la source de l'information..."
              />
            </div>
          </Fieldset>

          <Fieldset title="*Catégorie">
            <div className="flex flex-wrap items-center justify-center gap-6 my-5">
              <RadioButton
                value="à vendre"
                state={selectedCategoryOption}
                onChange={setSelectedCategoryOption}
              />
              <RadioButton
                value="potentiellement à vendre"
                state={selectedCategoryOption}
                onChange={setSelectedCategoryOption}
              />
              <RadioButton
                value="succession en cours"
                state={selectedCategoryOption}
                onChange={setSelectedCategoryOption}
              />
            </div>
          </Fieldset>

          <Fieldset title="Commentaires">
            <div className="mb-5">
              <Textarea
                value={comment}
                onChange={setComment}
                placeholder="Écrivez vos commentaires..."
              />
            </div>
          </Fieldset>

          <Fieldset title="Action">
            <div>
              {actionTextarea ? (
                <Textarea
                  value={action}
                  onChange={setAction}
                  placeholder="Renseignez votre action"
                />
              ) : (
                // Add Action Button
                <AddButton
                  onClickMethod={handleAddActionClick}
                  content="Ajouter une action"
                />
              )}
            </div>
          </Fieldset>

          {/* GROUP BTNS */}
          <div className="flex justify-between w-3/4 gap-4 m-auto mt-5">
            <ValidButton content="Enregistrer" isSubmit />
            <CancelButton content="Annuler" onClickMethod={handleCancelClick} />
          </div>
        </form>
        {/* CANCEL CONFIRMATION MODAL */}
        {cancelModal &&
          createPortal(
            <CancelModal
              closeModal={() => dispatch(hideCancelConfirmationAddInfoModalOpen())}
              content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
            />,
            document.body
          )}
        {/* NEXT ACTION MODAL */}
        {nextActionModal &&
          createPortal(
            <NextActionModal state={nextAction} setState={setNextAction} />,
            document.body
          )}
    </Modal>
  );
}
