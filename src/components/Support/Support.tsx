// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch } from '../../hooks/redux';

// Components
import Logo from '../SharedComponents/Logo/Logo';
import Textarea from '../Modals/AddInfoModal/Field/Textarea';
import ValidButton from '../SharedComponents/Buttons/ValidButton';
import Input from '../Modals/AddInfoModal/Field/Input';
import SupportFooter from './SupportFooter/SupportFooter';

export default function Support() {
  // Local States
  const [objectValue, setObjectValue] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log(Object.fromEntries(formData));
  };

  return (
    <>
      {/* LOGO */}
      <Logo
        path="/"
        className="absolute top-5 left-5"
      />

      <main className="flex flex-col w-full h-full">
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
            value={objectValue}
            onChange={setObjectValue}
            inputName="object"
            placeholder="Renseignez l'objet de votre demande"
            label="Objet"
          />

          {/* OBJECT MESSAGE */}
          <Textarea
            value={message}
            onChange={setMessage}
            textareaName="message"
            placeholder="Votre message..."
          />

          {/* SEND BUTTON */}
          <ValidButton
            content="Se connecter"
            isSubmit
            className="w-full mt-10"
          />
        </form>
        <SupportFooter />
      </main>
    </>
  );
}