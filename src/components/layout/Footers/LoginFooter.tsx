// === REACT === //
import { Link } from 'react-router-dom';

// === ASSETS === //
import { copyrightIcon } from '../../../assets';

export default function LoginFooter() {
  // We want to get the actual date so we can have the current full year
  const date = new Date();

  return (
    <footer className="flex flex-col items-center justify-center mt-auto">
      <Link to="/support" className="mb-5 text-center underline">
        Contactez le support
      </Link>

      {/* DIVIDER */}
      <div className="mb-4 w-[100px] h-[1px] bg-gradient-to-r from-secondary-50 via-secondary-600 to-secondary-50" />

      <p className="flex gap-1 text-xs">
        <img src={copyrightIcon} alt="Copyright" className="w-[18px]" />
        {date.getFullYear()} Immo&apos;Pros
      </p>
      <p className="text-xs">Tous droits réservés</p>
    </footer>
  );
}
