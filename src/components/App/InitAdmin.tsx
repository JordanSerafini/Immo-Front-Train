// === REACT === //
import { useEffect, useCallback, useMemo } from 'react';

// === LIBRARY === //
import dayjs from 'dayjs';

// === REACT ROUTER DOM === //
import { Outlet, useNavigate } from 'react-router-dom';

// === AXIOS === //
import axiosInstance from '../../utils/axios';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import {
  setUserWithStorage,
  fetchCollaborators,
} from '../../store/reducers/collaborator';
import { fetchSectors } from '../../store/reducers/sector';

// === COMPONENTS === //
import NavBar from '../features/NavBar/NavBar';
import Main from '../layout/Main/Main';
import {
  infoByCollaborator,
  infoBySector,
  infoWithInterval,
} from '../../store/reducers/stats';

// === UTILS === //
import getFormatedFullDate from '../../utils/getFormatedFullDate';

export default function InitAdmin() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // === REDUX STATES === //
  const collaboratorState = useAppSelector((state) => state.collaborator);
  const {
    user,
    data: collaborators,
    loading: isCollaboratorsLoading,
  } = collaboratorState;

  const sectorState = useAppSelector((state) => state.sector);
  const { data: sectors, loading: isSectorLoading } = sectorState;

  const stats = useAppSelector((state) => state.stats.dataSector);
  const isStatsLoading = useAppSelector((state) => state.stats.loading);

  // === LOCAL STORAGE === //
  const accessToken = localStorage.getItem('accessToken');

  // === CallBack Hook === //
  // Those callbacks are really important when we need to talk about performance
  // It allows us to avoid multiple fetches AND we keep informations in memory so we don't need to rerender it if it doesn't change
  const fetchCollaboratorsCallback = useCallback(() => {
    if (!collaborators.length && !isCollaboratorsLoading) {
      dispatch(fetchCollaborators());
    }
  }, [collaborators.length, dispatch, isCollaboratorsLoading]);

  const fetchSectorsCallback = useCallback(() => {
    if (!sectors.length && !isSectorLoading) {
      dispatch(fetchSectors());
    }
  }, [dispatch, isSectorLoading, sectors.length]);

  const fetchStatsCallback = useCallback(() => {
    if (!stats.length && !isStatsLoading) {
      dispatch(infoBySector());
      dispatch(infoByCollaborator());
      dispatch(
        infoWithInterval({
          formValues: {
            firstDate: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
            secondDate: getFormatedFullDate(),
          },
        })
      );
    }
  }, [dispatch, isStatsLoading, stats.length]);

  const setUserCallback = useCallback(() => {
    if (!user.id) {
      dispatch(setUserWithStorage());
      // We Redirect the user to the panel page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
      navigate('/admin/dashboard');
    }
  }, [dispatch, navigate, user.id]);

  // === useMemo === //
  // What's interesting here is that we can memoise the access Token and add it to our dependancies array. So unless accessToken changed, the authorizationHeader remains the same
  const authorizationHeader = useMemo(
    () => `Bearer ${accessToken}`,
    [accessToken]
  );

  // === EFFECTS === //
  useEffect(() => {
    setUserCallback();
    if (accessToken && user.role_id === 1) {
      axiosInstance.defaults.headers.common.Authorization = authorizationHeader;

      fetchCollaboratorsCallback();
      fetchSectorsCallback();
      fetchStatsCallback();
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');
    }
  }, [
    accessToken,
    authorizationHeader,
    collaborators.length,
    dispatch,
    fetchCollaboratorsCallback,
    fetchSectorsCallback,
    fetchStatsCallback,
    isCollaboratorsLoading,
    isSectorLoading,
    isStatsLoading,
    navigate,
    sectors.length,
    setUserCallback,
    stats.length,
    user.id,
    user.role_id,
  ]);

  return (
    <>
      <NavBar />
      <Main specificPath="/admin/dashboard">
        <Outlet />
      </Main>
    </>
  );
}
