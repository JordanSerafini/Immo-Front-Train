// React Router
import { Link } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Assets
import portait from '../../../assets/images/portrait_01.png';

export default function ProfileSection({
  closeNavBarMethod,
}: {
  closeNavBarMethod: () => void;
}) {
  const user = useAppSelector((state) => state.user.data);

  return (
    <section className="flex flex-wrap items-center justify-center gap-5 py-6">
      <img
        className="rounded-full w-28 shadow-custom"
        src={user.url || portait}
        alt="Collaborator Portrait"
      />
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-xl text-center font-poppins">
          {user.firstname}{' '}
          <span className="font-semibold">
            {user.lastname?.toLocaleUpperCase()}
          </span>
        </h3>
        <Link
          to={`/app/profile/${user.id}`}
          className="underline underline-offset-4"
          onClick={closeNavBarMethod}
        >
          Mon profil
        </Link>
      </div>
    </section>
  );
}
