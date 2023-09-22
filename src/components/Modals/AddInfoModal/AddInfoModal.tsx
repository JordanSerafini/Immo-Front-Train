// ACCESSIBILITY IMPROVMENTS TO MAKE HERE !!!
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

// React
import { FormEvent } from 'react';

// Components
import Fieldset from '../Form/Fieldset';
import ValidButton from '../../Buttons/ValidButton';
import CancelButton from '../../Buttons/CancelButton';

// Assets
import plus from '../../../assets/icons/plus.svg';

// Style
import './animation.scss';

// Typescript Interface
interface AddInfoModalProps {
  // Not sure if the type is good here. It seems too simple...
  closeModal: () => void;
}

export default function AddInfoModal({ closeModal }: AddInfoModalProps) {
  // If the escape key is pressed, close the modal
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <dialog
      className="fixed inset-0 z-30 flex items-center justify-center w-screen h-screen m-0 border-none bg-black/60"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="relative w-full p-4 mx-4 slide rounded-xl bg-secondary-50"
      >
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
          className="flex flex-col items-center justify-center gap-6 mb-4"
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
                <input type="radio" id="appartement" name="drone" value="appartement" />
                <label htmlFor="appartement">Appartement</label>
              </div>

              <div>
                <input type="radio" id="Terrain" name="drone" value="Terrain" />
                <label htmlFor="Terrain">Terrain</label>
              </div>
            </div>
          </Fieldset>

          <Fieldset title='*Localisation'>
            <div>
              <input type="text" placeholder='N°' />
            </div>
          </Fieldset>

          <div className="flex justify-between w-3/4 mt-5">
            <ValidButton content="Enregistrer" />
            <CancelButton content="Annuler" />
          </div>
        </form>
      </div>
    </dialog>
  );
}
