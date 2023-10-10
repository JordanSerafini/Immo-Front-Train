// React
import { useEffect } from 'react';

// React router
import { useParams, Link } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { fetchInformation } from '../../store/reducers/information';

// Components
import LeafletMap from '../../components/features/Leaflet/LeafletMap';

// Assets
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';
import loader from '../../assets/loader/tail-spin.svg';
import houseIcon from '../../assets/icons/house.svg';
import apartmentIcon from '../../assets/icons/apartment.svg';
import landIcon from '../../assets/icons/land.svg';

// Utils
import capFirstLetter from '../../utils/capFirstLetter';
import formatPhone from '../../utils/formatPhone';

export default function Detail() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Local State
  const defaultLong = 2.29449;
  const defaultLat = 48.8584;

  // Redux state
  const information = useAppSelector((state) => state.information.information);
  const isLoading = useAppSelector((state) => state.information.loading);
  const isError = useAppSelector((state) => state.information.error);

  const { infoId } = useParams();

  useEffect(() => {
    dispatch(fetchInformation({ id: infoId }));
  }, [dispatch, infoId]);

  if (isLoading) {
    return (
      <>
        <div className="flex items-center gap-6 mt-5">
          <Link to="/app/prospection">
            <img
              className="p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300"
              src={arrowLeftIcon}
              alt="Go back to Home Page"
            />
          </Link>
          <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
        </div>
        <img
          className="absolute w-[50px] left-1/2 top-1/4 z-30"
          src={loader}
          alt="Loader"
        />
      </>
    );
  }

  if (!information || isError) {
    return (
      <>
        <div className="flex items-center gap-6 mt-5">
          <Link to="/app/prospection">
            <img
              className="p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300"
              src={arrowLeftIcon}
              alt="Go back to Home Page"
            />
          </Link>
          <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
        </div>
        <p>Pas d&apos;information</p>
      </>
    );
  }

  // TYPE ICON SWITCH
  let icon: string;
  switch (information.type.toLowerCase()) {
    case 'maison':
      icon = houseIcon;
      break;
    case 'appartement':
      icon = apartmentIcon;
      break;
    case 'terrain':
      icon = landIcon;
      break;
    default:
      icon = '';
  }

  return (
    <>
      <div className="flex items-center gap-6 mt-5">
        <Link to="/app/prospection">
          <img
            className="p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300"
            src={arrowLeftIcon}
            alt="Go back to Home Page"
          />
        </Link>
        <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
      </div>
      {/* p style in "./detail.css" */}

      {/* PROPERTY - SECTION */}
      <section className="max-w-[800px] p-4 m-auto my-5 rounded-lg shadow-custom bg-secondary-50">
        <h2 className="mb-4">Concernant le bien</h2>

        <img src={icon} alt={`${icon} Icon`} className="w-[25px] inline mr-2" />
        <p className="inline md:text-lg">
          {information.address_number} {information.address_street}{' '}
          {information.code_zip} {information.address_city.toLocaleUpperCase()}
        </p>

        {/* MORE INFOS */}
        {information.address_info && (
          <>
            <h3 className="my-4">Informations complémentaires:</h3>
            <p className="md:text-lg">{information.address_info}</p>
          </>
        )}

        <p className="block mt-5 ml-auto">
          <em className="italic">
            Information créée le : {information?.date.slice(0, 10)}
          </em>
        </p>
      </section>

      {/* LEAFLET MAP */}
      <section className="max-w-[800px] p-4 my-5 m-auto rounded-lg shadow-custom bg-secondary-50">
        {information.longitude === defaultLong &&
        information.latitude === defaultLat ? (
          <p className="italic text-center">L&apos;adresse fournie n&apos;a pas permis la localisation pour afficher la carte...</p>
        ) : (
          <>
            <p className='italic'>Note: Le pointeur peut manquer un peu de précision...</p>
            <LeafletMap {...information} />
          </>
        )}
      </section>

      {/* OWNER */}
      <section className="max-w-[800px] p-4 mb-20 sm:mb-5 m-auto rounded-lg shadow-custom bg-secondary-50">
        <h2>Concernant le propriétaire</h2>
        <p className="md:text-lg">{information.owner_name}</p>

        {(information.owner_email ||
          information.phone_1 ||
          information.phone_2) && (
          <>
            <h3 className="mt-4">Ses coordonnnées</h3>
            <p className="md:text-lg">{information.owner_email}</p>
            <p className="md:text-lg">{formatPhone(information.phone_1)}</p>
            <p className="md:text-lg">{formatPhone(information.phone_2)}</p>
          </>
        )}

        <h3 className="mt-4">Source de l&apos;information</h3>
        <p className="md:text-lg">{information.source}</p>

        <h3 className="mt-4">Catégorie</h3>
        <p className="text-lg font-semibold text-accent-400 md:text-xl">
          {capFirstLetter(information.category)}
        </p>

        <h3 className="mt-4">Commentaires</h3>
        <p className="md:text-lg">
          {information?.comment
            ? `${information.comment}`
            : 'Pas de commentaire...'}
        </p>
      </section>
    </>
  );
}
