// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import RadioButton from '../../../common/Buttons/RadioButton';

// === ASSETS === //
import { houseIcon, apartmentIcon, landIcon, whiteHouseIcon, whiteApartmentIcon, whiteLandIcon } from '../../../../assets';

// === TYPESCRIPT === //
interface TypeFieldsetProps {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

export default function TypeFieldset({ state, setState }: TypeFieldsetProps) {
  return (
    <Fieldset title="*Type de bien">
      <div className="flex flex-wrap items-center justify-center gap-6 my-5">
        <RadioButton
          value="Maison"
          state={state}
          whiteIcon={whiteHouseIcon}
          blackIcon={houseIcon}
          onChange={setState}
          buttonName="type"
        />

        <RadioButton
          value="Appartement"
          state={state}
          whiteIcon={whiteApartmentIcon}
          blackIcon={apartmentIcon}
          onChange={setState}
          buttonName="type"
        />

        <RadioButton
          value="Terrain"
          state={state}
          whiteIcon={whiteLandIcon}
          blackIcon={landIcon}
          onChange={setState}
          buttonName="type"
        />
      </div>
    </Fieldset>
  );
}
