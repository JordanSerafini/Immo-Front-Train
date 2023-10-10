// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Hooks & types
import { FormEvent, useState } from 'react';

// React dom
import { useNavigate } from 'react-router-dom';

// Axios
import axiosInstance from '../../utils/axios';

// Components
import Logo from '../../components/SharedComponents/Logo/Logo';
import Textarea from '../../components/Modals/AddInfoModal/Field/Textarea';
import ValidButton from '../../components/SharedComponents/Buttons/ValidButton';
import Input from '../../components/Modals/AddInfoModal/Field/Input';
import SupportFooter from '../../components/layout/Footers/SupportFooter';

// Typescript
import { ErrorType } from '../../@types/error';

export default function Support() {
  // Hook Execution Order
  const navigate = useNavigate();

  // Local States
  const [email, setEmail] = useState<string>('');
  const [objectValue, setObjectValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const objData = Object.fromEntries(formData);
      const response = await axiosInstance.post('/support', objData);

      if (response.status === 200) {
        navigate('/support/confirmation');
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

        {/* OBJET */}
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
            label="Votre email"
            className="mb-10"
          />
          <Input
            value={objectValue}
            onChange={setObjectValue}
            inputName="title"
            placeholder="Objet de votre demande"
            label="Objet"
          />

          {/* OBJECT MESSAGE */}
          <Textarea
            value={message}
            onChange={setMessage}
            textareaName="content"
            placeholder="Votre message..."
          />

          {/* SEND BUTTON */}
          <ValidButton content="Envoyer" isSubmit className="w-full mt-10" />
        </form>
        <SupportFooter />
      </main>
    </>
  );
}
