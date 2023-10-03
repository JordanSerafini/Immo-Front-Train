// React Router
import { Link } from 'react-router-dom';

// Redux
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { showDeleteConfirmationModal } from '../../../store/reducers/modal';

// Components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';
import CancelButton from '../../SharedComponents/Buttons/CancelButton';

// Asset
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// Utils
import capFirstLetter from '../../../utils/capFirstLetter';

// Typescript interface
import { Information } from '../../../@types/information';

export default function ProspectionInformation({
  id,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
  type,
  category,
}: Information) {
  const dispatch = useAppDispatch();

  let icon: string;
  switch (type.toLowerCase()) {
    case 'maison':
      icon = houseIcon;
      break;
    case 'appartement':
      icon = apartmentIcon;
      break;
    case 'terrain':
      icon = landIcon;
      break;
    default:
      icon = '';
  }

  const idString: string = id.toString();

  const handleDeleteClick = () => {
    dispatch(showDeleteConfirmationModal());
  };

  return (
    <article className="flex flex-col justify-between p-4 mb-5 rounded-lg lg:my-2 shadow-custom bg-secondary-50">
      <div className="flex flex-col gap-2">
        <img src={icon} alt={`${icon} Icon`} className="w-[25px] md:w-[30px]" />
        <p className="font-bold md:text-md xl:text-lg">{`${address_number} ${address_street} ${code_zip} ${address_city}`}</p>
        <p className="font-bold md:text-md xl:text-lg">{owner_name}</p>
        <strong className="text-lg font-bold md:text-xl text-accent-400">
          {capFirstLetter(category)}
        </strong>
      </div>

      <div className="flex justify-between mt-5">
        <Link to={`/app/detail/${id}`}>
          <ValidButton content="Voir plus" />
        </Link>
        <Link to={{ search: idString }}>
          <CancelButton content="Supprimer" onClickMethod={handleDeleteClick} />
        </Link>
      </div>
    </article>
  );
}
