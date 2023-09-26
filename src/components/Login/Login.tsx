// React Hooks
import { FormEvent, useEffect } from 'react';

// React Router
import { Link, useNavigate } from 'react-router-dom';

// Redux
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// Store
import { login } from '../../store/reducers/user';

// Components
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../SharedComponents/Logo/Logo";

// Assets
import illustration from '../../assets/images/illustration.png';
import copyrightIcon from '../../assets/icons/copyright.svg';

export default function Login() {
  // Hook Order Execution
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
    if (isLogged) {
      navigate('/app/prospection');
    }
  }, [isLogged, navigate]);

  const date = new Date();

  return (
    <main className="grid w-full h-full sm:grid-cols-2">
      
      <Logo path='/login' className='absolute top-5 left-5' />

      <img
        className="hidden object-cover w-full h-full sm:block"
        src={illustration}
        alt="Illustration d'un quartier de maison individuelle"
      />

      <section className="flex flex-col justify-center p-4">
        <h2 className="mt-auto text-4xl font-bold text-center text-transparent uppercase bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text">
          Connexion
        </h2>
        <LoginForm submitMethod={handleSubmit} />

        <footer className="flex flex-col items-center justify-center mt-auto">
          <Link to="/support" className="mb-20 text-center underline">
            Mot de passe oublié ?
          </Link>
          <div className="mb-4 w-[100px] h-[1px] bg-gradient-to-r from-secondary-50 via-secondary-600 to-secondary-50" />
          <p className="flex gap-1 text-xs">
            <img src={copyrightIcon} alt="Copyright" className="w-[18px]" />
            {date.getFullYear()} Immo&apos;Pros
          </p>
          <p className="text-xs">Tous droits réservés</p>
        </footer>
      </section>
    </main>
  );
}
