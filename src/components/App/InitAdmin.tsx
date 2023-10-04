// React
import { useEffect, useState } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { setUserWithStorage, fetchCollaborators } from '../../store/reducers/collaborator';
import { fetchSectors } from '../../store/reducers/sector';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import NavBar from '../NavBar/NavBar';
import MainSection from '../SharedComponents/MainSection/MainSection';

export default function InitAdmin() {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux States
  const user = useAppSelector((state) => state.collaborator.user);
  const collaborators = useAppSelector((state) => state.collaborator.data);
  const isCollaboratorsLoading = useAppSelector(
    (state) => state.collaborator.loading
  );
  const sectors = useAppSelector((state) => state.sector.data);
  const isSectorsLoading = useAppSelector((state) => state.sector.loading);

  // Local State
  // The flag is really important to avoid multiple fetches
  const [flag, setFlag] = useState<boolean>(false);

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // !!! SECURITY ISSUE - We want to check if the user id admin. It's maybe a bad idea to set user with storage for the admin case !!!
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      if (!flag && !collaborators.length && !isCollaboratorsLoading) {
        setFlag(true);
        dispatch(fetchCollaborators());
      }
      if (!sectors.length && !isSectorsLoading) {
        dispatch(fetchSectors());
      }

      if (!user.id) {
        dispatch(setUserWithStorage());
        // We Redirect the user to the panel page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
        navigate('/admin/dashboard');
      }
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');
    }
  }, [
    accessToken,
    collaborators.length,
    dispatch,
    flag,
    isCollaboratorsLoading,
    isSectorsLoading,
    navigate,
    sectors.length,
    user.id,
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
