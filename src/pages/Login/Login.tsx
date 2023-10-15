// === REACT ROUTER DOM === //
import { Link } from 'react-router-dom';

// === COMPONENTS === //
import LoginForm from '../../components/common/Forms/LoginForm/LoginForm';
import Logo from '../../components/layout/Logo/Logo';
import Footer from '../../components/layout/Footer/Footer';

// === ASSETS === //
import illustration from '../../assets/images/illustration.webp';

// === HOOK PERSO === //
import useAuth from '../../hooks/useAuth';

export default function Login() {
  
  // We want to useAuth() because if the user closes his web browser, it's user friendly to redirect him directly though the app
  useAuth();

  return (
    <main className="grid w-full h-full lg:grid-cols-2">
      <Logo path="/login" className="absolute top-5 left-3 lg:hidden" />

      {/* ILLUSTRATION */}
      <img
        className="hidden object-cover w-full h-screen lg:block"
        src={illustration}
        alt="Illustration d'un quartier de maison individuelle"
      />

      {/* FORM SECTION */}
      <section className="flex flex-col justify-center p-4 mt-14 sm:mt-0">
        <h2 className="mt-auto text-4xl font-bold text-center text-transparent uppercase bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text">
          Connexion
        </h2>
        <LoginForm />

        {/* FOOTER */}
        <Footer>
          <Link to="/support" className="mb-5 text-center underline">
            Contactez le support
          </Link>
        </Footer>
      </section>
    </main>
  );
}
