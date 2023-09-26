// React
import { useEffect } from 'react';

// React Router
import { Link, NavLink, useLocation } from 'react-router-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { hideNavBar } from '../../store/reducers/navbar';
// import { login } from '../../store/reducers/user';

// Style
import './animation.scss';

// Assets
import logo from '../../assets/logo.svg';
import portait from '../../assets/images/portrait_01.png';
import home from '../../assets/icons/home.svg';
import actionToDo from '../../assets/icons/action-to-do.svg';
import upcomingAction from '../../assets/icons/upcoming-action.svg';
import logout from '../../assets/icons/log-out.svg';
import loader from '../../assets/loader/tail-spin.svg';

// Components
import Divider from './Divider/Divider';
import NavBarButton from './NavBarButton/NavBarButton';

export default function NavBar() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.data);

  const isLoading = useAppSelector((state) => state.user.loading);

  // useEffect(() => {
  //   if (!user.logged) {
  //     dispatch(fetchLogin());
  //   }
  // }, [user, dispatch]);

  // Hook Execution Order
  const location = useLocation();
  // Check if the user is on the Prospection page
  const isProspectionRoute = location.pathname.endsWith('/prospection');

  const isNavBarOpen = useAppSelector((state) => state.navbar.isNavBarOpen);

  const closeNavBar = () => {
    dispatch(hideNavBar());
  };

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
        {isLoading ? (
          <img src={loader} alt="Loader" className='m-auto' />
        ) : (
          <>
            {/* LOGO */}
            <Link to="/app/prospection">
              <img
                src={logo}
                alt="ImmoPros Logo"
                className="hidden sm:block sm:my-5"
              />
            </Link>

            <Divider />

            {/* Profile Section */}
            <section className="flex flex-wrap items-center justify-center gap-5 py-6">
              <img
                className="rounded-full w-28 shadow-custom"
                src={portait}
                alt="Collaborator Portrait"
              />
              <div className="flex flex-col items-center gap-5">
                <h3 className="text-xl text-center font-poppins">
                  {user.firstname}{' '}
                  <span className="font-semibold">
                    {user.lastname?.toLocaleUpperCase()}
                  </span>
                </h3>
                <Link
                  to={`/app/profile/${user.id}`}
                  className="underline underline-offset-4"
                  onClick={closeNavBar}
                >
                  Mon profil
                </Link>
              </div>
            </section>

            <Divider />

            <h2 className="my-5 text-2xl italic font-medium font-poppins">
              {user.role_id === 2 ? 'NÉGOCIATEUR' : 'ADMINISTRATEUR'}
            </h2>

            {/* Navigation */}
            <nav className="flex w-full grow">
              <ul className="flex flex-col w-full gap-1">
                {/* Accueil */}
                <li>
                  <NavLink
                    onClick={closeNavBar}
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
                {/* Actions à faire */}
                {/* className={`${isProspectionRoute && 'lg:hidden'}`} => Add this code to hide the navlink when the user is on the prospection page and his view width is above lg */}
                <li>
                  <NavLink
                    onClick={closeNavBar}
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
                {/* Actions à venir */}
                {/* className={`${isProspectionRoute && 'lg:hidden'}`} => Add this code to hide the navlink when the user is on the prospection page and his view width is above lg */}
                <li>
                  <NavLink
                    onClick={closeNavBar}
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
          </>
        )}
      </header>
    </>
  );
}
