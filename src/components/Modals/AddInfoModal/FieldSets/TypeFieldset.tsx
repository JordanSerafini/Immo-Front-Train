// Components
import Fieldset from '../../../layout/Fieldset/Fieldset';
import RadioButton from '../../../common/Buttons/RadioButton';

// Assets
import house from '../../../../assets/icons/house.svg';
import whiteHouse from '../../../../assets/icons/white_house.svg';
import apartment from '../../../../assets/icons/apartment.svg';
import whiteApartment from '../../../../assets/icons/white_apartment.svg';
import land from '../../../../assets/icons/land.svg';
import whiteLand from '../../../../assets/icons/white_land.svg';

// Typescript interface
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
          whiteIcon={whiteHouse}
          blackIcon={house}
          onChange={setState}
          buttonName="type"
        />

        <RadioButton
          value="Appartement"
          state={state}
          whiteIcon={whiteApartment}
          blackIcon={apartment}
          onChange={setState}
          buttonName="type"
        />

        <RadioButton
          value="Terrain"
          state={state}
          whiteIcon={whiteLand}
          blackIcon={land}
          onChange={setState}
          buttonName="type"
        />
      </div>
    </Fieldset>
  );
}
