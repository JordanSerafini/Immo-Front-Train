// React Hooks
import { FormEvent, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { editUser } from '../../../store/reducers/user';

// Shared Components
import PersonnalInfo from '../PersonnalInfo/PersonnalInfo';
import Input from '../../Modals/AddInfoModal/Field/Input';
import EditForm from '../EditForm/EditForm';
import EditSubmitBtn from '../EditForm/EditSubmitBtn';

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
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditLastname(!editLastname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    dispatch(editUser(formValues));
    setEditLastname(false);
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
            regExp={/^[a-zA-Z]{2,}$/}
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
