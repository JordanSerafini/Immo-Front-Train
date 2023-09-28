// React Router
import { Link } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import NavBar from '../NavBar/NavBar';
import CardUpcomingAction from './CardUpcomingAction/CardUpcomingAction';

// Assets
import logo from '../../assets/logo.svg';
import upcomingActionIcon from '../../assets/icons/upcoming-action.svg';

// utils
import filteredUpcomingAction from '../../utils/filteredUpcomingAction';

export default function UpcomingAction() {
  const informations = useAppSelector(
    (state) => state.information.informations
  );

  const upcomingAction = filteredUpcomingAction(informations)
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
          <h1>Actions à venir</h1>
        </div>

        <ul className="grid gap-5 lg:grid-cols-2">
          {upcomingAction.map((information) => (
            <CardUpcomingAction key={information.id} {...information} />
          ))}
        </ul>
      </main>
    </>
  );
}
