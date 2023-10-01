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
interface EditFirstnameProps {
  firstname: string | undefined;
}

export default function EditFirstname({ firstname }: EditFirstnameProps) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.user.data);

  // Local states
  const [editFirstname, setEditFirstname] = useState<boolean>(false);
  const [firstnameValue, setFirstnameValue] = useState<string | undefined>(
    firstname
  );

  // Handlers Methods
  const handleEditLastname = () => {
    setEditFirstname(!editFirstname);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    dispatch(editUser(formValues));
    setEditFirstname(false);
  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Prénom">
      {editFirstname ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="firstname"
            className="relative"
            value={firstnameValue}
            onChange={setFirstnameValue}
            placeholder="Entrez votre prénom"
            regExp={/^[a-zA-Z]{2,}$/}
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
