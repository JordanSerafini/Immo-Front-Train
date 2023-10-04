// Redux
import { useAppSelector, useAppDispatch } from '../../../hooks/redux';

// Reducers
import { updateAccess } from '../../../store/reducers/collaborator';

// Selector
import { findCollaborator } from '../../../store/selectors/collaborator';

// Assets
import portrait from '../../../assets/images/portrait_01.png';

// Typescript interface
import { User } from '../../../@types/user';

export default function CollabCard({
  id,
  firstname,
  lastname,
  phone,
  email,
  acces,
  url,
}: User) {
  // Hook Execution order
  const dispatch = useAppDispatch();

  // Selector
  const user = useAppSelector(findCollaborator(id as number));

  // Improvments to make here
  if (!user) {
    return <p className='text-xl font-semibold text-center'>Pas de collaborateur à afficher</p>
  }

  // Handler
  const handleAcces = () => {
    const formData = {
      ...user,
      acces: !user.acces
    }

    dispatch(updateAccess(formData))
  };

  return (
    <article className="flex flex-col items-center justify-center grid-cols-1 gap-4 p-5 my-5 rounded-lg xl:grid xl:grid-cols-12 shadow-custom bg-secondary-50">
      <div className="flex col-span-4 justify-around w-full md:w-[350px] xl:w-fit xl:gap-5">
        <img
          src={url || portrait}
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
        <p>{phone}</p>
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
          aria-label="access-toggler"
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
