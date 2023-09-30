// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Input from '../Field/Input';
import Textarea from '../Field/Textarea';

export default function LocationFieldset({ typeState }: { typeState: string }) {
  // Location Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('');

  return (
    <Fieldset title="*Localisation">
      <div className="flex flex-col gap-8 mb-5 mt-7">
        <div className="flex justify-between gap-10">
          <Input
            placeholder="N°"
            onChange={setStreetNumber}
            value={streetNumber}
            className="w-[3.5rem]"
            type="number"
            inputName="address_number"
            label='N°'
          />
          <Input
            placeholder="Rue"
            onChange={setStreetName}
            value={streetName}
            className="w-full sm:w-[300px]"
            inputName='address_street'
            label='Rue'
          />
        </div>

        <div className="flex justify-between gap-10">
          <Input
            placeholder="Code Postal"
            onChange={setZipCode}
            value={zipCode}
            type="number"
            className="w-[125px]"
            inputName='code_zip'
            label='Code Postal'
          />
          <Input
            placeholder="Ville"
            onChange={setCity}
            value={city}
            className="w-full md:w-[260px]"
            inputName='address_city'
            label='Ville'
          />
        </div>
        {typeState === 'Appartement' && (
          <Textarea
            label="*Si l'information concerne un appartement :"
            value={appartmentInfo}
            onChange={setAppartmentInfo}
            placeholder="Informations complémentaires..."
            textareaName='address_info'
          />
        )}
      </div>
    </Fieldset>
  );
}
