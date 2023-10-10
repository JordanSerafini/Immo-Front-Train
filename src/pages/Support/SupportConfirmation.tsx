// React
import { useEffect } from 'react';

// React router dom
import { useNavigate } from 'react-router-dom';

// Components
import Logo from '../../components/layout/Logo/Logo';
import SupportFooter from '../../components/layout/Footers/SupportFooter';

// Assets
import valid from '../../assets/icons/valid.svg';

export default function SupportConfirmation() {
  // Hook Execution order
  const navigate = useNavigate();

  useEffect(() => {
    const delay = 15000;
    const redirectTimeout = setTimeout(() => {
      navigate('/login');
    }, delay);

    // CLEAN UP
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <>
      {/* LOGO */}
      <Logo path="/" className="absolute top-5 left-5" />

      <main className="flex flex-col items-center w-full h-full">
        {/* TITLE */}
        <div className="flex flex-col items-center justify-center grow">
          <img src={valid} alt="Valid Icon" className="w-[50px] mb-5" />
          <h2>Votre demande de contact a été envoyée avec succès.</h2>
          <h2>
            Vous allez être redirigé vers la page de connexion dans 15
            secondes...
          </h2>
        </div>
        <SupportFooter />
      </main>
    </>
  );
}
