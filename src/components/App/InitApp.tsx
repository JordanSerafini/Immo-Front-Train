// === REACT === //
import { useEffect, useCallback, useMemo } from 'react';

// === REACT ROUTER DOM === //
import { Outlet, useNavigate } from 'react-router-dom';

// === AXIOS === //
import axiosInstance from '../../utils/axios';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// === REDUCERS === //
import {
  fetchInformations,
  resetInformations,
} from '../../store/reducers/information';
import { setUserWithStorage } from '../../store/reducers/collaborator';

// === COMPONENTS === //
import NavBar from '../features/NavBar/NavBar';
import Main from '../layout/Main/Main';

export default function InitApp() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);

  const informations = useAppSelector((state) => state.information.data);
  const isInformationLoading = useAppSelector(
    (state) => state.information.loading
  );

  // === LOCAL STORAGE === //
  const accessToken = localStorage.getItem('accessToken');

  // === CallBack Hook === //
  // Those callbacks are really important when we need to talk about performance
  // It allows us to avoid multiple fetches AND we keep informations in memory so we don't need to rerender it if it doesn't change
  const fetchInformationsCallback = useCallback(() => {
    if (!informations.length && !isInformationLoading) {
      dispatch(fetchInformations());
    }
  }, [informations, isInformationLoading, dispatch]);

  const setUserCallback = useCallback(() => {
    if (!user.id) {
      dispatch(setUserWithStorage());
      // We Redirect the user to the prospection page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
      navigate('/app/prospection');
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
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = authorizationHeader;

      fetchInformationsCallback();
      setUserCallback();
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');

      // Just in case, we want to force a logout and reset informations state
      dispatch(resetInformations());
    }
  }, [accessToken, authorizationHeader, dispatch, fetchInformationsCallback, navigate, setUserCallback]);

  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
