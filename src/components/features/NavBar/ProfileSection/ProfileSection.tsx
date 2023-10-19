// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === TYPESCRIPT === //
import { User } from '../../../../@types/user';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { hideNavBar } from '../../../../store/reducers/navbar';

export default function ProfileSection({
  url,
  firstname,
  lastname,
  id,
  role_id,
}: User) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  return (
    <section className="flex flex-col items-center justify-center gap-5 py-2 sm:py-[2vh]">
      <img
        className="object-cover w-20 rounded-full sm:w-28 aspect-square shadow-custom navbar__profile-img"
        src={url}
        alt="Collaborator Portrait"
      />
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-xl font-normal text-center font-poppins">
          {firstname}{' '}
          <span className="font-semibold">{lastname?.toLocaleUpperCase()}</span>
        </h3>
        {role_id === 2 && (
          <Link
            to={`/app/profile/${id}`}
            className="underline underline-offset-4"
            onClick={() => dispatch(hideNavBar())}
          >
            Mon profil
          </Link>
        )}
      </div>
    </section>
  );
}
