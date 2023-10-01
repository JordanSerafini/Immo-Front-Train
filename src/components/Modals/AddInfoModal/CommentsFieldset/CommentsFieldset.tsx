// React Hooks
import { useState } from 'react';

// Components
import Fieldset from '../../Form/Fieldset';
import Textarea from '../Field/Textarea';

export default function CommentsFieldset(regExps: { [key: string]: RegExp }) {
  // RegEcp Destructuring
  const {comment} = regExps
  
  // Comments Local State
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
