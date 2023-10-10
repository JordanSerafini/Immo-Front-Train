// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editCollaborator } from '../../../store/reducers/collaborator';

// Shared Components
import PersonnalInfo from './PersonnalInfo';
import Input from '../../common/Inputs/Input';
import EditForm from './EditForm/EditForm';
import EditSubmitBtn from './EditForm/EditSubmitBtn';

// Typescript interface
interface EditLastnameProps {
  lastname: string | undefined;
}

export default function EditLastname({ lastname }: EditLastnameProps) {
  // Local states
  const [editLastname, setEditLastname] = useState<boolean>(false);
  const [lastnameValue, setLastnameValue] = useState<string | undefined>(
    lastname
  );
  const regExps = useAppSelector((state) => state.regexps.user.lastname);
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.collaborator.user);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditLastname(!editLastname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    if (regExps.test(lastnameValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditLastname(false);
    } else {
      toast.error('Votre nom doit avoir au moins un caractère', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Nom">
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
