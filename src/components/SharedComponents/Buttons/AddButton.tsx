// Assets
import plus from '../../../assets/icons/plus.svg';

// Typescript interface
interface AddButtonProps {
  content: string;
  onClickMethod?: () => void;
}

function AddButton({ content, onClickMethod }: AddButtonProps) {
  return (
    <button
      type="button"
      className="flex items-center justify-center p-2 mt-2 duration-300 rounded-lg w-fit bg-primary-300 hover:shadow-primary focus:shadow-primary hover:scale-110"
      onClick={onClickMethod}
    >
      <img src={plus} alt="Add Button Icon" className="w-[30px]" />
      <span className="text-secondary-50 font-poppins">{content}</span>
    </button>
  );
}

AddButton.defaultProps = {
  onClickMethod: () => {},
};

export default AddButton;
