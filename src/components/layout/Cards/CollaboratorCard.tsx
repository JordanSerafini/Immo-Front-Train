// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';

// === REDUCERS === //
import { updateAccess } from '../../../store/reducers/collaborator';
import { showDeleteConfirmationModal } from '../../../store/reducers/modal';

// === SELECTORS === //
import { findCollaborator } from '../../../store/selectors/collaborator';

// === COMPONENTS === //
import DeleteButton from '../../common/Buttons/DeleteButton';

import logo from "../../../assets/logo.svg";

// === TYPESCRIPT === //
import { User } from '../../../@types/user';

// === UTILS === //
import formatPhone from '../../../utils/formatPhone';

export default function CollaboratorCard({
  id,
  firstname,
  lastname,
  phone,
  email,
  acces,
  url,
}: User) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector(findCollaborator(id as number));

  if (!user) {
    return (
      <p className="text-xl font-semibold text-center">
        Pas de collaborateur à afficher
      </p>
    );
  }

  // === HANDLERS === //
  const handleAcces = () => {
    const formData = {
      ...user,
      acces: !user.acces,
    };

    dispatch(updateAccess(formData));
  };

  const handleDelete = () => {
    dispatch(showDeleteConfirmationModal());
  };

  return (
    <article className="relative flex flex-col items-center justify-center grid-cols-1 gap-4 p-5 my-5 rounded-lg xl:grid xl:grid-cols-12 shadow-custom bg-secondary-50">
      <Link
        className="rounded-full w-[24px] aspect-square text-secondary-50 absolute top-2 right-2 flex justify-center items-center"
        onClick={handleDelete}
        to={{ search: id?.toString() }}
      >
        <DeleteButton isNotFocusable />
      </Link>
      <div className="flex col-span-4 justify-around w-full md:w-[350px] xl:w-fit xl:gap-5">
        <img
          src={url || logo}
          alt="Portrait"
          className="block rounded-full w-28 aspect-square shadow-custom"
        />

        <div className="flex flex-col items-center justify-around xl:justify-center xl:gap-4">
          <h3 className="text-center">Nom</h3>
          <p className="text-center">
            {firstname} {lastname?.toUpperCase()}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 xl:col-span-3">
        <h3 className="text-center">Numéro de téléphone</h3>
        <p>{formatPhone(phone as string)}</p>
      </div>

      <div className="flex flex-col items-center gap-4 xl:col-span-3">
        <h3 className="text-center">Adresse email</h3>
        <p>{email}</p>
      </div>

      <div className="flex flex-col items-center gap-4 xl:col-span-2">
        <h3 className="text-center">Accès</h3>
        <button
          onClick={handleAcces}
          type="button"
          aria-label="Bouton toggle pour activer l'accès à l'application"
          aria-pressed={acces ? 'true' : 'false'}
          className={`shadow-inner w-[60px] h-[30px] rounded-full  p-1 duration-150 focus:ring-2 ${
            acces ? 'bg-green-400' : 'bg-secondary-500'
          }`}
        >
          <div
            className={`h-full rounded-full aspect-square bg-secondary-100 ${
              acces ? 'translate-x-[135%]' : ''
            }`}
          />
        </button>
      </div>
    </article>
  );
}
