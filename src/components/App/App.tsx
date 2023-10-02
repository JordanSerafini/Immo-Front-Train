// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import InitApp from './InitApp';
import InitAdmin from './InitAdmin';

// Login & Support
import Login from '../Login/Login';
import Support from '../Support/Support';
import SupportConfirmation from '../SupportConfirmation/SupportConfirmation';

// Collaborator
import Profile from '../Profile/Profile';
import Prospection from '../Prospection/Prospection';
import Detail from '../Detail/Detail';
import ActionToDo from '../ActionToDo/ActionToDo';
import ActionManager from '../ActionManager/ActionManager';
import UpcomingAction from '../UpcomingAction/UpcomingAction';

// Admin
import Panel from '../Panel/Panel';
import DashBoard from '../DashBoard/DashBoard';

// 404 - Error
import NotFound from '../NotFound/NotFound';

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
            <Route path="/admin/panel" element={<Panel />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
