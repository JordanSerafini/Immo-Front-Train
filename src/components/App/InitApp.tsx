// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React
import { useEffect } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  fetchInformations,
  resetInformations,
} from '../../store/reducers/informations';
import { setUserWithStorage } from '../../store/reducers/user';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import NavBar from '../NavBar/NavBar';
import MainSection from '../SharedComponents/MainSection/MainSection';

export default function InitApp() {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux States
  const informations = useAppSelector(
    (state) => state.information.informations
  );
  const isInformationLoading = useAppSelector(
    (state) => state.information.loading
  );

  const user = useAppSelector((state) => state.user.data);
  const isLogged = useAppSelector((state) => state.user.data.logged);

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');

  // Dispatch
  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      if (!informations.length && !isInformationLoading) {
        // eslint-disable-next-line no-console
        console.log('fetch informations');
        dispatch(fetchInformations());
      }
      if (!user.id) {
        dispatch(setUserWithStorage());
        // We Redirect the user to the prospection page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
        navigate('/app/prospection');
      }
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');

      // Just in case, we want to force a logout and reset informations state
      dispatch(resetInformations());
    }
  }, [
    isInformationLoading,
    user,
    isLogged,
    informations,
    accessToken,
    dispatch,
    navigate,
  ]);

  return (
    <>
      <NavBar />
      <MainSection>
        <Outlet />
      </MainSection>
      <ToastContainer autoClose={2000} />
    </>
  );
}
