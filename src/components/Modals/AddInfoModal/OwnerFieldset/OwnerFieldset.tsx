// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Input from '../Field/Input';

export default function OwnerFieldset() {
  // Owner Local States
  const [ownerName, setOwnerName] = useState<string>('test');
  const [ownerPhoneNumber1, setOwnerPhoneNumber1] = useState<string>('0606060606');
  const [ownerPhoneNumber2, setOwnerPhoneNumber2] = useState<string>('0606060606');
  const [ownerEmail, setOwnerEmail] = useState<string>('test@hotmail.fr');

  return (
    <Fieldset title="*Propriétaires">
      <div className="flex flex-col gap-4 my-5">
        <Input
          placeholder="Nom des propriétaires"
          value={ownerName}
          onChange={setOwnerName}
          className="w-full"
          inputName="owner_name"
        />
        <div className='grid gap-2 md:grid-cols-2'>
          <Input
            placeholder="N° Tel."
            value={ownerPhoneNumber1}
            onChange={setOwnerPhoneNumber1}
            className="w-1/2 md:w-3/4"
            type="number"
            // Maybe another inputName. Check the back to see what is needed
            inputName="phone_1"
          />
          <Input
            placeholder="Autre. N° Tel."
            value={ownerPhoneNumber2}
            onChange={setOwnerPhoneNumber2}
            className="w-1/2 md:w-3/4"
            type="number"
            // Maybe another inputName. Check the back to see what is needed
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
