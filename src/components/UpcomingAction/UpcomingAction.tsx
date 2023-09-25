// React Router
import { Link } from 'react-router-dom';

// Components
import NavBar from '../NavBar/NavBar';
import CardUpcomingAction from './CardUpcomingAction/CardUpcomingAction';

// Assets
import logo from '../../assets/logo.svg';
import upcomingActionIcon from '../../assets/icons/upcoming-action.svg';

export default function UpcomingAction() {
  return (
    <>
      <NavBar />
      <main className="m-5 md:m-10 grow">
        <Link to="/app/prospection">
          <img src={logo} alt="Logo Immo'Pros" className="sm:hidden" />
        </Link>

        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <img
            src={upcomingActionIcon}
            alt="Action to do Icon"
            className="w-[50px]"
          />
          <h1>
            Actions à venir
          </h1>
        </div>

        <ul className="grid gap-5 lg:grid-cols-2">
          <CardUpcomingAction
            address="5, rue de la Liberté 95190 GOUSSAINVILLE"
            owner="Mr et Mme AKHTAR"
            type="maison"
            notificationDate="20/02/2023"
          />
          <CardUpcomingAction
            address="25, boulevard Roger Salengro 95190 GOUSSAINVILLE"
            owner="Mr et Mme DUCHAUFFOUR"
            type="maison"
            notificationDate="22/02/2023"
          />
          <CardUpcomingAction
            address="12, rue du Montoir Saint-Nicolas 95190 FONTENAY-EN-PARISIS"
            owner="Mr VIFFRY"
            type="appartement"
            notificationDate="25/02/2023"
          />
          <CardUpcomingAction
            address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
            owner="Mr ALCARAZ"
            type="terrain"
            notificationDate="02/03/2023"
          />
          <CardUpcomingAction
            address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
            owner="Mr ALCARAZ"
            type="terrain"
            notificationDate="02/03/2023"
          />
          <CardUpcomingAction
            address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
            owner="Mr ALCARAZ"
            type="terrain"
            notificationDate="02/03/2023"
          />
        </ul>
      </main>
    </>
  );
}
