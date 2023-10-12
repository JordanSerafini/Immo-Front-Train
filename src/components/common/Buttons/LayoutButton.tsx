// === ASSETS === //
import { gridLayoutIcon, listIcon } from '../../../assets';

// === TYPESCRIPT === //
interface LayoutButtonProps {
  handleMethod: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
}

export default function LayoutButton({
  handleMethod,
  state,
}: LayoutButtonProps) {
  return (
    <button
      onClick={() => handleMethod(!state)}
      type="button"
      className="hidden px-4 py-2 font-semibold duration-150 rounded-lg shadow-md lg:block bg-secondary-50 hover:scale-105"
    >
      <img src={state ? listIcon : gridLayoutIcon} alt="Layout Icon" />
    </button>
  );
}
