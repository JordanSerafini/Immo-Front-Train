// React router
import { Link } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Shared components
import ValidButton from '../../SharedComponents/Buttons/ValidButton';

// Assets
import houseIcon from '../../../assets/icons/house.svg';
import apartmentIcon from '../../../assets/icons/apartment.svg';
import landIcon from '../../../assets/icons/land.svg';

// Utils
import capFirstLetter from '../../../utils/capFirstLetter';

// Typescript interface
import { Information } from "../../../@types/information"

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
    date
}: Information) {
    // Redux state
    const collaborator = useAppSelector((state) => state.user.data);

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
    <section className="relative max-w-[600px] 2xl:w-full p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
            <h2>Information</h2>

            <div className="flex flex-col gap-2 mx-2 my-4">
              <img
                src={icon}
                alt={`${type} Icon`}
                className="w-[25px] md:w-[30px]"
              />
              <p className="font-bold md:text-md xl:text-lg">
                {`${address_number} ${address_street} ${code_zip} ${address_city}`}
              </p>
              <p className="font-bold md:text-md xl:text-lg">
                {owner_name}
              </p>
              <strong className="text-lg font-bold md:text-xl text-accent-400">
                {capFirstLetter(category)}
              </strong>
            </div>

            <h2>Coordonnées</h2>

            <div className="flex flex-col gap-2 mx-2 my-4">
              {phone_1 && <p>{phone_1}</p>}
              {phone_2 && <p>{phone_2}</p>}

              {owner_email && <p>{owner_email}</p>}

              {!phone_1 &&
                !phone_2 &&
                !owner_email && <p>Pas de coordonnées</p>}
            </div>

            <Link
              to={`/app/detail/${id}`}
              className="absolute -right-4 -top-5 sm:top-2 sm:right-2"
            >
              <ValidButton content="Voir plus" />
            </Link>
            <div className="flex justify-between">
              <p>Gérée par
                <em className="font-semibold"> {collaborator.firstname} {collaborator.lastname?.toUpperCase()}</em>
              </p>
              <p>
                Créer le
                <em className="font-semibold"> {date.slice(0, 10)}</em>
              </p>
            </div>
          </section>
  )
}