// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Textarea from '../Field/Textarea';
import AddButton from '../../../common/Buttons/AddButton';

export default function ActionFieldset(regExps: { [key: string]: RegExp }) {
  // RegExp Destructuring
  const { description } = regExps;
  // Action Local State
  const [actionTextarea, setActionTextarea] = useState<boolean>(false);
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
