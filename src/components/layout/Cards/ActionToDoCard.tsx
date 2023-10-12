// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === COMPONENTS === //
import ValidButton from '../../common/Buttons/ValidButton';

// === TYPESCRIPT === //
import { Information } from '../../../@types/information';

// === UTILS === //
import switchIcon from '../../../utils/switchIcon';

export default function ActionToDoCard({
  id,
  type,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
}: Information) {
  const icon = switchIcon(type);

  return (
    <li className="flex items-start justify-between gap-5 p-3 rounded-lg bg-secondary-50 shadow-custom">
      <div className="flex flex-col gap-1">
        <img src={icon} alt="Icon" className="w-[25px]" />
        <p>
          {address_number} {address_street} {code_zip}{' '}
          {address_city.toLocaleUpperCase()}
        </p>
        <p>{owner_name}</p>
      </div>
      <Link to={`/app/actionManager/${id}`}>
        <ValidButton isNotFocusable content="Traiter" />
      </Link>
    </li>
  );
}
