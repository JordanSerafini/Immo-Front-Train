// === REACT === //
import { useEffect } from 'react';

// === REACT ROUTER DOM === //
import { useParams } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import { fetchInformation } from '../../store/reducers/information';

// === COMPONENTS === //
import ReturnButton from '../../components/common/Buttons/ReturnButton';
import LeafletMap from '../../components/features/Leaflet/LeafletMap';
import Loader from '../../components/common/Loader/Loader';
import DetailSection from '../../components/layout/Sections/DetailSection';

// === UTILS === //
import capFirstLetter from '../../utils/capFirstLetter';
import formatPhone from '../../utils/formatPhone';
import formatDate from '../../utils/formatDate';
import switchIcon from '../../utils/switchIcon';

export default function Detail() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const informationState = useAppSelector((state) => state.information);
  const { information, loading, error } = informationState;

  // === LOCAL STATES === //
  // This is the default long and lat set in the back if the api don't find the adress in its DB
  const defaultLong = 2.29449;
  const defaultLat = 48.8584;

  // Params
  const { infoId } = useParams();

  // === EFFECTS === //
  useEffect(() => {
    dispatch(fetchInformation({ id: infoId }));
  }, [dispatch, infoId]);

  if (loading) {
    return (
      <>
        <div className="flex items-center gap-6 mt-5">
          <ReturnButton />
          <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
        </div>
        <Loader className="absolute w-[50px] left-1/2 top-1/4 z-30" />
      </>
    );
  }

  if (!information || error) {
    return (
      <>
        <div className="flex items-center gap-6 mt-5">
          <ReturnButton />
          <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
        </div>
        <p>Pas d&apos;information</p>
      </>
    );
  }

  // TYPE ICON SWITCH
  const icon = switchIcon(information.type);

  return (
    <>
      <div className="flex items-center gap-6 mt-5">
        <ReturnButton />
        <h1 className="text-3xl font-semibold font-poppins">Détail</h1>
      </div>

      {/* PROPERTY - SECTION */}
      <DetailSection title="Concernant le bien">
        <img src={icon} alt="Icon" className="w-[25px] inline mr-2" />
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
          <em>Information créée le : {formatDate(information.date)}</em>
        </p>
      </DetailSection>

      {/* LEAFLET MAP */}
      <DetailSection>
        {information.longitude === defaultLong &&
        information.latitude === defaultLat ? (
          <p className="italic text-center">
            L&apos;adresse fournie n&apos;a pas permis la localisation pour
            afficher la carte...
          </p>
        ) : (
          <>
            <p className="italic">
              Note: Le pointeur peut manquer un peu de précision...
            </p>
            <LeafletMap {...information} />
          </>
        )}
      </DetailSection>

      {/* OWNER */}
      <DetailSection title="Concernant le propriétaire">
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
      </DetailSection>
    </>
  );
}
