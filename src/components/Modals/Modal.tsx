// ACCESSIBILITY IMPROVMENTS TO MAKE HERE !!!
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { LegacyRef } from 'react';

// === ASSETS === //
import { plusIcon } from '../../assets';

// === STYLES === //
import './animation.scss';

// === TYPESCRIPT === //
interface ModalProps {
  closeModal?: () => void | null;
  children: React.ReactNode;
  notClosable?: boolean;
  reference?: LegacyRef<HTMLDivElement>;
}

function Modal({ closeModal, children, reference, notClosable }: ModalProps) {
  // If the escape key is pressed, close the modal
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.code === 'Escape' && closeModal) {
      closeModal();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-50 flex flex-wrap items-center justify-center w-screen h-screen px-2 py-10 m-0 border-none sm:p-6 bg-black/60"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={reference}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="block max-h-full min-w-[300px] max-w-[1000px] p-4 m-auto mx-4 overflow-y-auto overflow-x-hidden slide rounded-xl bg-secondary-50"
      >
        {/* If we can close the modal, we want to display the close modal button */}
        {!notClosable && (
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-2 right-2"
          >
            <img
              className="duration-300 rotate-45 rounded-full bg-primary-300 hover:bg-primary-500"
              src={plusIcon}
              alt="Plus Icon"
            />
          </button>
        )}
        {children}
      </div>
    </dialog>
  );
}

Modal.defaultProps = {
  closeModal: null,
  reference: null,
  notClosable: false,
};

export default Modal;
