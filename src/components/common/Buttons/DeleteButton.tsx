import { plusIcon } from '../../../assets';

function DeleteButton({ onClickMethod, className }: { onClickMethod?: () => void, className?: string }) {
  return (
    <button type="button" onClick={onClickMethod} className={className}>
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
  className: ""
};

export default DeleteButton;
