// === REACT === //
import { useState } from 'react';

// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import Textarea from '../../../common/Textarea/Textarea';

export default function SourceFieldset(regExps: { [key: string]: RegExp }) {
  const { source } = regExps;

  // === CONTROLLED INPUT STATES === //
  const [sourceInfo, setSourceInfo] = useState<string>('');
  return (
    <Fieldset title="*Source de l'information">
      <div className="mb-5">
        <Textarea
          value={sourceInfo}
          onChange={setSourceInfo}
          placeholder="Renseignez la source de l'information..."
          textareaName="source"
          regExp={source}
          isRequired
        />
      </div>
    </Fieldset>
  );
}
