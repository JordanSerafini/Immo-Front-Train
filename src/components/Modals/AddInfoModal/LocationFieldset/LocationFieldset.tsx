// React Hooks
import { useState, useMemo } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import MemoizedInput from '../Field/MemoizedInput';
import Textarea from '../Field/Textarea';

export default function LocationFieldset({ typeState }: { typeState: string }) {
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
            regExp={/^[0-9]{1,4}$/}
          />
          <MemoizedInput
            placeholder="Rue"
            onChange={setStreetName}
            value={streetName}
            className="w-full sm:w-[300px]"
            inputName='address_street'
            label='Rue'
            regExp={/^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/}
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
            regExp={/^[0-9]{5}$/}
          />
          <MemoizedInput
            placeholder="Ville"
            onChange={setCity}
            value={city}
            className="w-full md:w-[260px]"
            inputName='address_city'
            label='Ville'
            regExp={/^[A-Za-zÀ-ÖØ-öø-ÿ .'-]+$/}
          />
        </div>
        {typeState === 'Appartement' && (
          <Textarea
            label="Si l'information concerne un appartement :"
            value={appartmentInfo}
            onChange={setAppartmentInfo}
            placeholder="Informations complémentaires..."
            textareaName='address_info'
            regExp={/^.+$/m}
          />
        )}
      </div>
    </Fieldset>
  ), [appartmentInfo, city, streetName, streetNumber, typeState, zipCode]);
}
