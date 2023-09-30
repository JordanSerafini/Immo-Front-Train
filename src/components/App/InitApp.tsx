// React
import { useEffect, useMemo } from 'react';

// React Router
import { Outlet, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { fetchInformations } from '../../store/reducers/informations';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import NavBar from '../NavBar/NavBar';
import MainSection from '../SharedComponents/MainSection/MainSection';

export default function InitApp() {
  // Hook Execution Order
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');
  const informations = useAppSelector((state) => state.information.informations)
  const isLogged = useAppSelector((state) => state.user.logged);

  console.log(isLogged)

  // Dispatch
  useEffect(() => {
    console.log("effect")
    if (accessToken) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      if (!informations.length) {
        console.log("fetch")
        dispatch(fetchInformations());
      }
    } else {
      console.log("Vous ne vous êtes pas connecté !")
      navigate('/login');
    }
  }, [isLogged, informations, accessToken, dispatch, navigate]);

  return (
    <>
      <NavBar />
      <MainSection>
        <Outlet />
      </MainSection>
    </>
  );
}
