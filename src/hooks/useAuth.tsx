// === REACT === //
import { useCallback, useEffect, useMemo } from 'react';

// === LIBRARY === //
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  // COLLABORATOR //
  const collaboratorState = useAppSelector((state) => state.collaborator);
  const {
    user,
    data: collaborators,
    loading: isCollaboratorsLoading,
    error: collaboratorError,
  } = collaboratorState;

  // INFORMATIONS //
  const informationState = useAppSelector((state) => state.information);
  const {
    data: informations,
    loading: isInformationLoading,
    error: informationError,
  } = informationState;

  // SECTORS //
  const sectorState = useAppSelector((state) => state.sector);
  const {
    data: sectors,
    loading: isSectorLoading,
    error: sectorError,
  } = sectorState;

  // STATS //
  const statsState = useAppSelector((state) => state.stats);
  const {
    dataSector: stats,
    loading: isStatsLoading,
    error: statsError,
  } = statsState;

  // === LOCAL STORAGE === //
  const accessToken = user.token || localStorage.getItem('accessToken');

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
    const userStorage = JSON.parse(localStorage.getItem('user') as string);
    if (userStorage && !user.id) {
      dispatch(setUserWithStorage());

      if (userStorage.role_id !== 1) {
        navigate('/app/prospection');
      } else {
        navigate('/admin/dashboard');
      }
    }
  }, [dispatch, navigate, user.id]);

  // === MEMO === //
  // What's interesting here is that we can memoise the access Token and add it to our dependancies array. So unless accessToken changed, the authorizationHeader remains the same
  const authorizationHeader = useMemo(
    () => `Bearer ${accessToken}`,
    [accessToken]
  );

  // === METHODS === //
  const resetAndRedirectCallback = useCallback(() => {
    dispatch(resetInformations());
    dispatch(resetCollaborators());
    dispatch(resetSectors());
    dispatch(resetStats());
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    // If there isn't a token in the local storage, we redirect the user to the login page
    navigate('/login');
  }, [dispatch, navigate]);

  // === EFFECTS === //
  useEffect(() => {
    if (collaboratorError || sectorError || informationError || statsError) {
      resetAndRedirectCallback();

      toast.info('Votre session a expirée, veuillez vous reconnecter', {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: false,
      });
    }
  }, [
    resetAndRedirectCallback,
    collaboratorError,
    informationError,
    sectorError,
    statsError,
  ]);

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
      resetAndRedirectCallback();
    }
  }, [
    setUserCallback,
    accessToken,
    user.role_id,
    authorizationHeader,
    fetchCollaboratorsCallback,
    fetchInformationsCallback,
    fetchSectorsCallback,
    fetchStatsCallback,
    resetAndRedirectCallback,
    navigate,
  ]);
}
