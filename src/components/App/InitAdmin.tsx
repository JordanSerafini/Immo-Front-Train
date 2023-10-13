// === REACT ROUTER DOM === //
import { Outlet } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppSelector } from '../../hooks/redux';

// === COMPONENTS === //
import NavBar from '../features/NavBar/NavBar';
import Main from '../layout/Main/Main';
import Loader from '../common/Loader/Loader';

// === HOOK PERSO === //
import useAuth from '../../hooks/useAuth';

export default function InitAdmin() {
  useAuth();
  
  // === REDUX STATE === //
  const user = useAppSelector((state) => state.collaborator.user);

  // We prevent anyone to see at least the layout if he is not an admin
  if (user.role_id !== 1) return <Loader className='absolute w-[50px] left-1/2 top-1/4 z-30' />

  return (
    <>
      <NavBar />
      <Main specificPath="/admin/dashboard">
        <Outlet />
      </Main>
    </>
  );
}
