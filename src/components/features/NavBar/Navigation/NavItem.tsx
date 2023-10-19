// === REACT ROUTER DOM === //
import { NavLink } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { hideNavBar } from '../../../../store/reducers/navbar';

// === TYPESCRIPT === //
interface NavItemProps {
  icon: string;
  content: string;
  path: string;
}

export default function NavItem({
  icon,
  content,
  path,
}: NavItemProps) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  return (
    <li>
      <NavLink
        onClick={() => dispatch(hideNavBar())}
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
