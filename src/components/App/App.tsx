// Library
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import InitApp from './InitApp';
import InitAdmin from './InitAdmin';

// Login & Support
import Login from '../../pages/Login/Login';
import Support from '../../pages/Support/Support';
import SupportConfirmation from '../../pages/Support/SupportConfirmation';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ResetPasswordToken from '../../pages/ResetPassword/ResetPasswordToken';

// Collaborator
import Profile from '../../pages/Profile/Profile';
import Prospection from '../../pages/Prospection/Prospection';
import Detail from '../../pages/Detail/Detail';
import ActionToDo from '../../pages/ActionToDo/ActionToDo';
import ActionManager from '../../pages/ActionManager/ActionManager';
import UpcomingAction from '../../pages/UpcomingAction/UpcomingAction';

// Admin
import SectorManager from '../SectorManager/SectorManager';
import CollaboratorManager from '../CollaboratorManager/CollaboratorManager';
import DashBoard from '../DashBoard/DashBoard';

// 404 - Error
import NotFound from '../../pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex h-screen overflow-x-hidden overflow-y-auto min-w-screen bg-main">
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Maybe we could keep the '/' route for the future landing page et use '/login' instead to display Login Component */}
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/support/confirmation"
            element={<SupportConfirmation />}
          />
          <Route path='/reset' element={<ResetPassword />} />
          <Route path='/reset/token' element={<ResetPasswordToken />} />

          {/* This Route allows us to not write /app for every following routes  */}
          <Route path="/app" element={<InitApp />}>
            <Route path="/app/prospection" element={<Prospection />} />
            <Route path="/app/detail/:infoId" element={<Detail />} />
            <Route path="/app/actionToDo" element={<ActionToDo />} />
            <Route path="/app/upcomingAction" element={<UpcomingAction />} />
            <Route
              path="/app/actionManager/:infoId"
              element={<ActionManager />}
            />
            <Route path="/app/profile/:collaboratorId" element={<Profile />} />
          </Route>

          <Route path="/admin" element={<InitAdmin />}>
            <Route
              path="/admin/collaborator"
              element={<CollaboratorManager />}
            />
            <Route path="/admin/sector" element={<SectorManager />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer autoClose={2000} className="z-0" />
      </div>
    </BrowserRouter>
  );
}

export default App;
