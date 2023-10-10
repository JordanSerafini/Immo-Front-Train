// React Router
import { NavLink } from 'react-router-dom';

// Typescript interface
interface NavItemProps {
  closeNavBarMethod: () => void;
  icon: string;
  content: string;
  path: string;
}

export default function NavItem({
  closeNavBarMethod,
  icon,
  content,
  path,
}: NavItemProps) {
  return (
    <li>
      <NavLink
        onClick={closeNavBarMethod}
        to={path}
        className={({ isActive }) =>
          `flex w-full gap-2 px-2 sm:px-4 py-2 sm:py-3 duration-300 rounded-lg hover:bg-secondary-200 ${
            isActive && 'bg-secondary-200'
          }`
        }
      >
        <img src={icon} alt={`${content} icon`} />
        {content}
      </NavLink>
    </li>
  );
}
