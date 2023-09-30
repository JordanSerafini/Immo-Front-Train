// React dom
import { useNavigate } from 'react-router-dom';

import axiosInstance from "../../../utils/axios";

// Components
import NavBar from '../../NavBar/NavBar';
import Logo from '../Logo/Logo';

function MainSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // React Execution Order
  const navigate = useNavigate();

  // Local Storage
  const accessToken = localStorage.getItem('accessToken')

  if(accessToken){
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    navigate("/login")
  }

  return (
    <>
      <NavBar />
      <main className={`m-5 min-h-full h-fit md:m-10 md:mb-auto relative grow ${className}`}>
        <Logo className="sm:hidden" />
        {children}
      </main>
    </>
  );
}

MainSection.defaultProps = {
  className: '',
};

export default MainSection;
