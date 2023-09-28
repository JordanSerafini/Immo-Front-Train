// React Router
import { Link } from 'react-router-dom';

// Assets
import logo from '../../../assets/logo.svg';

// Typescript interface
interface LogoProps {
  className?: string;
  path?: string;
}

function Logo({ path = "/app/prospection", className }: LogoProps) {
  return (
    <Link to={path} className={`${className} block w-fit`}>
      <img src={logo} alt="Logo Immo Pros" />
    </Link>
  );
}

Logo.defaultProps = {
  className: '',
  path: "/login"
};

export default Logo;
