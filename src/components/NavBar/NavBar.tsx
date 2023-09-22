// React Router
import { Link, NavLink, useLocation } from 'react-router-dom';

// Redux Hooks
import { useAppSelector } from '../../hooks/redux';

// Style
import './animation.scss';

// Assets
import logo from '../../assets/logo.svg';
import portait from '../../assets/images/portrait_01.png';
import home from '../../assets/icons/home.svg';
import actionToDo from '../../assets/icons/action-to-do.svg';
import upcomingAction from '../../assets/icons/upcoming-action.svg';
import logout from '../../assets/icons/log-out.svg';

// Components
import Divider from './Divider/Divider';
import NavBarButton from './NavBarButton/NavBarButton';

export default function NavBar() {
  // Hook Execution Order

  const location = useLocation();

  // Check if the user is on the Prospection page
  const isProspectionRoute = location.pathname.endsWith('/prospection');

  const isNavBarOpen = useAppSelector((state) => state.navbar.isNavBarOpen);

  return (
    <>
      <NavBarButton navBarStatus={isNavBarOpen} />
      <header
        className={`z-10 absolute flex shadow-custom flex-col items-center p-4 pt-16 top-0 right-0 w-3/4 h-screen bg-secondary-50 sm:sticky sm:opacity-100 sm:translate-x-[0%] sm:pt-0 sm:max-w-[250px] duration-300 ease-in-out ${
          isNavBarOpen
            ? 'opacity-100 translate-x-[0%]'
            : 'translate-x-[100%] opacity-0'
        }`}
      >
        <Link to="/app/prospection">
          <img
            src={logo}
            alt="ImmoPros Logo"
            className="hidden sm:block sm:my-5"
          />
        </Link>
        <Divider />
        <section className="flex flex-wrap items-center justify-center gap-5 py-6">
          <img
            className="rounded-full w-28 shadow-custom"
            src={portait}
            alt="Collaborator Portrait"
          />
          <div className="flex flex-col items-center gap-5">
            <h3 className="text-xl text-center font-poppins">
              Jean <span className="font-semibold">DUPONT</span>
            </h3>
            <Link to="/app/profile/1" className="underline underline-offset-4">
              Mon profil
            </Link>
          </div>
        </section>

        <Divider />
        <h2 className="my-5 text-2xl italic font-medium font-poppins">
          NEGOCIATEUR
        </h2>

        <nav className="flex w-full grow">
          <ul className="flex flex-col w-full gap-1">
            <li>
              <NavLink
                to="/app/prospection"
                className={({ isActive }) =>
                  `flex w-full gap-2 px-4 py-3 duration-300 rounded-lg hover:bg-secondary-200 ${
                    isActive && 'bg-secondary-200'
                  }`
                }
              >
                <img src={home} alt="home icon" />
                Accueil
              </NavLink>
            </li>
            <li className={`${isProspectionRoute && 'lg:hidden'}`}>
              <NavLink
                to="/app/actionToDo"
                className={({ isActive }) =>
                  `flex w-full gap-2 px-4 py-3 duration-300 rounded-lg hover:bg-secondary-200 ${
                    isActive && 'bg-secondary-200'
                  }`
                }
              >
                <img src={actionToDo} alt="action-to-do icon" />
                Actions à faire
              </NavLink>
            </li>
            <li className={`${isProspectionRoute && 'lg:hidden'}`}>
              <NavLink
                to="/app/upcomingAction"
                className={({ isActive }) =>
                  `flex w-full gap-2 px-4 py-3 duration-300 rounded-lg hover:bg-secondary-200 ${
                    isActive && 'bg-secondary-200'
                  }`
                }
              >
                <img src={upcomingAction} alt="upcoming-action icon" />
                Actions à venir
              </NavLink>
            </li>
          </ul>
        </nav>

        <Link
          to="/support"
          className="mb-4 text-sm underline underline-offset-4 text-secondary-500"
        >
          Contactez le support
        </Link>
        <Divider />
        <button
          type="button"
          className="flex gap-2 p-3 my-4 duration-300 rounded-xl hover:bg-secondary-200"
        >
          <img src={logout} alt="logout icon" />
          Se déconnecter
        </button>
      </header>
    </>
  );
}
