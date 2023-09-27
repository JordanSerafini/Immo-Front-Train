// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Input from '../Field/Input';
import Textarea from '../Field/Textarea';

export default function LocationFieldset({ typeState }: { typeState: string }) {
  // Location Local States
  const [streetNumber, setStreetNumber] = useState<string>('25');
  const [streetName, setStreetName] = useState<string>('rue du Test');
  const [zipCode, setZipCode] = useState<string>('95190');
  const [city, setCity] = useState<string>('TEST');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('Test informations');

  return (
    <Fieldset title="*Localisation">
      <div className="flex flex-col gap-4 my-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Input
            placeholder="N°"
            onChange={setStreetNumber}
            value={streetNumber}
            className="w-[3.5rem]"
            type="number"
            inputName="address_number"
          />
          <Input
            placeholder="Rue"
            onChange={setStreetName}
            value={streetName}
            className="w-full sm:w-[300px]"
            inputName='address_street'
          />
        </div>

        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Input
            placeholder="Code Postal"
            onChange={setZipCode}
            value={zipCode}
            type="number"
            className="w-[80px]"
            inputName='code_zip'
          />
          <Input
            placeholder="Ville"
            onChange={setCity}
            value={city}
            className="w-full md:w-[260px]"
            inputName='address_city'
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
