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
import { setUserWithStorage } from '../../store/reducers/user';

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
  const user = useAppSelector((state) => state.user.data);

  // Local Storage
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    // We check if there's a JWToken and if the user is admin. Otherwise it'll redirect him through the login page
    if (accessToken && user.id === 1) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      if (!user.id) {
        dispatch(setUserWithStorage());
        // We Redirect the user to the panel page if he reloads the app to avoid subcomponents issues (as EditFirstname component for example)
        navigate('/admin/panel');
      }
    } else {
      // If there isn't a token in the local storage, we redirect the user to the login page
      navigate('/login');
    }
  }, [accessToken, dispatch, navigate, user.id]);

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
