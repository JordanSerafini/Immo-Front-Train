// React
import { useEffect, useState } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  fetchInformations,
  resetInformations,
} from '../../store/reducers/information';
import { setUserWithStorage } from '../../store/reducers/collaborator';

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
  const user = useAppSelector((state) => state.collaborator.user);

  const informations = useAppSelector((state) => state.information.data);
  const isInformationLoading = useAppSelector(
    (state) => state.information.loading
  );

  // Local State
  // The flag is really important to avoid multiple fetches
  const [flag, setFlag] = useState<boolean>(false);

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');

  // Dispatch
  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      // S'il n'y a pas d'information et que ce n'est pas en train de charger alors ça fetch
      if (!flag && !informations.length && !isInformationLoading) {
        setFlag(true);
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
    informations,
    accessToken,
    dispatch,
    navigate,
    flag,
  ]);

  return (
    <>
      <NavBar />
      <MainSection>
        <Outlet />
      </MainSection>
    </>
  );
}
