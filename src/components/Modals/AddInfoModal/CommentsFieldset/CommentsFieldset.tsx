// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Textarea from '../Field/Textarea';

export default function CommentsFieldset() {
  // Comments Local State
  const [comment, setComment] = useState<string>('test');
  
  return (
    <Fieldset title="Commentaires">
      <div className="mb-5">
        <Textarea
          value={comment}
          onChange={setComment}
          placeholder="Écrivez vos commentaires..."
          textareaName="comment"
        />
      </div>
    </Fieldset>
  );
}
