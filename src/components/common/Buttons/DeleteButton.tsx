// === ASSETS === //
import { plusIcon } from '../../../assets';

// === TYPESCRIPT === //
interface DeleteButtonProps {
  onClickMethod?: () => void;
  className?: string;
  isNotFocusable?: boolean;
}

function DeleteButton({
  onClickMethod,
  className,
  isNotFocusable,
}: DeleteButtonProps) {
  return (
    <button
      tabIndex={isNotFocusable ? -1 : 0}
      type="button"
      onClick={onClickMethod}
      className={`${className} z-10 duration-150`}
    >
      <img
        className="duration-300 rotate-45 bg-red-500 rounded-full hover:bg-red-600 w-[24px] aspect-square"
        src={plusIcon}
        alt="Plus Icon"
      />
    </button>
  );
}

DeleteButton.defaultProps = {
  onClickMethod: () => {},
  className: '',
  isNotFocusable: false,
};

export default DeleteButton;
