// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === ASSETS === //
import logo from '../../../assets/logo.svg';

// === TYPESCRIPT === //
interface LogoProps {
  className?: string;
  path?: string;
}

function Logo({ path = '/app/prospection', className }: LogoProps) {
  return (
    <Link to={path} className={`${className} block w-fit`}>
      <img src={logo} alt="Logo Immo Pros" className='w-[85px] aspect-square' />
    </Link>
  );
}

Logo.defaultProps = {
  className: '',
  path: '/login',
};

export default Logo;
