// Assets
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// Typescript interface
interface CardUpcomingActionProps {
  address: string;
  owner: string;
  type: string;
  notificationDate: string;
}

// !! REFACTO WITH THE CardActionToDo COMPONENT !!
export default function CardUpcomingAction({
  address,
  owner,
  type,
  notificationDate,
}: CardUpcomingActionProps) {
  let icon: string;
  switch (type) {
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
    <li className="flex items-start justify-between gap-5 p-5 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col gap-2">
        <img src={icon} alt={`${icon} Icon`} className="w-[25px] md:w-[30px]" />
        <p className="md:text-lg">{address}</p>
        <p className="md:text-lg">{owner}</p>
      </div>
      <p className='text-lg font-semibold text-center'><em className='italic'>A traiter le {notificationDate}</em></p>
    </li>
  );
}
