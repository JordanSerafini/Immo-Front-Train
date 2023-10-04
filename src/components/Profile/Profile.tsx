// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import EditFirstname from './EditFirstname/EditFirstname';
import EditLastname from './EditLastname/EditLastname';
import EditPhone from './EditPhone/EditPhone';
import EditEmail from './EditEmail/EditEmail';

// Assets
import portrait from '../../assets/images/portrait_01.png';

export default function Profile() {
  // Redux state
  const user = useAppSelector((state) => state.collaborator.user);

  return (
    <>
      <h1 className="mt-20 text-3xl font-semibold text-center font-poppins md:mt-10">
        Mon profil
      </h1>

      <section className="relative max-w-[600px] p-4 pt-20 m-auto mt-32 rounded-lg md:pt-28 shadow-custom bg-secondary-50">
        <div>
          <div className="absolute top-[-6rem] left-1/2 w-40 md:w-48 rounded-full aspect-square shadow-accent translate-x-[-50%] -z-10 " />
          <img
            className="absolute top-[-6rem] w-40 md:w-48 rounded-full left-1/2 translate-x-[-50%]"
            src={user.url || portrait}
            alt="Profile portrait"
          />
        </div>

        <p className="text-xl text-center">
          {user.firstname}{' '}
          <span className="font-semibold">
            {user.lastname?.toLocaleUpperCase()}
          </span>
        </p>
        <p className="mt-2 text-2xl italic font-semibold text-center text-secondary-600">
          {user.role_id === 1 ? 'ADMINISTRATEUR' : 'NÉGOCIATEUR'}
        </p>
      </section>

      <section className="relative max-w-[600px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
        <h2 className="text-lg">
          Informations personnelles
        </h2>

        <div className="grid lg:gap-4 lg:grid-cols-2">
          {/* REFACTO POSSIBLE FOR EDIT FORMS */}
          <EditFirstname firstname={user.firstname} />
          <EditLastname lastname={user.lastname} />
        </div>

        <EditPhone phoneNumber={user.phone} />
        <EditEmail email={user.email} />
      </section>
    </>
  );
}
