// === REACT === //
import { FormEvent, useState } from 'react';

// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REACT ROUTER DOM === //
import { useNavigate } from 'react-router-dom';

// === AXIOS === //
import axiosInstance from '../../utils/axios';

// === COMPONENTS === //
import Logo from '../../components/layout/Logo/Logo';
import Textarea from '../../components/common/Textarea/Textarea';
import ValidButton from '../../components/common/Buttons/ValidButton';
import Input from '../../components/common/Inputs/Input';
import Footer from "../../components/layout/Footer/Footer";

export default function Support() {
  // === HOOK EXEC ORDER === //
  const navigate = useNavigate();

  // === CONTROLLED INPUT STATES === //
  const [email, setEmail] = useState<string>('');
  const [objectValue, setObjectValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  // === HANDLERS === //  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    // === FETCH === //
    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/support', objData);

      // If the response is 200, we can redirect the user to /support/confirmation
      if (response.status === 200) {
        navigate('/support/confirmation');
      } else {
        toast.info('Votre mail ne fait pas partie de notre base de données.', {
          position: toast.POSITION.BOTTOM_CENTER
        })
      }

      return response;
    } catch (error) {
      const errMessage = (error as {response: {data: string}}).response.data;
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

        {/* OBJET */}
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
            label="Votre email"
            className="w-full mb-10"
          />
          <Input
            value={objectValue}
            onChange={setObjectValue}
            inputName="title"
            placeholder="Objet de votre demande"
            label="Objet"
            className='w-full'
          />

          {/* OBJECT MESSAGE */}
          <Textarea
            value={message}
            onChange={setMessage}
            textareaName="content"
            placeholder="Votre message..."
            className='w-full'
          />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>
        <Footer />
      </main>
    </>
  );
}
