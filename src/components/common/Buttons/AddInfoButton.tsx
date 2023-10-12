// === ASSETS === //
import { plusIcon } from '../../../assets';

export default function AddInfoButton({
  onClickMethod,
}: {
  onClickMethod: () => void;
}) {
  return (
    <button
      onClick={onClickMethod}
      type="button"
      className="fixed z-20 flex items-center justify-center w-12 p-1 duration-300 rounded-full aspect-square bg-primary-300 hover:shadow-primary hover:scale-110 bottom-[13vh] right-5 sm:static sm:rounded-lg sm:aspect-auto sm:mb-4 sm:pr-4 sm:w-fit sm:p-2"
    >
      <img
        src={plusIcon}
        alt="Add Info Button Icon"
        className="w-full sm:w-[30px]"
      />
      <span className="hidden text-secondary-50 font-poppins sm:inline">
        Ajouter une information
      </span>
    </button>
  );
}
