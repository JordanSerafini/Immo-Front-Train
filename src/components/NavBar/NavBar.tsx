// React Router
import { Link } from 'react-router-dom';

// Redux Hooks
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { hideNavBar } from '../../store/reducers/navbar';
import { logout } from '../../store/reducers/user';
import { resetInformations } from '../../store/reducers/informations';

// Components
import Logo from '../SharedComponents/Logo/Logo';
import Divider from '../SharedComponents/Divider/Divider';
import NavBarButton from './NavBarButton/NavBarButton';
import ProfileSection from './ProfileSection/ProfileSection';
import Navigation from './Navigation/Navigation';
import axiosInstance from '../../utils/axios';

// Assets
import logoutIcon from '../../assets/icons/log-out.svg';
import loader from '../../assets/loader/tail-spin.svg';

// Style
import './animation.scss';

export default function NavBar() {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux states
  const user = useAppSelector((state) => state.user.data);
  const { loading } = useAppSelector((state) => state.user);

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
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common.Authorization;
    dispatch(logout());
  };

  return (
    <>
      {/* HAMBURGER BUTTON */}
      <NavBarButton navBarStatus={isNavBarOpen} />

      {/* NAVBAR */}
      <header
        className={`z-10 absolute flex shadow-custom flex-col items-center p-4 pt-16 top-0 right-0 w-3/4 h-screen bg-secondary-50 sm:sticky sm:opacity-100 sm:translate-x-[0%] sm:pt-0 sm:max-w-[250px] duration-300 ease-in-out ${
          isNavBarOpen
            ? 'opacity-100 translate-x-[0%]'
            : 'translate-x-[100%] opacity-0'
        }`}
      >
        {loading ? (
          <img src={loader} alt="Loader" className="m-auto" />
        ) : (
          <>
            {/* LOGO */}
            <Logo className="hidden sm:block sm:my-5" />

            <Divider />

            {/* PROFILE SECTION */}
            <ProfileSection {...user} closeNavBarMethod={closeNavBar} />

            <Divider />

            <h2 className="my-5 text-2xl italic font-medium font-poppins">
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
              className="flex gap-2 p-3 my-4 duration-300 rounded-xl hover:bg-secondary-200"
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
