// React Hooks
import { useState, useMemo } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import MemoizedInput from '../Field/MemoizedInput';
import Textarea from '../Field/Textarea';

interface LocationFieldsetProps {
  typeState: string; 
  regExps: { [key: string]: RegExp }
}

export default function LocationFieldset({ typeState, regExps }: LocationFieldsetProps) {
  // RegExp Destructuring
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {address_number, address_street, code_zip, address_city, address_info} = regExps
  // Location Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('');

  return useMemo (() => (
    <Fieldset title="*Localisation">
      <div className="flex flex-col gap-8 mb-5 mt-7">
        <div className="flex justify-between gap-10">
          <MemoizedInput
            placeholder="N°"
            onChange={setStreetNumber}
            value={streetNumber}
            className="w-[4rem]"
            type="number"
            inputName="address_number"
            label='N°'
            regExp={address_number}
            isRequired
          />
          <MemoizedInput
            placeholder="Rue"
            onChange={setStreetName}
            value={streetName}
            className="w-full sm:w-[300px]"
            inputName='address_street'
            label='Rue'
            regExp={address_street}
            isRequired
          />
        </div>

        <div className="flex justify-between gap-10">
          <MemoizedInput
            placeholder="Code Postal"
            onChange={setZipCode}
            value={zipCode}
            type="number"
            className="w-[125px]"
            inputName='code_zip'
            label='Code Postal'
            regExp={code_zip}
            isRequired
          />
          <MemoizedInput
            placeholder="Ville"
            onChange={setCity}
            value={city}
            className="w-full md:w-[260px]"
            inputName='address_city'
            label='Ville'
            regExp={address_city}
            isRequired
          />
        </div>
        {typeState === 'Appartement' && (
          <Textarea
            label="Si l'information concerne un appartement :"
            value={appartmentInfo}
            onChange={setAppartmentInfo}
            placeholder="Informations complémentaires..."
            textareaName='address_info'
            regExp={address_info}
          />
        )}
      </div>
    </Fieldset>
  ), [address_city, address_info, address_number, address_street, appartmentInfo, city, code_zip, streetName, streetNumber, typeState, zipCode]);
}
