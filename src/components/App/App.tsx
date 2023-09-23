// React Router
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Landing from '../Landing/Landing';

import Login from '../Login/Login';
import Support from '../Support/Support';
import SupportConfirmation from '../SupportConfirmation/SupportConfirmation';

import Profile from '../Profile/Profile';
import Prospection from '../Prospection/Prospection';
import Detail from '../Detail/Detail';
import ActionToDo from '../ActionToDo/ActionToDo';
import ActionManager from '../ActionManager/ActionManager';
import UpcomingAction from '../UpcomingAction/UpcomingAction';

import Administration from '../Admininistration/Administration';
import DashBoard from '../DashBoard/DashBoard';

import NotFound from '../NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex h-screen overflow-x-hidden overflow-y-auto min-w-screen bg-main">
        <Routes>
          <Route path="/" element={<Landing />} />
          {/* Maybe we could keep the '/' route for the future landing page et use '/login' instead to display Login Component */}
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/support/confirmation"
            element={<SupportConfirmation />}
          />

          <Route path="/app/*">
            <Route path="prospection" element={<Prospection />} />
            <Route path="detail/:info_id" element={<Detail />} />
            <Route path="actionToDo" element={<ActionToDo />} />
            <Route path="upcomingAction" element={<UpcomingAction />} />
            <Route path="actionManager" element={<ActionManager />} />

            <Route path="admin" element={<Administration />} />
            <Route path="dashboard" element={<DashBoard />} />

            <Route path="profile/:collaborator_id" element={<Profile />} />
          </Route>

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
