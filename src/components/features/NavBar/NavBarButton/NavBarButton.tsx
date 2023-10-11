// === REDUX HOOKS === //
import { useAppDispatch } from '../../../../hooks/redux';

// === REDUCERS === //
import { toggleNavBar } from '../../../../store/reducers/navbar';

// === ASSETS === //
import { hamburgerIcon, crossIcon } from '../../../../assets';

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
      className="fixed z-40 w-8 h-10 border-none top-8 right-5 navbar-btn sm:hidden"
      onClick={() => dispatch(toggleNavBar())}
    >
      <img
        className="w-full h-full"
        src={navBarStatus ? crossIcon : hamburgerIcon}
        alt="burger button icon"
      />
    </button>
  );
}
