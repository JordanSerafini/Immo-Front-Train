// React
import { useEffect, useState } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import {
  setUserWithStorage,
  fetchCollaborators,
} from '../../store/reducers/collaborator';
import { fetchSectors } from '../../store/reducers/sector';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import NavBar from '../NavBar/NavBar';
import MainSection from '../SharedComponents/MainSection/MainSection';
import { infoByCollaborator, infoBySector } from '../../store/reducers/stats';

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
  const stats = useAppSelector((state) => state.stats.dataSector);
  const isStatsLoading = useAppSelector((state) => state.stats.loading);

  const test = useAppSelector((state) => state.stats.dataCollabs);
  console.log(test)

  // Local State
  // The flag is really important to avoid multiple fetches
  const [flag, setFlag] = useState<boolean>(false);

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!user.id) {
      dispatch(setUserWithStorage());
      // We Redirect the user to the panel page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
      navigate('/admin/dashboard');
    }
    if (accessToken && user.role_id === 1) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      if (!flag && !collaborators.length && !isCollaboratorsLoading) {
        setFlag(true);
        dispatch(fetchCollaborators());
      }
      if (!flag && !sectors.length && !isSectorsLoading) {
        setFlag(true);
        dispatch(fetchSectors());
      }
      if (!flag && !stats.length && !isStatsLoading) {
        setFlag(true);
        dispatch(infoBySector());
        dispatch(infoByCollaborator())
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
    isStatsLoading,
    navigate,
    sectors.length,
    stats.length,
    user.id,
    user.role_id,
  ]);

  return (
    <>
      <NavBar />
      <MainSection specificPath="/admin/dashboard">
        <Outlet />
      </MainSection>
    </>
  );
}
