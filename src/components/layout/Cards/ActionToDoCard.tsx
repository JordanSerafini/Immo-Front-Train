// React Router
import { Link } from 'react-router-dom';

// Components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';

// Assets
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// TypescriptInterface
import { Information } from '../../../@types/information';

export default function ActionToDoCard({
  id,
  type,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
}: Information) {
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

  return (
    <li className="flex items-start justify-between gap-5 p-3 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col gap-1">
        <img src={icon} alt={`${icon} Icon`} className="w-[25px]" />
        <p>
          {address_number} {address_street} {code_zip}{' '}
          {address_city.toLocaleUpperCase()}
        </p>
        <p>{owner_name}</p>
      </div>
      <Link to={`/app/actionManager/${id}`}>
        <ValidButton content="Traiter" />
      </Link>
    </li>
  );
}
