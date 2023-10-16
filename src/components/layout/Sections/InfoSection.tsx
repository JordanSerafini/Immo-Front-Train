// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppSelector } from '../../../hooks/redux';

// === COMPONENTS === //
import ValidButton from '../../common/Buttons/ValidButton';

// === UTILS === //
import capFirstLetter from '../../../utils/capFirstLetter';
import switchIcon from '../../../utils/switchIcon';
import formatDate from '../../../utils/formatDate';

// === TYPESCRIPT === //
import { Information } from '../../../@types/information';

export default function InfoSection({
  id,
  type,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
  category,
  phone_1,
  phone_2,
  owner_email,
  date,
}: Information) {
  // === REDUX STATES === //
  const collaborator = useAppSelector((state) => state.collaborator.user);

  const icon = switchIcon(type);

  return (
    <section className="relative max-w-[600px] 2xl:w-full p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
      <h2>Information</h2>

      <div className="flex flex-col gap-2 mx-2 my-4">
        <img src={icon} alt={`${type} Icon`} className="w-[25px] md:w-[30px]" />
        <p className="font-bold md:text-md xl:text-lg">
          {`${address_number} ${address_street} ${code_zip} ${address_city}`}
        </p>
        <p className="font-bold md:text-md xl:text-lg">{owner_name}</p>
        <strong className="text-lg font-bold md:text-xl text-accent-400">
          {capFirstLetter(category)}
        </strong>
      </div>

      <h2>Coordonnées</h2>

      <div className="flex flex-col gap-2 mx-2 my-4">
        {phone_1 && <p>{phone_1}</p>}
        {phone_2 && <p>{phone_2}</p>}

        {owner_email && <p>{owner_email}</p>}

        {!phone_1 && !phone_2 && !owner_email && <p>Pas de coordonnées</p>}
      </div>

      <Link
        to={`/app/detail/${id}`}
        className="absolute -right-2 -top-5 sm:top-2 sm:right-2"
      >
        <ValidButton isNotFocusable content="Voir plus" />
      </Link>
      <div className="flex justify-between">
        <p>
          Gérée par
          <em className="font-semibold">
            {' '}
            {collaborator.firstname} {collaborator.lastname?.toUpperCase()}
          </em>
        </p>
        <p>
          Créée le
          <em className="font-semibold"> {formatDate(date)}</em>
        </p>
      </div>
    </section>
  );
}
