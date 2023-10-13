// === REACT ROUTER DOM === //
import { Outlet } from 'react-router-dom';

// === COMPONENTS === //
import NavBar from '../features/NavBar/NavBar';
import Main from '../layout/Main/Main';

// === HOOK PERSO === //
import useAuth from '../../hooks/useAuth';

export default function InitApp() {

  useAuth()

  return (
    <>
      <NavBar />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
