// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React
import { useState, FormEvent } from 'react';

// React Dom
import { useLocation, useNavigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../hooks/redux';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import Logo from '../../components/layout/Logo/Logo';
import MemoizedInput from '../../components/Modals/AddInfoModal/Field/MemoizedInput';
import Footer from '../../components/layout/Footer/Footer';
import ValidButton from '../../components/common/Buttons/ValidButton';
import PasswordStrength from '../../components/Modals/CreateAccountModal/PasswordStrength';

// Assets
import eyeIcon from '../../assets/icons/eye-empty.svg';
import eyeOffIcon from '../../assets/icons/eye-off.svg';

// Typescript
import { ErrorType } from '../../@types/error';

export default function ResetPasswordToken() {
  // Hook execution order
  const location = useLocation();
  const navigate = useNavigate();

  // Redux states
  const passwordRegExps = useAppSelector(
    (state) => state.regexps.passwordStrength
  );
  const regExps = useAppSelector((state) => state.regexps.user);

  // Local state
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  const token = location.search.slice(1);

  // handlers
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append('token', token);

    if (password !== passwordConfirmation) {
      return toast.info('Mots de passe différents', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }

    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/reset/token', objData);

      if (response.status === 200) {
        navigate('/login');
        toast.success('Votre mot de passe a bien été réinitialisé !', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

      return response;
    } catch (error) {
      const errMessage = (error as ErrorType).response.data.error;
      toast.error(errMessage, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      throw new Error(`${error}`);
    }
  };

  return (
    <>
      {/* LOGO */}
      <Logo path="/" className="absolute top-5 left-5" />

      <main className="flex flex-col w-full h-full pb-5 mx-5 sm:mx-0">
        {/* TITLE */}
        <h1 className="mt-40">Un soucis ?</h1>
        <h1 className="mb-20">
          Pas de panique ! Contactez le support technique
        </h1>

        {/* RESET PASSWORD */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto font-poppins"
        >
          <MemoizedInput
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
            className="w-full mb-8 shadow-custom"
            type={showPassword ? "text" : 'password'}
            inputName="password"
            regExp={regExps.password}
          >
            <button
              type="button"
              className="w-[24px] absolute top-3 right-5 z-20"
              onClick={() => setShowPassword(!showPassword)}
            >
              <img
                src={showPassword ? eyeIcon : eyeOffIcon}
                alt="Password Icon"
              />
            </button>
          </MemoizedInput>

          <MemoizedInput
            placeholder="Confirmez votre mot de passe"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            className={`w-full shadow-custom ${
              passwordConfirmation.length > 8 &&
              password === passwordConfirmation
                ? 'border-primary-300 focus:ring-transparent'
                : ''
            }`}
            type={showPasswordConfirmation ? "text" : 'password'}
            inputName="password_confirmation"
          >
            <button
              type="button"
              className="w-[24px] absolute top-3 right-5 z-20"
              onClick={() =>
                setShowPasswordConfirmation(!showPasswordConfirmation)
              }
            >
              <img
                src={showPasswordConfirmation ? eyeIcon : eyeOffIcon}
                alt="Password Icon"
              />
            </button>
          </MemoizedInput>

          <div className="mt-5 text-secondary-700">
            <p className="italic font-semibold text-secondary-600">
              Le mot de passe doit contenir au mieux 8 caractères, un symbole et
              un chiffre
            </p>
            <p className="font-medium text-center text-md font-poppins">
              Force du mot de passe
            </p>
            <section className="grid grid-cols-3 gap-4">
              {passwordRegExps.weak.test(password) && (
                <PasswordStrength content="Faible" tailwindColor="bg-red-600" />
              )}
              {passwordRegExps.medium.test(password) && (
                <PasswordStrength
                  content="Moyen"
                  tailwindColor="bg-orange-500"
                />
              )}
              {passwordRegExps.strong.test(password) && (
                <PasswordStrength content="Fort" tailwindColor="bg-green-600" />
              )}
            </section>
          </div>

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>
        <Footer />
      </main>
    </>
  );
}
