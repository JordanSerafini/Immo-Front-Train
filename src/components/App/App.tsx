// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
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
import Administration from '../Admininistration/Administration';
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
          <Route path="/app/*">
            <Route path="prospection" element={<Prospection />} />
            <Route path="detail/:infoId" element={<Detail />} />
            <Route path="actionToDo" element={<ActionToDo />} />
            <Route path="upcomingAction" element={<UpcomingAction />} />
            <Route path="actionManager" element={<ActionManager />} />

            <Route path="admin" element={<Administration />} />
            <Route path="dashboard" element={<DashBoard />} />

            <Route path="profile/:collaboratorId" element={<Profile />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
