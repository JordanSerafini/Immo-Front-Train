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
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  // Handlers
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const objData = Object.fromEntries(formData);
      await axiosInstance.post('/reset', objData);

      return setIsEmailSent(true);
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
      <main className="flex flex-col items-center w-full h-full mx-5 text-center sm:mx-0">
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
            regExp={emailRegexp}
          />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>

        {isEmailSent && (
          <>
            <h2 className="mt-20 text-green-600">
              Vous allez recevoir un email.
            </h2>
            <h2 className="text-green-600">
              Pensez à vérifier vos courriers indésirables.
            </h2>
            <h2 className="mb-5 text-green-600">
              Le lien de réinitialisation ne sera valable qu&apos;une heure.
            </h2>
          </>
        )}

        <SupportFooter />
      </main>
    </>
  );
}