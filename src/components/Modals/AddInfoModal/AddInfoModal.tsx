// React
import { FormEvent } from 'react';

// Components
import Fieldset from '../Form/Fieldset';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';
import Modal from '../Modal';

// Assets
import plus from '../../../assets/icons/plus.svg';

// Style
import './animation.scss';

export default function AddInfoModal({ closeModal }: { closeModal: () => void }) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Modal closeModal={(closeModal)}>
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
          className="flex flex-col items-center justify-center sm:w-[500px] lg:w-[750px] xl:w-[900px] gap-6 mb-4"
        >
          <Fieldset title="*Type de bien">
            <div>
              <div>
                <input
                  type="radio"
                  id="maison"
                  name="drone"
                  value="maison"
                  defaultChecked
                />
                <label htmlFor="maison">Maison</label>
              </div>

              <div>
                <input
                  type="radio"
                  id="appartement"
                  name="drone"
                  value="appartement"
                />
                <label htmlFor="appartement">Appartement</label>
              </div>

              <div>
                <input type="radio" id="Terrain" name="drone" value="Terrain" />
                <label htmlFor="Terrain">Terrain</label>
              </div>
            </div>
          </Fieldset>

          <Fieldset title="*Localisation">
            <div>
              <label className="hidden" htmlFor="streetNumber">
                Numéro de rue
              </label>
              <input
                className="px-2 py-1 duration-150 border-2 rounded-md w-[3.5rem] focus:ring-2 ring-accent-300"
                type="number"
                placeholder="N°"
                min={0}
              />
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

          <div className="flex justify-between w-3/4 mt-5">
            <ValidButton content="Enregistrer" />
            <CancelButton content="Annuler" onClickMethod={closeModal} />
          </div>
        </form>
      </>
    </Modal>
  );
}
