// === REACT === //
import { useState, useMemo } from 'react';

// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import MemoizedInput from '../../../common/Inputs/MemoizedInput';
import Textarea from '../../../common/Textarea/Textarea';

// === TYPESCRIPT === //
interface LocationFieldsetProps {
  typeState: string;
  regExps: { [key: string]: RegExp };
}

export default function LocationFieldset({
  typeState,
  regExps,
}: LocationFieldsetProps) {
  // RegExp Destructuring
  const {
    address_number: adressNumberReg,
    address_street: addressStreetReg,
    code_zip: codeZipReg,
    address_city: addressCityReg,
    address_info: addressInfoReg,
  } = regExps;
  // Location Local States
  const [streetNumber, setStreetNumber] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [appartmentInfo, setAppartmentInfo] = useState<string>('');

  return useMemo(
    () => (
      <Fieldset title="*Localisation">
        <div className="flex flex-col mb-5 gap-7 mt-7">
          <div className="flex flex-wrap justify-between gap-7 sm:gap-10">
            <MemoizedInput
              placeholder="N°"
              onChange={setStreetNumber}
              value={streetNumber}
              className="w-[4rem]"
              type="number"
              inputName="address_number"
              label="N°"
              regExp={adressNumberReg}
              isRequired
            />
            <MemoizedInput
              placeholder="Rue"
              onChange={setStreetName}
              value={streetName}
              className="w-full md:w-[250px]"
              inputName="address_street"
              label="Rue"
              regExp={addressStreetReg}
              isRequired
            />
          </div>

          <div className="flex flex-wrap justify-between gap-7 sm:gap-10">
            <MemoizedInput
              placeholder="Code Postal"
              onChange={setZipCode}
              value={zipCode}
              type="number"
              className="w-[125px]"
              inputName="code_zip"
              label="Code Postal"
              regExp={codeZipReg}
              isRequired
            />
            <MemoizedInput
              placeholder="Ville"
              onChange={setCity}
              value={city}
              className="w-full md:w-[200px]"
              inputName="address_city"
              label="Ville"
              regExp={addressCityReg}
              isRequired
            />
          </div>
          {typeState === 'Appartement' && (
            <Textarea
              label="Si l'information concerne un appartement :"
              value={appartmentInfo}
              onChange={setAppartmentInfo}
              placeholder="Informations complémentaires..."
              textareaName="address_info"
              regExp={addressInfoReg}
            />
          )}
        </div>
      </Fieldset>
    ),
    [
      addressCityReg,
      addressInfoReg,
      addressStreetReg,
      adressNumberReg,
      appartmentInfo,
      city,
      codeZipReg,
      streetName,
      streetNumber,
      typeState,
      zipCode,
    ]
  );
}
