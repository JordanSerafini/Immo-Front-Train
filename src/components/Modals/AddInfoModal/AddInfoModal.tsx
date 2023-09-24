// React
import { FormEvent, useState } from 'react';
import { createPortal } from 'react-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import { showCancelConfirmationModal } from '../../../store/reducers/modal';

// Components
import Fieldset from '../Form/Fieldset';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';
import Modal from '../Modal';
import RadioButton from './Field/RadioButton';
import Input from './Field/Input';
import Textarea from './Field/Textarea';
import CancelModal from '../CancelModal/CancelModal';

// Assets
import plus from '../../../assets/icons/plus.svg';
import house from '../../../assets/icons/house.svg';
import whiteHouse from '../../../assets/icons/white_house.svg';
import apartment from '../../../assets/icons/apartment.svg';
import whiteApartment from '../../../assets/icons/white_apartment.svg';
import land from '../../../assets/icons/land.svg';
import whiteLand from '../../../assets/icons/white_land.svg';

// Style
import './animation.scss';

export default function AddInfoModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const dispatch = useAppDispatch();
  const cancelModal = useAppSelector(
    (state) => state.modal.isCancelConfirmationModalOpen
  );

  const handleCancelClick = () => {
    dispatch(showCancelConfirmationModal());
  };

  // Type Local State
  // Decide the default checked button
  const [selectedTypeOption, setSelectedTypeOption] =
    useState<string>('maison');

  // Localisation Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [street, setStreet] = useState<string>('');
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
  const [commment, setComment] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      type: {
        selectedTypeOption,
      },
      localisation: {
        streetNumber,
        streetName,
        zipCode,
        street,
        appartmentInfo,
      },
      owner: {
        ownerName,
        ownerPhoneNumber,
        ownerEmail,
      },
    };

    console.log(formValues);
  };

  return (
    <Modal closeModal={handleCancelClick}>
      <>
        {/* Temporary style */}
        <button
          onClick={closeModal}
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
                value="maison"
                state={selectedTypeOption}
                whiteIcon={whiteHouse}
                blackIcon={house}
                onChange={setSelectedTypeOption}
              />

              <RadioButton
                value="appartement"
                state={selectedTypeOption}
                whiteIcon={whiteApartment}
                blackIcon={apartment}
                onChange={setSelectedTypeOption}
              />

              <RadioButton
                value="terrain"
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
                />
                <Input
                  placeholder="Ville"
                  onChange={setStreet}
                  value={street}
                  className="w-full"
                />
              </div>
              {selectedTypeOption === 'appartement' && (
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
                value={commment}
                onChange={setComment}
                placeholder="Écrivez vos commentaires..."
              />
            </div>
          </Fieldset>

          <Fieldset title="Action">
            <div>In progress</div>
          </Fieldset>

          <div className="flex justify-between w-3/4 gap-4 m-auto mt-5">
            <ValidButton content="Enregistrer" isSubmit />
            <CancelButton
              content="Annuler"
              onClickMethod={handleCancelClick}
            />
          </div>
        </form>
        {cancelModal &&
          createPortal(
            <CancelModal
              closeModal={closeModal}
              content="Votre progression sera supprimée, vous allez être redirigé vers la page d'accueil, confirmez-vous l'annulation ?"
            />,
            document.body
          )}
      </>
    </Modal>
  );
}
