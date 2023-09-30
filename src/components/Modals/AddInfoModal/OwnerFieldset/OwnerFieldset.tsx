// React Hooks
import { useState, useMemo } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import MemoizedInput from '../Field/MemoizedInput';

export default function OwnerFieldset() {
  
  // Owner Local States
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhoneNumber1, setOwnerPhoneNumber1] = useState<string>('');
  const [ownerPhoneNumber2, setOwnerPhoneNumber2] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  return useMemo(() => (
    <Fieldset title="Propriétaires">
       <div className="flex flex-col gap-8 mb-5 mt-7">
         <MemoizedInput
          placeholder="Nom des propriétaires"
          value={ownerName}
          onChange={setOwnerName}
          className="w-full"
          inputName="owner_name"
          regExp={/^[A-Za-z .'-]+$/}
        />
        <div className="grid gap-8 md:gap-0 md:grid-cols-2">
          <MemoizedInput
            placeholder="N° Tel."
            value={ownerPhoneNumber1}
            onChange={setOwnerPhoneNumber1}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_1"
            regExp={/^\d{10}$/}
          />
          <MemoizedInput
            placeholder="Autre. N° Tel."
            value={ownerPhoneNumber2}
            onChange={setOwnerPhoneNumber2}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_2"
            regExp={/^\d{10}$/}
          />
        </div>

        <MemoizedInput
          placeholder="Adresse email"
          value={ownerEmail}
          onChange={setOwnerEmail}
          className="w-3/4"
          type="email"
          inputName="owner_email"
          regExp={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
        />
      </div>
    </Fieldset>
  ), [ownerEmail, ownerName, ownerPhoneNumber1, ownerPhoneNumber2]);
}