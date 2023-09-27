// Assets
import pencilIcon from '../../../assets/icons/edit-pencil.svg';

// Typescript interface
interface PersonnalInfoProps {
  label: string;
  content: string | undefined;
}

export default function PersonnalInfo({ label, content }: PersonnalInfoProps) {

  const handleEditClick = () => {
    console.log("edit")
  }

  return (
    <div>
      <p className="relative font-semibold w-fit text-secondary-600">
        {label}
        <button type="button" onClick={handleEditClick} className="absolute top-0 right-0 translate-x-[110%] hover:scale-105 duration-300">
          <img
            src={pencilIcon}
            alt="Pencil"
          />
        </button>
      </p>
      <p className="md:text-lg">{content}</p>
    </div>
  );
}
