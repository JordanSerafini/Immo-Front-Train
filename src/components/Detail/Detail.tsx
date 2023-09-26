// React
import { useEffect } from 'react';

// React router
import { useParams, Link } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { fetchInformation } from '../../store/reducers/information';

// Components
import MainSection from '../SharedComponents/MainSection/MainSection';

// Assets
import arrowLeftIcon from '../../assets/icons/arrow-left.svg';

export default function Detail() {
  const dispatch = useAppDispatch();

  const information = useAppSelector((state) => state.info.data);

  const { infoId } = useParams();

  useEffect(() => {
    dispatch(fetchInformation({ id: infoId }));
  }, [dispatch, infoId]);

  return (
    <MainSection>
        <div className="flex items-center gap-6 mt-5">
          <Link to="/app/prospection">
            <img
              className="p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300"
              src={arrowLeftIcon}
              alt="Go back to Home Page"
            />
          </Link>
          <h1 className="text-3xl font-semibold font-poppins">
            Détail
          </h1>
        </div>

        <section className="max-w-[800px] p-4 m-auto mt-10 rounded-lg shadow-custom bg-secondary-50">
          {/* p style in "./detail.css" */}
          <h2>Type de bien</h2>
          <p className="md:text-lg">{information?.type}</p>

          <h2 className="mt-4">Localisation</h2>
          <p className="md:text-lg">
            {information?.address_number} {information?.address_street}{' '}
            {information?.code_zip}{' '}
            {information?.address_city.toLocaleUpperCase()}
          </p>

          <h2 className="mt-4">Informations complémentaires:</h2>
          <p className="md:text-lg">
            {information?.address_info
              ? `${information.address_info}`
              : "Pas d'information complémentaires..."}
          </p>

          <h2 className="mt-4">Propriétaires</h2>
          <p className="md:text-lg">{information?.owner_name}</p>
          <p className="md:text-lg">{information?.owner_email}</p>

          <h2 className="mt-4">Source de l&apos;information</h2>
          <p className="md:text-lg">{information?.source}</p>

          <h2 className="mt-4">Catégorie</h2>
          <p className="text-lg font-semibold text-accent-400 md:text-xl">
            {information?.category}
          </p>

          <h2 className="mt-4">Commentaires</h2>
          <p className="md:text-lg">
            {information?.comment
              ? `${information.comment}`
              : 'Pas de commentaire...'}
          </p>

          <p className="mt-10 ml-auto">
            <em className="italic">
              Information créée le : {information?.date.slice(0, 10)}
            </em>
          </p>
        </section>
    </MainSection>
  );
}
