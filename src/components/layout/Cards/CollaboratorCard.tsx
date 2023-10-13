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
          src={
            url ||
            'data:image/jpeg;base64,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'
          }
          alt="Portrait"
          className="rounded-full w-28 aspect-square shadow-custom"
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
