// React Router
import { Link } from 'react-router-dom';
// Typescript interface
import { User } from '../../../@types/user';

export default function ProfileSection({
  url,
  firstname,
  lastname,
  id,
  closeNavBarMethod,
}: User & {
  closeNavBarMethod: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-5 py-4 sm:py-6">
      <img
        className="rounded-full w-28 aspect-square shadow-custom"
        src={url}
        alt="Collaborator Portrait"
      />
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-xl font-normal text-center font-poppins">
          {firstname}{' '}
          <span className="font-semibold">{lastname?.toLocaleUpperCase()}</span>
        </h3>
        <Link
          to={`/app/profile/${id}`}
          className="underline underline-offset-4"
          onClick={closeNavBarMethod}
        >
          Mon profil
        </Link>
      </div>
    </section>
  );
}
