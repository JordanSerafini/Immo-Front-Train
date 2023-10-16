// === REACT === //
import { useCallback, useEffect, useMemo, useState } from 'react';

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
import { fetchAvatars, resetAvatars } from '../store/reducers/avatar';

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

  // AVATARS //
  const avatarState = useAppSelector((state) => state.avatar);
  const {
    data: avatars,
    loading: isAvatarLoading,
    error: avatarError,
  } = avatarState;

  // === LOCAL STORAGE === //
  const accessToken = user.token || localStorage.getItem('accessToken');

  // This flag is reaaaaally important, it prevents multiple fetches
  // If we create a user and this is his first connexion, without the flag, it'll fetch endlessly informations
  const [flag, setFlag] = useState(false);

  // === CALLBACKS === //
  // Those callbacks are really important when we need to talk about performance
  // It allows us to avoid multiple fetches AND we keep informations in memory so we don't need to rerender it if it doesn't change
  const fetchInformationsCallback = useCallback(() => {
    if (!flag && !informations.length && !isInformationLoading) {
      dispatch(fetchInformations());
      setFlag(true);
    }
  }, [flag, informations.length, isInformationLoading, dispatch]);

  const fetchCollaboratorsCallback = useCallback(() => {
    if (!flag && !collaborators.length && !isCollaboratorsLoading) {
      dispatch(fetchCollaborators());
      setFlag(true);
    }
  }, [collaborators.length, dispatch, flag, isCollaboratorsLoading]);

  const fetchSectorsCallback = useCallback(() => {
    if (!flag && !sectors.length && !isSectorLoading) {
      dispatch(fetchSectors());
      setFlag(true);
    }
  }, [dispatch, flag, isSectorLoading, sectors.length]);

  const fetchStatsCallback = useCallback(() => {
    if (!flag && !stats.length && !isStatsLoading) {
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
      setFlag(true);
    }
  }, [dispatch, flag, isStatsLoading, stats.length]);

  const fetchAvatarsCallback = useCallback(() => {
    if (!flag && !avatars.length && !isAvatarLoading) {
      dispatch(fetchAvatars());
      setFlag(true);
    }
  }, [avatars.length, dispatch, flag, isAvatarLoading]);

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
    dispatch(resetAvatars());
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    // If there isn't a token in the local storage, we redirect the user to the login page
    navigate('/login');
  }, [dispatch, navigate]);

  // === EFFECTS === //
  useEffect(() => {
    if (
      collaboratorError ||
      sectorError ||
      informationError ||
      statsError ||
      avatarError
    ) {
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
    avatarError,
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
      fetchAvatarsCallback();
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
    fetchAvatarsCallback,
  ]);
}
