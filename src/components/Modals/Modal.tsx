// ACCESSIBILITY IMPROVMENTS TO MAKE HERE !!!
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { LegacyRef } from "react";

// Typescript Interface
interface ModalProps {
  // Not sure if the type is good here. It seems too simple...
  closeModal?: () => void;
  children: React.ReactNode;
  reference?: LegacyRef<HTMLDivElement>,
}

function Modal({ closeModal, children, reference }: ModalProps) {
  // If the escape key is pressed, close the modal
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.code === 'Escape' && closeModal) {
      closeModal();
    }
  };

  return (
    <dialog
      className="fixed inset-0 z-30 flex flex-wrap items-center justify-center w-screen h-screen p-1 m-0 border-none sm:p-6 bg-black/60"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={reference}
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="block max-h-full min-w-[350px] max-w-[1000px] p-4 m-auto mx-4 overflow-y-auto overflow-x-hidden slide rounded-xl bg-secondary-50"
      >
        {children}
      </div>
    </dialog>
  );
}

Modal.defaultProps = {
  closeModal: () => {},
  reference: null
}

export default Modal;