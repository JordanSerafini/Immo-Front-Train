// React Router
import { Link } from 'react-router-dom';

// Components
import NavBar from '../NavBar/NavBar';
import CardActionToDo from './CardActionToDo/CardActionToDo';

// Assets
import logo from '../../assets/logo.svg';
import actionToDoIcon from '../../assets/icons/action-to-do.svg';

export default function ActionToDo() {
  return (
    <>
      <NavBar />
      <main className="m-5 md:m-10 grow">
        <Link to="/app/prospection">
          <img src={logo} alt="Logo Immo'Pros" className="sm:hidden" />
        </Link>

        <div className="flex flex-col items-center justify-center gap-2 mb-6">
          <img
            src={actionToDoIcon}
            alt="Action to do Icon"
            className="w-[50px]"
          />
          <h1>
            Actions à faire
          </h1>
        </div>

        <ul className="grid gap-5 lg:grid-cols-2">
          <CardActionToDo
            address="5, rue de la Liberté 95190 GOUSSAINVILLE"
            owner="Mr et Mme AKHTAR"
            type="maison"
          />
          <CardActionToDo
            address="25, boulevard Roger Salengro 95190 GOUSSAINVILLE"
            owner="Mr et Mme DUCHAUFFOUR"
            type="maison"
          />
          <CardActionToDo
            address="12, rue du Montoir Saint-Nicolas 95190 FONTENAY-EN-PARISIS"
            owner="Mr VIFFRY"
            type="appartement"
          />
          <CardActionToDo
            address="43, rue Lucien Mèche 95190 GOUSSAINVILLE"
            owner="Mr ALCARAZ"
            type="terrain"
          />
        </ul>
      </main>
    </>
  );
}
