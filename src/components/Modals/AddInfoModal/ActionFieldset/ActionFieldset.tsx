// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Textarea from '../Field/Textarea';
import AddButton from '../../../SharedComponents/Buttons/AddButton';

export default function ActionFieldset() {
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
                // Maybe another inputName. Check the back to see what is needed
                textareaName='description'
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
  )
}