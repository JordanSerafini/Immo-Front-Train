// === REACT === //
import { useEffect } from 'react';

// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === COMPONENTS === //
import Logo from '../../components/layout/Logo/Logo';
import Footer from '../../components/layout/Footer/Footer';

// === ASSETS === //
import { validIcon } from '../../assets';

export default function SupportConfirmation() {
  // === HOOK EXEC ORDER === //
  const navigate = useNavigate();

  // === VARIABLES === //
  const delay = 10000;

  // === EFFECTS === //
  useEffect(() => {
    // 10 000 ms = 10s
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

      <main className="flex flex-col items-center w-full h-full pb-5">
        {/* TITLE */}
        <div className="flex flex-col items-center justify-center grow">
          <img src={validIcon} alt="Valid Icon" className="w-[50px] mb-5" />
          <h2>Votre demande de contact a été envoyée avec succès.</h2>
          <h2>
            Vous allez être redirigé vers la page de connexion dans{' '}
            {delay / 1000} secondes...
          </h2>
        </div>
        <Footer />
      </main>
    </>
  );
}
