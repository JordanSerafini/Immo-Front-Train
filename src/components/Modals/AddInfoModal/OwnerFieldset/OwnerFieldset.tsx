// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Input from '../Field/Input';

export default function OwnerFieldset() {
  // Owner Local States
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhoneNumber1, setOwnerPhoneNumber1] = useState<string>('');
  const [ownerPhoneNumber2, setOwnerPhoneNumber2] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  return (
    <Fieldset title="*Propriétaires">
      <div className="flex flex-col gap-8 mb-5 mt-7">
        <Input
            placeholder="Nom des propriétaires"
          value={ownerName}
          onChange={setOwnerName}
          className="w-full"
          inputName="owner_name"
        />
        <div className='grid gap-8 md:gap-0 md:grid-cols-2'>
          <Input
            placeholder="N° Tel."
            value={ownerPhoneNumber1}
            onChange={setOwnerPhoneNumber1}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_1"
          />
          <Input
            placeholder="Autre. N° Tel."
            value={ownerPhoneNumber2}
            onChange={setOwnerPhoneNumber2}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_2"
          />
        </div>

        <Input
          placeholder="Adresse email"
          value={ownerEmail}
          onChange={setOwnerEmail}
          className="w-3/4"
          type="email"
          inputName="owner_email"
        />
      </div>
    </Fieldset>
  );
}
