// React
import { FormEvent, useState } from 'react';

// Components
import Fieldset from '../Form/Fieldset';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';
import Modal from '../Modal';
import Field from './Field/Field';

// Assets
import plus from '../../../assets/icons/plus.svg';

// Style
import './animation.scss';

export default function AddInfoModal({
  closeModal,
}: {
  closeModal: () => void;
}) {
  const [selectedTypeOption, setSelectedTypeOption] = useState<string>('');

  // Localisation Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formValues = {
      selectedTypeOption,
      streetNumber,
      streetName,
      zipCode,
      street,
      appartmentInfo,
    };

    console.log(formValues);
  };

  const handleRadioChange = (event: FormEvent<HTMLInputElement>) => {
    setSelectedTypeOption(event.currentTarget.value);
  };

  return (
    <Modal closeModal={closeModal}>
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
          className="flex flex-col flex-wrap sm:items-center justify-center sm:w-[500px] lg:flex-row lg:w-[900px] gap-6 mb-4"
        >
          <Fieldset title="*Type de bien">
            <div className="flex flex-wrap items-center justify-center gap-6 my-5 text-lg font-poppins">
              <div className="">
                <input
                  type="radio"
                  id="maison"
                  name="type"
                  value="maison"
                  onChange={handleRadioChange}
                  checked={selectedTypeOption === 'maison'}
                  className="hidden"
                />
                <label
                  htmlFor="maison"
                  className={`rounded-md p-2 border-solid border-2 border-accent-400 duration-150 ${
                    selectedTypeOption === 'maison'
                      ? 'bg-accent-400 text-secondary-50'
                      : ''
                  }`}
                >
                  Maison
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="appartement"
                  name="type"
                  value="appartement"
                  onChange={handleRadioChange}
                  checked={selectedTypeOption === 'appartement'}
                  className="hidden"
                />
                <label
                  className={`rounded-md p-2 border-solid border-2 border-accent-400 duration-150 ${
                    selectedTypeOption === 'appartement'
                      ? 'bg-accent-400 text-secondary-50'
                      : ''
                  }`}
                  htmlFor="appartement"
                >
                  Appartement
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="terrain"
                  name="type"
                  value="terrain"
                  onChange={handleRadioChange}
                  checked={selectedTypeOption === 'terrain'}
                  className="hidden"
                />
                <label
                  className={`rounded-md p-2 border-solid border-2 border-accent-400 duration-150 ${
                    selectedTypeOption === 'terrain'
                      ? 'bg-accent-400 text-secondary-50'
                      : ''
                  }`}
                  htmlFor="terrain"
                >
                  Terrain
                </label>
              </div>
            </div>
          </Fieldset>

          <Fieldset title="*Localisation">
            <div className="flex flex-col gap-4 my-5">
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Field
                  placeholder="N°"
                  onChange={setStreetNumber}
                  value={streetNumber}
                  className="w-[3.5rem]"
                  type="number"
                />
                <Field
                  placeholder="Rue"
                  onChange={setStreetName}
                  value={streetName}
                  className="sm:w-[300px]"
                />
              </div>

              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <Field
                  placeholder="Code Postal"
                  onChange={setZipCode}
                  value={zipCode}
                  type="number"
                />
                <Field
                  placeholder="Ville"
                  onChange={setStreet}
                  value={street}
                />
              </div>
              {selectedTypeOption === 'appartement' && (
                <div>
                  <label
                    className="font-semibold text-md"
                    htmlFor="appartmentInfo"
                  >
                    *Si l&apos;information concerne un appartement :
                  </label>
                  <textarea
                    value={appartmentInfo}
                    onChange={(event) => setAppartmentInfo(event.target.value)}
                    className="sm:w-full"
                    name="appartmentInfo"
                    placeholder="Informations complémentaires"
                  />
                </div>
              )}
            </div>
          </Fieldset>

          <Fieldset title="*Propriétaires">
            <div>In progress</div>
          </Fieldset>

          <Fieldset title="*Source de l'information">
            <div>In progress</div>
          </Fieldset>

          <Fieldset title="*Catégorie">
            <div>In progress</div>
          </Fieldset>

          <Fieldset title="Commentaires">
            <div>In progress</div>
          </Fieldset>

          <Fieldset title="Action">
            <div>In progress</div>
          </Fieldset>

          <div className="flex justify-between w-3/4 gap-4 mt-5">
            <ValidButton content="Enregistrer" isSubmit />
            <CancelButton content="Annuler" onClickMethod={closeModal} />
          </div>
        </form>
      </>
    </Modal>
  );
}
