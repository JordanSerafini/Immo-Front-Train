// Assets
import copyrightIcon from '../../../assets/icons/copyright.svg';

export default function SupportFooter() {
  const date = new Date();

  return (
    <footer className="flex flex-col items-center justify-center mt-auto">
      <div className="mb-4 w-[100px] h-[1px] bg-gradient-to-r from-secondary-50 via-secondary-600 to-secondary-50" />
      <p className="flex gap-1 text-xs">
        <img src={copyrightIcon} alt="Copyright" className="w-[18px]" />
        {date.getFullYear()} Immo&apos;Pros
      </p>
      <p className="text-xs">Tous droits réservés</p>
    </footer>
  );
}