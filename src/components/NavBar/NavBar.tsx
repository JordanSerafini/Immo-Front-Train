// React Router
import { Link, NavLink } from 'react-router-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { toggleNavBar } from '../../store/reducers/navbar';

// Style
import './animation.scss';

// Assets
import logo from '../../assets/logo.svg';
import hamburger from '../../assets/icons/hamburger.svg';
import cross from '../../assets/icons/cross.svg';
import portait from '../../assets/images/portrait_01.png';
import home from '../../assets/icons/home.svg';
import actionToDo from '../../assets/icons/action-to-do.svg';
import upcomingAction from '../../assets/icons/upcoming-action.svg';
import logout from '../../assets/icons/log-out.svg';

// Components
import Divider from './Divider/Divider';

export default function NavBar() {
  const dispatch = useAppDispatch();

  const isNavBarOpen = useAppSelector((state) => state.navbar.isNavBarOpen);

  const handleClick = () => {
    dispatch(toggleNavBar());
  };

  return (
    <>
      <button
        type="button"
        className="absolute z-20 w-8 h-10 border-none top-8 right-5 navbar-btn sm:hidden"
        onClick={handleClick}
      >
        <img
          className="w-full h-full"
          src={isNavBarOpen ? cross : hamburger}
          alt="burger button icon"
        />
      </button>
      <header
        className={`z-10 absolute flex shadow-custom flex-col items-center p-4 pt-16 top-0 right-0 w-3/4 h-screen bg-secondary-50 sm:sticky sm:opacity-100 sm:translate-x-[0%] sm:w-[32vw] sm:pt-0 md:w-72 duration-300 ease-in-out ${
          isNavBarOpen ? 'opacity-100 translate-x-[0%]' : 'translate-x-[100%] opacity-0'
        }`}
      >
        <img
          src={logo}
          alt="ImmoPros Logo"
          className="hidden sm:block sm:my-5"
        />
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
          <ul className="w-full">
            <li>
              <NavLink
                to="/app/prospection"
                className="flex w-full gap-2 px-4 py-3 duration-300 rounded-lg bg-secondary-200 hover:bg-secondary-200"
              >
                <img src={home} alt="home icon" />
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="flex w-full gap-2 px-4 py-3 duration-300 rounded-lg hover:bg-secondary-200"
              >
                <img src={actionToDo} alt="action-to-do icon" />
                Actions à faire
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className="flex w-full gap-2 px-4 py-3 duration-300 rounded-lg hover:bg-secondary-200"
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
