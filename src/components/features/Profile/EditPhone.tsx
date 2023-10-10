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

export default function EditPhone({
  phoneNumber,
}: {
  phoneNumber: string | undefined;
}) {
  // Hook Execution Order
  const dispatch = useAppDispatch();

  // Redux state
  const user = useAppSelector((state) => state.collaborator.user);

  // Local states
  const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string | undefined>(
    phoneNumber
  );
  const regExps = useAppSelector((state) => state.regexps.user.phone);

  // Handlers Methods
  const handleEditLastname = () => {
    setEditPhoneNumber(!editPhoneNumber);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form: HTMLFormElement = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    const formValues = { ...user, ...formData };

    if (regExps.test(phoneNumberValue as string)) {
      dispatch(editCollaborator(formValues));
      setEditPhoneNumber(false);
    } else {
      toast.error("Votre numéro de téléphone doit contenir 10 chiffres.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }


  };

  return (
    <PersonnalInfo clickHandler={handleEditLastname} label="Téléphone">
      {editPhoneNumber ? (
        <EditForm submitMethod={handleSubmit}>
          <Input
            inputName="phone"
            className="relative"
            value={phoneNumberValue}
            onChange={setPhoneNumberValue}
            placeholder="Entrez votre n° de téléphone"
            type="number"
            regExp={regExps}
          >
            <EditSubmitBtn />
          </Input>
        </EditForm>
      ) : (
        <p className="md:text-lg">{phoneNumber}</p>
      )}
    </PersonnalInfo>
  );
}
