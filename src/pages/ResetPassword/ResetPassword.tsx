// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === AXIOS === //

import axiosInstance from '../../utils/axios';

// === COMPONENTS === //
import Logo from '../../components/layout/Logo/Logo';
import Footer from '../../components/layout/Footer/Footer';
import Input from '../../components/common/Inputs/Input';
import ValidButton from '../../components/common/Buttons/ValidButton';

// === TYPESCRIPT === //
import { ErrorType } from '../../@types/error';
import { useAppSelector } from '../../hooks/redux';

export default function ResetPassword() {
  // === REDUX STATES === //
  const emailRegexp = useAppSelector((state) => state.regexps.user.email);
  
  // === LOCAL STATES === //
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  
  // === CONTROLLED INPUT STATES === //
  const [email, setEmail] = useState<string>('');

  // === HANDLERS === //
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // === FETCH === //
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
      <Logo path="/" className="absolute top-5 left-3" />
      <main className="flex flex-col items-center w-full h-full p-4 text-center">
        {/* TITLE */}
        <h1 className="w-full mt-40 mb-20 sm:w-3/4">
          Envoyer une demande pour réinitialiser votre mot de passe
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-[95%] max-w-xl mx-auto font-poppins"
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

        <Footer />
      </main>
    </>
  );
}
