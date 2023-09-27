// React Hooks
import { useState } from 'react';

// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import MainSection from '../SharedComponents/MainSection/MainSection';
import PersonnalInfo from './PersonnalInfo/PersonnalInfo';
import Input from '../Modals/AddInfoModal/Field/Input';

// Assets
import portrait from '../../assets/images/portrait_01.png';
import pencilIcon from '../../assets/icons/edit-pencil.svg';
import checkIcon from '../../assets/icons/check-circle.svg';

export default function Profile() {
  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Local states
  const [editLastname, setEditLastname] = useState<boolean>(false);
  const [lastnameValue, setLastnameValue] = useState<string | undefined>(user.lastname);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditLastname(!editLastname);
  };

  return (
    <MainSection className="z-0">
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

        <div className="grid grid-cols-2 m-2">
          <PersonnalInfo label="Prénom" content={user.firstname} />
          <div>
            <p className="relative font-semibold w-fit text-secondary-600">
              Nom
              <button
                type="button"
                onClick={handleEditLastname}
                className="absolute top-0 right-0 translate-x-[110%] hover:scale-105 duration-300"
              >
                <img src={pencilIcon} alt="Pencil" />
              </button>
            </p>
            {editLastname ? (
              <form>
                <Input
                  inputName="lastname"
                  className='relative'
                  value={lastnameValue}
                  onChange={setLastnameValue}
                  placeholder="Entrez votre nom"
                >
                  <button type="submit" className='absolute z-10 flex gap-2 p-[0.35rem] font-semibold rounded-md top-1/2 right-2 translate-y-[-50%] text-secondary-50 bg-primary-300 hover:shadow-primary duration-300'>
                  Ok <img src={checkIcon} alt="check" />
                  </button>
                </Input>
              </form>
            ) : (
              <p className="md:text-lg">{user.lastname}</p>
            )}
          </div>
        </div>

        <div className="grid justify-between grid-cols-1 m-2 lg:grid-cols-2">
          <PersonnalInfo label="Téléphone" content={user.phone} />
          <PersonnalInfo label="Email" content={user.email} />
        </div>
      </section>
    </MainSection>
  );
}
