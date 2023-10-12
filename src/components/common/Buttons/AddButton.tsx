// === ASSETS === //
import { plusIcon } from '../../../assets';

// === TYPESCRIPT === //
interface AddButtonProps {
  content: string;
  onClickMethod?: () => void;
}

function AddButton({ content, onClickMethod }: AddButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center p-2 mt-2 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary hover:scale-110"
      onClick={onClickMethod}
    >
      <img src={plusIcon} alt="Add Button Icon" className="w-[30px]" />
      <span className="text-secondary-50 font-poppins">{content}</span>
    </button>
  );
}

AddButton.defaultProps = {
  onClickMethod: () => {},
};

export default AddButton;
