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

export default function EditLastname({
  lastname,
}: {
  lastname: string | undefined;
}) {
  // === HOOK EXEC ORDER === //
  const dispatch = useAppDispatch();

  // === REDUX STATES === //
  const user = useAppSelector((state) => state.collaborator.user);
  const regExps = useAppSelector((state) => state.regexps.user.lastname);

  // === LOCAL STATES === //
  const [editLastname, setEditLastname] = useState<boolean>(false);
  const [lastnameValue, setLastnameValue] = useState<string | undefined>(
    lastname
  );

  // === HANDLERS === //
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const trimmedFormData = trimFormValues(form);

    const formValues = { ...user, ...trimmedFormData};

    if (regExps.test(lastnameValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditLastname(false);
      setLastnameValue(lastnameValue?.trim())
    } else {
      toast.error('Votre nom doit avoir au moins un caractère', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <PersonnalInfo
      clickHandler={() => setEditLastname(!editLastname)}
      label="Nom"
    >
      {editLastname ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="lastname"
            className="relative"
            value={lastnameValue}
            onChange={setLastnameValue}
            placeholder="Entrez votre nom"
            regExp={regExps}
          >
            <EditSubmitBtn />
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{lastname}</p>
      )}
    </PersonnalInfo>
  );
}
