// Assets
import gridLayoutIcon from '../../../assets/icons/grid-layout.svg';
import listIcon from '../../../assets/icons/list.svg';

// Typescript interface
interface LayoutButtonProps {
  handleMethod: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
}

export default function LayoutButton({
  handleMethod,
  state,
}: LayoutButtonProps) {
  const handleClick = () => {
    handleMethod(!state);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="hidden px-4 py-2 font-semibold duration-150 rounded-lg shadow-md lg:block bg-secondary-50 hover:scale-105"
    >
      <img src={state ? listIcon : gridLayoutIcon} alt="Layout Icon" />
    </button>
  );
}
