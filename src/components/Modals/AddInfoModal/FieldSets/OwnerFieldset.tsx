// === REACT === //
import { useState, useMemo } from 'react';

// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import MemoizedInput from '../../../common/Inputs/MemoizedInput';

export default function OwnerFieldset(regExps: { [key: string]: RegExp }) {
  // Regexp Destructuring
  const {
    owner_name: ownerNameReg,
    phone_1: phone1Reg,
    phone_2: phone2Reg,
    owner_email: ownerEmailReg,
  } = regExps;

  // === CONTROLLED INPUT STATES === //
  const [ownerName, setOwnerName] = useState<string>('');
  const [ownerPhoneNumber1, setOwnerPhoneNumber1] = useState<string>('');
  const [ownerPhoneNumber2, setOwnerPhoneNumber2] = useState<string>('');
  const [ownerEmail, setOwnerEmail] = useState<string>('');

  return useMemo(
    () => (
      <Fieldset title="Propriétaires">
        <div className="flex flex-col gap-8 mb-5 mt-7">
          <MemoizedInput
            placeholder="Nom des propriétaires"
            value={ownerName}
            onChange={setOwnerName}
            className="w-full"
            inputName="owner_name"
            regExp={ownerNameReg}
          />
          <div className="grid gap-8 md:gap-0 md:grid-cols-2">
            <MemoizedInput
              placeholder="N° Tel."
              value={ownerPhoneNumber1}
              onChange={setOwnerPhoneNumber1}
              className="w-1/2 md:w-3/4"
              type="number"
              inputName="phone_1"
              regExp={phone1Reg}
            />
            <MemoizedInput
              placeholder="Autre. N° Tel."
              value={ownerPhoneNumber2}
              onChange={setOwnerPhoneNumber2}
              className="w-1/2 md:w-3/4"
              type="number"
              inputName="phone_2"
              regExp={phone2Reg}
            />
          </div>

          <MemoizedInput
            placeholder="Adresse email"
            value={ownerEmail}
            onChange={setOwnerEmail}
            className="w-3/4"
            type="email"
            inputName="owner_email"
            regExp={ownerEmailReg}
          />
        </div>
      </Fieldset>
    ),
    [
      ownerEmail,
      ownerEmailReg,
      ownerName,
      ownerNameReg,
      ownerPhoneNumber1,
      ownerPhoneNumber2,
      phone1Reg,
      phone2Reg,
    ]
  );
}
