// ACCESSIBILITY IMPROVMENTS TO MAKE HERE !!!
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

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

  return (
    <dialog
      className="fixed inset-0 z-30 flex items-center justify-center w-screen h-screen m-0 border-none bg-black/60"
      onClick={closeModal}
      onKeyDown={handleKeyDown}
    >
      <div
        role="dialog"
        onClick={(event) => event.stopPropagation()}
        className="relative w-24 rounded-xl aspect-square bg-secondary-50"
      >
        {/* Temporary style */}
        <button
          onClick={closeModal}
          type="button"
          className="absolute top-2 right-2"
        >
          X
        </button>
      </div>
    </dialog>
  );
}
