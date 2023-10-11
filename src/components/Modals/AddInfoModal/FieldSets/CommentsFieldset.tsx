// === REACT === //
import { useState } from 'react';

// === COMPONENTS === //
import Fieldset from '../../../layout/Fieldset/Fieldset';
import Textarea from '../../../common/Textarea/Textarea';

export default function CommentsFieldset(regExps: { [key: string]: RegExp }) {
  // RegExp Destructuring
  const { comment } = regExps;

  // === CONTROLLED INPUT STATES === //
  const [commentValue, setCommentValue] = useState<string>('');

  return (
    <Fieldset title="Commentaires">
      <div className="mb-5">
        <Textarea
          value={commentValue}
          onChange={setCommentValue}
          placeholder="Écrivez vos commentaires..."
          textareaName="comment"
          regExp={comment}
        />
      </div>
    </Fieldset>
  );
}
