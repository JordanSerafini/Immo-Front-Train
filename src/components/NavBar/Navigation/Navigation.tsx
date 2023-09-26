// Redux toolkit
import { nanoid } from '@reduxjs/toolkit';

// Assets
import home from '../../../assets/icons/home.svg';
import actionToDo from '../../../assets/icons/action-to-do.svg';
import upcomingAction from '../../../assets/icons/upcoming-action.svg';

// Component
import NavItem from './NavItem/NavItem';

export default function Navigation({
  closeNavBarMethod,
}: {
  closeNavBarMethod: () => void;
}) {
  // If you want to add a link to the navbar, you just need to add it into the linkItems array
  const linkItems = [
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

  return (
    <nav className="flex w-full grow">
      <ul className="flex flex-col w-full gap-1">
        {linkItems.map((item) => (
          <NavItem
            key={nanoid()}
            closeNavBarMethod={closeNavBarMethod}
            icon={item.icon}
            content={item.content}
            path={item.path}
          />
        ))}
      </ul>
    </nav>
  );
}
