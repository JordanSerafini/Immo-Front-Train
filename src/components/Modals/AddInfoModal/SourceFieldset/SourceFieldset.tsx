// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Textarea from '../Field/Textarea';

export default function SourceFieldset() {
  // Info Source Local State
  const [sourceInfo, setSourceInfo] = useState<string>('test');
  return (
    <Fieldset title="*Source de l'information">
      <div className="mb-5">
        <Textarea
          value={sourceInfo}
          onChange={setSourceInfo}
          placeholder="Renseignez la source de l'information..."
          textareaName="source"
        />
      </div>
    </Fieldset>
  );
}
