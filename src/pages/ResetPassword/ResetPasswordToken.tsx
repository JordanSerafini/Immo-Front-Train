// === REACT === //
import { useState, FormEvent } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REACT ROUTER DOM === //
import { useLocation, useNavigate } from 'react-router-dom';

// === AXIOS === //
import axiosInstance from '../../utils/axios';

// === REDUX HOOKS === //
import { useAppSelector } from '../../hooks/redux';

// === COMPONENTS === //
import PasswordStrength from '../../components/features/PasswordStrength/PasswordStrength';
import Logo from '../../components/layout/Logo/Logo';
import MemoizedInput from '../../components/common/Inputs/MemoizedInput';
import Footer from '../../components/layout/Footer/Footer';
import ValidButton from '../../components/common/Buttons/ValidButton';

// === ASSETS === //
import { eyeOffIcon, eyeEmptyIcon } from '../../assets';

// === TYPESCRIPT === //
import { ErrorType } from '../../@types/error';

export default function ResetPasswordToken() {
  // === HOOK EXEC ORDER === //
  const location = useLocation();
  const navigate = useNavigate();

  // === REDUX STATES === //
  const regExps = useAppSelector((state) => state.regexps.user);

  // === VARIABLES === //
  const token = location.search.slice(1);

  // === LOCAL STATES === //
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState<boolean>(false);

  // === CONTROLLED INPUT STATES === //
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

  // === HANDLERS === //
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

    // === FETCH === //
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
      <Logo path="/" className="absolute top-5 left-3" />

      <main className="flex flex-col w-full h-full p-4">
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
                src={showPassword ? eyeEmptyIcon : eyeOffIcon}
                alt="Password Icon"
              />
            </button>
          </MemoizedInput>

          <MemoizedInput
            placeholder="Confirmez votre mot de passe"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            className={`w-full mb-5 shadow-custom ${
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
                src={showPasswordConfirmation ? eyeEmptyIcon : eyeOffIcon}
                alt="Password Icon"
              />
            </button>
          </MemoizedInput>

          <PasswordStrength inputState={password} />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>
        <Footer />
      </main>
    </>
  );
}
