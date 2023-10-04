// Redux toolkit
import { nanoid } from '@reduxjs/toolkit';

// Redux
import { useAppSelector } from '../../../hooks/redux';

// Assets
import home from '../../../assets/icons/home.svg';
import actionToDo from '../../../assets/icons/action-to-do.svg';
import upcomingAction from '../../../assets/icons/upcoming-action.svg';
import settingsIcon from "../../../assets/icons/settings.svg";
import statsIcon from "../../../assets/icons/stats.svg";

// Component
import NavItem from './NavItem/NavItem';

export default function Navigation({
  closeNavBarMethod,
}: {
  closeNavBarMethod: () => void;
}) {
  // Redux state
  const roleId = useAppSelector((state) => state.collaborator.user.role_id);

  // If you want to add a link to the navbar, you just need to add it into the linkItems array
  const collaboratorLinks = [
    {
      content: 'Accueil',
      icon: home,
      path: '/app/prospection',
    },
    {
      content: 'Actions à faire',
      icon: actionToDo,
      path: '/app/actionToDo',
    },
    {
      content: 'Actions à venir',
      icon: upcomingAction,
      path: '/app/upcomingAction',
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
    
  ];

  return (
    <nav className="flex w-full grow">
      <ul className="flex flex-col w-full gap-1">
        {roleId === 1
          ? adminLinks.map((item) => (
              <NavItem
                key={nanoid()}
                closeNavBarMethod={closeNavBarMethod}
                icon={item.icon}
                content={item.content}
                path={item.path}
              />
            ))
          : collaboratorLinks.map((item) => (
              <NavItem
                key={nanoid()}
                closeNavBarMethod={closeNavBarMethod}
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
