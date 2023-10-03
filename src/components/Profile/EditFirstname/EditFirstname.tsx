// Library
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const regExps = useAppSelector((state) => state.regexps.user.firstname);

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

    if (regExps.test(firstnameValue as string)) {
      dispatch(editUser(formValues));
      setEditFirstname(false);
    } else {
      toast.error('Votre prénom doit avoir au moins un caractère', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
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
