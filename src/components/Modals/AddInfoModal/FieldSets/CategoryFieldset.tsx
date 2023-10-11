// === REACT === //
import { useState } from 'react';

// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import RadioButton from '../../../common/Buttons/RadioButton';

export default function CategoryFieldset() {
  // === CONTROLLED INPUT STATES === //
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>('à vendre');
    // We want to force the initial state to be on "à vendre"

  return (
    <Fieldset title="*Catégorie">
      <div className="flex flex-wrap items-center justify-center gap-6 my-5">
        <RadioButton
          value="à vendre"
          state={selectedCategoryOption}
          onChange={setSelectedCategoryOption}
          buttonName="category"
        />
        <RadioButton
          value="potentiellement à vendre"
          state={selectedCategoryOption}
          onChange={setSelectedCategoryOption}
          buttonName="category"
        />
        <RadioButton
          value="succession en cours"
          state={selectedCategoryOption}
          onChange={setSelectedCategoryOption}
          buttonName="category"
        />
      </div>
    </Fieldset>
  );
}
