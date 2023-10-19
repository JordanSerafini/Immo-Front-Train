// === REDUX TOOLKIT === //
import { nanoid } from '@reduxjs/toolkit';

// === REDUX HOOKS === //
import { useAppSelector } from '../../../../hooks/redux';

// === ASSETS === //
import {
  homeIcon,
  actionToDoIcon,
  upcomingActionIcon,
  settingsIcon,
  statsIcon,
  sendIcon,
} from '../../../../assets';

// === COMPONENTS === //
import NavItem from './NavItem';

export default function Navigation() {
  // === REDUX STATES === //
  const roleId = useAppSelector((state) => state.collaborator.user.role_id);

  // If you want to add a link to the navbar, you just need to add it into the linkItems array
  const collaboratorLinks = [
    {
      content: 'Accueil',
      icon: homeIcon,
      path: '/app/prospection',
    },
    {
      content: 'Actions à faire',
      icon: actionToDoIcon,
      path: '/app/actionToDo',
    },
    {
      content: 'Actions à venir',
      icon: upcomingActionIcon,
      path: '/app/upcomingAction',
    },
    {
      content: 'Messagerie',
      icon: sendIcon,
      path: '/app/message',
    },
  ];

  const adminLinks = [
    {
      content: 'Dashboard',
      icon: statsIcon,
      path: '/admin/dashboard',
    },
    {
      content: 'Collaborateurs',
      icon: settingsIcon,
      path: '/admin/collaborator',
    },
    {
      content: 'Secteurs',
      icon: settingsIcon,
      path: '/admin/sector',
    },
    {
      content: 'Avatars',
      icon: settingsIcon,
      path: '/admin/avatar',
    },
  ];

  return (
    <nav className="flex w-full grow">
      <ul className="flex flex-col w-full gap-1">
        {roleId === 1
          ? adminLinks.map((item) => (
              <NavItem
                key={nanoid()}
                icon={item.icon}
                content={item.content}
                path={item.path}
              />
            ))
          : collaboratorLinks.map((item) => (
              <NavItem
                key={nanoid()}
                icon={item.icon}
                content={item.content}
                path={item.path}
              />
            ))}
        {}
      </ul>
    </nav>
  );
}
