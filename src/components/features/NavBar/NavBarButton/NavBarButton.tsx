// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { toggleNavBar } from '../../../../store/reducers/navbar';

// === ASSETS === //
import { hamburgerIcon, crossIcon } from '../../../../assets';

// === STYLE === //
import "./styles/animation.css";

export default function NavBarButton({
  navBarStatus,
}: {
  navBarStatus: boolean;
}) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  return (
    <button
      type="button"
      className={`fixed z-40 w-[50px] aspect-square border-none top-8 right-5 sm:hidden duration-300 rounded-full bg-primary-300 shadow-custom ${navBarStatus ? "rotate-[360deg]" : "rotate-0" }`}
      onClick={() => dispatch(toggleNavBar())}
      aria-label='Menu Toggle Button'
      aria-expanded={navBarStatus ? 'true' : 'false'}
    >
      <img
        className="w-[25px] block m-auto"
        src={navBarStatus ? crossIcon : hamburgerIcon}
        alt="burger button icon"
      />
    </button>
  );
}
