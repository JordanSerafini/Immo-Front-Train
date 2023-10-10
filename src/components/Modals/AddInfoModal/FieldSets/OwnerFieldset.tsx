// React Hooks
import { useState, useMemo } from 'react';

// Components
import Fieldset from '../../../layout/Fieldset/Fieldset';
import MemoizedInput from '../../../common/Inputs/MemoizedInput';

export default function OwnerFieldset(regExps : { [key: string]: RegExp }) {
  // Regexp Destructuring
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {owner_name, phone_1, phone_2, owner_email} = regExps

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
          regExp={owner_name}
        />
        <div className="grid gap-8 md:gap-0 md:grid-cols-2">
          <MemoizedInput
            placeholder="N° Tel."
            value={ownerPhoneNumber1}
            onChange={setOwnerPhoneNumber1}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_1"
            regExp={phone_1}
          />
          <MemoizedInput
            placeholder="Autre. N° Tel."
            value={ownerPhoneNumber2}
            onChange={setOwnerPhoneNumber2}
            className="w-1/2 md:w-3/4"
            type="number"
            inputName="phone_2"
            regExp={phone_2}
          />
        </div>

        <MemoizedInput
          placeholder="Adresse email"
          value={ownerEmail}
          onChange={setOwnerEmail}
          className="w-3/4"
          type="email"
          inputName="owner_email"
          regExp={owner_email}
        />
      </div>
    </Fieldset>
  ), [ownerEmail, ownerName, ownerPhoneNumber1, ownerPhoneNumber2, owner_email, owner_name, phone_1, phone_2]);
}