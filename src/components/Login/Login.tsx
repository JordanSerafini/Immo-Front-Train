// React Hooks
import { FormEvent, useEffect } from 'react';

// React Router
import { useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { login } from '../../store/reducers/user';

// Components
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../SharedComponents/Logo/Logo";
import LoginFooter from './LoginFooter/LoginFooter';

// Assets
import illustration from '../../assets/images/illustration.png';

export default function Login() {
  // Hook Execution Order 
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Redux State
  const isLogged = useAppSelector((state) => state.user.data.logged);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    dispatch(login(formData));
  };

  useEffect(() => {
    // Once the use is connected, we can redirect him to the "/app/prospection"
    // Later the redirection will also depend on the role of the user (Admin or collaborator)
    if (isLogged) {
      navigate('/app/prospection');
    }
  }, [isLogged, navigate]);

  return (
    <main className="grid w-full h-full sm:grid-cols-2">
      
      <Logo path='/login' className='absolute top-5 left-5 sm:hidden' />

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
        <LoginForm submitMethod={handleSubmit} />

        {/* FOOTER */}
        {/* HTML SEMANTIC TO IMPROVE... */}
        <LoginFooter />
      </section>
    </main>
  );
}
