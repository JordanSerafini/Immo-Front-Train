// === TYPESCRIPT === //
import { Information } from '../../../@types/information';

// === UTILS === //
import formatDate from '../../../utils/formatDate';
import switchIcon from '../../../utils/switchIcon';

export default function UpcomingActionCard({
  type,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
  notification_date,
}: Information) {
  const icon = switchIcon(type);

  return (
    <li className="flex items-start justify-between gap-5 p-3 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col gap-1">
        <img src={icon} alt="Icon" className="w-[25px]" />
        <p>
          {address_number} {address_street} {code_zip}{' '}
          {address_city.toUpperCase()}
        </p>
        <p>{owner_name}</p>
      </div>
      <p className="font-semibold text-center max-w-1/4">
        <em>A traiter le {formatDate(notification_date)}</em>
      </p>
    </li>
  );
}
