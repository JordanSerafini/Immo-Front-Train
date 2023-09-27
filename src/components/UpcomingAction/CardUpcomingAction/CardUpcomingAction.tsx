// Assets
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// Typescript interface
import { Information } from '../../../@types/information';

// Utils
import formatDate from '../../../utils/formatDate';

// !! REFACTO WITH THE CardActionToDo COMPONENT !!
export default function CardUpcomingAction({
  type,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
  notification_date,
}: Information) {
  let icon: string;
  switch (type) {
    case 'Maison':
      icon = houseIcon;
      break;
    case 'Appartement':
      icon = apartmentIcon;
      break;
    case 'Terrain':
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
      <p className="font-semibold text-center max-w-1/4">
        <em className="italic">
          A traiter le {formatDate(notification_date.slice(0, 10))}
        </em>
      </p>
    </li>
  );
}
