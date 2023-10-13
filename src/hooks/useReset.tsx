// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from './redux';

// === REDUCERS === //
import { resetCollaborators } from '../store/reducers/collaborator';
import { resetInformations } from '../store/reducers/information';
import { resetSectors } from '../store/reducers/sector';
import { resetStats } from '../store/reducers/stats';

export default function useReset() {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  dispatch(resetInformations());
  dispatch(resetCollaborators());
  dispatch(resetSectors());
  dispatch(resetStats());
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');

  // If there isn't a token in the local storage, we redirect the user to the login page
  navigate('/login');
}
