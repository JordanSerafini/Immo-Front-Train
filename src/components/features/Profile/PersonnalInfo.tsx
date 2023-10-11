// === ASSETS === //
import { editPencilIcon } from '../../../assets';

// === TYPESCRIPT === //
interface PersonnalInfoProps {
  clickHandler: () => void;
  children: React.ReactNode;
  label: string;
}

export default function PersonnalInfo({
  clickHandler,
  children,
  label,
}: PersonnalInfoProps) {
  return (
    <div className="m-2">
      <p className="relative font-semibold w-fit text-secondary-600">
        {label}
        <button
          type="button"
          onClick={clickHandler}
          className="absolute top-0 right-0 translate-x-[110%] hover:scale-105 duration-300"
        >
          <img src={editPencilIcon} alt="Pencil" />
        </button>
      </p>
      {children}
    </div>
  );
}
