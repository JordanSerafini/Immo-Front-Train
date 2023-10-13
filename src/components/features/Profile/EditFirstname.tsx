// === REACT === //
import { FormEvent, useState } from 'react';

// === LIBRARY === //
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// === REDUX HOOKS === //
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

// === REDUCERS === //
import { editCollaborator } from '../../../store/reducers/collaborator';

// === COMPONENTS === //
// Common
import Input from '../../common/Inputs/Input';
// Local
import PersonnalInfo from './PersonnalInfo';
import EditForm from './EditForm/EditForm';
import EditSubmitBtn from './EditForm/EditSubmitBtn';

// === UTILS === //
import trimFormValues from '../../../utils/trimFormValues';

export default function EditFirstname({
  firstname,
}: {
  firstname: string | undefined;
}) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const regExps = useAppSelector((state) => state.regexps.user.firstname);

  // === LOCAL STATES === //
  const [editFirstname, setEditFirstname] = useState<boolean>(false);
  const [firstnameValue, setFirstnameValue] = useState<string | undefined>(
    firstname
  );

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form: HTMLFormElement = event.currentTarget;
    const trimmedFormData = trimFormValues(form);

    // We want to send the actual user and the formData with the update
    const formValues = { ...user, ...trimmedFormData };

    if (regExps.test(firstnameValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditFirstname(false);
      setFirstnameValue(firstnameValue?.trim());
    } else {
      toast.error(
        'Votre prénom doit avoir au moins un caractère normal et ne pas être un chiffre',
        {
          position: toast.POSITION.BOTTOM_CENTER,
        }
      );
    }
  };

  return (
    <PersonnalInfo
      clickHandler={() => setEditFirstname(!editFirstname)}
      label="Prénom"
    >
      {editFirstname ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="firstname"
            className="relative"
            value={firstnameValue}
            onChange={setFirstnameValue}
            placeholder="Entrez votre prénom"
            regExp={regExps}
          >
            <EditSubmitBtn />
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{firstname}</p>
      )}
    </PersonnalInfo>
  );
}
