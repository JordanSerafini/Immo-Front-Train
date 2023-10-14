// === ASSETS === //
import { copyrightIcon } from '../../../assets';

function Footer({ children }: { children?: React.ReactNode }) {
  // We want to get the actual date so we can have the current full year
  const date = new Date();

  return (
    <footer className="flex flex-col items-center justify-center pb-4 mt-auto">
      {children}

      {/* DIVIDER */}
      <div className="mb-4 mt-4 w-[100px] h-[1px] bg-gradient-to-r from-secondary-50 via-secondary-600 to-secondary-50" role='separator' />

      <p className="flex gap-1 text-xs">
        <img src={copyrightIcon} alt="Copyright" className="w-[18px] aspect-square" />
        {date.getFullYear()} Immo&apos;Pros
      </p>
      <p className="text-xs">Tous droits réservés</p>
    </footer>
  );
}

Footer.defaultProps = {
  children: null,
};

export default Footer;
