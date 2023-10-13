// === REACT === //
import { useCallback, useEffect, useMemo } from 'react';

// === LIBRARY === //
import dayjs from 'dayjs';

// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === AXIOS === //
import axiosInstance from '../utils/axios';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from './redux';

// === REDUCERS === //
import {
  fetchCollaborators,
  resetCollaborators,
  setUserWithStorage,
} from '../store/reducers/collaborator';
import {
  fetchInformations,
  resetInformations,
} from '../store/reducers/information';
import { fetchSectors, resetSectors } from '../store/reducers/sector';
import {
  infoByCollaborator,
  infoBySector,
  infoWithInterval,
  resetStats,
} from '../store/reducers/stats';

// === UTILS === //
import getFormatedFullDate from '../utils/getFormatedFullDate';

export default function useAuth() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);

  const informations = useAppSelector((state) => state.information.data);
  const isInformationLoading = useAppSelector(
    (state) => state.information.loading
  );
  const collaboratorState = useAppSelector((state) => state.collaborator);
  const { data: collaborators, loading: isCollaboratorsLoading } =
    collaboratorState;

  const sectorState = useAppSelector((state) => state.sector);
  const { data: sectors, loading: isSectorLoading } = sectorState;

  const stats = useAppSelector((state) => state.stats.dataSector);
  const isStatsLoading = useAppSelector((state) => state.stats.loading);

  // === LOCAL STORAGE === //
  const accessToken = localStorage.getItem('accessToken');

  // === CALLBACKS === //
  // Those callbacks are really important when we need to talk about performance
  // It allows us to avoid multiple fetches AND we keep informations in memory so we don't need to rerender it if it doesn't change
  const fetchInformationsCallback = useCallback(() => {
    if (!informations.length && !isInformationLoading) {
      dispatch(fetchInformations());
    }
  }, [informations, isInformationLoading, dispatch]);

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

      if (user.role_id !== 1) {
        // We Redirect the user to the prospection page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
        navigate('/app/prospection');
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [dispatch, navigate, user.id, user.role_id]);

  // === MEMO === //
  // What's interesting here is that we can memoise the access Token and add it to our dependancies array. So unless accessToken changed, the authorizationHeader remains the same
  const authorizationHeader = useMemo(
    () => `Bearer ${accessToken}`,
    [accessToken]
  );

  // === EFFECTS === //
  useEffect(() => {
    setUserCallback();

    if (accessToken && user.role_id !== 1) {
      axiosInstance.defaults.headers.common.Authorization = authorizationHeader;

      fetchInformationsCallback();
    } else if (accessToken && user.role_id === 1) {
      axiosInstance.defaults.headers.common.Authorization = authorizationHeader;

      fetchCollaboratorsCallback();
      fetchSectorsCallback();
      fetchStatsCallback();
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');

      // Just in case, we want to force a logout and reset informations state
      dispatch(resetInformations());
      dispatch(resetCollaborators());
      dispatch(resetSectors());
      dispatch(resetStats());
    }
  }, [
    accessToken,
    authorizationHeader,
    dispatch,
    fetchCollaboratorsCallback,
    fetchInformationsCallback,
    fetchSectorsCallback,
    fetchStatsCallback,
    navigate,
    setUserCallback,
    user,
    user.role_id,
  ]);
}
