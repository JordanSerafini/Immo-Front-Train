// === LIBRARY === //
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REACT ROUTER DOM === //
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// === COMPONENTS === //
import InitApp from './InitApp';
import InitAdmin from './InitAdmin';

// Pages
import {
  // Login & Support
  Login,
  Support,
  SupportConfirmation,
  ResetPassword,
  ResetPasswordToken,

  // Collaborator
  Profile,
  Prospection,
  Detail,
  ActionToDo,
  ActionManager,
  UpcomingAction,
  Message,

  // Admin
  SectorManager,
  CollaboratorManager,
  DashBoard,
  AvatarManager,

  // 404 - Error
  NotFound,
} from '../../pages';

function App() {
  return (
    <BrowserRouter>
      <div className="relative flex w-screen h-full overflow-x-hidden overflow-y-auto grow bg-main" role='application'>
        <Routes>
          {/* LOGIN */}
          <Route path="/" element={<Login />} />
          {/* Maybe we could keep the '/' route for the future landing page et use '/login' instead to display Login Component */}
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route
            path="/support/confirmation"
            element={<SupportConfirmation />}
          />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/reset/token" element={<ResetPasswordToken />} />

          {/* COLLABORATOR */}
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
            <Route path="/app/message" element={<Message />} />
          </Route>

          {/* ADMIN */}
          <Route path="/admin" element={<InitAdmin />}>
            <Route
              path="/admin/collaborator"
              element={<CollaboratorManager />}
            />
            <Route path="/admin/sector" element={<SectorManager />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route path="/admin/avatar" element={<AvatarManager />} />
          </Route>

          {/* NOT FOUND */}
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <ToastContainer autoClose={2000} className="z-0" />
      </div>
    </BrowserRouter>
  );
}

export default App;
