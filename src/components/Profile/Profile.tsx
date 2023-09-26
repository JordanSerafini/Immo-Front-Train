// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import NavBar from '../NavBar/NavBar';
import PersonnalInfo from './PersonnalInfo/PersonnalInfo';
import ValidButton from '../SharedComponents/Buttons/ValidButton';

// Assets
import portrait from '../../assets/images/portrait_01.png';

export default function Profile() {
  const user = useAppSelector((state) => state.user.data);

  return (
    <>
      <NavBar />
      <main className="z-0 m-5 md:m-10 grow">
        <h1 className="mt-20 text-3xl font-semibold text-center font-poppins md:mt-10">
          Mon profil
        </h1>

        <section className="relative max-w-[600px] p-4 pt-20 m-auto mt-32 rounded-lg md:pt-28 shadow-custom bg-secondary-50">
          <div>
            <div className="absolute top-[-6rem] left-1/2 w-40 md:w-48 rounded-full aspect-square shadow-accent translate-x-[-50%] -z-10 " />
            <img
              className="absolute top-[-6rem] w-40 md:w-48 rounded-full left-1/2 translate-x-[-50%]"
              src={portrait}
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
          <h2 className="text-lg font-semibold font-poppins">
            Informations personnelles
          </h2>

          <ValidButton
            className="absolute top-2 right-2"
            content="Éditer"
            onClickMethod={() => {
              console.log('Edit profil');
            }}
          />

          <div className="grid grid-cols-2 m-2">
            <PersonnalInfo label="Prénom" content={user.firstname} />
            <PersonnalInfo label="Nom" content={user.lastname} />
          </div>

          <div className="grid justify-between grid-cols-1 m-2 lg:grid-cols-2">
            <PersonnalInfo label="Téléphone" content={user.phone} />
            <PersonnalInfo label="Email" content={user.email} />
          </div>
        </section>
      </main>
    </>
  );
}
