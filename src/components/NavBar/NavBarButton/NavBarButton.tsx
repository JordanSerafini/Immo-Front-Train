// Redux Hooks
import { useAppDispatch } from '../../../hooks/redux';

// Store
import { toggleNavBar } from '../../../store/reducers/navbar';

// Assets
import hamburger from '../../../assets/icons/hamburger.svg';
import cross from '../../../assets/icons/cross.svg';

export default function NavBarButton({
  navBarStatus,
}: {
  navBarStatus: boolean;
}) {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleNavBar());
  };

  return (
    <button
      type="button"
      className="fixed z-40 w-8 h-10 border-none top-8 right-5 navbar-btn sm:hidden"
      onClick={handleClick}
    >
      <img
        className="w-full h-full"
        src={navBarStatus ? cross : hamburger}
        alt="burger button icon"
      />
    </button>
  );
}
