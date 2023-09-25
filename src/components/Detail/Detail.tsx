// React
import { useEffect } from 'react';

// React router
import { useParams, Link } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { fetchInformation } from '../../store/reducers/information';

// Components
import NavBar from '../NavBar/NavBar';

// Assets
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';

export default function Detail() {
  const dispatch = useAppDispatch();

  const information = useAppSelector((state) => state.info.data);

  const { infoId } = useParams();

  useEffect(() => {
    dispatch(fetchInformation({ id: infoId }));
  }, [dispatch, infoId]);

  console.log(information);

  return (
    <>
      <NavBar />
      <main className="m-5 md:m-10 grow">
        <div className='flex items-center gap-6'>
          <Link to="/app/prospection">
            <img className='p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300' src={arrowLeftIcon} alt="Go back to Home Page" />
          </Link>
          <h1 className="text-xl font-semibold font-poppins md:text-3xl">
            Détail
          </h1>
        </div>

        <section className='max-w-[800px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50'>
          <h2 className='text-xl font-semibold font-poppins md:text-2xl'>Localisation</h2>

          <p className='md:text-lg'>{information?.adress_number} {information?.adress_street} {information?.code_zip} {information?.adress_city.toLocaleUpperCase()}</p>

          <h2 className='mt-2 text-xl font-semibold font-poppins md:text-2xl'>Informations complémentaires:</h2>
          {information?.adress_info ? (<p className='md:text-lg'>{information.adress_info}</p>) : (<p className='md:text-lg'>Pas d&apos;information complémentaires...</p>)}
        </section>
      </main>
    </>
  );
}
