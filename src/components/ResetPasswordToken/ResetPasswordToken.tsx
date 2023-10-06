// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React
import { useState, FormEvent } from 'react';

// React Dom
import { useLocation, useNavigate } from 'react-router-dom';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import Logo from '../SharedComponents/Logo/Logo';
import Input from '../Modals/AddInfoModal/Field/Input';
import SupportFooter from '../Support/SupportFooter/SupportFooter';
import ValidButton from '../SharedComponents/Buttons/ValidButton';

// Typescript
import { ErrorType } from '../../@types/error';

export default function ResetPasswordToken() {
  // Hook execution order
  const location = useLocation();
  const navigate = useNavigate();

  // Local state
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

      <main className="flex flex-col w-full h-full mx-5 sm:mx-0">
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
          <Input
            placeholder="Mot de passe"
            value={password}
            onChange={setPassword}
            className="w-full mb-8 shadow-custom"
            type="password"
            inputName="password"
          />

          <Input
            placeholder="Confirmez votre mot de passe"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            className="w-full shadow-custom"
            type="password"
            inputName="password_confirmation"
          />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>
        <SupportFooter />
      </main>
    </>
  );
}
