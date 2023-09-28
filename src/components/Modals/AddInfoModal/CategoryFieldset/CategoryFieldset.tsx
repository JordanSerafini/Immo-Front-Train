// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import RadioButton from '../Field/RadioButton';

export default function CategoryFieldset() {
  // Category Local State
  const [selectedCategoryOption, setSelectedCategoryOption] =
    useState<string>('à vendre');

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