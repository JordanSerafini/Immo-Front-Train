// React Router
import { Link } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import NavBar from '../NavBar/NavBar';
import CardActionToDo from './CardActionToDo/CardActionToDo';

// Assets
import logo from '../../assets/logo.svg';
import actionToDoIcon from '../../assets/icons/action-to-do.svg';

// utils
import filteredActionToDo from '../../utils/filteredActionToDo';

export default function ActionToDo() {
  const informations = useAppSelector((state) => state.information.informations);

  const actionToDo = filteredActionToDo(informations)

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
          {actionToDo.map(information => (
            <CardActionToDo key={information.id} {...information} />
          ))}
        </ul>
      </main>
    </>
  );
}
