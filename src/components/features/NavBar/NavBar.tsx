// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import { hideNavBar } from '../../../store/reducers/navbar';
import {
  logout,
  resetCollaborators,
} from '../../../store/reducers/collaborator';
import { resetInformations } from '../../../store/reducers/information';
import { resetSectors } from '../../../store/reducers/sector';
import { resetStats } from '../../../store/reducers/stats';

// === COMPONENTS === //
import Logo from '../../layout/Logo/Logo';
import Divider from '../../common/Divider/Divider';
import NavBarButton from './NavBarButton/NavBarButton';
import ProfileSection from './ProfileSection/ProfileSection';
import Navigation from './Navigation/Navigation';
import axiosInstance from '../../../utils/axios';

// === ASSETS === //
import { logOutIcon } from '../../../assets';
import loader from '../../../assets/loader/tail-spin.svg';

// === STYLES === //
import './styles/navbar.scss';

export default function NavBar() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const { loading } = useAppSelector((state) => state.collaborator);

  const isNavBarOpen = useAppSelector((state) => state.navbar.isNavBarOpen);

  const handleLogout = () => {
    // We want to hide the navbar for the logout so when the user RE connect, the navbar is closed
    dispatch(hideNavBar());
    // We want to reset the redux state of Informations to make a new fetch
    // We do that to prevent a bad state display => Imagine the user uses the app on his phone, it will change the informations values in DB but NOT in the state
    dispatch(resetInformations());
    dispatch(resetCollaborators());
    dispatch(resetSectors());
    dispatch(resetStats());

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
        className={`z-30 fixed flex shadow-custom flex-col items-center p-4 pt-[5vh]  sm:py-2 top-0 right-0 w-3/4 h-full bg-secondary-50 sm:sticky sm:opacity-100 sm:translate-x-[0%] sm:pt-0 sm:max-w-[250px] duration-300 ease-in-out ${
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
                user.role_id === 2 ? '/app/prospection' : '/admin/dashboard'
              }
              className="hidden sm:block sm:my-5 navbar__logo"
            />

            {/* PROFILE SECTION */}
            <ProfileSection {...user} />

            <Divider />

            <h2 className="my-2 italic font-medium sm:my-[2vh]">
              {user.role_id === 2 ? 'NÉGOCIATEUR' : 'ADMINISTRATEUR'}
            </h2>

            {/* NAVIGATION LINKS */}
            <Navigation />

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
              className="flex gap-2 p-3 my-2 duration-300 rounded-xl hover:bg-secondary-200 focus:ring-2 ring-accent-300"
              onClick={handleLogout}
            >
              <img src={logOutIcon} alt="Logout icon" />
              Se déconnecter
            </button>
          </>
        )}
      </header>
    </>
  );
}
