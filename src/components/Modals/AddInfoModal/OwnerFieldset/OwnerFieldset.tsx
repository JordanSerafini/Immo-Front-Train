// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Input from '../Field/Input';
import AddButton from '../../../SharedComponents/Buttons/AddButton';

export default function OwnerFieldset() {
  // Owner Local States
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhoneNumber, setOwnerPhoneNumber] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  // Handle Methods
  const handleAddPhoneClick = () => {
    // eslint-disable-next-line no-console
    console.log('Ajouter un numéro de téléphone');
  };
  return (
    <Fieldset title="*Propriétaires">
      <div className="flex flex-col gap-4 my-5">
        <Input
          placeholder="Nom des propriétaires"
          value={ownerName}
          onChange={setOwnerName}
          className="w-full"
          inputName='owner_name'
        />
        <Input
          placeholder="N° Tel."
          value={ownerPhoneNumber}
          onChange={setOwnerPhoneNumber}
          className="w-1/2"
          type="number"
          // Maybe another inputName. Check the back to see what is needed
          inputName='owner_phone'
        />

        {/* ADD Phone Number BUTTON */}
        <AddButton
          onClickMethod={handleAddPhoneClick}
          content="Ajouter un n° de tel."
        />

        <Input
          placeholder="Adresse email"
          value={ownerEmail}
          onChange={setOwnerEmail}
          className="w-3/4"
          type="email"
          inputName='owner_email'
        />
      </div>
    </Fieldset>
  );
}
