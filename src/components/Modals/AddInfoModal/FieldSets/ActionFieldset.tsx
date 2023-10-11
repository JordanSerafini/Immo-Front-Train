// === REACT === //
import { useState } from 'react';

// === COMPONENTS === //
// Common
import Textarea from '../../../common/Textarea/Textarea';
import AddButton from '../../../common/Buttons/AddButton';
// Layout
import Fieldset from '../../../layout/Fieldset/Fieldset';

export default function ActionFieldset(regExps: { [key: string]: RegExp }) {
  // RegExp Destructuring
  const { description } = regExps;

  // === LOCAL STATES === //
  const [actionTextarea, setActionTextarea] = useState<boolean>(false);

  // === CONTROLLED INPUT STATES === //
  const [action, setAction] = useState<string>('');

  // Handle method
  const handleAddActionClick = () => {
    setActionTextarea(true);
  };
  return (
    <Fieldset title="Action">
      <div>
        {actionTextarea ? (
          <Textarea
            value={action}
            onChange={setAction}
            placeholder="Renseignez votre action"
            textareaName="description"
            regExp={description}
            isRequired
          />
        ) : (
          // Add Action Button
          <AddButton
            onClickMethod={handleAddActionClick}
            content="Ajouter une action"
          />
        )}
      </div>
    </Fieldset>
  );
}
