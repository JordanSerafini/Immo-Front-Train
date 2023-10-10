// === REACT === //
import { useEffect } from 'react';

// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === REDUX HOOKS === //
import { useAppSelector } from '../../hooks/redux';

// === COMPONENTS === //
import LoginForm from '../../components/common/Forms/LoginForm/LoginForm';
import Logo from '../../components/layout/Logo/Logo';
import LoginFooter from '../../components/layout/Footers/LoginFooter';

// === ASSETS === //
import illustration from '../../assets/images/illustration.png';

export default function Login() {
  // === HOOK EXEC ORDER === //
  const navigate = useNavigate();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const { logged, acces, role_id: roleId } = user;

  // === EFFECTS === //
  useEffect(() => {
    // Once the user is connected, we can redirect him to the "/admin/panel" if ADMIN or "/app/prospection" if COLLABORATOR
    if (logged && acces) {
      // 1 ===  ADMIN // 2 === COLLABORATOR
      if (roleId === 1) {
        navigate('/admin/dashboard');
      } else {
        navigate('/app/prospection');
      }
    }
  }, [roleId, logged, navigate, acces]);

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
        <LoginFooter />
      </section>
    </main>
  );
}
