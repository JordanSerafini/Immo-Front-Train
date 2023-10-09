// React Router
import { Link } from 'react-router-dom';
// Typescript interface
import { User } from '../../../@types/user';

export default function ProfileSection({
  url,
  firstname,
  lastname,
  id,
  role_id,
  closeNavBarMethod,
}: User & {
  closeNavBarMethod: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-5 py-2 sm:py-[2vh]">
      <img
        className="w-20 rounded-full sm:w-28 aspect-square shadow-custom navbar__profile-img"
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
            onClick={closeNavBarMethod}
          >
            Mon profil
          </Link>
        )}
      </div>
    </section>
  );
}
