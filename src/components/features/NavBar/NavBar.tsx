// React Router
import { Link } from 'react-router-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// Store
import { hideNavBar } from '../../../store/reducers/navbar';
import { logout } from '../../../store/reducers/collaborator';
import { resetInformations } from '../../../store/reducers/information';

// Components
import Logo from '../../layout/Logo/Logo';
import Divider from '../../common/Divider/Divider';
import NavBarButton from './NavBarButton/NavBarButton';
import ProfileSection from './ProfileSection/ProfileSection';
import Navigation from './Navigation/Navigation';
import axiosInstance from '../../../utils/axios';

// Assets
import logoutIcon from '../../../assets/icons/log-out.svg';
import loader from '../../../assets/loader/tail-spin.svg';

// Style
import "./styles/navbar.scss";

export default function NavBar() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const user = useAppSelector((state) => state.collaborator.user);
  const { loading } = useAppSelector((state) => state.collaborator);

  const isNavBarOpen = useAppSelector((state) => state.navbar.isNavBarOpen);

  // Functions
  const closeNavBar = () => {
    dispatch(hideNavBar());
  };

  const handleLogout = () => {
    // We want to hide the navbar for the logout so when the user RE connect, the navbar is closed
    dispatch(hideNavBar());
    // We want to reset the redux state of Informations to make a new fetch
    // We do that to prevent a bad state display => Imagine the user uses the app on his phone, it will change the informations values in DB but NOT in the state
    dispatch(resetInformations());

    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    delete axiosInstance.defaults.headers.common.Authorization;
    dispatch(logout());
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <NavBarButton navBarStatus={isNavBarOpen} />

      {/* NAVBAR */}
      <header
        className={`z-30 fixed flex shadow-custom flex-col items-center p-4 pt-[5vh] pb-[10vh] sm:py-2 top-0 right-0 w-3/4 h-full bg-secondary-50 sm:sticky sm:opacity-100 sm:translate-x-[0%] sm:pt-0 sm:max-w-[250px] duration-300 ease-in-out ${
          isNavBarOpen
            ? 'opacity-100 translate-x-[0%]'
            : 'translate-x-[100%] opacity-0'
        } navbar`}
      >
        {loading ? (
          <img src={loader} alt="Loader" className="m-auto" />
        ) : (
          <>
            {/* LOGO */}
            <Logo
              path={
                user.role_id === 2 ? '/app/prospection' : '/admin/collaborator'
              }
              className="hidden sm:block sm:my-5 navbar__logo"
            />

            {/* PROFILE SECTION */}
            <ProfileSection {...user} closeNavBarMethod={closeNavBar} />

            <Divider />

            <h2 className="my-2 italic font-medium sm:my-[2vh]">
              {user.role_id === 2 ? 'NÉGOCIATEUR' : 'ADMINISTRATEUR'}
            </h2>

            {/* NAVIGATION LINKS */}
            <Navigation closeNavBarMethod={closeNavBar} />

            <Link
              to="/support"
              className="mb-4 text-sm underline underline-offset-4 text-secondary-500"
            >
              Contactez le support
            </Link>

            <Divider />

            {/* DISCONNECT BUTTON */}
            <button
              type="button"
              className="flex gap-2 p-3 my-2 duration-300 rounded-xl hover:bg-secondary-200"
              onClick={handleLogout}
            >
              <img src={logoutIcon} alt="logout icon" />
              Se déconnecter
            </button>
          </>
        )}
      </header>
    </>
  );
}
