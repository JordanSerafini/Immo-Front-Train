// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Hooks & types
import { FormEvent, useState } from 'react';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import Logo from '../SharedComponents/Logo/Logo';
import SupportFooter from '../Support/SupportFooter/SupportFooter';
import Input from '../Modals/AddInfoModal/Field/Input';
import ValidButton from '../SharedComponents/Buttons/ValidButton';

// Typescript
import { ErrorType } from '../../@types/error';
import { useAppSelector } from '../../hooks/redux';

export default function ResetPassword() {
  // Local States
  const [email, setEmail] = useState<string>('');
  const emailRegexp = useAppSelector((state) => state.regexps.user.email);

  // Handlers
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/reset', objData);

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
      <main className="flex flex-col items-center w-full h-full mx-5 sm:mx-0">
        {/* TITLE */}
        <h1 className="w-3/4 mt-40 mb-20">
          Envoyer une demande pour réinitialiser votre mot de passe
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto font-poppins"
        >
          <Input
            value={email}
            onChange={setEmail}
            inputName="email"
            type="email"
            placeholder="Votre email"
            label="Email"
            className="mb-10"
            regExp={emailRegexp}
          />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>

        <SupportFooter />
      </main>
    </>
  );
}
