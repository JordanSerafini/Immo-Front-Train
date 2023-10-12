// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../hooks/redux';

// === REDUCERS === //
import { showDeleteConfirmationModal } from '../../../store/reducers/modal';

// === COMPONENTS === //
import ValidButton from '../../common/Buttons/ValidButton';
import CancelButton from '../../common/Buttons/CancelButton';

// === TYPESCRIPT === //
import { Information } from '../../../@types/information';

// === UTILS === //
import capFirstLetter from '../../../utils/capFirstLetter';
import switchIcon from '../../../utils/switchIcon';

export default function InformationCard({
  id,
  address_number,
  address_street,
  code_zip,
  address_city,
  owner_name,
  type,
  category,
}: Information) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === VARIABLES === //
  const icon = switchIcon(type);
  // We convert our id to a string so we are sure that it'll be interpreted as a string in the search query url
  const idString: string = id.toString();

  // === HANDLERS === //
  const handleDeleteClick = () => {
    dispatch(showDeleteConfirmationModal());
  };

  return (
    <article className="flex flex-col justify-between p-4 mb-5 rounded-lg lg:my-2 shadow-custom bg-secondary-50">
      <div className="flex flex-col gap-2">
        <img src={icon} alt="Icon" className="w-[25px] md:w-[30px]" />

        <p className="font-bold md:text-md xl:text-lg">{`${address_number} ${address_street} ${code_zip} ${address_city}`}</p>

        <p className="font-bold md:text-md xl:text-lg">{owner_name}</p>

        <strong className="text-lg font-bold md:text-xl text-accent-400">
          {capFirstLetter(category)}
        </strong>
      </div>

      <div className="flex justify-between mt-5">
        <Link to={`/app/detail/${id}`}>
          <ValidButton isNotFocusable content="Voir plus" />
        </Link>
        <Link to={{ search: idString }} onClick={handleDeleteClick}>
          <CancelButton isNotFocusable content="Supprimer" onClickMethod={handleDeleteClick} />
        </Link>
      </div>
    </article>
  );
}
