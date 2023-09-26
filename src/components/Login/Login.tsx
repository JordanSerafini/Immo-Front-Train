// React Hooks
import { useState, FormEvent } from 'react';

// React Router
import { Link } from 'react-router-dom';

// Redux
import { useAppDispatch } from '../../hooks/redux';

// Store
import { login } from '../../store/reducers/user';

// Components
import Input from '../Modals/AddInfoModal/Field/Input';
import ValidButton from '../Buttons/ValidButton';

// Assets
import illustration from '../../assets/images/illustration.png';
import logo from '../../assets/logo.svg';
import copyright from '../../assets/icons/copyright.svg';
import eyeIcon from '../../assets/icons/eye-empty.svg';
import eyeOffIcon from '../../assets/icons/eye-off.svg';
import emailIcon from '../../assets/icons/email.svg';

export default function Login() {
  // Hook Order Execution
  const dispatch = useAppDispatch();

  // The useState React Hook is used to set a state variable and its setter
  // Here, we have two useState variables, "showPassword" to display or not the password and "password" to control the input password
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);
    
    dispatch(login(formData))

  };

  const date = new Date();

  return (
    <main className="grid w-full h-full sm:grid-cols-2 bg-main">
      <Link to="/login" className="absolute top-5 left-5 sm:hidden">
        <img src={logo} alt="Logo Immo Pros" />
      </Link>
      <img
        className="hidden object-cover w-full h-full sm:block"
        src={illustration}
        alt="Illustration d'un quartier de maison individuelle"
      />

      <section className="flex flex-col justify-center p-4">
        <h2 className="mt-auto text-4xl font-bold text-center text-transparent uppercase bg-gradient-to-r from-accent-400 to-primary-300 bg-clip-text">
          Connexion
        </h2>
        <form
          className="max-w-[400px] w-full mx-auto mt-20 text-center flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          <Input
            placeholder="Email de connexion"
            value={email}
            onChange={setEmail}
            className="w-full pl-8 shadow-custom"
            inputName='email'
            type='email'
          >
            <img
              className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5"
              src={emailIcon}
              alt="Email Icon"
            />
          </Input>

          <Input
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
            className="w-full shadow-custom"
            type={showPassword ? undefined : 'password'}
            inputName='password'
          >
            <button type="button" onClick={togglePasswordVisibility}>
              <img
                className="w-[24px] absolute top-1/2 -translate-y-1/2 right-5"
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Password Icon"
              />
            </button>
          </Input>

          <ValidButton content="Se connecter" isSubmit className="mt-10" />
        </form>

        <footer className="flex flex-col items-center justify-center mt-auto">
          <Link to="/support" className="mb-20 text-center underline">
            Mot de passe oublié ?
          </Link>
          <div className="mb-4 w-[100px] h-[1px] bg-gradient-to-r from-secondary-50 via-secondary-600 to-secondary-50" />
          <p className="flex gap-1 text-xs">
            <img src={copyright} alt="Copyright" className="w-[18px]" />
            {date.getFullYear()} Immo&apos;Pros
          </p>
          <p className="text-xs">Tous droits réservés</p>
        </footer>
      </section>
    </main>
  );
}
