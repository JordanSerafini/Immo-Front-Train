// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === ASSETS === //
import { arrowLeftIcon } from '../../../assets';

export default function ReturnButton() {
  return (
    <Link to="/app/prospection">
      <img
        className="p-2 duration-150 rounded-lg shadow-custom hover:scale-105 hover:shadow-primary bg-primary-300"
        src={arrowLeftIcon}
        alt="Go back to Home Page"
      />
    </Link>
  );
}
