// React Hooks
import { useEffect } from 'react';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/redux';

// Components
import LoginForm from '../../components/common/Forms/LoginForm/LoginForm';
import Logo from '../../components/SharedComponents/Logo/Logo';
import LoginFooter from '../../components/layout/Footers/LoginFooter';

// Assets
import illustration from '../../assets/images/illustration.png';

export default function Login() {
  // Hook Execution Order
  const navigate = useNavigate();

  // Redux State
  const isLogged = useAppSelector((state) => state.collaborator.user.logged);
  const access = useAppSelector((state) => state.collaborator.user.acces);
  // 1 ===  ADMIN // 2 === COLLABORATOR
  const roleId = useAppSelector((state) => state.collaborator.user.role_id);

  useEffect(() => {
    // Once the user is connected, we can redirect him to the "/app/prospection" if COLLABORATOR or "/admin/panel" if ADMIN
    if (isLogged && access) {
      if (roleId === 1) {
        navigate('/admin/dashboard');
      } else {
        navigate('/app/prospection');
      }
    }
  }, [roleId, isLogged, navigate, access]);

  return (
    <main className="grid w-full h-full sm:grid-cols-2">
      <Logo path="/login" className="absolute top-2 left-2 sm:hidden" />

      {/* ILLUSTRATION */}
      <img
        className="hidden object-cover w-full h-full sm:block"
        src={illustration}
        alt="Illustration d'un quartier de maison individuelle"
      />

      {/* FORM SECTION */}
      <section className="flex flex-col justify-center p-4">
        <h2 className="mt-auto text-4xl font-bold text-center text-transparent uppercase bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text">
          Connexion
        </h2>
        <LoginForm />

        {/* FOOTER */}
        {/* HTML SEMANTIC TO IMPROVE... */}
        <LoginFooter />
      </section>
    </main>
  );
}
